using Microsoft.Extensions.Logging;
using Qentry.Services;
using Qentry.ViewModels;
using Qentry.Views;
using System.Globalization;
using ZXing.Net.Maui.Controls;

namespace Qentry
{
    public static class MauiProgram
    {
        public static IServiceProvider Services { get; private set; }
        public static MauiApp CreateMauiApp()
        {
            var builder = MauiApp.CreateBuilder();
            builder
                .UseMauiApp<App>()
                .UseBarcodeReader()
                .ConfigureFonts(fonts =>
                {
                    fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
                    fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
                });
            builder.Services.AddTransient<AppShell>();

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
            builder.Services.AddTransient<MyEventDetailsViewModel>();
            builder.Services.AddTransient<AddAttractionViewModel>();
            builder.Services.AddTransient<EditAttractionViewModel>();
            builder.Services.AddTransient<EditEventViewModel>();
            builder.Services.AddTransient<ManageRolesViewModel>();
            builder.Services.AddTransient<StaffEventDetailsViewModel>();
            builder.Services.AddTransient<RegisterViewModel>();
            builder.Services.AddTransient<EditProfileViewModel>();

            builder.Services.AddSingleton<LoginPage>();
            builder.Services.AddSingleton<RegisterPage>();
            builder.Services.AddSingleton<ProfilePage>();
            builder.Services.AddTransient<MyEventsPage>();
            builder.Services.AddTransient<SavedEventsPage>();
            builder.Services.AddTransient<EventDetailsPage>();
            builder.Services.AddTransient<SavedEventDetailsPage>();
            builder.Services.AddTransient<MyEventDetailsPage>();
            builder.Services.AddTransient<AddAttractionPage>();
            builder.Services.AddTransient<EditAttractionPage>();
            builder.Services.AddTransient<EditEventPage>();
            builder.Services.AddTransient<ManageRolesPage>();
            builder.Services.AddTransient<StaffEventDetailsPage>();
            builder.Services.AddTransient<EditProfilePage>();


            CultureInfo.DefaultThreadCurrentCulture = new CultureInfo("pl-PL");
            CultureInfo.DefaultThreadCurrentUICulture = new CultureInfo("pl-PL");

#if DEBUG
            builder.Logging.AddDebug();
#endif
            var app = builder.Build();
            Services = app.Services;
            return app;
        }

    }
}
