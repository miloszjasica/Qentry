using ZXing.Net.Maui;
using ZXing.Net.Maui.Controls;

namespace Qentry.Views;

public partial class QrScannerPage : ContentPage
{
    public TaskCompletionSource<string> QrResultSource { get; } = new();

    public QrScannerPage()
    {
        InitializeComponent();
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

}
