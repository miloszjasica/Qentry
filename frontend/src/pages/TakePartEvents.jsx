import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";
import CategoryBar from "../components/CategoryBar";

export default function TakePartEvents({ search, radius = 30 }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [category, setCategory] = useState("all");

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchNearbyEvents = async () => {
        const token = localStorage.getItem("access");
        const params = new URLSearchParams();

        if (category && category !== "all") {
          params.append("category", category);
        }

        if (search?.trim()) {
          params.append("name", search.trim());
        }

        let url = "http://localhost:8000/api/tokens/events/my/";
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const headers = { Accept: "application/json" };
        if (token) headers["Authorization"] = `Bearer ${token}`;

        try {
          const res = await fetch(url, { headers });
          if (!res.ok) throw new Error(`Błąd HTTP: ${res.status}`);

          const data = await res.json();
          setEvents(data);
        } catch (err) {
          console.error("Błąd pobierania wydarzeń w pobliżu:", err);
          setEvents([]);
        }
      };

      fetchNearbyEvents();
    }, 300);

    return () => clearTimeout(delay);
  }, [search, category, radius]);

  return (
    <div style={{ padding: "20px" }}>
      <CategoryBar selected={category} onSelect={setCategory} />

      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px", marginTop: "20px" }}>
        {events.length === 0 && <div>Brak wyników</div>}

        {events.map(ev => (
          <EventCard key={ev.id_event} event={ev} onOpen={setSelectedEvent} />
        ))}
      </div>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
