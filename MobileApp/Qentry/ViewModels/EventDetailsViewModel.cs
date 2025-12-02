using Qentry.Models;
using Qentry.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.ViewModels
{
    class EventDetailsViewModel : INotifyPropertyChanged
    {
        private readonly EventService _eventService;

        public EventModel Event { get; set; }

        public ObservableCollection<AttractionModel> Attractions { get; set; } = new ObservableCollection<AttractionModel>();

        public EventDetailsViewModel(EventService eventService)
        {
            _eventService = eventService;
        }

        public async Task LoadAttractionsAsync()
        {
            if (Event == null) return;

            var attraction = await _eventService.GetEventAttractionsAsync(Event.Id_Event);

            Attractions.Clear();
            foreach (var a in attraction) 
                Attractions.Add(a);
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
