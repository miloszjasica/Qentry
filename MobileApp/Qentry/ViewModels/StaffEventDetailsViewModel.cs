using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Models;
using Qentry.Services;
using Qentry.Views;

namespace Qentry.ViewModels
{
    public partial class StaffEventDetailsViewModel : ObservableObject
    {
        private readonly TokensService _tokensService;

        [ObservableProperty]
        private EventModel eventModel;

        [ObservableProperty] private bool canAddTokens;
        [ObservableProperty] private bool canTakeTokens;

        [ObservableProperty] private string scannedQr;
        [ObservableProperty] private string addTokensAmount;
        [ObservableProperty] private string attractionId;

        public IAsyncRelayCommand ScanQrCommand { get; }
        public IAsyncRelayCommand AddTokensCommand { get; }
        public IAsyncRelayCommand TakeTokensCommand { get; }

        public EventModel Event
        {
            get => eventModel;
            set
            {
                SetProperty(ref eventModel, value);
                UpdateRolePermissions();
            }
        }

        public StaffEventDetailsViewModel(TokensService tokensService)
        {
            _tokensService = tokensService;

            ScanQrCommand = new AsyncRelayCommand(ScanQrAsync);
            AddTokensCommand = new AsyncRelayCommand(AddTokensAsync);
            TakeTokensCommand = new AsyncRelayCommand(TakeTokensAsync);
        }


        private void UpdateRolePermissions()
        {
            switch (Event.UserRole)
            {
                case "staff":
                    CanAddTokens = true;
                    CanTakeTokens = true;
                    break;

                case "token_seller":
                    CanAddTokens = true;
                    CanTakeTokens = false;
                    break;

                case "token_taker":
                    CanAddTokens = false;
                    CanTakeTokens = true;
                    break;

                default:
                    CanAddTokens = false;
                    CanTakeTokens = false;
                    break;
            }
        }

        private async Task ScanQrAsync()
        {
            var page = new QrScannerPage();
            await Shell.Current.Navigation.PushAsync(page);

            string result = await page.QrResultSource.Task;

            if (!string.IsNullOrWhiteSpace(result))
                ScannedQr = result;
        }


        private async Task AddTokensAsync()
        {
            if (string.IsNullOrWhiteSpace(ScannedQr))
            {
                await Shell.Current.DisplayAlert("Błąd", "Najpierw zeskanuj QR.", "OK");
                return;
            }

            if (string.IsNullOrWhiteSpace(AddTokensAmount) || !int.TryParse(AddTokensAmount, out int amount) || amount <= 0)
            {
                await Shell.Current.DisplayAlert("Błąd", "Wprowadź poprawną liczbę tokenów.", "OK");
                return;
            }

            try
            {
                var response = await _tokensService.AddTokensAsync(ScannedQr, Event.Id_Event, amount);

                await Shell.Current.DisplayAlert("Sukces",
                    $"Dodano tokeny.\nNowe saldo: {response.NewBalance ?? response.NewBalance}",
                    "OK");
            }
            catch
            {
                await Shell.Current.DisplayAlert("Błąd", "Nie udało się dodać tokenów.", "OK");
            }
        }


        private async Task TakeTokensAsync()
        {
            if (string.IsNullOrWhiteSpace(ScannedQr))
            {
                await Shell.Current.DisplayAlert("Błąd", "Najpierw zeskanuj QR.", "OK");
                return;
            }

            if (!int.TryParse(AttractionId, out int attractionIdValue))
            {
                await Shell.Current.DisplayAlert("Błąd", "Niepoprawne ID atrakcji.", "OK");
                return;
            }

            try
            {
                var response = await _tokensService.PayForAttractionAsync(ScannedQr, attractionIdValue);

                await Shell.Current.DisplayAlert("Sukces",
                    $"Transakcja wykonana!\nNowe saldo: {response.NewBalance ?? response.NewBalance}",
                    "OK");
            }
            catch
            {
                await Shell.Current.DisplayAlert("Błąd", "Nie udało się pobrać tokenów.", "OK");
            }
        }
    }
}
