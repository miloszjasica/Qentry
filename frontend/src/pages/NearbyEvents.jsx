import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import CategoryBar from "../components/CategoryBar";

export default function NearbyEvents({ search, radius = 30 }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    // 1. Sprawdzamy czy u�ytkownik jest zalogowany
    const token = localStorage.getItem("access");

    if (!token) {
      navigate('/login');
      return;
    }

    const delay = setTimeout(() => {
      const fetchNearbyEvents = async () => {
        const params = new URLSearchParams();
        
        // Dodajemy parametry do URL
        params.append("radius", radius); 

        if (category && category !== "all") {
          params.append("category", category);
        }

        if (search?.trim()) {
          params.append("name", search.trim());
        }

        // 2. WA�NE: �cie�ka relatywna (bez localhost)
        let url = "/events/nearby-events/";
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const headers = { 
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
          const res = await fetch(url, { headers });

          // 3. Obs�uga wyga�ni�cia sesji
          if (res.status === 401 || res.status === 403) {
            localStorage.removeItem('access');
            navigate('/login');
            return;
          }

          if (!res.ok) throw new Error(`B��d HTTP: ${res.status}`);

          const data = await res.json();
          setEvents(data);
        } catch (err) {
          console.error("Blad pobierania wydarzen w poblizu:", err);
          setEvents([]);
        }
      };

      fetchNearbyEvents();
    }, 300);

    return () => clearTimeout(delay);
  }, [search, category, radius, navigate]);

  return (
    <div style={{ padding: "20px" }}>
      <CategoryBar selected={category} onSelect={setCategory} />

      {/* 4. CSS GRID - Naprawia rozje�d�anie si� kart */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", 
          gap: "20px",
          marginTop: "20px",
          alignItems: "stretch" 
        }}
      >
        {events.length === 0 && <div>Brak wydarze� w pobli�u</div>}

        {events.map(ev => (
          <div key={ev.id || ev.id_event} style={{ height: '100%' }}>
            <EventCard event={ev} onOpen={setSelectedEvent} />
          </div>
        ))}
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}