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
using Microsoft.Maui.Media;

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

        private ImageSource _imagePreview;
        public ImageSource ImagePreview
        {
            get => _imagePreview;
            set { _imagePreview = value; PropertyChanged?.Invoke(this, new(nameof(ImagePreview))); }
        }

        public bool IsImageSelected { get; set; }

        // Kategorie
        public List<string> Categories { get; } =
        [
            "music","art","food","sport","business","theatre",
            "tech","wellness","gaming","film","fashion","books","other"
        ];

        public string Category { get; set; }

        public ICommand CreateEventCommand { get; }
        public ICommand GetLocationCommand { get; }
        public ICommand PickImageCommand { get; }

        public ICommand RemoveImageCommand { get; }

        public CreateEventViewModel()
        {
            _eventService = new EventService(new HttpClient());

            CreateEventCommand = new Command(async () => await CreateEvent());
            GetLocationCommand = new Command(async () => await GetLocationAsync());
            PickImageCommand = new Command(async () => await PickImageAsync());
            RemoveImageCommand = new Command(RemoveImage);
        }

        private async Task PickImageAsync()
        {
            try
            {
                var result = await MediaPicker.PickPhotoAsync();

                if (result == null)
                    return;

                using var stream = await result.OpenReadAsync();

                // Podgląd
                ImagePreview = ImageSource.FromStream(() => stream);

                // Konwersja do base64 
                using var memoryStream = new MemoryStream();
                await result.OpenReadAsync().Result.CopyToAsync(memoryStream);

                Image = Convert.ToBase64String(memoryStream.ToArray());
                IsImageSelected = true;

                PropertyChanged?.Invoke(this, new(nameof(IsImageSelected)));
            }
            catch (Exception ex)
            {
                await Shell.Current.DisplayAlert("Błąd", $"Nie udało się wczytać zdjęcia: {ex.Message}", "OK");
            }
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

                PropertyChanged?.Invoke(this, new(nameof(Latitude)));
                PropertyChanged?.Invoke(this, new(nameof(Longitude)));

                var placemarks = await Geocoding.GetPlacemarksAsync(location.Latitude, location.Longitude);
                var placemark = placemarks?.FirstOrDefault();

                if (placemark != null)
                {
                    Location = $"{placemark.Locality}, {placemark.CountryName}";
                    PropertyChanged?.Invoke(this, new(nameof(Location)));
                }
            }
            catch (Exception ex)
            {
                await Shell.Current.DisplayAlert("Błąd", ex.Message, "OK");
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
                    Image = Image, // base64
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

        private void RemoveImage()
        {
            Image = null;
            ImagePreview = null;
            IsImageSelected = false;

            PropertyChanged?.Invoke(this, new(nameof(Image)));
            PropertyChanged?.Invoke(this, new(nameof(ImagePreview)));
            PropertyChanged?.Invoke(this, new(nameof(IsImageSelected)));
        }

        public void ResetFields()
        {
            Name = string.Empty;
            Description = string.Empty;
            Location = string.Empty;
            Latitude = string.Empty;
            Longitude = string.Empty;
            Participants = string.Empty;
            Image = null;
            Category = null;

            ImagePreview = null;
            IsImageSelected = false;

            StartDate = DateTime.Now;
            EndDate = DateTime.Now;

            PropertyChanged?.Invoke(this, new(nameof(Name)));
            PropertyChanged?.Invoke(this, new(nameof(Description)));
            PropertyChanged?.Invoke(this, new(nameof(Location)));
            PropertyChanged?.Invoke(this, new(nameof(Latitude)));
            PropertyChanged?.Invoke(this, new(nameof(Longitude)));
            PropertyChanged?.Invoke(this, new(nameof(Participants)));
            PropertyChanged?.Invoke(this, new(nameof(Image)));
            PropertyChanged?.Invoke(this, new(nameof(Category)));
            PropertyChanged?.Invoke(this, new(nameof(ImagePreview)));
            PropertyChanged?.Invoke(this, new(nameof(IsImageSelected)));
            PropertyChanged?.Invoke(this, new(nameof(StartDate)));
            PropertyChanged?.Invoke(this, new(nameof(EndDate)));
        }
    }
}
