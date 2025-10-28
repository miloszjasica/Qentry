using Qentry.Views;

namespace Qentry
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();

            MainPage = new AppShell();

        }


    }
}