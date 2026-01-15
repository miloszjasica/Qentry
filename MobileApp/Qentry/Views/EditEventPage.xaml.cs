using Qentry.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Views
{
    public partial class EditEventPage : ContentPage
    {
        public EditEventPage(EditEventViewModel vm)
        {
            InitializeComponent();
            BindingContext = vm;
        }
    }
}
