using Qentry.Services;
using Qentry.ViewModels;


namespace Qentry.Views
{
    public partial class ProfilePage : ContentPage
    {
        public ProfilePage(ProfilePageViewModel viewModel)
        {
            InitializeComponent();
            BindingContext = viewModel;
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();

            var vm = BindingContext as ProfilePageViewModel;

            if (vm != null)
                await vm.ProfileVM.LoadUserData();

            var accessToken = await TokenStorage.GetAccessTokenAsync();
            if (string.IsNullOrEmpty(accessToken))
            {
                await Shell.Current.DisplayAlert("Błąd", "Musisz się zalogować, aby uzyskać dostęp.", "OK");
                await Shell.Current.GoToAsync("//LoginPage");
            }
        }
    }
}
