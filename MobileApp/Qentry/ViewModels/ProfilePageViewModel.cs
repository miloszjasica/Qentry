using Qentry.Views;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Input;

namespace Qentry.ViewModels
{
    public class ProfilePageViewModel
    {
        public ProfileViewModel ProfileVM { get; set; }
        public LogoutViewModel LogoutVM { get; set; }

        public ICommand EditProfileCommand { get; }

        public ProfilePageViewModel(ProfileViewModel profileVM, LogoutViewModel logoutVM) 
        { 
            ProfileVM = profileVM;
            LogoutVM = logoutVM;

            EditProfileCommand = new Command(async () => await GoToEditProfile());
        }

        private async Task GoToEditProfile()
        {
            await Shell.Current.GoToAsync(nameof(EditProfilePage), new Dictionary<string, object>
            {
                { "User", ProfileVM.User }
            });
        }
    }
}
