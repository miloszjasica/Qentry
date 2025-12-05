using Qentry.Converters;
using Qentry.Services;
using Qentry.Views;

namespace Qentry
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
        }

        protected override Window CreateWindow(IActivationState? activationState)
        {
            var shell = MauiProgram.Services.GetRequiredService<AppShell>();
            return new Window(shell);
        }
    }
}