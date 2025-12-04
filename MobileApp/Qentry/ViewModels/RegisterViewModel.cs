using Qentry.Models;
using Qentry.Services;
using Qentry.Views;
using System.ComponentModel;
using System.Runtime.CompilerServices;
using System.Windows.Input;

namespace Qentry.ViewModels
{
    public class RegisterViewModel : INotifyPropertyChanged
    {
        private readonly AuthService _authService;

        public string Email { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Password { get; set; }
        public bool WantsToBeOrganizer { get; set; }

        private string _message;
        public string Message
        {
            get => _message;
            set
            {
                _message = value;
                OnPropertyChanged();
            }
        }

        public ICommand RegisterCommand { get; }
        public ICommand GoToLoginCommand { get; }

        public event PropertyChangedEventHandler PropertyChanged;

        protected void OnPropertyChanged([CallerMemberName] string name = null)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
        }

        public RegisterViewModel(AuthService authService)
        {
            _authService = authService;

            RegisterCommand = new Command(async () => await RegisterAsync());

            GoToLoginCommand = new Command(async () => await Shell.Current.GoToAsync("///LoginPage"));
        }

        private async Task RegisterAsync()
        {
            Message = "";

            var model = new RegisterModel
            {
                Email = Email,
                Name = Name,
                Surname = Surname,
                Password = Password,
                WantsToBeOrganizer = WantsToBeOrganizer
            };

            var validation = model.Validate();
            if (validation != null)
            {
                Message = validation;
                return;
            }

            var success = await _authService.RegisterAsync(model);

            if (success)
            {
                Message = "Konto zostało utworzone!";

                await Shell.Current.GoToAsync("//LoginPage");
            }
            else
            {
                Message = "Rejestracja się nie powiodła.";
            }
        }
    }
}
