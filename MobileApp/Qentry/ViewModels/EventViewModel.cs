using Qentry.Models;
using Qentry.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Qentry.ViewModels
{
    public class EventViewModel : INotifyPropertyChanged
    {
        private readonly EventService _eventService;
        private readonly TokensService _tokensService;

        public EventService EventService => _eventService;

        public ObservableCollection<EventModel> Events { get; set; } = new ObservableCollection<EventModel>();

        public ICommand JoinEventCommand { get; }

        public string Category { get; set; }
        public string Date { get; set; }
        public bool? IsActive { get; set; }
        public string Location { get; set; }
        public string Name { get; set; }

        public EventViewModel(EventService eventService, TokensService tokensService)
        {
            _eventService = eventService;
            _tokensService = tokensService;

            JoinEventCommand = new Command<EventModel>(async (eventModel) => 
            { 
                await JointEvent(eventModel); 
            });
        }

        private async Task JointEvent(EventModel ev)
        {
            if (ev == null) return;

            try
            {
                var result = await _tokensService.JoinEventAsync(ev.Id_Event);

                await Shell.Current.DisplayAlert("Suckes", $"Zapisano się na wydarzenie", "OK");
            }
            catch (Exception ex) 
            {
                await Shell.Current.DisplayAlert("Błąd", $"Nie udało się zapisać na wydarzenie: {ex.Message}", "OK");
            }
        }

        public async Task LoadEventsAsync()
        {
            var filter = new EventFilterModel { Category = Category, Date = Date, IsActive = IsActive, Location = Location, Name = Name };

            var events = await _eventService.GetEventsAsync(filter);

            Events.Clear();
            foreach(var ev  in events) 
                Events.Add(ev);
        }

        public event PropertyChangedEventHandler? PropertyChanged;
        protected void OnPropertyChanged (string propertyName)
        {
            PropertyChanged?.Invoke (this, new PropertyChangedEventArgs (propertyName));
        }
    }
}
