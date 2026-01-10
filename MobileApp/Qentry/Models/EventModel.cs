using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class EventModel
    {
        [JsonPropertyName("id_event")]
        public int Id_Event { get; set; }
        [JsonPropertyName("user_id")]
        public int User_Id { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("description")]
        public string Description { get; set; }
        [JsonPropertyName("created_at")]
        public DateTime CreatedAt { get; set; }
        [JsonPropertyName("is_active")]
        public bool IsActive { get; set; }
        [JsonPropertyName("location")]
        public string Location { get; set; }
        [JsonPropertyName("latitude")]
        public double? Latitude { get; set; }
        [JsonPropertyName("longitude")]
        public double? Longitude { get; set; }
        [JsonPropertyName("start_date")]
        public DateTime StartDate { get; set; }
        [JsonPropertyName("end_date")]
        public DateTime EndDate { get; set; }
        [JsonPropertyName("participants")]
        public int Participants { get; set; }
        [JsonPropertyName("image")]
        public string Image { get; set; }
        [JsonPropertyName("category")]
        public string Category { get; set; }
        public string UserRole { get; set; }

        public bool IsExpired => EndDate.Date < DateTime.Today;
    }
}
