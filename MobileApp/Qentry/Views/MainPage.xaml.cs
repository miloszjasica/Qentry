using Qentry.Models;
using Qentry.Services;
using Qentry.ViewModels;

namespace Qentry.Views;

public partial class MainPage : ContentPage
{
    private readonly CalendarViewModel _calendarvm;

    public MainPage()
    {
        InitializeComponent();

        _calendarvm = new CalendarViewModel(BuildCalendar);
        BindingContext = _calendarvm;

        BuildCalendar();
    }

    private void BuildCalendar()
    {
        CalendarGrid.Children.Clear();

        DateTime today = DateTime.Today;

        // ✅ JEDYNE ŹRÓDŁO PRAWDY
        DateTime displayedDate = _calendarvm.DisplayedDate;

        int year = displayedDate.Year;
        int month = displayedDate.Month;

        DateTime firstDay = new(year, month, 1);
        int daysInMonth = DateTime.DaysInMonth(year, month);

        // Poniedziałek = 0
        int startOffset = ((int)firstDay.DayOfWeek + 6) % 7;

        int row = 0;

        for (int i = 0; i < startOffset + daysInMonth; i++)
        {
            int col = i % 7;

            if (i > 0 && col == 0)
                row++;

            if (i < startOffset)
                continue;

            DateTime date = firstDay.AddDays(i - startOffset);

            bool isToday = date == today;
            bool isSelected = _calendarvm.SelectedDate.Date == date.Date;
            bool isWeekend = col >= 5;

            var btn = new Button
            {
                Text = date.Day.ToString(),
                BackgroundColor = isSelected
                    ? Color.FromArgb("#9C7EF2")
                    : isToday
                        ? Color.FromArgb("#38B49D")
                        : isWeekend
                            ? Color.FromArgb("#3A3A3A")
                            : Color.FromArgb("#2C2C2C"),
                TextColor = Colors.White,
                CornerRadius = 12,
                FontAttributes = isToday ? FontAttributes.Bold : FontAttributes.None,
                WidthRequest = 45,
                HeightRequest = 45,
                Padding = 0,
                FontSize = 16
            };

            btn.Clicked += (s, e) =>
            {
                _calendarvm.SelectDate(date);
                BuildCalendar();
            };

            CalendarGrid.Add(btn, col, row);
        }
    }

    private async void OnEventSelected(object sender, SelectionChangedEventArgs e)
    {
        if (e.CurrentSelection.Count == 0)
            return;

        var selectedEvent = (EventModel)e.CurrentSelection[0];
        ((CollectionView)sender).SelectedItem = null;

        await Navigation.PushAsync(new EventDetailsPage(
            selectedEvent,
            new EventService(new HttpClient())
        ));
    }

    protected override async void OnAppearing()
    {
        base.OnAppearing();

        var accessToken = await TokenStorage.GetAccessTokenAsync();
        if (string.IsNullOrEmpty(accessToken))
        {
            await Shell.Current.DisplayAlert(
                "Błąd",
                "Musisz się zalogować, aby uzyskać dostęp.",
                "OK"
            );

            await Shell.Current.GoToAsync("//LoginPage");
        }
    }
}
