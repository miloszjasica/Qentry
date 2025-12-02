using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.ViewModels
{
    public class ProfilePageViewModel
    {
        public ProfileViewModel ProfileVM { get; set; }
        public LogoutViewModel LogoutVM { get; set; }

        public ProfilePageViewModel(ProfileViewModel profileVM, LogoutViewModel logoutVM) 
        { 
            ProfileVM = profileVM;
            LogoutVM = logoutVM;
        }
    }
}
