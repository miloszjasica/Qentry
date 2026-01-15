using Microsoft.Extensions.Logging;
using Qentry.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Headers;
using System.Net.Http.Json;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace Qentry.Services
{
    public class EventService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl = "http://57.128.249.150/events";

        public EventService(HttpClient httpClient)
        {
            _httpClient = httpClient;
        }

        private async Task AddAuthAsync()
        {
            var token = await TokenStorage.GetAccessTokenAsync();
            _httpClient.DefaultRequestHeaders.Authorization =
                new AuthenticationHeaderValue("Bearer", token);
        }

        public async Task<List<EventModel>> GetEventsAsync(EventFilterModel filter = null)
        {
            await AddAuthAsync();

            var url = BuildUrl(filter);

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać eventów");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<List<EventModel>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        private string BuildUrl(EventFilterModel filter)
        {
            if (filter == null)
                return _baseUrl;

            var query = HttpUtility.ParseQueryString(string.Empty);

            if (!string.IsNullOrWhiteSpace(filter.Category))
                query["category"] = filter.Category;

            if (!string.IsNullOrWhiteSpace(filter.Date))
                query["date"] = filter.Date;

            if (filter.IsActive.HasValue)
                query["is_active"] = filter.IsActive.Value.ToString().ToLower();

            if (!string.IsNullOrWhiteSpace(filter.Location))
                query["location"] = filter.Location;

            if (!string.IsNullOrWhiteSpace(filter.Name))
                query["name"] = filter.Name;

            var queryString = query.ToString();

            return string.IsNullOrWhiteSpace(queryString) ? _baseUrl : $"{_baseUrl}?{queryString}";
        }

        public async Task<List<AttractionModel>> GetEventAttractionsAsync(int eventId)
        {
            await AddAuthAsync();

            var url = $"{_baseUrl}/{eventId}/attractions/";

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać atrakcji");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<List<AttractionModel>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true});
        }

        public async Task<bool> CreateEventAsync(EventCreateModel newEvent)
        {
            await AddAuthAsync();

            var json = JsonSerializer.Serialize(newEvent);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_baseUrl}/create/", content);

            return response.IsSuccessStatusCode;
        }

        public async Task<EventModel> GetEventByIdAsync(int eventId)
        {
            await AddAuthAsync();

            var response = await _httpClient.GetAsync($"{_baseUrl}/{eventId}/");

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać danych eventu");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<EventModel>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true});
        }

        public async Task<List<EventModel>> GetOrganizerEventsAsync(EventFilterModel filter = null)
        {
            await AddAuthAsync();

            var baseUrl = "http://57.128.249.150/events/organizer-events/";

            var url = BuildUrlForOrganizer(baseUrl, filter);

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać eventów organizatora");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<List<EventModel>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        private string BuildUrlForOrganizer(string baseUrl, EventFilterModel filter)
        {
            if (filter == null)
                return baseUrl;

            var query = HttpUtility.ParseQueryString(string.Empty);

            if (!string.IsNullOrWhiteSpace(filter.Category))
                query["category"] = filter.Category;

            if (!string.IsNullOrWhiteSpace(filter.Date))
                query["date"] = filter.Date;

            if (filter.IsActive.HasValue)
                query["is_active"] = filter.IsActive.Value.ToString().ToLower();

            if (!string.IsNullOrWhiteSpace(filter.Location))
                query["location"] = filter.Location;

            if (!string.IsNullOrWhiteSpace(filter.Name))
                query["name"] = filter.Name;

            var queryString = query.ToString();

            return string.IsNullOrWhiteSpace(queryString)
                ? baseUrl
                : $"{baseUrl}?{queryString}";
        }

        public async Task<bool> DeleteEventAsync(int eventId)
        {
            await AddAuthAsync();

            var response = await _httpClient.DeleteAsync($"{_baseUrl}/{eventId}/delete/");

            return response.IsSuccessStatusCode;
        }

        public async Task<bool> UpdateEventAsync(int eventId, EventUpdateModel updated)
        {
            await AddAuthAsync();

            var json = JsonSerializer.Serialize(updated);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PatchAsync($"{_baseUrl}/{eventId}/update/", content);

            return response.IsSuccessStatusCode;
        }

        public async Task<bool> AddAttractionAsync(int eventId, AttractionCreateModel attraction)
        {
            await AddAuthAsync();

            var json = JsonSerializer.Serialize(attraction);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = await _httpClient.PostAsync($"{_baseUrl}/{eventId}/attractions/add/", content);

            return response.IsSuccessStatusCode;
        }

        public async Task<bool> UpdateAttractionAsync(int attractionId, AttractionCreateModel updated)
        {
            await AddAuthAsync();

            var json = JsonSerializer.Serialize(updated);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

<<<<<<< HEAD
            var response = await _httpClient.PatchAsync($"http://192.168.201.1:8000/attractions/{attractionId}/update/", content);
=======
            var response = await _httpClient.PatchAsync($"http://57.128.249.150/attractions/{attractionId}/update/", content);
>>>>>>> patrykjas

            return response.IsSuccessStatusCode;
        }

        public async Task<AttractionModel> GetAttractionByIdAsync(int attractionId)
        {
            await AddAuthAsync();

<<<<<<< HEAD
            var url = $"http://192.168.201.1:8000/attractions/{attractionId}/";
=======
            var url = $"http://57.128.249.150/attractions/{attractionId}/";
>>>>>>> patrykjas

            var response = await _httpClient.GetAsync(url);

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać danych atrakcji");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<AttractionModel>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
        }

        public async Task<List<EventModel>> GetEventsWhereIHaveRolesAsync()
        {
            await AddAuthAsync();

            var response = await _httpClient.GetAsync($"{_baseUrl}/user/roles/");

            if (!response.IsSuccessStatusCode)
                throw new Exception("Nie udało się pobrać eventów użytkownika");

            var json = await response.Content.ReadAsStringAsync();

            return JsonSerializer.Deserialize<List<EventModel>>(json, new JsonSerializerOptions{PropertyNameCaseInsensitive = true});
        }
    }
}
