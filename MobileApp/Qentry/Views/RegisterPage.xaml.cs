using Qentry.Services;
using Qentry.ViewModels;

namespace Qentry.Views
{
    public partial class RegisterPage : ContentPage
    {
        public RegisterPage()
        {
            InitializeComponent();
            BindingContext = new RegisterViewModel(new AuthService(new HttpClient()));
        }
    }
}
