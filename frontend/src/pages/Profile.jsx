import React, { useState, useEffect, useCallback } from 'react';
import { ProfileView } from '../components/ProfileView'; // Dostosuj ścieżkę!

const PROFILE_API_URL = 'http://localhost:8000/api/users/me/';
const EVENTS_API_URL = 'http://localhost:8000/api/tokens/events/my/';


function Profile() {

    const [profile, setProfile] = useState(null);
    const [userEvents, setUserEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchData = useCallback(async () => {
        const userToken = localStorage.getItem("access");

        if (!userToken) {
            setError("Błąd autoryzacji. Proszę się zalogować.");
            setIsLoading(false);
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const authHeader = {
                'Authorization': `Bearer ${userToken}`,
                'Content-Type': 'application/json',
            };


            const profileResponse = await fetch(PROFILE_API_URL, { method: 'GET', headers: authHeader });
            if (!profileResponse.ok) {
                throw new Error(`Profil: ${profileResponse.status} ${profileResponse.statusText}`);
            }
            const profileData = await profileResponse.json();
            setProfile(profileData);

            const eventsResponse = await fetch(EVENTS_API_URL, { method: 'GET', headers: authHeader });
            if (!eventsResponse.ok) {
                throw new Error(`Eventy: ${eventsResponse.status} ${eventsResponse.statusText}`);
            }
            const eventsData = await eventsResponse.json();
            setUserEvents(eventsData);

        } catch (err) {
            const errorMessage = (err instanceof Error) ? err.message : "Wystąpił nieznany błąd.";
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const upcomingEvents = userEvents.filter(e => {

        return true;
    });
    const pastEvents = userEvents.filter(e => !upcomingEvents.includes(e));


    const handleEventClick = (event) => {
        console.log("Nawigacja do wydarzenia:", event.id);
    };


    if (isLoading) {
        return <div className="max-w-5xl mx-auto py-20 text-center text-lg">Ładowanie danych profilu i wydarzeń...</div>;
    }

    if (error) {
        return <div className="max-w-5xl mx-auto py-20 text-center text-red-600 border border-red-300 p-4 rounded-lg">
            ⚠️ Błąd pobierania danych: {error}
        </div>;
    }

    if (!profile) {
        return <div className="max-w-5xl mx-auto py-20 text-center text-gray-500">Brak danych profilu do wyświetlenia.</div>;
    }


    return (
        <ProfileView
            profile={profile}
            upcomingEvents={upcomingEvents}
            pastEvents={pastEvents}
            onEventClick={handleEventClick}
        />
    );
}

export default Profile;