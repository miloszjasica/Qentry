using System.ComponentModel;
using System.Windows.Input;
using Qentry.Models;
using Qentry.Services;

namespace Qentry.ViewModels 
{
    public class EditProfileViewModel : INotifyPropertyChanged
    {
        private readonly AuthService _authService;

        public UserModel User { get; set; }

        public ICommand SaveCommand { get; }

        public EditProfileViewModel(AuthService authService, UserModel user)
        {
            _authService = authService;

            User = new UserModel
            {
                Name = user.Name,
                Surname = user.Surname,
                Email = user.Email,
                WantsToBeOrganizer = user.WantsToBeOrganizer,
                UserImage = user.UserImage
            };

            SaveCommand = new Command(async () => await SaveChanges());
        }

        private async Task SaveChanges()
        {
            var success = await _authService.UpdateUserAsync(User);

            if (success)
            {
                await Shell.Current.DisplayAlert("Sukces", "Profil zaktualizowano.", "OK");
                await Shell.Current.GoToAsync("..");
            }
            else
            {
                await Shell.Current.DisplayAlert("Błąd", "Nie udało się zapisać zmian.", "OK");
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
    }
}
