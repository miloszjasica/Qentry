using Qentry.ViewModels;
using Qentry.Models;
using Qentry.Services;

namespace Qentry.Views;

[QueryProperty(nameof(User), "User")]
public partial class EditProfilePage : ContentPage
{
    private readonly AuthService _authService;

    public UserModel User
    {
        set
        {
            BindingContext = new EditProfileViewModel(_authService, value);
        }
    }

    public EditProfilePage(AuthService authService)
    {
        InitializeComponent();
        _authService = authService;
    }
}
