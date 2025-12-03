using Qentry.Models;
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;

namespace Qentry.Services
{
    public class AuthService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl = "http://192.168.201.1:8000/api/users";

        public AuthService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        public async Task<TokenResponse?> LoginAsync(string email, string password)
        {
            var loginData = new { email, password };
            var content = new StringContent(JsonSerializer.Serialize(loginData), Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync($"{_baseUrl}/login/", content);

                if (!response.IsSuccessStatusCode)
                {
                    return null;
                }

                var responseJson = await response.Content.ReadAsStringAsync();


                var tokens = JsonSerializer.Deserialize<TokenResponse>(
                    responseJson,
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true }
                );

                if (tokens == null || string.IsNullOrEmpty(tokens.Access) || string.IsNullOrEmpty(tokens.Refresh))
                {
                    return null;
                }
                await TokenStorage.SaveTokensAsync(tokens.Access, tokens.Refresh);

                return tokens;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"[AuthService] LoginAsync error: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> LogoutAsync()
        {
            try
            {
                var refreshToken = await TokenStorage.GetRefreshTokenAsync();
                var accessToken = await TokenStorage.GetAccessTokenAsync();

                if (!string.IsNullOrEmpty(accessToken))
                {
                    _httpClient.DefaultRequestHeaders.Authorization =
                        new AuthenticationHeaderValue("Bearer", accessToken);
                }

                if (!string.IsNullOrEmpty(refreshToken))
                {
                    var logoutData = new { refresh = refreshToken };
                    var content = new StringContent(
                        JsonSerializer.Serialize(logoutData),
                        Encoding.UTF8,
                        "application/json"
                    );

                    var response = await _httpClient.PostAsync($"{_baseUrl}/logout/", content);
                }

                TokenStorage.ClearTokens();
                Preferences.Set("RemeberMe", false);
                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }

        public async Task<UserModel> GetCurrentUser()
        {
            var accessToken = await TokenStorage.GetAccessTokenAsync();

            if (string.IsNullOrEmpty(accessToken))
                throw new Exception("Brak tokenu - użytkownik nie jest zalogowany");

            _httpClient.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", accessToken);

            var response = await _httpClient.GetAsync($"{_baseUrl}/me/");

            var content = await response.Content.ReadAsStringAsync();

            if (response.StatusCode == System.Net.HttpStatusCode.Unauthorized)
            {
                var refreshSuccess = await RefreshTokenAsync();
                if (!refreshSuccess)
                    return null;

                accessToken = await TokenStorage.GetAccessTokenAsync();

                _httpClient.DefaultRequestHeaders.Authorization =
                    new AuthenticationHeaderValue("Bearer", accessToken);

                response = await _httpClient.GetAsync($"{_baseUrl}/me/");
                content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    return null;
            }


            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać danych o użytkowniku");

            return JsonSerializer.Deserialize<UserModel>(content);
        }

        public async Task<bool> RefreshTokenAsync()
        {
            var refreshToken = await TokenStorage.GetRefreshTokenAsync();

            if (string.IsNullOrEmpty(refreshToken))
                return false;

            var refreshData = new { refresh = refreshToken };
            var content = new StringContent(JsonSerializer.Serialize(refreshData), Encoding.UTF8, "application/json");

            try
            {
                var response = await _httpClient.PostAsync($"{_baseUrl}/refresh/", content);

                if (!response.IsSuccessStatusCode)
                    return false;

                var json = await response.Content.ReadAsStringAsync();

                var newAccess = JsonSerializer.Deserialize<TokenResponse>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true})?.Access;

                if (string.IsNullOrEmpty(newAccess)) 
                    return false;

                await TokenStorage.SaveTokensAsync(newAccess, refreshToken);

                return true;
            }
            catch { return false; }
        }

        public async Task<bool> ValidateAccessToken()
        {
            var token = await TokenStorage.GetAccessTokenAsync();
            if (string.IsNullOrEmpty(token)) return false;

            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);

            var response = await _httpClient.GetAsync($"{_baseUrl}/me/");

            if (response.StatusCode == HttpStatusCode.Unauthorized)
                return false;

            return response.IsSuccessStatusCode;
        }
    }
}
