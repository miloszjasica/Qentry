using Microsoft.Extensions.Logging;
using Qentry.Services;
using Qentry.ViewModels;
using Qentry.Views;
using System.Globalization;

namespace Qentry
{
    public static class MauiProgram
    {
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });
            builder.Services.AddSingleton<AppShell>();

            builder.Services.AddSingleton<HttpClient>();
            builder.Services.AddSingleton<EventService>();
            builder.Services.AddSingleton<TokensService>();
            builder.Services.AddHttpClient<AuthService>();

            builder.Services.AddSingleton<LoginViewModel>();
            builder.Services.AddSingleton<LogoutViewModel>();
            builder.Services.AddSingleton<ProfileViewModel>();
            builder.Services.AddTransient<ProfilePageViewModel>();
            builder.Services.AddTransient<SavedEventsViewModel>();
            builder.Services.AddTransient<MyEventsViewModel>();
            builder.Services.AddSingleton<EventDetailsViewModel>();
            builder.Services.AddTransient<SavedEventDetailsViewModel>();

            builder.Services.AddSingleton<LoginPage>();
            builder.Services.AddSingleton<ProfilePage>();
            builder.Services.AddTransient<MyEventsPage>();
            builder.Services.AddTransient<SavedEventsPage>();
            builder.Services.AddTransient<EventDetailsPage>();
            builder.Services.AddTransient<SavedEventDetailsPage>();


            CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("pl-PL");
            CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("pl-PL");

#if DEBUG
            builder.Logging.AddDebug();
#endif

            return builder.Build();
        }
    }
}
