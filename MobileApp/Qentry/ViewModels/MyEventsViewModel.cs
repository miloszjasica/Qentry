using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Models;
using Qentry.Services;
using System.Collections.ObjectModel;
using System.Globalization;

namespace Qentry.ViewModels
{
    public partial class MyEventsViewModel : ObservableObject
    {
        private readonly EventService _eventService;

        private readonly TokensService _tokensService;

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

        private string NameFilter => SearchQuery;

        private string DateFilter { get; set; }

        private bool? IsActiveFilter => IsCreatedSelected ? true : false;

        public bool NoEventsVisible => Events.Count == 0;

        public IAsyncRelayCommand LoadEventsCommand { get; }

        public IRelayCommand SearchCommand { get; }
        public IRelayCommand ResetFiltersCommand {  get; }

        public IAsyncRelayCommand<int> DeleteEventCommand { get; }

        [ObservableProperty]
        private bool isCreatedSelected = true;

        public bool IsArchivedSelected => !IsCreatedSelected;

        private double _screenHeight;
        public double ScreenHeight
        {
            get => _screenHeight;
            set => SetProperty(ref _screenHeight, value);
        }


        public MyEventsViewModel(EventService eventService, TokensService tokensService)
        {
            _eventService = eventService;
            _tokensService = tokensService;

            LoadEventsCommand = new AsyncRelayCommand(LoadEventsAsync);

            SearchCommand = new RelayCommand(async () => { await LoadEventsAsync(); });
            ResetFiltersCommand = new RelayCommand(ResetFilters);

            DeleteEventCommand = new AsyncRelayCommand<int>(DeleteEventAsync);
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
            LoadEventsCommand.Execute(null);
        }

        public async Task LoadEventsAsync()
        {
            var filter = new EventFilterModel
            {
                Date = DateFilter,
                Name = NameFilter,
                Category = SelectedCategory,
                IsActive = IsActiveFilter,
                Location = string.IsNullOrWhiteSpace(LocationFilter) ? SearchQuery : LocationFilter
            };

            var events = await _eventService.GetOrganizerEventsAsync(filter);

            Events.Clear();

            foreach (var ev in events)
                Events.Add(ev);

            OnPropertyChanged(nameof(NoEventsVisible));
        }

        private void ResetFilters()
        {
            SearchQuery = string.Empty;
            SelectedCategory = null;
            SelectedDay = null;
            DateFilter = null;
            ManualDateFilter = string.Empty;
            LocationFilter = string.Empty;

            IsCreatedSelected = true;
            OnPropertyChanged(nameof(IsArchivedSelected));

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
            if (DateTime.TryParse(value, out var parsed))
            {
                DateFilter = parsed.ToString("yyyy-MM-dd");
            }
            else
            {
                DateFilter = null;
            }

            LoadEventsCommand.Execute(null);
        }
    }
}
