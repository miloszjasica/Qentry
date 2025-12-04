using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Helpers;
using Qentry.Models;
using Qentry.Services;
using System.Xml.Linq;

public partial class EditEventViewModel : ObservableObject, IQueryAttributable
{
    private readonly EventService _eventService;
    private EventModel _originalEvent;

    [ObservableProperty] private string name;
    [ObservableProperty] private string description;
    [ObservableProperty] private string location;
    [ObservableProperty] private string startDate;

    public IAsyncRelayCommand SaveCommand { get; }

    public EditEventViewModel(EventService eventService)
    {
        _eventService = eventService;
        SaveCommand = new AsyncRelayCommand(SaveAsync);
    }

    public async void ApplyQueryAttributes(IDictionary<string, object> query)
    {
        var id = Convert.ToInt32(query["eventId"]);
        _originalEvent = await _eventService.GetEventByIdAsync(id);

        Name = _originalEvent.Name;
        Description = _originalEvent.Description;
        Location = _originalEvent.Location;
        StartDate = _originalEvent.StartDate.ToString("yyyy-MM-dd");
    }

    private async Task SaveAsync()
    {
        var model = new EventUpdateModel
        {
            Name = Name,
            Description = Description,
            Location = Location,
            StartDate = StartDate,

            EndDate = _originalEvent.EndDate.ToString("yyyy-MM-dd"),
            Category = _originalEvent.Category,
            Image = _originalEvent.Image,
            IsActive = _originalEvent.IsActive,
            Latitude = _originalEvent.Latitude,
            Longitude = _originalEvent.Longitude,
            Participants = _originalEvent.Participants
        };

        var success = await _eventService.UpdateEventAsync(_originalEvent.Id_Event, model);

        if (!success)
        {
            await Shell.Current.DisplayAlert("Błąd", "Nie udało się zaktualizować wydarzenia.", "OK");
            return;
        }

        await Shell.Current.DisplayAlert("OK", "Wydarzenie zaktualizowane!", "OK");

        EventBus.RaiseEventsUpdated();
        await Shell.Current.GoToAsync("..");
    }
}
