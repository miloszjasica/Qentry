using Qentry.Models;
using Qentry.Services;
using Qentry.ViewModels;

namespace Qentry.Views
{
    public partial class SavedEventsPage : ContentPage
    {

        public SavedEventsPage(SavedEventsViewModel vm)
        {
            InitializeComponent();
            BindingContext = vm;

            double height = (DeviceDisplay.MainDisplayInfo.Height / (DeviceDisplay.MainDisplayInfo.Density*1.5));
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

        private void OnEventSelected(object sender, SelectionChangedEventArgs e) 
        { 
            var selectedEvent = e.CurrentSelection.FirstOrDefault() as EventModel;
            if (selectedEvent == null) return;

            var vm = BindingContext as SavedEventsViewModel;
            vm?.OpenEventDetailsCommand?.Execute(selectedEvent);

            ((CollectionView)sender).SelectedItem = null;
        }
    }
}
