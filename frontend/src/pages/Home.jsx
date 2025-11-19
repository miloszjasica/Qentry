import { useEffect, useState } from "react";
import EventCard from "../components/EventCard";

export default function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/events/")
      .then(response => response.json())
      .then(data => {
        setEvents(data);
      })
      .catch(err => console.error("Error fetching events:", err));
  }, []);

 return (
    
    <div style={{ marginLeft: '256px', padding: '32px' }}>  
      <h1 style={{color: 'black', fontSize: 20, fontWeight: '400', fontFamily: 'Arimo', wordWrap: 'break-word'}}>Odkryj wydarzenia</h1>
      <div style={{width: '100%', color: '#4A5565', fontSize: 16, fontFamily: 'Arimo', fontWeight: '400', wordWrap: 'break-word'}}>Znaleziono {events.length} wydarzeń</div>

      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
        }}>
          {events.map(event => (
            <EventCard key={event.id_event} event={event}/>
          ))}
        </div>
      )}
    </div>
  );
}
