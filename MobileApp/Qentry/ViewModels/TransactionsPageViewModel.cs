using Qentry.Models;
using Qentry.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.ComponentModel;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.ViewModels
{
    public class TransactionsPageViewModel : INotifyPropertyChanged
    {
        private readonly TokensService _tokensService;

        public ObservableCollection<TransactionDto> Transactions { get; } = new();

        private bool _isBusy;
        public bool IsBusy
        {
            get => _isBusy;
            set
            {
                if (_isBusy == value) return;
                _isBusy = value;
                OnPropertyChanged();
            }
        }

        public TransactionsPageViewModel(TokensService tokensService)
        {
            _tokensService = tokensService;
        }

        public async Task LoadAsync()
        {
            if (IsBusy) return;
            IsBusy = true;

            try
            {
                Transactions.Clear();

                var items = await _tokensService.GetMyTransactionsAsync();

                foreach (var item in items.OrderByDescending(x => x.DateValue))
                    Transactions.Add(item);
            }
            finally
            {
                IsBusy = false;
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        protected void OnPropertyChanged([CallerMemberName] string name = null)
            => PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(name));
    }
}
