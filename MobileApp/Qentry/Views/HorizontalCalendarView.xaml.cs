using Qentry.Models;
using Qentry.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Views
{
    public partial class HorizontalCalendarView : ContentView
    {
        public HorizontalCalendarViewModel ViewModel { get; set; }

        private bool _isInitializing = false;

        public static readonly BindableProperty SelectedDayProperty =
            BindableProperty.Create(
                nameof(SelectedDay),
                typeof(CalendarDayModel),
                typeof(HorizontalCalendarView),
                default(CalendarDayModel),
                BindingMode.TwoWay,
                propertyChanged: OnSelectedDayChanged);

        private static void OnSelectedDayChanged(BindableObject bindable, object oldValue, object newValue)
        {
            var control = (HorizontalCalendarView)bindable;

            if (newValue is CalendarDayModel day)
            {
                control.ViewModel.SelectDay(day);
                control.CalendarView.SelectedItem = day;
            }
        }

        public CalendarDayModel SelectedDay
        {
            get => (CalendarDayModel)GetValue(SelectedDayProperty);
            set => SetValue(SelectedDayProperty, value);
        }

        public HorizontalCalendarView()
        {
            InitializeComponent();

            ViewModel = new HorizontalCalendarViewModel();
            CalendarView.BindingContext = ViewModel;

            CalendarView.SelectionChanged += CalendarView_SelectionChanged;
        }

        private void CalendarView_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            if (_isInitializing) return;

            if (e.CurrentSelection.FirstOrDefault() is CalendarDayModel day)
            {
                SelectedDay = day; 
                ViewModel.SelectDay(day);
                CalendarView.ScrollTo(day, -1, ScrollToPosition.Center, true);
            }
        }

        private async void CalendarView_Loaded(object sender, EventArgs e)
        {
            await InitializeTodayAsync();
        }

        public async Task InitializeTodayAsync()
        {
            _isInitializing = true;

            await WaitForRenderingAsync();

            await ScrollToTodayAsync();

            _isInitializing = false;
        }

        private async Task WaitForRenderingAsync()
        {
            int tries = 0;
            while ((CalendarView.Height <= 0 || CalendarView.Width <= 0) && tries < 40)
            {
                await Task.Delay(30);
                tries++;
            }

            await Task.Delay(50);
        }

        public async Task ScrollToTodayAsync()
        {
            var today = ViewModel.Days.FirstOrDefault(d => d.IsToday);
            if (today == null) return;

            SelectedDay = today;
            CalendarView.SelectedItem = today;

            ViewModel.SelectDay(today);

            CalendarView.ScrollTo(today, -1, ScrollToPosition.Center, false);

            await Task.CompletedTask;
        }
    }
}
