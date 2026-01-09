import { User, Edit, Mail, MapPin } from 'lucide-react';
import { CreditCard } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function ProfileHeader({ user, stats, onEditClick }) {

  // Obsługa ról: sprawdzamy flagę z propsów lub user.role, zależnie co przyjdzie z backendu
  const isOrganizer = user.wants_to_be_organizer || user.role === 'organizer' || user.role === 'admin';

  // Bezpieczne pobieranie imienia i nazwiska (Django user vs Twoje stare mocki)
  const firstName = user.first_name || user.name || '';
  const lastName = user.last_name || user.surname || '';
  const fullName = `${firstName} ${lastName}`.trim() || 'Użytkownik';

  // Bezpieczne pobieranie zdjęcia
  const imageUrl = user.photo_url || user.user_image || user.avatar;

  const navigate = useNavigate();

  function handleTransactionsClick() {
    navigate("/transactions");
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 lg:p-8 mb-6">
      <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className={`w-20 h-20 md:w-24 md:h-24 rounded-full ${isOrganizer ? 'bg-gradient-to-br from-purple-500 to-[#9893da]' : 'bg-[#9893da]'} flex items-center justify-center overflow-hidden`}>
            {imageUrl ? (
               <img src={imageUrl} alt={fullName} className="w-full h-full object-cover" />
            ) : (
               <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
            )}
          </div>
          {/* Przycisk edycji na avatarze */}
          <button
            onClick={onEditClick}
            className="absolute bottom-0 right-0 w-7 h-7 md:w-8 md:h-8 bg-[#157145] rounded-full flex items-center justify-center hover:bg-[#1a8855] transition-colors cursor-pointer"
          >
            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1 w-full min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h1 className="text-black truncate text-xl font-bold">{fullName}</h1>
                {isOrganizer && (
                  <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full whitespace-nowrap">
                    Organizator
                  </span>
                )}
              </div>
              <p className="text-gray-600 text-sm md:text-base">ID: {user.id}</p>
            </div>
            {/* Główny przycisk Edytuj profil */}
            <div className="hidden sm:flex flex-col gap-2">
              <button
                onClick={onEditClick}
                className="px-4 md:px-6 py-2 border border-gray-300 rounded-lg hover:border-[#9893da] transition-colors text-sm md:text-base"
              >
                Edytuj profil
              </button>

              <button
                onClick={handleTransactionsClick}
                className="px-4 md:px-6 py-2 border border-gray-300 rounded-lg hover:border-[#9893da] transition-colors text-sm md:text-base"
              >
                Historia transakcji
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
            <div className="flex items-center gap-2 md:gap-3 text-gray-700 min-w-0 text-sm md:text-base">
              <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
              <span className="truncate">{user.email}</span>
            </div>
            <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
              <span>Polska (Domyślna)</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4 sm:hidden">
            <button
              onClick={onEditClick}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:border-[#9893da] transition-colors text-sm"
            >
              Edytuj profil
            </button>

            <button
              onClick={handleTransactionsClick}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:border-[#9893da] transition-colors text-sm"
            >
              Historia transakcji
            </button>
          </div>
        </div>
      </div>

      {/* Statystyki */}
      <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
        <div className="text-center">
          <div className="text-black mb-1 font-bold text-lg">{stats.registered}</div>
          <div className="text-gray-600 text-xs md:text-sm">Zapisane</div>
        </div>

        <div className="text-center">
          <div className="text-black mb-1 font-bold text-lg">{stats.finished}</div>
          <div className="text-gray-600 text-xs md:text-sm">Ukończone</div>
        </div>
      </div>
    </div>
  );
}