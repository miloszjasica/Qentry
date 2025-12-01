import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";

export default function NearbyEvents({ search, radius = 30 }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchNearbyEvents = async () => {
      const token = localStorage.getItem("access");
      const headers = { "Accept": "application/json" };
      if (token) headers["Authorization"] = `Bearer ${token}`;

      try {
        const params = new URLSearchParams();
        params.append("radius", radius);
        if (search?.trim()) params.append("name", search.trim());

        const res = await fetch(`http://localhost:8000/events/nearby-events/?${params.toString()}`, { headers });
        if (!res.ok) throw new Error(`Błąd HTTP: ${res.status}`);

        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Błąd pobierania wydarzeń w pobliżu:", err);
        setEvents([]);
      }
    };

    fetchNearbyEvents();
  }, [search, radius]);

  return (
    <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {events.length === 0 && <div>Brak wyników</div>}

      {events.map(ev => (
        <EventCard key={ev.id_event} event={ev} onOpen={setSelectedEvent} />
      ))}

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
