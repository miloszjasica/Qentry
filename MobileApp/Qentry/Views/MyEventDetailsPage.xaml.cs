using Qentry.ViewModels;

namespace Qentry.Views
{
    public partial class MyEventDetailsPage : ContentPage
    {
        public MyEventDetailsPage(MyEventDetailsViewModel vm) 
        {
            InitializeComponent();
            BindingContext = vm;
        }
    }
}
