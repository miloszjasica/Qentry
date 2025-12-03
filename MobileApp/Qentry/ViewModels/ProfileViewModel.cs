using Qentry.Models;
using Qentry.Services;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.ViewModels
{
    public class ProfileViewModel : INotifyPropertyChanged
    {
        private readonly AuthService _authService;

        private UserModel _userModel;

        public UserModel User
        { 
            get => _userModel;
            set {  
                _userModel = value; 
                OnPropertyChanged(nameof(User)); 
            }
        }

        public ProfileViewModel (AuthService authService)
        {
            _authService = authService;
        }

        public async Task LoadUserData()
        {
            User = await _authService.GetCurrentUser();
        }

        protected void OnPropertyChanged(string prop) => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(prop));

        public event PropertyChangedEventHandler? PropertyChanged;
    }
}
