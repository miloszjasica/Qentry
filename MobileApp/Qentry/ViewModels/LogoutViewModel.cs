using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Qentry.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.ViewModels
{
    public partial class LogoutViewModel : ObservableObject
    {
        private readonly AuthService _authService;

        public LogoutViewModel(AuthService authService)
        {
            _authService = authService;
        }

        [ObservableProperty]
        private bool isBusy;

        [RelayCommand]
        private async Task LogoutAsync()
        {
            if (IsBusy)
                return;

            IsBusy = true;

            var success = await _authService.LogoutAsync();
            if (success)
            {
                await Shell.Current.GoToAsync("//LoginPage");
            }
            else
                await Shell.Current.DisplayAlert("Błąd", "Nie udało się wylogować", "OK");

            IsBusy = false;
        }
    }
}
