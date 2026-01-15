using Qentry.ViewModels;

namespace Qentry.Views
{
    public partial class ManageRolesPage : ContentPage
    {
        public ManageRolesPage(ManageRolesViewModel vm) 
        { 
            InitializeComponent();
            BindingContext = vm;
        }
    }
}
