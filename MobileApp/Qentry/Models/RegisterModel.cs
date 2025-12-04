using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class RegisterModel
    {
        [JsonPropertyName("email")]
        public string Email { get; set; }
        [JsonPropertyName("name")]
        public string Name { get; set; }
        [JsonPropertyName("surname")]
        public string Surname { get; set; }
        [JsonPropertyName("password")]
        public string Password { get; set; }
        [JsonPropertyName("wants_to_be_organizer")]
        public bool WantsToBeOrganizer { get; set; }

        public string Validate()
        {
            if (string.IsNullOrWhiteSpace(Email))
                return "Email jest wymagany.";

            if (!Email.Contains("@"))
                return "Podaj poprawny email.";

            if (string.IsNullOrWhiteSpace(Name))
                return "Imię jest wymagane.";

            if (string.IsNullOrWhiteSpace(Surname))
                return "Nazwisko jest wymagane.";

            if (string.IsNullOrWhiteSpace(Password) || Password.Length < 6)
                return "Hasło musi mieć minimum 6 znaków.";

            return null;
        }
    }
}
