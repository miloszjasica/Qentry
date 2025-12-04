using Qentry.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Views
{
    public partial class EditAttractionPage : ContentPage
    {
        public EditAttractionPage(EditAttractionViewModel vm)
        {
            InitializeComponent();
            BindingContext = vm;
        }
    }
}
