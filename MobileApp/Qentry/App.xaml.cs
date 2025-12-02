using Qentry.Converters;
using Qentry.Services;
using Qentry.Views;

namespace Qentry
{
    public partial class App : Application
    {
        private readonly AppShell _shell;
        public App(AppShell shell)
        {
            InitializeComponent();
            _shell = shell;
        }

        protected override Window CreateWindow(IActivationState? activationState)
        {
            return new Window(_shell);
        }
    }
}