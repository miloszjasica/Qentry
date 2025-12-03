using Qentry.ViewModels;

namespace Qentry.Views
{
    public partial class CreateEventPage : ContentPage
    {
        public CreateEventPage()
        {
            InitializeComponent();
            BindingContext = new CreateEventViewModel();
        }
    }
}
