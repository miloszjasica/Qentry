using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class TransactionDto
    {
        [JsonPropertyName("id_transaction")]
        public int IdTransaction { get; set; }

        [JsonPropertyName("user_name")]
        public string UserName { get; set; }

        [JsonPropertyName("user_surname")]
        public string UserSurname { get; set; }

        [JsonPropertyName("event_name")]
        public string EventName { get; set; }

        [JsonPropertyName("attraction_name")]
        public string AttractionName { get; set; }

        [JsonPropertyName("price")]
        public string Price { get; set; }

        [JsonPropertyName("date")]
        public string Date { get; set; }
        public decimal PriceValue =>
            decimal.TryParse(Price, NumberStyles.Any, CultureInfo.InvariantCulture, out var v)
                ? v
                : 0m;

        public DateTime DateValue =>
            DateTime.ParseExact(Date, "yyyy-MM-dd HH:mm:ss", CultureInfo.InvariantCulture);

        public string Title => AttractionName ?? "Transakcja";
        public string Description => EventName;
        public string Type => "Wydatek";
        public decimal Amount => -PriceValue;
    }
}
