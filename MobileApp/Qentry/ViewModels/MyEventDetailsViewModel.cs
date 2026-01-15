using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Models;
using Qentry.Services;
using Qentry.Views;
using System.Collections.ObjectModel;

namespace Qentry.ViewModels
{
    public partial class MyEventDetailsViewModel : ObservableObject, IQueryAttributable
    {
        private readonly EventService _eventService;

        [ObservableProperty]
        private EventModel eventModel;

        [ObservableProperty]
        private bool isOrganizer;

        public ObservableCollection<AttractionModel> Attractions { get; } = new();

        public IAsyncRelayCommand EditEventCommand { get; }
        public IAsyncRelayCommand AddAttractionCommand { get; }
        public IAsyncRelayCommand<AttractionModel> EditAttractionCommand { get; }
        public IAsyncRelayCommand ManageRolesCommand { get; }

        public MyEventDetailsViewModel(EventService eventService)
        {
            _eventService = eventService;

            EditEventCommand = new AsyncRelayCommand(EditEventAsync);
            AddAttractionCommand = new AsyncRelayCommand(AddAttractionAsync);
            EditAttractionCommand = new AsyncRelayCommand<AttractionModel>(EditAttractionAsync);
            ManageRolesCommand = new AsyncRelayCommand(ManageRolesAsync);
        }

        public async void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            EventModel = query["Event"] as EventModel;

            IsOrganizer = true;

            await LoadAttractions();
        }

        private async Task LoadAttractions()
        {
            var attractions = await _eventService.GetEventAttractionsAsync(EventModel.Id_Event);

            Attractions.Clear();
            foreach (var a in attractions)
                Attractions.Add(a);
        }

        private async Task EditEventAsync()
        {
            await Shell.Current.GoToAsync($"{nameof(EditEventPage)}?eventId={EventModel.Id_Event}");
        }

        private async Task AddAttractionAsync()
        {
            await Shell.Current.GoToAsync($"{nameof(AddAttractionPage)}?eventId={EventModel.Id_Event}");
        }

        private async Task EditAttractionAsync(AttractionModel attraction)
        {
            await Shell.Current.GoToAsync($"{nameof(EditAttractionPage)}?attractionId={attraction.IdAttraction}");
        }

        private async Task ManageRolesAsync()
        {
            await Shell.Current.GoToAsync($"{nameof(ManageRolesPage)}?EventId={eventModel.Id_Event}");
        }
    }
}
