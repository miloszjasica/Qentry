using CommunityToolkit.Mvvm.ComponentModel;
using CommunityToolkit.Mvvm.Input;
using Microsoft.Extensions.Logging;
using Qentry.Models;
using Qentry.Services;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.ViewModels
{
    public partial class ManageRolesViewModel : ObservableObject, IQueryAttributable
    {
        private readonly TokensService _tokensService;

        [ObservableProperty]
        private int eventId;

        [ObservableProperty]
        private string email;

        [ObservableProperty]
        private string selectedRole;

        public ObservableCollection<EventRoleModel> Users { get; } = new();

        public List<string> AvailableRoles { get; } =
            new() { "guest", "staff", "token_taker", "token_seller" };

        public IAsyncRelayCommand AssignRoleCommand { get; }
        public IAsyncRelayCommand<EventRoleModel> EditRoleCommand { get; }

        public ManageRolesViewModel(TokensService tokensService)
        {
            _tokensService = tokensService;

            AssignRoleCommand = new AsyncRelayCommand(AssignRoleAsync);
            EditRoleCommand = new AsyncRelayCommand<EventRoleModel>(EditRoleAsync);
        }

        public async void ApplyQueryAttributes(IDictionary<string, object> query)
        {
            if (query.TryGetValue("EventId", out var val))
            {
                if (int.TryParse(val?.ToString(), out int parsed))
                    EventId = parsed;
            }

            await LoadRolesAsync();
        }

        private async Task LoadRolesAsync()
        {
            Users.Clear();

            var users = await _tokensService.GetEventRolesAsync(EventId);

            foreach (var u in users.Where(u => u.Role != "guest"))
                Users.Add(u);
        }

        private async Task AssignRoleAsync()
        {
            if (string.IsNullOrWhiteSpace(Email) || SelectedRole == null)
            {
                await Shell.Current.DisplayAlert("Błąd", "Podaj email i rolę!", "OK");
                return;
            }

            var ok = await _tokensService.AssignRoleAsync(EventId, Email, SelectedRole);

            if (!ok)
            {
                await Shell.Current.DisplayAlert("Błąd", "Nie udało się nadać roli", "OK");
                return;
            }

            await LoadRolesAsync();
            await Shell.Current.DisplayAlert("OK", "Rola została przypisana", "OK");
        }

        private async Task EditRoleAsync(EventRoleModel model)
        {
            string selected = await Shell.Current.DisplayActionSheet(
                $"Edytuj rolę użytkownika:\n{model.Email}",
                "Anuluj",
                null,
                "guest",
                "staff",
                "token_taker",
                "token_seller"
            );

            if (selected == null || selected == "Anuluj")
                return;

            bool ok = await _tokensService.AssignRoleAsync(EventId, model.Email, selected);

            if (!ok)
            {
                await Shell.Current.DisplayAlert("Błąd", "Nie udało się zmienić roli.", "OK");
                return;
            }

            await LoadRolesAsync();
            await Shell.Current.DisplayAlert("Sukces", "Rola została zaktualizowana.", "OK");
        }
    }
}
