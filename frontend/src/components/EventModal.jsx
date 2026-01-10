import { useEffect, useState} from "react";
import { ChevronRight} from "lucide-react";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export default function EventModal({ event, onClose }) {
    const [isJoined, setIsJoined] = useState(false);
    const token = localStorage.getItem("access")
    const [showQR, setShowQR] = useState(false);
    const [qrImage, setQrImage] = useState(null)
    const [qrId, setQrId] = useState(null);
    const [balance, setBalance] = useState(null);
    const [attractions, setAttractions] = useState([]);
    const [isAttractionsExpanded, setIsAttractionsExpanded] = useState(false);
    const [userRole, setUserRole] = useState(null);

    const dateObj = event ? new Date(event.start_date) : null;
    const date = new Intl.DateTimeFormat("pl-PL", { 
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(dateObj);

    const time = new Intl.DateTimeFormat("pl-PL", { 
        hour: "2-digit",
        minute: "2-digit"
    }).format(dateObj);

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

          if (data.is_joined) {
            fetchQrIdForEvent();
          }

        } catch (err) {
          console.error(err);
        }
      };

      const fetchQrIdForEvent = async () => {
        try {
          const response = await fetch(
            `http://localhost:8000/api/tokens/events/my/`,
            { headers: { Authorization: `Bearer ${token}` } }
          );

          if (!response.ok) throw new Error("Błąd pobierania listy wydarzeń użytkownika");

          const events = await response.json();

          const joinedEvent = events.find(e => e.id_event === event.id_event);

          if (joinedEvent) {
            setQrId(joinedEvent.id_qr);
            setUserRole(joinedEvent.user_role);
          }

        } catch (err) {
          console.error(err);
        }
      };

      fetchAttractions();
      fetchStatus();
    }, [event, token]);

    async function fetchAttractions() {
      try {
        const response = await fetch(
          `http://localhost:8000/events/${event.id_event}/attractions/`
        );

        if (!response.ok) throw new Error("Błąd pobierania atrakcji");

        const data = await response.json();
        setAttractions(data);

      } catch (err) {
        console.error(err);
      }
    }

    async function fetchQR() {
      try {
        const token = localStorage.getItem("access");
        if (!token) return alert("Musisz być zalogowany");
        if (!qrId) return alert("Brak przypisanego kodu QR");

        const response = await fetch(
          `http://localhost:8000/api/tokens/qr/${qrId}/image/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) throw new Error("Błąd pobierania QR");

        const blob = await response.blob();
        const imageUrl = URL.createObjectURL(blob);

        setQrImage(imageUrl);
        setShowQR(true);
        fetchEventBalance();

      } catch (error) {
        console.error(error);
        alert("Nie udało się pobrać QR");
      }
    }

    async function fetchEventBalance() {
      try {
        const token = localStorage.getItem("access");
        if (!token) return;

        const response = await fetch(
          `http://localhost:8000/api/tokens/events/${event.id_event}/balance/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (!response.ok) throw new Error("Błąd pobierania salda");

        const data = await response.json();
        setBalance(data.balance);

      } catch (err) {
        console.error(err);
      }
    }



    if (!event) return null; 
  
    const imageUrl = event.image ? event.image : "/ImageWithFallback.png";
    const category = event.category || "Inne";

    async function handleJoin() {
      const token = localStorage.getItem("access");
      if (!token) {
        alert("Musisz być zalogowany");
        return;
      }

      const endpoint = isJoined
        ? `http://localhost:8000/api/tokens/events/${event.id_event}/leave/`
        : `http://localhost:8000/api/tokens/events/${event.id_event}/join/`;

      const method = isJoined ? "DELETE" : "POST";

      try {
        const response = await fetch(endpoint, {
          method,
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`Błąd: ${response.status}`);
        }

        const data = await response.json();

        if (!isJoined) {
          setQrId(data.id_qr);
        } else {
          setQrId(null);
        }

        setIsJoined(!isJoined);

      } catch (error) {
        console.error("Błąd:", error);
        alert("Wystąpił błąd");
      }
    }

    function handleTokenActionClick() {
      alert("Pobierz aplikację mobilną Qentry, aby zarządzać tokenami podczas wydarzenia.");
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
            {date + " · " + time}
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
          {attractions.length > 0 && (
            <div className=" font-['Arimo']">
              <div 
                className="flex items-center justify-between cursor-pointer hover:bg-gray-50 py-2 rounded-lg transition-colors group"
                onClick={() => setIsAttractionsExpanded(!isAttractionsExpanded)}
              >
                <div>
                  <h3 className="text-[16px] font-normal text-black font-['Arimo'] mb-2">Atrakcje</h3>
                  <p className="text-[16px] font-normal text-[#4A5565] font-['Arimo']">
                    {attractions.filter(a => a.is_active).length} dostępnych atrakcji
                  </p>
                </div>
                
                <div className="flex items-center gap-3">
                  <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    isAttractionsExpanded ? 'rotate-90' : ''
                  }`} />
                </div>
              </div>

              <div className={`overflow-hidden transition-all duration-300 ${
                isAttractionsExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  {attractions.filter(a => a.is_active).length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {attractions
                        .filter(a => a.is_active)
                        .map((a) => (
                          <div 
                            key={a.id_attraction}
                            className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-200 hover:border-[#9893da]/30"
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h4 className="font-semibold text-gray-900 font-['Arimo']">{a.name}</h4>
                                </div>
                                
                                {a.description && (
                                  <p className="text-gray-600 text-sm mb-3 font-['Arimo'] line-clamp-2">
                                    {a.description}
                                  </p>
                                )}
                              </div>
                              
                              <div className={`ml-3 px-3 py-1.5 rounded-lg font-bold text-sm font-['Arimo'] ${
                                a.price > 0 
                                  ? 'bg-[#9893da]/10 text-[#9893da]' 
                                  : 'bg-green-100 text-green-700'
                              }`}>
                                {a.price > 0 ? `${a.price} Tokenów` : 'GRATIS'}
                              </div>
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  ) : (
                    <div className="text-gray-500 text-sm font-['Arimo']">
                      Brak atrakcji.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

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
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={fetchQR}
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

              {(userRole === 'token_seller' || userRole === 'staff') && (
              <button
                onClick={handleTokenActionClick}
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
                <BanknoteArrowUp size={16} color="black" />
              </button>
              )}
              {(userRole === 'token_taker' || userRole === 'staff') && (
              <button
                onClick={handleTokenActionClick}
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
                <BanknoteArrowDown size={16} color="black" />
              </button>
              )}
            </div>

            )}

        </div>
            {showQR && (
            <div style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(0,0,0,0.6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 10000
            }}>
              <div style={{
                background: "white",
                padding: "20px",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
              }}>
                {balance !== null && (
                  <div style={{ marginTop: "16px", fontSize: "16px", color: "#101828" }}>
                    <strong>{balance} tokenów</strong> 
                  </div>
                )}
                <img src={qrImage} alt="QR Code" style={{ width: "250px", height: "250px" }} />
                <button 
                  onClick={() => setShowQR(false)}
                  style={{
                    marginTop: "20px",
                    padding: "10px 16px",
                    background: "#544E61",
                    color: "white",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer"
                  }}
                >
                  Zamknij
                </button>
              </div>
            </div>
          )}
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
