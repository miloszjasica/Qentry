using Qentry.Services;
using Qentry.Views;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Qentry.ViewModels
{
    public partial class LoginViewModel : INotifyPropertyChanged
    {
        private string _email;
        private string _password;
        private string _message;
        private bool _isBusy;
        private bool _rememberMe;

        private readonly AuthService _authService;

        public ICommand LoginCommand { get; }
        public ICommand GoToRegisterCommand { get; }

        public event PropertyChangedEventHandler? PropertyChanged;

        public LoginViewModel(AuthService authService)
        {
            _authService = authService;

            LoginCommand = new Command(async () => await LoginAsync(), () => !IsBusy);

            GoToRegisterCommand = new Command(async () => await Shell.Current.GoToAsync(nameof(RegisterPage)));
        }

        public string Email
        {
            get => _email; 
            set { _email = value; OnPropertyChanged(); }
        }

        public string Password
        {
            get => _password;
            set { _password = value; OnPropertyChanged(); }
        }

        public string Message
        {
            get => _message;
            set { _message = value; OnPropertyChanged(); }
        }

        public bool RememberMe
        {
            get => _rememberMe;
            set { _rememberMe = value; OnPropertyChanged(); }
        }

        public bool IsBusy
        {
            get => _isBusy;
            set {
                _isBusy = value;
                OnPropertyChanged();
                ((Command)LoginCommand).ChangeCanExecute();
            }
        }

        protected void OnPropertyChanged([CallerMemberName] string name = null) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));

        private async Task LoginAsync()
        {
            if (IsBusy)
                return;

            Message = string.Empty;

            if (string.IsNullOrWhiteSpace(Email) || string.IsNullOrWhiteSpace(Password))
            {
                Message = "Podaj email lub hasło.";
                IsBusy = false;
                return;
            }

            IsBusy = true;

            var tokenResponse = await _authService.LoginAsync(Email, Password);


            if (tokenResponse != null)
            {
                await TokenStorage.SaveTokensAsync(tokenResponse.Access, tokenResponse.Refresh);

                Preferences.Set("RememberMe", RememberMe);

                await Shell.Current.GoToAsync("//MainPage");
            }
            else
            {
                Message = "Nieprawidłowy email lub hasło.";
            }
            IsBusy = false;
        }
    }
}
