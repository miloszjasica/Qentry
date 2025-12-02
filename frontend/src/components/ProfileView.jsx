import { useState } from 'react';
import { Calendar, Clock, Users, PlusCircle } from 'lucide-react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileEventCard } from './ProfileEventCard';

export function ProfileView({ user, participatingEvents, createdEvents, onEventClick,onCreateClick }) {
  const [activeTab, setActiveTab] = useState('upcoming');
  const isOrganizer = user.wants_to_be_organizer === true;
  const currentDate = new Date();

  const upcomingEvents = participatingEvents.filter(e => new Date(e.start_date) >= currentDate);
  const pastEvents = participatingEvents.filter(e => new Date(e.start_date) < currentDate);

  return (
    <div className="max-w-5xl mx-auto p-4">
      <ProfileHeader
        user={user}
        stats={{
            registered: upcomingEvents.length,
            finished: pastEvents.length,
            created: createdEvents.length
        }}
        isOrganizer={isOrganizer}
      />

      <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-4 md:mb-6">
            <h2 className="text-black text-xl font-bold">Moje wydarzenia</h2>
            {isOrganizer && (
                <button onClick={onCreateClick} className="flex items-center gap-2 text-sm text-[#9893da] font-medium hover:text-[#7f7bc0] transition-colors">
                    <PlusCircle className="w-5 h-5" />
                    <span className="hidden sm:inline">Stwórz nowe</span>
                </button>
            )}
        </div>

        {/* Zakładki */}
        <div className="border-b border-gray-200 mb-4 md:mb-6 overflow-x-auto">
          <div className="flex gap-4 md:gap-6 min-w-max">
            <button
              onClick={() => setActiveTab('upcoming')}
              className={`pb-3 md:pb-4 px-2 border-b-2 text-sm md:text-base whitespace-nowrap transition-colors ${
                activeTab === 'upcoming' ? 'border-[#9893da] text-[#9893da]' : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Nadchodzące ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setActiveTab('past')}
              className={`pb-3 md:pb-4 px-2 border-b-2 text-sm md:text-base whitespace-nowrap transition-colors ${
                activeTab === 'past' ? 'border-[#9893da] text-[#9893da]' : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              Przeszłe ({pastEvents.length})
            </button>
            {isOrganizer && (
                <button
                onClick={() => setActiveTab('created')}
                className={`pb-3 md:pb-4 px-2 border-b-2 text-sm md:text-base whitespace-nowrap transition-colors ${
                    activeTab === 'created' ? 'border-[#9893da] text-[#9893da]' : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
                >
                Stworzone przeze mnie ({createdEvents.length})
                </button>
            )}
          </div>
        </div>

        {/* Listy */}
        <div className="space-y-3 md:space-y-4">

          {/* Nadchodzące */}
          {activeTab === 'upcoming' && (
            upcomingEvents.length > 0 ? (
                upcomingEvents.map(event => (
                    <ProfileEventCard key={event.id_qr} event={event} onClick={onEventClick} />
                ))
            ) : (
                <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Brak nadchodzących wydarzeń</p>
                </div>
            )
          )}

          {/* Przeszłe */}
          {activeTab === 'past' && (
             pastEvents.length > 0 ? (
                pastEvents.map(event => (
                    <ProfileEventCard key={event.id_qr} event={event} onClick={onEventClick} statusLabel="Ukończone" />
                ))
            ) : (
                <div className="text-center py-12">
                    <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Brak historii wydarzeń</p>
                </div>
            )
          )}

          {/* Stworzone (Prosto z backendu!) */}
          {activeTab === 'created' && isOrganizer && (
             createdEvents.length > 0 ? (
                createdEvents.map(event => (
                    <ProfileEventCard
                        key={event.id || event.id_event}
                        event={event}
                        onClick={onEventClick}
                        statusLabel="Organizator"
                        showManageBtn={true}
                    />
                ))
            ) : (
                <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500 mb-2">Nie stworzyłeś jeszcze żadnych wydarzeń</p>
                </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}