using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class EventBalanceModel
    {
        [JsonPropertyName("balance")]
        public string Balance { get; set; }
    }
}
