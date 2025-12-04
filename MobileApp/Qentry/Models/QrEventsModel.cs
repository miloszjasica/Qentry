using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class QrEventsModel
    {
        [JsonPropertyName("id_qr")]
        public int IdQr { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("id_event")]
        public int EventId { get; set; }

        [JsonPropertyName("id_user")]
        public int UserId { get; set; }

        [JsonPropertyName("qr_string")]
        public string QrString { get; set; }

        [JsonPropertyName("is_active")]
        public bool IsActive { get; set; }

        [JsonPropertyName("user_role")]
        public string UserRole { get; set; }

        [JsonPropertyName("image")]
        public string Image { get; set; }

        [JsonPropertyName("location")]
        public string Location { get; set; }

        [JsonPropertyName("start_date")]
        public DateTime StartDate { get; set; }

        public string Category { get; set; }
    }
}
