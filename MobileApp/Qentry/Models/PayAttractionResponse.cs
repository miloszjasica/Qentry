using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class PayAttractionResponse
    {
        [JsonPropertyName("transaction_id")]
        public int TransactionId { get; set; }
        [JsonPropertyName("event_name")]
        public string EventName { get; set; }
        [JsonPropertyName("price")]
        public string Price { get; set; }
        [JsonPropertyName("balance")]
        public string Balance { get; set; }
        [JsonPropertyName("message")]
        public string Message { get; set; }
        [JsonPropertyName("new_balance")]
        public string NewBalance { get; set; }
    }
}
