using Qentry.Services;
using Qentry.Views;

namespace Qentry
{
    public partial class AppShell : Shell
    {
        private readonly AuthService _authService;
        public AppShell(AuthService authService)
        {
            InitializeComponent();

            Routing.RegisterRoute(nameof(MyEventDetailsPage), typeof(MyEventDetailsPage));
            Routing.RegisterRoute(nameof(SavedEventDetailsPage), typeof(SavedEventDetailsPage));
            Routing.RegisterRoute(nameof(AddAttractionPage), typeof(AddAttractionPage));
            Routing.RegisterRoute(nameof(EditAttractionPage), typeof(EditAttractionPage));
            Routing.RegisterRoute(nameof(EditEventPage), typeof(EditEventPage));
            Routing.RegisterRoute(nameof(ManageRolesPage), typeof(ManageRolesPage));
            Routing.RegisterRoute(nameof(RegisterPage), typeof(RegisterPage));
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
            Routing.RegisterRoute(nameof(EditProfilePage), typeof(EditProfilePage));
            Routing.RegisterRoute(nameof(TransactionsPage), typeof(TransactionsPage));


            _authService = authService;
            Loaded += AppShellLoaded;

        }

        private async void AppShellLoaded(object? sender, EventArgs e)
        {
            await CheckLoginStateAsync();
        }

        private async Task CheckLoginStateAsync()
        {
            bool remember = Preferences.Get("RememberMe", false);
            var access = await TokenStorage.GetAccessTokenAsync();
            var refresh = await TokenStorage.GetRefreshTokenAsync();

            if (!remember)
            {
                TokenStorage.ClearTokensIfNotRemembered();
                await GoToAsync("//LoginPage");
                return;
            }

            if (!string.IsNullOrEmpty(access))
            {
                bool valid = await _authService.ValidateAccessToken();
                if (valid)
                {
                    await GoToAsync("//MainPage");
                    return;
                }
            }

            if (!string.IsNullOrEmpty(refresh))
            {
                bool refreshed = await _authService.RefreshTokenAsync();
                if (refreshed)
                {
                    await GoToAsync("//MainPage");
                    return;
                }
            }

            await GoToAsync("//LoginPage");
        }
    }
}
