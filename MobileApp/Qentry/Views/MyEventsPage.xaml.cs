using Qentry.Services;
using Qentry.ViewModels;

namespace Qentry.Views
{
    public partial class MyEventsPage : ContentPage
    {

        public MyEventsPage(MyEventsViewModel vm)
        {
            InitializeComponent();
            BindingContext = vm;

            double height = (DeviceDisplay.MainDisplayInfo.Height / DeviceDisplay.MainDisplayInfo.Density);
            BindingContext.GetType().GetProperty("ScreenHeight")?.SetValue(BindingContext, height);
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();

            var accessToken = await TokenStorage.GetAccessTokenAsync();
            if (string.IsNullOrEmpty(accessToken))
            {
                await Shell.Current.DisplayAlert("Błąd", "Musisz się zalogować, aby uzyskać dostęp.", "OK");
                await Shell.Current.GoToAsync("//LoginPage");
                return;
            }
        }
    }

}
