import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ProfileView } from '../components/ProfileView';
import EventModal from '../components/EventModal';
// Zakładam, że zapisałeś modal w tym miejscu:
import { EditProfileModal } from '../components/EditProfileModal';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [participatingEvents, setParticipatingEvents] = useState([]);
  const [createdEvents, setCreatedEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  // Stan dla modala wydarzeń
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Stan dla modala edycji profilu
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access');

      if (!token) {
        console.error("Brak tokenu. Użytkownik niezalogowany.");
        setLoading(false);
        return;
      }

      const requestOptions = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };

      try {
        const userRes = await fetch('http://localhost:8000/api/users/me/', requestOptions);

        if (!userRes.ok) throw new Error('Błąd pobierania użytkownika');

        const userData = await userRes.json();
        setUser(userData);

        const promises = [
          fetch('http://localhost:8000/api/tokens/events/my/', requestOptions).then(res => res.json())
        ];

        if (userData.wants_to_be_organizer) {
           const createdUrl = `http://localhost:8000/events/?user_id=${userData.id}`;
           promises.push(fetch(createdUrl, requestOptions).then(res => res.json()));
        } else {
           promises.push(Promise.resolve([]));
        }

        const [myTokensData, myCreatedData] = await Promise.all(promises);

        setParticipatingEvents(Array.isArray(myTokensData) ? myTokensData : []);
        setCreatedEvents(Array.isArray(myCreatedData) ? myCreatedData : []);

      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // --- Logika Event Modal ---
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleCreateEvent = () => {
    navigate('/createevent');
  };


  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleSaveProfile = async (firstName, lastName, photoFile) => {
    const token = localStorage.getItem('access');


    const formData = new FormData();
    formData.append('name', firstName);
    formData.append('surname', lastName);


    if (photoFile) {
      formData.append('user_image', photoFile);
    }

    try {

      const response = await fetch('http://localhost:8000/api/users/me/', {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Błąd backendu:", err);
        alert("Wystąpił błąd zapisu.");
        return;
      }

      const updatedUser = await response.json();
      console.log("Zapisano pomyślnie:", updatedUser);

      setUser(prevUser => ({
        ...prevUser,
        ...updatedUser,
        name: firstName,
        surname: lastName,
        user_image: updatedUser.user_image
      }));


      window.dispatchEvent(new Event("auth-change"));
      setIsEditProfileOpen(false);

    } catch (error) {
      console.error("Błąd sieci:", error);
      alert("Nie udało się połączyć z serwerem.");
    }
  };

  if (loading) return <div className="p-10 text-center">Ładowanie profilu...</div>;
  if (!user) return <div className="p-10 text-center text-red-500">Błąd danych.</div>;


  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim();

  return (
    <>
      <ProfileView
        user={user}
        participatingEvents={participatingEvents}
        createdEvents={createdEvents}
        onEventClick={handleEventClick}
        onCreateClick={handleCreateEvent}

        onEditClick={handleEditProfileClick}
      />

      {isModalOpen && selectedEvent && (
        <EventModal
          event={selectedEvent}
          onClose={handleCloseModal}
          isOpen={isModalOpen}
        />
      )}

      {/* Modal Edycji Profilu */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        currentName={fullName}
        // Upewnij się, że pole w obiekcie user to user.photo_url lub user.avatar
        currentPhotoUrl={user.photo_url || user.avatar || ""}
        onSave={handleSaveProfile}
      />
    </>
  );
}