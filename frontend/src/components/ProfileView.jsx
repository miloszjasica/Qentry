import React from 'react';
import { User, Mail, Calendar, MapPin, Clock, Award, Edit } from 'lucide-react';

interface UserProfile {
  id: number;
  email: string;
  name: string;
  surname: string;
  user_image: string | null;
  role: 'user' | 'admin' | string;
}

interface Event {
    id: number;
    title: string;
    imageUrl: string;
    date: string;
    time: string;
    location: string;

}

interface ProfileViewProps {
  profile: UserProfile;
  upcomingEvents: Event[];
  pastEvents: Event[];
  onEventClick: (event: Event) => void;
}

export function ProfileView({ profile, upcomingEvents, pastEvents, onEventClick }: ProfileViewProps) {

    const fullName = `${profile.name} ${profile.surname}`;

    return (
        <div className="max-w-5xl mx-auto">
            {/* Profile Header Card */}
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 lg:p-8 mb-6">
                <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6">

                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        {profile.user_image ? (
                            <img
                                src={profile.user_image}
                                alt={fullName}
                                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover"
                            />
                        ) : (
                            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#9893da] flex items-center justify-center">
                                <User className="w-10 h-10 md:w-12 md:h-12 text-white" />
                            </div>
                        )}
                        <button className="absolute bottom-0 right-0 w-7 h-7 md:w-8 md:h-8 bg-[#157145] rounded-full flex items-center justify-center hover:bg-[#1a8855] transition-colors">
                            <Edit className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                        </button>
                    </div>

                    {/* User Info */}
                    <div className="flex-1 w-full min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
                            <div className="min-w-0">
                                <h1 className="text-black mb-1 truncate">{fullName}</h1>
                                <p className="text-gray-600 text-sm md:text-base">Rola: **{profile.role}**</p>
                            </div>
                            <button className="px-4 md:px-6 py-2 border border-gray-300 rounded-lg hover:border-[#9893da] transition-colors whitespace-nowrap text-sm md:text-base">
                                Edytuj profil
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                            <div className="flex items-center gap-2 md:gap-3 text-gray-700 min-w-0 text-sm md:text-base">
                                <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                                <span className="truncate">**{profile.email}**</span>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3 text-gray-700 text-sm md:text-base">
                                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
                                <span>Warszawa, Polska</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* STATYSTYKI */}
                <div className="grid grid-cols-2 gap-3 md:gap-6 mt-6 md:mt-8 pt-4 md:pt-6 border-t border-gray-200">
                    <div className="text-center">
                        <div className="text-black mb-1">{upcomingEvents.length + pastEvents.length}</div>
                        <div className="text-gray-600 text-xs md:text-sm">Zapisane wydarzenia</div>
                    </div>
                    <div className="text-center">
                        <div className="text-black mb-1">{pastEvents.length}</div>
                        <div className="text-gray-600 text-xs md:text-sm">Ukończone</div>
                    </div>
                </div>
            </div>

            {/* Events History Section */}
            <div className="bg-white rounded-2xl shadow-sm p-4 md:p-6 lg:p-8">
                <h2 className="text-black mb-4 md:mb-6">Moje wydarzenia</h2>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-4 md:mb-6 overflow-x-auto">
                    <div className="flex gap-4 md:gap-6 min-w-max">
                        <button className="pb-3 md:pb-4 px-2 border-b-2 border-[#9893da] text-[#9893da] text-sm md:text-base whitespace-nowrap">
                            Nadchodzące ({upcomingEvents.length})
                        </button>
                        <button className="pb-3 md:pb-4 px-2 border-b-2 border-transparent text-gray-600 hover:text-gray-900 text-sm md:text-base whitespace-nowrap">
                            Przeszłe ({pastEvents.length})
                        </button>
                    </div>
                </div>

                {/* Events List - Używamy upcomingEvents */}
                <div className="space-y-3 md:space-y-4">
                    {upcomingEvents.length > 0 ? (
                        upcomingEvents.map((event) => (
                            <div
                                key={event.id}
                                onClick={() => onEventClick(event)}
                                className="flex flex-col sm:flex-row items-start gap-3 md:gap-4 p-3 md:p-4 border border-gray-200 rounded-xl hover:border-[#9893da] hover:shadow-md transition-all cursor-pointer"
                            >
                                {/* ... Kod wyświetlający wydarzenia ... */}
                                <div className="w-full sm:w-20 md:w-24 h-32 sm:h-20 md:h-24 rounded-lg overflow-hidden flex-shrink-0">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0 w-full">
                                    <h3 className="text-black mb-2 line-clamp-2">{event.title}</h3>
                                    <div className="flex flex-wrap gap-2 md:gap-4 text-gray-600 text-xs md:text-sm">
                                        <div className="flex items-center gap-1.5 md:gap-2">
                                            <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                                            <span className="whitespace-nowrap">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 md:gap-2">
                                            <Clock className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                                            <span className="whitespace-nowrap">{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 md:gap-2 min-w-0">
                                            <MapPin className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
                                            <span className="truncate">{event.location}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1.5 md:gap-2 px-3 md:px-4 py-1.5 md:py-2 bg-green-50 text-green-700 rounded-lg text-xs md:text-sm flex-shrink-0 self-start sm:self-center">
                                    <Award className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    <span>Zapisano</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-12">
                            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 mb-2">Nie masz jeszcze zapisanych wydarzeń</p>
                            <p className="text-gray-400 text-sm">Przeglądaj wydarzenia i zapisz się na te, które Cię interesują</p>
                        </div>
                    )}
                </div>
                {/* Past Events - Zostawiamy dla przyszłej implementacji */}
                {pastEvents.length === 0 && (
                    <div className="hidden">
                        <div className="text-center py-12">
                            <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <p className="text-gray-500 mb-2">Nie masz jeszcze ukończonych wydarzeń</p>
                            <p className="text-gray-400 text-sm">Po wzięciu udziału w wydarzeniach pojawią się tutaj</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}