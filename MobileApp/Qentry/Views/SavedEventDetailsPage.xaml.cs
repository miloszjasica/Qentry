using Qentry.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Views
{
    public partial class SavedEventDetailsPage : ContentPage, IQueryAttributable
    {
        public SavedEventDetailsPage(SavedEventDetailsViewModel vm) 
        {
            InitializeComponent();
            BindingContext = vm;
        }

        public void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            (BindingContext as SavedEventDetailsViewModel)?.ApplyQueryAttributes(query);
        }
    }
}
