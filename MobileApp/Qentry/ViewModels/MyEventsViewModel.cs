using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Helpers;
using Qentry.Models;
using Qentry.Services;
using Qentry.Views;
using System.Collections.ObjectModel;
using System.Globalization;

namespace Qentry.ViewModels
{
    public partial class MyEventsViewModel : ObservableObject, IQueryAttributable
    {
        private readonly EventService _eventService;

        private readonly TokensService _tokensService;

        private readonly AuthService _authService;

        public ObservableCollection<EventModel> Events { get; } = new();

        [ObservableProperty]
        private string selectedDateString;

        [ObservableProperty]
        private string searchQuery;

        [ObservableProperty]
        private bool isFilterPanelVisible;

        [ObservableProperty]
        private string selectedCategory;

        [ObservableProperty]
        private string locationFilter;

        [ObservableProperty]
        private string manualDateFilter;

        [ObservableProperty]
        private bool isOrganizer;

        private bool _isResetting = false;
        private string NameFilter => SearchQuery;

        private string DateFilter { get; set; }

        private bool? IsActiveFilter => IsCreatedSelected ? true : false;

        public bool NoEventsVisible => Events.Count == 0;

        public IAsyncRelayCommand LoadEventsCommand { get; }

        public IRelayCommand SearchCommand { get; }
        public IRelayCommand ResetFiltersCommand { get; }

        public IRelayCommand<string> SelectCategoryCommand { get; }

        public IAsyncRelayCommand<int> DeleteEventCommand { get; }

        public IRelayCommand<EventModel> OpenEventDetailsCommand { get; }

        [ObservableProperty]
        private bool isCreatedSelected = true;

        public bool IsArchivedSelected => !IsCreatedSelected;

        private double _screenHeight;
        public double ScreenHeight
        {
            get => _screenHeight;
            set => SetProperty(ref _screenHeight, value);
        }


        public MyEventsViewModel(EventService eventService, TokensService tokensService, AuthService authService)
        {
            _eventService = eventService;
            _tokensService = tokensService;
            _authService = authService;

            EventBus.EventsUpdated += Refresh;

            LoadEventsCommand = new AsyncRelayCommand(LoadEventsAsync);

            SearchCommand = new RelayCommand(async () => { await LoadEventsAsync(); });
            ResetFiltersCommand = new RelayCommand(ResetFilters);

            DeleteEventCommand = new AsyncRelayCommand<int>(DeleteEventAsync);

            OpenEventDetailsCommand = new RelayCommand<EventModel>(OpenEventDetails);

            SelectCategoryCommand = new RelayCommand<string>(SelectCategory);
        }

        [RelayCommand]
        private void ShowCreated()
        {
            IsCreatedSelected = true;
            OnPropertyChanged(nameof(IsArchivedSelected));
            OnPropertyChanged(nameof(NoEventsVisible));
            LoadEventsCommand.Execute(null);
        }

        [RelayCommand]
        private void ShowArchived()
        {
            IsCreatedSelected = false;
            OnPropertyChanged(nameof(IsArchivedSelected));
            OnPropertyChanged(nameof(NoEventsVisible));
            LoadEventsCommand.Execute(null);
        }

        private CalendarDayModel _selectedDay;
        public CalendarDayModel SelectedDay
        {
            get => _selectedDay;
            set
            {
                if (SetProperty(ref _selectedDay, value))
                {
                    SelectedDateString = value?.Date.ToString("dddd, dd MMMM yyyy", new CultureInfo("pl-PL"));

                    DateFilter = value?.Date.ToString("yyyy-MM-dd");

                    LoadEventsCommand.Execute(null);
                }
            }
        }

        public List<string> Categories { get; } = new()
        {
            "music", "art", "food", "sport", "business", "theatre", "tech", "wellness", "gaming", "film", "fashion", "books", "other"
        };

        [RelayCommand]
        private void ToggleFilterPanel()
        {
            IsFilterPanelVisible = !IsFilterPanelVisible;
        }

        partial void OnSelectedCategoryChanged(string value)
        {
            if (_isResetting) return;
            LoadEventsCommand.Execute(null);
        }

        public async Task LoadEventsAsync()
        {
            try
            {
                var user = await _authService.GetCurrentUser();
                IsOrganizer = user.WantsToBeOrganizer;

                Events.Clear();

                var userRoles = await _tokensService.GetAllUserEventRolesAsync();

                string finalName = string.IsNullOrWhiteSpace(SearchQuery) ? null : SearchQuery;
                string finalLocation = string.IsNullOrWhiteSpace(LocationFilter) ? null : LocationFilter;
                string finalDate = DateFilter;  
                bool isActive = IsCreatedSelected;

                List<EventModel> loadedEvents;

                if (IsOrganizer)
                {
                    var filter = new EventFilterModel
                    {
                        Name = finalName,
                        Location = finalLocation,
                        Date = finalDate,
                        IsActive = isActive
                    };

                    loadedEvents = await _eventService.GetOrganizerEventsAsync(filter);

                    foreach (var ev in loadedEvents)
                    {
                        var ur = userRoles.FirstOrDefault(r => r.EventId == ev.Id_Event);
                        ev.UserRole = ur?.UserRole ?? "organizer";
                        Events.Add(ev);
                    }

                    OnPropertyChanged(nameof(NoEventsVisible));
                    return;
                }

                var assignedEvents = userRoles
                    .Where(r => r.UserRole != "guest")
                    .GroupBy(r => r.EventId)
                    .Select(g => g.First())
                    .ToList();

                loadedEvents = new List<EventModel>();

                foreach (var r in assignedEvents)
                {
                    var e = await _eventService.GetEventByIdAsync(r.EventId);
                    if (e != null)
                    {
                        e.UserRole = r.UserRole;
                        loadedEvents.Add(e);
                    }
                }

                loadedEvents = loadedEvents.Where(e =>
                {

                    if (finalName != null &&
                        (e.Name == null || !e.Name.Contains(finalName, StringComparison.OrdinalIgnoreCase)))
                        return false;

                    if (finalLocation != null &&
                        (e.Location == null || !e.Location.Contains(finalLocation, StringComparison.OrdinalIgnoreCase)))
                        return false;

                    if (finalDate != null)
                    {
                        if (!DateTime.TryParse(finalDate, out var filterDate))
                            return false;

                        if (e.StartDate.Date != filterDate.Date)
                            return false;
                    }

                    if (e.IsActive != isActive)
                        return false;

                    return true;
                }).ToList();

                foreach (var ev in loadedEvents)
                    Events.Add(ev);

                OnPropertyChanged(nameof(NoEventsVisible));
            }
            catch (Exception ex)
            {
                await Shell.Current.DisplayAlert("Błąd", ex.Message, "OK");
            }
        }

        private void ResetFilters()
        {
            _isResetting = true;

            SearchQuery = string.Empty;
            SelectedCategory = null;

            ManualDateFilter = string.Empty;
            DateFilter = null;

            LocationFilter = string.Empty;

            _selectedDay = null;
            SelectedDateString = null;

            IsCreatedSelected = true;
            OnPropertyChanged(nameof(IsArchivedSelected));

            _isResetting = false;

            LoadEventsCommand.Execute(null);
        }

        private async Task DeleteEventAsync(int eventId)
        {
            bool confirm = await Shell.Current.DisplayAlert(
                "Potwierdzenie",
                "Czy na pewno chcesz usunąć to wydarzenie?",
                "Usuń",
                "Anuluj"
            );

            if (!confirm)
                return;

            bool success = await _eventService.DeleteEventAsync(eventId);

            if (!success)
            {
                await Shell.Current.DisplayAlert("Błąd", "Nie udało się usunąć wydarzenia.", "OK");
                return;
            }

            await LoadEventsAsync();
        }

        partial void OnManualDateFilterChanged(string value)
        {
            if (_isResetting) return;

            if (DateTime.TryParse(value, CultureInfo.GetCultureInfo("pl-PL"), DateTimeStyles.None, out var parsed) ||
                DateTime.TryParse(value, CultureInfo.InvariantCulture, DateTimeStyles.None, out parsed))
            {
                DateFilter = parsed.ToString("yyyy-MM-dd");
            }
            else
            {
                DateFilter = null;
            }

            LoadEventsCommand.Execute(null);
        }

        private async void OpenEventDetails(EventModel ev)
        {
            if (ev == null)
                return;

            if (IsOrganizer)
            {
                await Shell.Current.GoToAsync(nameof(MyEventDetailsPage), true,
                    new Dictionary<string, object>
                    {
                { "Event", ev }
                    });
                return;
            }

            if (ev.UserRole != null && ev.UserRole != "guest")
            {
                await Shell.Current.GoToAsync("///StaffEventDetailsPage",
                    new Dictionary<string, object> { { "Event", ev } });
                return;
            }

            await Shell.Current.DisplayAlert("Brak dostępu",
                "Nie masz uprawnień do zarządzania tym wydarzeniem.",
                "OK");
        }

        public void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            if (query.ContainsKey("refresh"))
            {
                LoadEventsCommand.Execute(null);
            }
        }

        private void Refresh()
        {
            LoadEventsCommand.Execute(null);
        }

        private void SelectCategory(string category)
        {
            if (SelectedCategory == category)
                SelectedCategory = null;
            else
                SelectedCategory = category;

        }
    }
}
