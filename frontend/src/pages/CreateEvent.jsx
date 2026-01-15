import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ShieldAlert, ArrowLeft } from "lucide-react";
import { CreateEventView } from "../components/CreateEventView";

export default function CreateEvent() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [canAccess, setCanAccess] = useState(false);

  useEffect(() => {
    const verifyUserRole = async () => {
      const token = localStorage.getItem('access');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/users/me/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();

          if (userData.wants_to_be_organizer === true) {
            setCanAccess(true);
          } else {
            setCanAccess(false);
          }
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error("Błąd weryfikacji uprawnień:", error);
      } finally {
        setCheckingAuth(false);
      }
    };

    verifyUserRole();
  }, [navigate]);

  const mapCategoryToBackend = (categoryPL) => {
    const map = {
      "Muzyka": "music",
      "Technologia": "technology",
      "Jedzenie": "food",
      "Sport": "sport",
      "Sztuka": "art",
      "Business": "business",
      "Wellness": "wellness",
      "Teatr": "theatre",
      "Gaming": "gaming",
      "Film": "film",
      "Moda": "fashion",
      "Książki": "books",
      "Inne": "other"
    };
    return map[categoryPL] || "other";
  };

  const handleCreate = async (formData) => {
    setLoading(true);
    const token = localStorage.getItem('access');

    const payload = {
      name: formData.name,
      description: formData.description,
      is_active: true,
      location: formData.location,
      latitude: 0,
      longitude: 0,
      start_date: formData.startDate,
      end_date: formData.endDate,
      max_participants: formData.maxParticipants,
      image: formData.imageUrl,
      category: mapCategoryToBackend(formData.category)
    };

    try {
      const response = await fetch("http://localhost:8000/events/create/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        alert("Wydarzenie zostało utworzone pomyślnie!");
        navigate("/profil");
      } else {
        const errorData = await response.json();
        console.error("Błąd tworzenia:", errorData);
        alert("Wystąpił błąd podczas tworzenia wydarzenia.");
      }
    } catch (error) {
      console.error("Błąd sieci:", error);
      alert("Problem z połączeniem z serwerem.");
    } finally {
      setLoading(false);
    }
  };


  if (checkingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-[#9893da] text-lg font-medium">Weryfikacja uprawnień...</div>
      </div>
    );
  }

  if (!canAccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShieldAlert className="w-8 h-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Brak dostępu</h2>
          <p className="text-gray-600 mb-8">
            Musisz posiadać status <strong>Organizatora</strong>, aby móc tworzyć nowe wydarzenia.
          </p>
          <button
            onClick={() => navigate('/profile')}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Wróć do profilu
          </button>
        </div>
      </div>
    );
  }

  return (
    <CreateEventView
      onBack={() => navigate(-1)}
      onSubmit={handleCreate}
      isLoading={loading}
    />
  );
}