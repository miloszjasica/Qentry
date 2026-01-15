using ZXing.Net.Maui;
using ZXing.Net.Maui.Controls;

namespace Qentry.Views;

public partial class QrScannerPage : ContentPage
{
<<<<<<< HEAD
    public TaskCompletionSource<string> QrResultSource { get; } = new();
=======
    public TaskCompletionSource<string> QrResultSource;
>>>>>>> patrykjas

    public QrScannerPage()
    {
        InitializeComponent();
<<<<<<< HEAD
=======
        QrResultSource = new TaskCompletionSource<string>();
>>>>>>> patrykjas
    }

    private void CameraView_BarcodesDetected(object sender, BarcodeDetectionEventArgs e)
    {
        // Bierzemy pierwszy wykryty kod
        var qr = e.Results?.FirstOrDefault()?.Value;

        if (!string.IsNullOrWhiteSpace(qr))
        {
            // Zabezpieczenie przed wielokrotnym wywołaniem
            if (!QrResultSource.Task.IsCompleted)
            {
                MainThread.BeginInvokeOnMainThread(async () =>
                {
                    QrResultSource.TrySetResult(qr);
                    await Shell.Current.Navigation.PopAsync();
                });
            }
        }
    }

<<<<<<< HEAD
=======
    protected override void OnAppearing()
    {
        base.OnAppearing();

        // Jeśli użytkownik wrócił drugi raz — reset TCS
        if (QrResultSource.Task.IsCompleted)
            QrResultSource = new TaskCompletionSource<string>();
    }
>>>>>>> patrykjas
}
