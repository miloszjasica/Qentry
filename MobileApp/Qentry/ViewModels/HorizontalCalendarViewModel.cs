using CommunityToolkit.Mvvm.ComponentModel;
using Qentry.Models;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.ViewModels
{
    public partial class HorizontalCalendarViewModel : ObservableObject
    {
        [ObservableProperty]
        private ObservableCollection<CalendarDayModel> days;

        [ObservableProperty]
        private CalendarDayModel selectedDay;

        public HorizontalCalendarViewModel()
        {
            GenerateDays();
            SelectedDay = Days.FirstOrDefault(d => d.IsToday);
        }

        private void GenerateDays()
        {
            var list = new ObservableCollection<CalendarDayModel>();

            for (int i = -60; i <= 60; i++) 
            {
                var date = DateTime.Today.AddDays(i);
                list.Add(new CalendarDayModel { Date = date, IsToday = date == DateTime.Today });
            }
            Days = list;
        }

        public void SelectDay(CalendarDayModel model)
        {
            SelectedDay = model;
        }
    }
}
