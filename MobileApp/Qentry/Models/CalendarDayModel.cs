using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Models
{
    public class CalendarDayModel
    {
        public DateTime Date { get; set; }
        public bool IsToday { get; set; }
        public bool IsSelected { get; set; }
        public bool HasEvents { get; set; }
    }
}
