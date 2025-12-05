using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Helpers;
using Qentry.Models;
using Qentry.Services;


namespace Qentry.ViewModels
{
    public partial class EditAttractionViewModel : ObservableObject, IQueryAttributable
    {
        private readonly EventService _eventService;
        private int _attractionId;

        [ObservableProperty] private string name;
        [ObservableProperty] private string description;
        [ObservableProperty] private bool isActive;
        [ObservableProperty] private string price;

        public IAsyncRelayCommand SaveCommand { get; }

        public EditAttractionViewModel(EventService eventService)
        {
            _eventService = eventService;
            SaveCommand = new AsyncRelayCommand(SaveAsync);
        }

        public async void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            _attractionId = Convert.ToInt32(query["attractionId"]);

            var attraction = await _eventService.GetAttractionByIdAsync(_attractionId);

            Name = attraction.Name;
            Description = attraction.Description;
            IsActive = attraction.IsActive;
            Price = attraction.Price.ToString();
        }

        private async Task SaveAsync()
        {
            if (!int.TryParse(Price, out var priceInt))
            {
                await Shell.Current.DisplayAlert("Błąd", "Cena musi być liczbą.", "OK");
                return;
            }

            var model = new AttractionCreateModel
            {
                Name = Name,
                Description = Description,
                IsActive = IsActive,
                Price = priceInt
            };

            var success = await _eventService.UpdateAttractionAsync(_attractionId, model);

            if (!success)
            {
                await Shell.Current.DisplayAlert("Błąd", "Nie udało się zaktualizować atrakcji.", "OK");
                return;
            }

            await Shell.Current.DisplayAlert("OK", "Atrakcji zaktualizowano.", "OK");

            EventBus.RaiseEventsUpdated();
            await Shell.Current.GoToAsync("..");
        }
    }
}
