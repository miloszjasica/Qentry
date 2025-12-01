import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import EventModal from "../components/EventModal";

export default function Home({ search }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const delay = setTimeout(() => {
      const fetchEvents = async () => {

        const url =
          search.trim() === ""
            ? "http://localhost:8000/events/"
            : `http://localhost:8000/events/?name=${encodeURIComponent(search)}`;

        const token = localStorage.getItem("access");
        const headers = {
          "Accept": "application/json"
        };
        if (token) {
          headers["Authorization"] = `Bearer ${token}`; 
        }

        try {
          const res = await fetch(url, { headers });
          if (!res.ok) {
            throw new Error(`Błąd HTTP: ${res.status}`);
          }

          const data = await res.json();
          setEvents(data);
        } catch (err) {
          console.error("Błąd pobierania eventów:", err);
          setEvents([]);
        }

      };
      fetchEvents();
    }, 500);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div style={{ padding: "20px", display: "flex", flexWrap: "wrap", gap: "20px" }}>
      {events.map(ev => (
        <EventCard key={ev.id_event} event={ev} onOpen={setSelectedEvent} />
         ))}
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
    </div>
  );
}
