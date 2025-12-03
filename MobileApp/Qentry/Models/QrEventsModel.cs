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

        [JsonPropertyName("id_event")]
        public int EventId { get; set; }

        [JsonPropertyName("id_user")]
        public int UserId { get; set; }

        [JsonPropertyName("qr_string")]
        public string QrString { get; set; }

        [JsonPropertyName("is_active")]
        public bool IsActive { get; set; }
    }
}
