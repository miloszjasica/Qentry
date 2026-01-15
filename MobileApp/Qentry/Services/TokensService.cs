using Qentry.Models;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

namespace Qentry.Services
{
    public class TokensService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl = "http://57.128.249.150/api/tokens";

        public TokensService(HttpClient httpClient) 
        { 
            _httpClient = httpClient;
        }

        private async Task AddAuthAsync()
        {
            var token = await TokenStorage.GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }

        public async Task<JoinEventResponse> JoinEventAsync(int eventId)
        {
            await AddAuthAsync();

            var response = await _httpClient.PostAsync($"{_baseUrl}/events/{eventId}/join/", null);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się dołączyć do eventu");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<JoinEventResponse>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<List<QrEventsModel>> GetMyJoinedEventsAsync()
        {
            await AddAuthAsync();

            var response = await _httpClient.GetAsync($"{_baseUrl}/events/my/");

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać zapisanych wydarzeń");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<List<QrEventsModel>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true});
        }

        public async Task<ImageSource> GetQrImageAsync(int qrId)
        {
            await AddAuthAsync();

            var response = await _httpClient.GetAsync($"{_baseUrl}/qr/{qrId}/image/");

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać kody QR");

            var stream = await response.Content.ReadAsStreamAsync();
            return ImageSource.FromStream(() => stream);
        }

        public async Task<decimal> GetEventBalanceAsync(int eventId)
        {
            await AddAuthAsync();

            var response = await _httpClient.GetAsync($"{_baseUrl}/events/{eventId}/balance/");

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać balansu");

            var json = await response.Content.ReadAsStringAsync();

            var result = JsonSerializer.Deserialize<EventBalanceModel>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            if (decimal.TryParse(result.Balance,
                NumberStyles.Any,
                CultureInfo.InvariantCulture,
                out var balance))
            {
                return balance;
            }
            return 0m;
        }

        public async Task<QrEventsModel> GetMyQrForEvent(int eventId)
        {
            await AddAuthAsync();

            var response = await _httpClient.GetAsync($"{_baseUrl}/events/my/");

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać zapisanych wydarzeń");

            var json = await response.Content.ReadAsStringAsync();

            var list = JsonSerializer.Deserialize<List<QrEventsModel>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return list.FirstOrDefault(e => e.EventId == eventId);
        }

        public async Task<bool> LeaveEventAsync(int eventId)
        {
            await AddAuthAsync();

            var response = await _httpClient.DeleteAsync($"{_baseUrl}/events/{eventId}/leave/");

            return response.IsSuccessStatusCode;
        }

        public async Task<bool> AssignRoleAsync(int eventId, string email, string role)
        {
            await AddAuthAsync();

            var payload = new
            {
                email = email,
                role = role
            };

            var json = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_baseUrl}/events/{eventId}/assign-role/", json);

            return response.IsSuccessStatusCode;
        }

        public async Task<List<EventRoleModel>> GetEventRolesAsync(int eventId)
        {
            await AddAuthAsync();

            var response = await _httpClient.GetAsync($"{_baseUrl}/events/{eventId}/roles/");

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać ról uczestników");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<List<EventRoleModel>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<List<QrEventsModel>> GetAllUserEventRolesAsync()
        {
            await AddAuthAsync();

            var response = await _httpClient.GetAsync($"{_baseUrl}/events/my/");

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać zapisanych wydarzeń");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<List<QrEventsModel>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<AddTokensResponse> AddTokensAsync(string qrString, int eventId, int amount)
        {
            await AddAuthAsync();

            var url = $"{_baseUrl}/users/{qrString}/{eventId}/add/?amount={amount}";

            var response = await _httpClient.PostAsync(url, null);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się dodać tokenów.");

            var resp = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<AddTokensResponse>(resp, new JsonSerializerOptions{PropertyNameCaseInsensitive = true});
        }

        public async Task<PayAttractionResponse> PayForAttractionAsync(string qrString, int attractionId)
        {
            await AddAuthAsync();

            var response = await _httpClient.PostAsync($"{_baseUrl}/transactions/{qrString}/{attractionId}/", null);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się wykonać transakcji.");

            var resp = await response.Content.ReadAsStringAsync();
            return JsonSerializer.Deserialize<PayAttractionResponse>(resp, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }
<<<<<<< HEAD
=======

        public async Task<List<TransactionDto>> GetMyTransactionsAsync(int? eventId = null, int? attractionId = null)
        {
            await AddAuthAsync();

            var query = new List<string>();

            if (eventId.HasValue)
                query.Add($"id_event={eventId.Value}");

            if (attractionId.HasValue)
                query.Add($"id_attraction={attractionId.Value}");

            var url = $"{_baseUrl}/transactions/";
            if (query.Any())
                url += "?" + string.Join("&", query);

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać transakcji");

            var json = await response.Content.ReadAsStringAsync();

            var result = JsonSerializer.Deserialize<TransactionsResponse>(
                json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            return result?.Transactions ?? new List<TransactionDto>();
        }
>>>>>>> patrykjas
    }
}
