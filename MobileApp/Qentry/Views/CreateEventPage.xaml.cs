using Qentry.ViewModels;

namespace Qentry.Views
{
    public partial class CreateEventPage : ContentPage
    {
        private CreateEventViewModel ViewModel => BindingContext as CreateEventViewModel;
        public CreateEventPage()
        {
            InitializeComponent();
            BindingContext = new CreateEventViewModel();
        }

        protected override void OnDisappearing()
        {
            base.OnDisappearing();
            ViewModel?.ResetFields();
        }
    }
}
