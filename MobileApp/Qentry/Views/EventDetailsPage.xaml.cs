using Qentry.Models;
using Qentry.Services;
using Qentry.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Views
{
    public partial class EventDetailsPage : ContentPage
    {
        private readonly EventDetailsViewModel _vm;

        public EventDetailsPage(EventModel eventModel, EventService eventService)
        {
            InitializeComponent();

            _vm = new EventDetailsViewModel(eventService)
            {
                Event = eventModel,
            };

            BindingContext = _vm;
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();
            await _vm.LoadAttractionsAsync();
        }
    }
}
