import { useEffect, useState} from "react";

export default function EventModal({ event, onClose }) {
    const [isJoined, setIsJoined] = useState(false);
    const token = localStorage.getItem("access")
    const [showQR, setShowQR] = useState(false);

    useEffect(() => {  
      if (!event || !token) return;

      const fetchStatus = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/events/events/${event.id_event}/status/`,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          if (!response.ok) throw new Error("Błąd pobierania statusu");
          const data = await response.json();
          setIsJoined(data.is_joined);
        } catch (err) {
          console.error(err);
        }
      };

      fetchStatus();
    }, [event, token]);

    if (!event) return null; 
  
    const imageUrl = event.image ? event.image : "/ImageWithFallback.png";
    const category = event.category || "Inne";

    async function handleJoin() {
    const token = localStorage.getItem("access");
      if (!token) {
          alert("Musisz być zalogowany, aby zmienić udział w wydarzeniu.");
          return;
      }

      const endpoint = isJoined
          ? `http://localhost:8000/api/tokens/events/${event.id_event}/leave/`
          : `http://localhost:8000/api/tokens/events/${event.id_event}/join/`;

      const method = isJoined ? "DELETE" : "POST";

     try {
      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Błąd HTTP: ${response.status}`);
      }

      setIsJoined(!isJoined);

      alert(isJoined
        ? "Wypisałeś się z wydarzenia"
        : "Pomyślnie dołączyłeś do wydarzenia!"
      );
    } catch (error) {
      console.error("Błąd podczas zmiany statusu uczestnictwa:", error);
      alert("Wystąpił błąd. Spróbuj ponownie później.");
    }
  }


  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        
        <div style={styles.closeX} onClick={onClose}>✕</div>

        <div style={{ position: "relative" }}>
          <img
            src={imageUrl}
            alt={event.name}
            style={{
              width: "100%",
              height: "255px",
              objectFit: "cover",
              borderTopLeftRadius: "14px",
              borderTopRightRadius: "14px",
              display: "block",
            }}
          />
           
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '16px',
            width: '90px',
            height: '32px',
            background: '#544E61',
            borderRadius: '37282700px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              color: 'white',
              fontSize: 16,
              fontFamily: 'Arimo',
              fontWeight: '400',
              lineHeight: '20px'
            }}>
              {category}
            </div>
          </div>
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          padding: "24px",
          border: "1px solid #ccc",
          borderBottomLeftRadius: "14px",
          borderBottomRightRadius: "14px",
          backgroundColor: "#fff",
          color: "#101828",
          fontFamily: "Arimo",
          gap: "12px",
          fontSize: "16px",
        }}>
          <div style={{ color: "black", fontSize: "16px", fontWeight: "400", marginBottom: "16px" }}>
            {event.name}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <img src="/calendarPurple.svg" alt="dateIcon" style={{ width: "20px", height: "20px" }} />
            {new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(event.start_date))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
            <img src="/localizationPurple.svg" alt="locationIcon" style={{ width: "20px", height: "20px" }} />
            {event.location}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" }}>
            <img src="/person.svg" alt="personIcon" style={{ width: "20px", height: "20px" }} />
            {event.participants} osób bierze udział
          </div>

          <div style={{ color: '#4A5565', fontSize: 16, fontFamily: 'Arimo', fontWeight: '400', wordWrap: 'break-word' }}>
            <div style={{ color: 'black', marginBottom: '8px' }}>O wydarzeniu</div>
            {event.description}
          </div>

          <div style={{ display: "flex", gap: "12px", marginTop: "16px", alignItems: "center" }}>
            <button
            onClick={handleJoin}
            style={{
                flexGrow: 1,
                padding: "16px 24px",
                background: isJoined ? "#E5E7EB" : "#157145",
                color: isJoined ? "#4A5565" : "white",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontSize: "16px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                justifyContent: "center",
                transition: "background 0.2s, color 0.2s"
            }}
            >
            <img src="/join.svg" alt="joinIcon" style={{ width: "20px", height: "20px" }} />
            {isJoined ? "Zapisano" : "Zapisz się"}
            </button>

            {isJoined && (
            <button
                onClick={() => alert("Tutaj wygenerujesz QR")}
                style={{
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                background: "white",
                border: "1px solid #D1D5DC",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}
            >
                <img src="/QRIcon.svg" alt="QR" style={{ width: "16px", height: "16px" }} />
            </button>
            )}
            <button
                onClick={() => alert("Tutaj dodasz do polubionych")}
                style={{
                width: "52px",
                height: "52px",
                borderRadius: "10px",
                background: "white",
                border: "1px solid #D1D5DC",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center"
                }}
            >
                <img src="/heart.svg" alt="heart" style={{ width: "16px", height: "16px" }} />
            </button>
        </div>

        </div>

      </div>
    </div>
  );
}

const styles = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 9999
  },
  modal: {
    width: "90%",
    maxWidth: "700px",
    background: "white",
    borderRadius: "14px",
    overflow: "hidden",
    boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
    position: "relative"
  },
  closeX: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "32px",
    height: "32px",
    background: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.2)",
    zIndex: 10000
  }
};
