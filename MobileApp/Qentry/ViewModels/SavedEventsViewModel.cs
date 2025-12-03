using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Models;
using Qentry.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Qentry.ViewModels
{
    public partial class SavedEventsViewModel : ObservableObject
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
        private EventModel selectedEvent;

        [ObservableProperty]
        private string locationFilter;

        [ObservableProperty]
        private string manualDateFilter;

        private string NameFilter => SearchQuery;

        private string DateFilter { get; set; }

        private bool? IsActiveFilter => IsCreatedSelected ? true : false;

        public bool NoEventsVisible => Events.Count == 0;

        public IAsyncRelayCommand LoadSavedEventsCommand { get; }

        public IRelayCommand<EventModel> OpenEventDetailsCommand { get; }

        public IRelayCommand SearchCommand { get; }
        public IRelayCommand ResetFiltersCommand { get; }

        public IRelayCommand<EventModel> RemoveEventCommand {  get; }

        [ObservableProperty]
        private bool isCreatedSelected = true;

        public bool IsArchivedSelected => !IsCreatedSelected;

        private double _screenHeight;
        public double ScreenHeight
        {
            get => _screenHeight;
            set => SetProperty(ref _screenHeight, value);
        }

        public SavedEventsViewModel(EventService eventService, TokensService tokensService)
        {
            _eventService = eventService;
            _tokensService = tokensService;

            LoadSavedEventsCommand = new AsyncRelayCommand(LoadSavedEventsAsync);

            SearchCommand = new RelayCommand(async () => { await LoadSavedEventsAsync(); });
            ResetFiltersCommand = new RelayCommand(ResetFilters);

            OpenEventDetailsCommand = new RelayCommand<EventModel>(async (ev) =>  
            {
                if (ev == null) return;

                await Shell.Current.GoToAsync($"///SavedEventDetailsPage?eventId={ev.Id_Event}");
            });

            RemoveEventCommand = new RelayCommand<EventModel>(async ev =>
            {
                if (ev == null) return;
                bool success = await _tokensService.LeaveEventAsync(ev.Id_Event);

                if (success)
                {
                    Events.Remove(ev);
                    OnPropertyChanged(nameof(NoEventsVisible));
                }
            });
        }

        [RelayCommand]
        private void ShowCreated()
        {
            IsCreatedSelected = true;
            OnPropertyChanged(nameof(IsArchivedSelected));
            OnPropertyChanged(nameof(NoEventsVisible));
            LoadSavedEventsCommand.Execute(null);
        }

        [RelayCommand]
        private void ShowArchived()
        {
            IsCreatedSelected = false;
            OnPropertyChanged(nameof(IsArchivedSelected));
            OnPropertyChanged(nameof(NoEventsVisible));
            LoadSavedEventsCommand.Execute(null);
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

                    LoadSavedEventsCommand.Execute(null);
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
            LoadSavedEventsCommand.Execute(null);
        }

        public async Task LoadSavedEventsAsync()
        {
            var myQrEvents = await _tokensService.GetMyJoinedEventsAsync();
            var myEventIds = myQrEvents.Select(q => q.EventId).ToHashSet();

            var filter = new EventFilterModel
            {
                Date = DateFilter,
                Name = NameFilter,
                Category = SelectedCategory,
                IsActive = IsActiveFilter,
                Location = string.IsNullOrWhiteSpace(LocationFilter) ? SearchQuery : LocationFilter
            };

            var events = await _eventService.GetEventsAsync(filter);

            var joinedEvents = events.Where(ev => myEventIds.Contains(ev.Id_Event)).ToList();

            Events.Clear();

            foreach (var ev in joinedEvents)
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

            LoadSavedEventsCommand.Execute(null);
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

            LoadSavedEventsCommand.Execute(null);
        }
    }
}
