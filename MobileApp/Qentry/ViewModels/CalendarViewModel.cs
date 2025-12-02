using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Models;
using Qentry.Services;
using System;
using System.Collections.ObjectModel;
using System.Globalization;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Qentry.ViewModels
{
    public partial class CalendarViewModel : ObservableObject
    {
        private readonly Action _refreshAction;

        public EventViewModel EventVM { get; set; }

        [ObservableProperty] private int displayedMonth;
        [ObservableProperty] private int displayedYear;

        public string CurrentMonthName =>
            char.ToUpper(
                new DateTime(DisplayedYear, DisplayedMonth, 1)
                    .ToString("MMMM yyyy", new CultureInfo("pl-PL"))[0]
            ) + new DateTime(DisplayedYear, DisplayedMonth, 1)
                .ToString("MMMM yyyy", new CultureInfo("pl-PL"))
                .Substring(1);

        [ObservableProperty] private bool isFilterPanelVisible;

        [ObservableProperty] private string selectedCategory;
        [ObservableProperty] private string searchQuery;
        [ObservableProperty] private string locationFilter;
        [ObservableProperty] private string manualDateFilter;

        private string DateFilter { get; set; }

        public ObservableCollection<string> Categories { get; } = new()
        {
            "music", "art", "food", "sport", "business",
            "theatre", "tech", "wellness", "gaming",
            "film", "fashion", "books", "other"
        };

        [ObservableProperty]
        private DateTime selectedDate;

        partial void OnSelectedDateChanged(DateTime value)
        {
            DateFilter = value.ToString("yyyy-MM-dd");
            LoadEventsWithFilters();
        }

        public ICommand PrevMonthCommand { get; }
        public ICommand NextMonthCommand { get; }
        public ICommand ToggleFilterPanelCommand { get; }
        public ICommand ApplyFiltersCommand { get; }
        public ICommand ResetFiltersCommand { get; }
        public ICommand SearchCommand { get; }

        public CalendarViewModel(Action refreshAction)
        {
            _refreshAction = refreshAction;

            var httpClient = new HttpClient();

            EventVM = new EventViewModel(
                new EventService(httpClient),
                new TokensService(httpClient));

            var now = DateTime.Now;
            DisplayedMonth = now.Month;
            DisplayedYear = now.Year;
            SelectedDate = now;

            PrevMonthCommand = new RelayCommand(PrevMonth);
            NextMonthCommand = new RelayCommand(NextMonth);

            ToggleFilterPanelCommand = new RelayCommand(() =>
            {
                IsFilterPanelVisible = !IsFilterPanelVisible;
            });

            ApplyFiltersCommand = new AsyncRelayCommand(async () =>
            {
                await LoadEventsWithFilters();
                IsFilterPanelVisible = false;
            });

            ResetFiltersCommand = new RelayCommand(async () =>
            {
                SearchQuery = "";
                SelectedCategory = null;
                LocationFilter = "";
                ManualDateFilter = "";
                DateFilter = null;

                await LoadEventsWithFilters();
            });

            SearchCommand = new AsyncRelayCommand(async () =>
            {
                await LoadEventsWithFilters();
            });

            LoadEventsWithFilters();
        }

        partial void OnSelectedCategoryChanged(string value)
        {
            LoadEventsWithFilters();
        }

        partial void OnManualDateFilterChanged(string value)
        {
            if (DateTime.TryParse(value, out var parsed))
                DateFilter = parsed.ToString("yyyy-MM-dd");
            else
                DateFilter = null;

            LoadEventsWithFilters();
        }

        private void PrevMonth()
        {
            DisplayedMonth--;
            if (DisplayedMonth < 1)
            {
                DisplayedMonth = 12;
                DisplayedYear--;
            }
            _refreshAction();
        }

        private void NextMonth()
        {
            DisplayedMonth++;
            if (DisplayedMonth > 12)
            {
                DisplayedMonth = 1;
                DisplayedYear++;
            }
            _refreshAction();
        }

        public void SelectDate(DateTime date)
        {
            SelectedDate = date;
        }

        private async Task LoadEventsWithFilters()
        {
            var filter = new EventFilterModel
            {
                Date = DateFilter,
                Name = string.IsNullOrWhiteSpace(SearchQuery) ? null : SearchQuery,
                Category = string.IsNullOrWhiteSpace(SelectedCategory) ? null : SelectedCategory,
                Location = string.IsNullOrWhiteSpace(LocationFilter) ? SearchQuery : LocationFilter
            };

            var results = await EventVM.EventService.GetEventsAsync(filter);

            EventVM.Events.Clear();

            foreach (var ev in results)
                EventVM.Events.Add(ev);

            OnPropertyChanged(nameof(EventVM));
        }
    }
}
