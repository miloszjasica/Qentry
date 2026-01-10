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
<<<<<<< HEAD
=======
        public ICommand GoToTransactionsCommand { get; }
>>>>>>> patrykjas

        public ProfilePageViewModel(ProfileViewModel profileVM, LogoutViewModel logoutVM) 
        { 
            ProfileVM = profileVM;
            LogoutVM = logoutVM;

            EditProfileCommand = new Command(async () => await GoToEditProfile());
<<<<<<< HEAD
=======
            GoToTransactionsCommand = new Command(async () => await GoToTransactions());
>>>>>>> patrykjas
        }

        private async Task GoToEditProfile()
        {
            await Shell.Current.GoToAsync(nameof(EditProfilePage), new Dictionary<string, object>
            {
                { "User", ProfileVM.User }
            });
<<<<<<< HEAD
=======
        }

        private async Task GoToTransactions()
        {
            await Shell.Current.GoToAsync(nameof(TransactionsPage));
>>>>>>> patrykjas
        }
    }
}
