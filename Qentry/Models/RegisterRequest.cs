using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class RegisterRequest
    {
        public string Email {  get; set; }
        public string Name { get; set; }
        public string Surrname { get; set; }
        public string Password { get; set; }
        public string User_image { get; set; } = string.Empty;
        public bool WantsToBeOrganizer { get; set; } = false;

    }
}
