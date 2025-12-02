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
            Routing.RegisterRoute(nameof(LoginPage), typeof(LoginPage));
            Routing.RegisterRoute(nameof(ProfilePage), typeof(ProfilePage));
            Routing.RegisterRoute(nameof(MyEventsPage), typeof(MyEventsPage));
            _authService = authService;

            Loaded += AppShellLoaded;
        }

        private async void AppShellLoaded(object? sender, EventArgs e)
        {
            await CheckLoginStateAsync();
        }

        private async Task CheckLoginStateAsync()
        {
            TokenStorage.ClearTokensIfNotRemembered();

            bool remember = Preferences.Get("RememberMe", false);
            var access = await TokenStorage.GetAccessTokenAsync();
            var refresh = await TokenStorage.GetRefreshTokenAsync();

            if (!remember)
            {
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
