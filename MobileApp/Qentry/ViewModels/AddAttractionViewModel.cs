using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Models;
using Qentry.Services;


namespace Qentry.ViewModels
{
    public partial class AddAttractionViewModel : ObservableObject, IQueryAttributable
    {
        private readonly EventService _eventService;
        private int _eventId;

        [ObservableProperty]
        private string name;

        [ObservableProperty]
        private string description;

        [ObservableProperty]
        private bool isActive = true;

        [ObservableProperty]
        private string price;

        public IAsyncRelayCommand AddCommand { get; }

        public AddAttractionViewModel(EventService eventService)
        {
            _eventService = eventService;
            AddCommand = new AsyncRelayCommand(AddAttractionAsync);
        }

        public void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            _eventId = Convert.ToInt32(query["eventId"]);
        }

        private async Task AddAttractionAsync()
        {
            if (!int.TryParse(Price, out var priceInt))
            {
                await Shell.Current.DisplayAlert("Błąd", "Cena musi być liczbą", "OK");
                return;
            }

            var model = new AttractionCreateModel
            {
                Name = Name,
                Description = Description,
                IsActive = IsActive,
                Price = priceInt
            };

            var success = await _eventService.AddAttractionAsync(_eventId, model);

            if (!success)
            {
                await Shell.Current.DisplayAlert("Błąd", "Nie udało się dodać atrakcji.", "OK");
                return;
            }

            await Shell.Current.DisplayAlert("OK", "Atrakcji dodano.", "OK");
            await Shell.Current.GoToAsync("..");
        }
    }
}
