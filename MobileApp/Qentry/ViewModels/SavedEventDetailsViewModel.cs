using CommunityToolkit.Mvvm.ComponentModel;
using Qentry.Models;
using Qentry.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.ViewModels
{
    public partial class SavedEventDetailsViewModel : ObservableObject, IQueryAttributable
    {
        private readonly EventService _eventService;
        private readonly TokensService _tokensService;

        [ObservableProperty]
        private EventModel eventData;

        [ObservableProperty]
        private ImageSource qrImage;

        [ObservableProperty]
        private decimal eventBalance;

        public ObservableCollection<AttractionModel> Attractions { get; set; } = new();


        public SavedEventDetailsViewModel(EventService eventService, TokensService tokensService)
        {
            _eventService = eventService;
            _tokensService = tokensService;
        }

        public async void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            System.Diagnostics.Debug.WriteLine("ApplyQueryAttributes CALLED");

            if (!query.TryGetValue("eventId", out var idObj))   // ← zmiana tutaj
            {
                System.Diagnostics.Debug.WriteLine("eventId NOT FOUND!!!");
                return;
            }

            int eventId = int.Parse(idObj.ToString());
            System.Diagnostics.Debug.WriteLine($"Loading eventId = {eventId}");

            await LoadEventAsync(eventId);
        }

        private async Task LoadEventAsync(int eventId)
        {
            EventData = await _eventService.GetEventByIdAsync(eventId);

            var attractions = await _eventService.GetEventAttractionsAsync(eventId);
            Attractions.Clear();
            foreach (var attraction in attractions)
                Attractions.Add(attraction);

            var qr = await _tokensService.GetMyQrForEvent(eventId);

            if (qr != null) 
            { 
                QrImage = await _tokensService.GetQrImageAsync(qr.IdQr);
            }

            EventBalance = await _tokensService.GetEventBalanceAsync(eventId);
        }
    }
}
