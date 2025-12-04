using Qentry.Models;
using Qentry.ViewModels;

namespace Qentry.Views
{
    [QueryProperty(nameof(Event), "Event")]
    public partial class StaffEventDetailsPage : ContentPage
    {
        private StaffEventDetailsViewModel _vm;

        public EventModel Event
        {
            set
            {
                _vm.Event = value;
            }
        }

        public StaffEventDetailsPage(StaffEventDetailsViewModel vm)
        {
            InitializeComponent();
            BindingContext = _vm = vm;
        }
    }
}
