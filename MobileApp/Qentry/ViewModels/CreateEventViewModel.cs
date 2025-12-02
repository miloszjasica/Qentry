using Qentry.Models;
using Qentry.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Qentry.ViewModels
{
    public class CreateEventViewModel : INotifyPropertyChanged
    {
        private readonly EventService _eventService;

        public event PropertyChangedEventHandler PropertyChanged;

        public string Name { get; set; }
        public string Description { get; set; }
        public string Location { get; set; }
        public string Latitude { get; set; }
        public string Longitude { get; set; }
        public DateTime StartDate { get; set; } = DateTime.Now;
        public DateTime EndDate { get; set; } = DateTime.Now;
        public string Participants { get; set; }
        public string Image { get; set; }
        public string Category { get; set; }

        public ICommand CreateEventCommand {  get; }
        public ICommand GetLocationCommand {  get; }

        public CreateEventViewModel()
        {
            _eventService = new EventService(new HttpClient());

            CreateEventCommand = new Command(async () => await CreateEvent());
            GetLocationCommand = new Command(async () => await GetLocationAsync());
        }

        private async Task GetLocationAsync()
        {
            try
            {
                var request = new GeolocationRequest(GeolocationAccuracy.High, TimeSpan.FromSeconds(10));
                var location = await Geolocation.GetLocationAsync(request);

                if (location == null)
                {
                    await Shell.Current.DisplayAlert("Błąd", "Nie udało się pobrać położenia", "OK");
                    return;
                }

                Latitude = location.Latitude.ToString(CultureInfo.InvariantCulture);
                Longitude = location.Longitude.ToString(CultureInfo.InvariantCulture);

                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Latitude)));
                PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(nameof(Longitude)));
            }
            catch (FeatureNotEnabledException)
            {
                await Shell.Current.DisplayAlert("GPS wyłączony", "Proszę włączyć GPS w ustawieniach telefonu.", "OK");
            }
            catch (PermissionException)
            {
                await Shell.Current.DisplayAlert("Uprawnienia", "Aplikacja wymaga zgody na dostęp do lokalizacji.", "OK");
            }
            catch (Exception ex) 
            {
                await Shell.Current.DisplayAlert("Błąd", $"Nieoczekiwany błąd lokalizacji:\n{ex.Message}", "OK");
            }
        }

        private async Task CreateEvent()
        {
            try
            {
                var newEvent = new EventCreateModel
                { 
                    Name = Name,
                    Description = Description,
                    Location = Location,
                    Latitude = double.TryParse(Latitude, out var latitudeValue) ? latitudeValue : null,
                    Longitude = double.TryParse(Longitude, out var longitudeValue) ? longitudeValue : null,
                    StartDate = StartDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                    EndDate = EndDate.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture),
                    Participants = int.Parse(Participants),
                    Image = Image,
                    Category = Category,
                    IsActive = true
                };

                var success = await _eventService.CreateEventAsync(newEvent);

                if (success)
                {
                    await Shell.Current.DisplayAlert("Sukces", "Wydarzenie utworzono!", "OK");
                    await Shell.Current.GoToAsync("//MainPage");
                }
                else
                    await Shell.Current.DisplayAlert("Błąd", "Nie udało się utworzyć wydarzenia.", "OK");
            }
            catch (Exception ex) 
            {
                await Shell.Current.DisplayAlert("Błąd", ex.Message, "OK");
            }
        }
    }
}
