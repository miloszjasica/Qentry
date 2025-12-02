using Qentry.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Views.Controls;

public partial class CustomBottomNavBar : ContentView
{
    private readonly AuthService _authService;
    public CustomBottomNavBar()
    {
        InitializeComponent();
        _authService = new AuthService(new HttpClient());  
    }

    private async void OnHomeClicked(object sender, EventArgs e)
        => await Shell.Current.GoToAsync("//MainPage");

    private async void OnMyEventsClicked(object sender, EventArgs e)
        => await Shell.Current.GoToAsync("//MyEventsPage");

    private async void OnSavedEventsClicked(object sender, EventArgs e)
        => await Shell.Current.GoToAsync("//SavedEventsPage");

    private async void OnProfileClicked(object sender, EventArgs e)
        => await Shell.Current.GoToAsync("//ProfilePage");

    private async void OnAddClicked(object sender, EventArgs e)
    {
        try
        {
            var user = await _authService.GetCurrentUser();

            if (user.WantsToBeOrganizer)
            {
                await Shell.Current.GoToAsync("//CreateEventPage");
            }
            else
            {
                await Shell.Current.DisplayAlert("Brak uprawnień",
                "Aby tworzyć wydarzenia, musisz mieć rangę organizatora.",
                "OK");
            }
        }
        catch 
        {
            await Shell.Current.DisplayAlert("Błąd", "Nie udało się pobrać danych użytkownika.", "OK");
        }
    }
}

