using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class EventRoleModel
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }
        [JsonPropertyName("role")]
        public string Role { get; set; }
    }
}
