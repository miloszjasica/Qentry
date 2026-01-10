using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class TransactionsResponse
    {
        [JsonPropertyName("transactions")]
        public List<TransactionDto> Transactions { get; set; }
    }
}
