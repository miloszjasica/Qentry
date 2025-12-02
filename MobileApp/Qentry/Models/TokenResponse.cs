using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class TokenResponse
    {
        [JsonPropertyName("refresh")]
        public string Refresh {  get; set; }
        [JsonPropertyName("access")]
        public string Access { get; set; }
    }
}
