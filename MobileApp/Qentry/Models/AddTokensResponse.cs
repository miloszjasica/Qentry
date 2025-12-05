using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class AddTokensResponse
    {
        [JsonPropertyName("new_balance")]
        public string NewBalance { get; set; }
        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}
