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

        public EventViewModel EventVM { get; }

        // ───────────── DATA WYŚWIETLANA ─────────────
        [ObservableProperty]
        [NotifyPropertyChangedFor(nameof(CurrentMonthName))]
        private DateTime displayedDate;

        public string CurrentMonthName =>
            CultureInfo
                .GetCultureInfo("pl-PL")
                .TextInfo
                .ToTitleCase(DisplayedDate.ToString("MMMM yyyy"));

        // ───────────── FILTRY ─────────────
        [ObservableProperty] private bool isFilterPanelVisible;
        [ObservableProperty] private string searchQuery;
        [ObservableProperty] private string locationFilter;
        [ObservableProperty] private string manualDateFilter;
        [ObservableProperty] private DateTime selectedDate;
        [ObservableProperty] private string selectedCategoryPolish;

        private string DateFilter { get; set; }

        // ───────────── KATEGORIE ─────────────
        public ObservableCollection<string> CategoriesPolish { get; } = new()
        {
            "Muzyka","Sztuka","Jedzenie","Sport","Biznes","Teatr","Technologia",
            "Wellness","Gry","Film","Moda","Książki","Inne"
        };

        public Dictionary<string, string> CategoryMap { get; } = new()
        {
            { "Muzyka", "music" },
            { "Sztuka", "art" },
            { "Jedzenie", "food" },
            { "Sport", "sport" },
            { "Biznes", "business" },
            { "Teatr", "theatre" },
            { "Technologia", "tech" },
            { "Wellness", "wellness" },
            { "Gry", "gaming" },
            { "Film", "film" },
            { "Moda", "fashion" },
            { "Książki", "books" },
            { "Inne", "other" }
        };

        private string SelectedCategoryEnglish =>
            selectedCategoryPolish != null &&
            CategoryMap.TryGetValue(selectedCategoryPolish, out var en)
                ? en
                : null;

        // ───────────── COMMANDY ─────────────
        public ICommand PrevMonthCommand { get; }
        public ICommand NextMonthCommand { get; }
        public ICommand ToggleFilterPanelCommand { get; }
        public ICommand ResetFiltersCommand { get; }
        public ICommand SearchCommand { get; }

        // ───────────── CTOR ─────────────
        public CalendarViewModel(Action refreshAction)
        {
            _refreshAction = refreshAction;

            var httpClient = new HttpClient();
            EventVM = new EventViewModel(
                new EventService(httpClient),
                new TokensService(httpClient));

            var now = DateTime.Now;

            DisplayedDate = new DateTime(now.Year, now.Month, 1);
            SelectedDate = now;
            DateFilter = now.ToString("yyyy-MM-dd");

            PrevMonthCommand = new RelayCommand(() =>
            {
                DisplayedDate = DisplayedDate.AddMonths(-1);
                _refreshAction();
            });

            NextMonthCommand = new RelayCommand(() =>
            {
                DisplayedDate = DisplayedDate.AddMonths(1);
                _refreshAction();
            });

            ToggleFilterPanelCommand = new RelayCommand(() =>
                IsFilterPanelVisible = !IsFilterPanelVisible);

            SearchCommand = new AsyncRelayCommand(ReloadEvents);

            ResetFiltersCommand = new AsyncRelayCommand(async () =>
            {
                SearchQuery = null;
                LocationFilter = null;
                ManualDateFilter = null;
                SelectedCategoryPolish = null;

                SelectedDate = DateTime.Today; 
                DateFilter = null;

                await ReloadEvents();
            });

            ReloadEvents().ConfigureAwait(false);
        }

        // ───────────── INTERAKCJE ─────────────

        public async void SelectDate(DateTime date)
        {
            SelectedDate = date;
            DateFilter = date.ToString("yyyy-MM-dd");
            await ReloadEvents();
        }

        [RelayCommand]
        private async Task SelectCategory(string category)
        {
            SelectedCategoryPolish = category;
            await ReloadEvents();
        }

        partial void OnSearchQueryChanged(string value)
        {
            ReloadEvents().ConfigureAwait(false);
        }

        partial void OnLocationFilterChanged(string value)
        {
            ReloadEvents().ConfigureAwait(false);
        }

        partial void OnManualDateFilterChanged(string value)
        {
            if (DateTime.TryParse(value, out var parsed))
                DateFilter = parsed.ToString("yyyy-MM-dd");
            else
                DateFilter = null;

            ReloadEvents().ConfigureAwait(false);
        }

        // ───────────── API ─────────────

        private EventFilterModel BuildFilter()
        {
            return new EventFilterModel
            {
                Name = string.IsNullOrWhiteSpace(SearchQuery) ? null : SearchQuery,
                Date = DateFilter,
                Category = SelectedCategoryEnglish,
                Location = string.IsNullOrWhiteSpace(LocationFilter) ? null : LocationFilter
            };
        }

        private async Task ReloadEvents()
        {
            var filter = BuildFilter();
            var results = await EventVM.EventService.GetEventsAsync(filter);

            EventVM.Events.Clear();
            foreach (var ev in results)
                EventVM.Events.Add(ev);
        }
    }
}
