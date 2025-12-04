using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Qentry.Helpers
{
    public static class EventBus
    {
        public static event Action EventsUpdated;

        public static void RaiseEventsUpdated()
        {
            EventsUpdated?.Invoke();
        }
    }
}
