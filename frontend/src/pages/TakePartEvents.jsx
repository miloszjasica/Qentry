import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import CategoryBar from "../components/CategoryBar";
import { useNavigate } from "react-router-dom";

export default function TakePartEvents({ search, radius = 30 }) {
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [category, setCategory] = useState("all");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // 1. SPRAWDZENIE TOKENA NA WEJ�CIU
    const token = localStorage.getItem("access");

    if (!token) {
      // Je�li nie ma tokena, natychmiast id� do logowania
      navigate('/login');
      return;
    }

    const delay = setTimeout(() => {
      const fetchNearbyEvents = async () => {
        const params = new URLSearchParams();

        if (category && category !== "all") {
          params.append("category", category);
        }

        if (search?.trim()) {
          params.append("name", search.trim());
        }

        let url = "http://localhost:8000/api/tokens/events/my/upcoming/";
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const headers = { 
            Accept: "application/json",
            "Authorization": `Bearer ${token}`
        };

        try {
          const res = await fetch(url, { headers });

          // 2. SPRAWDZENIE CZY TOKEN NIE WYGAS� (B��d 401)
          if (res.status === 401 || res.status === 403) {
             console.warn("Sesja wygas�a, przekierowanie...");
             localStorage.removeItem("access"); // Czy�cimy stary token
             navigate('/login');
             return;
          }

          if (!res.ok) throw new Error(`Blad HTTP: ${res.status}`);

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
  }, [search, category, radius, navigate]); // Dodano navigate do zale�no�ci
  
  const getGridColumns = () => {
    if (windowWidth >= 1536) return 5;
    if (windowWidth >= 1280) return 4;
    if (windowWidth >= 768) return 2;
    return 1;
  };

  return (
    <div style={{ padding: "20px" }}>
      <CategoryBar selected={category} onSelect={setCategory} />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${getGridColumns()}, 1fr)`,
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {events.map(ev => (
          <EventCard key={ev.id_event} event={ev} onOpen={setSelectedEvent} />
        ))}
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}