import { Calendar, Clock, MapPin, Award, Users, Settings } from 'lucide-react';

export function ProfileEventCard({ event, onClick, onManageClick, statusLabel = "Zapisano", showManageBtn = false }) {

  const dateObj = new Date(event.start_date);

  const displayDate = dateObj.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const displayTime = dateObj.toLocaleTimeString('pl-PL', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div
      onClick={() => onClick(event)}
      className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 p-3 md:p-4 border border-gray-200 rounded-xl hover:border-[#9893da] hover:shadow-md transition-all cursor-pointer bg-white"
    >
      {/* Zdjęcie Wydarzenia */}
      <div className="w-full sm:w-20 md:w-24 h-32 sm:h-20 md:h-24 rounded-lg overflow-hidden flex-shrink-0 relative bg-gray-100">
        <img
          src={event.image || 'https://via.placeholder.com/150'}
          alt={event.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.currentTarget.src = 'https://via.placeholder.com/150?text=Brak+zdjęcia';
          }}
        />
      </div>

      {/* Informacje o wydarzeniu */}
      <div className="flex-1 min-w-0 w-full">
        {/* Tytuł */}
        <h3 className="text-black mb-2 line-clamp-2 font-semibold text-base md:text-lg">
          {event.name}
        </h3>

        {/* Szczegóły: Data, Godzina, Lokalizacja */}
        <div className="flex flex-wrap gap-y-2 gap-x-4 text-gray-600 text-xs md:text-sm">

          {/* Data */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 text-[#9893da]" />
            <span className="whitespace-nowrap">{displayDate}</span>
          </div>

          {/* Godzina (Teraz dynamiczna!) */}
          <div className="flex items-center gap-1.5 md:gap-2">
            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 text-[#9893da]" />
            <span className="whitespace-nowrap">{displayTime}</span>
          </div>

          {/* Lokalizacja */}
          <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0 text-[#9893da]" />
            <span className="truncate max-w-[150px] sm:max-w-[200px]">{event.location}</span>
          </div>
        </div>

        {/* Liczba uczestników (jeśli > 0) */}
        {event.participants > 0 && (
          <div className="mt-2 flex items-center gap-2 text-gray-500 text-xs">
             <Users className="w-3 h-3" />
             <span>{event.participants} miejsc</span>
          </div>
        )}
      </div>

      {/* Prawa strona: Status i Przyciski */}
      <div className="flex flex-col items-end gap-2 self-start sm:self-center w-full sm:w-auto mt-2 sm:mt-0">
        {/* Badge statusu */}
        <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-50 text-green-700 rounded-lg text-xs md:text-sm flex-shrink-0 border border-green-100">
          <Award className="w-3.5 h-3.5 md:w-4 md:h-4" />
          <span className="font-medium">{statusLabel}</span>
        </div>

        {/* Przycisk zarządzania (tylko dla organizatora) */}
        {showManageBtn && (
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onManageClick(event);
                }}
                className="flex items-center gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-[#9893da] hover:bg-[#8681c4] text-white rounded-lg text-xs md:text-sm transition-colors shadow-sm"
            >
                <Settings className="w-3.5 h-3.5 md:w-4 md:h-4" />
                <span>Zarządzaj</span>
            </button>
        )}
      </div>
    </div>
  );
}