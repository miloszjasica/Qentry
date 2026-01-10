using Qentry.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Views
{
    public partial class TransactionsPage : ContentPage
    {
        private readonly TransactionsPageViewModel _vm;

        public TransactionsPage(TransactionsPageViewModel vm)
        {
            InitializeComponent();
            BindingContext = _vm = vm;
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();

            Console.WriteLine(">>> TransactionsPage OnAppearing <<<");

            await _vm.LoadAsync();
        }
    }
}
