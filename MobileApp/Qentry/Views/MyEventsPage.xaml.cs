using Qentry.Helpers;
using Qentry.Models;
using Qentry.Services;
using Qentry.ViewModels;

namespace Qentry.Views
{
    public partial class MyEventsPage : ContentPage
    {
        private MyEventsViewModel _vm;

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

        private void OnEventsUpdated()
        {
            _vm.LoadEventsCommand.Execute(null);
        }

        private void OnEventSelected(object sender, SelectionChangedEventArgs e)
        {
            var selectedEvent = e.CurrentSelection.FirstOrDefault() as EventModel;
            if (selectedEvent == null) return;

<<<<<<< HEAD
=======
            if (selectedEvent.IsExpired)
            {
                ((CollectionView)sender).SelectedItem = null;
                return;
            }

>>>>>>> patrykjas
            var vm = BindingContext as MyEventsViewModel;
            vm?.OpenEventDetailsCommand?.Execute(selectedEvent);

            ((CollectionView)sender).SelectedItem = null;
        }

        protected override void OnDisappearing()
        {
            base.OnDisappearing();
            EventBus.EventsUpdated -= OnEventsUpdated;
        }

    }
}
