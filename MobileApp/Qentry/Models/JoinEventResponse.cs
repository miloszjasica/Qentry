using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class JoinEventResponse
    {
        [JsonPropertyName("id_qr")]
        public int IdQr { get; set; }

        [JsonPropertyName("balance")]
        public string Balance { get; set; }

        [JsonPropertyName("is_active")]
        public bool IsActive { get; set; }

        [JsonPropertyName("generated_at")]
        public DateTime GeneratedAt { get; set; }

        [JsonPropertyName("user_role")]
        public string UserRole { get; set; }

        [JsonPropertyName("qr_string")]
        public string QrString { get; set; }

        [JsonPropertyName("qr_image")]
        public string QrImage { get; set; }

        [JsonPropertyName("id_event")]
        public int IdEvent { get; set; }

        [JsonPropertyName("id_user")]
        public int IdUser { get; set; }
    }
}
