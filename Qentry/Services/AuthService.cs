using Qentry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Qentry.Services
{
    public class AuthService
    {
        private readonly HttpClient _httpClient;

        private readonly string BaseUrl = "http://192.168.201.1:8000/api/users";


        public AuthService()
        {
            _httpClient = new HttpClient();
        }

        public async Task<TokenResponse?> LoginAsync(string email, string password)
        {
            try
            {
                var loginData = new { email, password };
                var json = JsonSerializer.Serialize(loginData);
                Console.WriteLine($"Wysyłane dane: email={email}, password={password}");
                Console.WriteLine(json);

                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{BaseUrl}/login/", content);
                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }

                var responseContent = await response.Content.ReadAsStringAsync();

                var tokenResponse = JsonSerializer.Deserialize<TokenResponse>(responseContent);

                if (tokenResponse != null &&
                    !string.IsNullOrWhiteSpace(tokenResponse.Access) &&
                    !string.IsNullOrWhiteSpace(tokenResponse.Refresh))
                {
                    await SecureStorage.SetAsync("access_token", tokenResponse.Access);
                    await SecureStorage.SetAsync("refresh_token", tokenResponse.Refresh);
                }
                else
                {
                    Console.WriteLine("Token response pusty lub nieprawidłowy.");
                }
                return tokenResponse;
            }
            catch (Exception ex)
            {
                // Tu możesz np. zapisać log lub pokazać alert
                Console.WriteLine($"Błąd podczas logowania: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> RegisterAsync(RegisterRequest request)
        {
            var json = JsonSerializer.Serialize(request);
            var content = new StringContent (json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{BaseUrl}/register/", content);
            return response.IsSuccessStatusCode;
        }

        public async Task<bool> LogoutAsync(string refreshToken)
        {
            var json = JsonSerializer.Serialize(new {refresh = refreshToken});
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{BaseUrl}/logout/", content);
            return response.IsSuccessStatusCode;
        }
    }
}
