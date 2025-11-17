export default function EventCard({ event }) {
    const imageUrl = event.image 
    ? event.image 
    : "/ImageWithFallback.png";

  return (
    <div >
        <img 
        src={imageUrl} 
        alt={event.name} 
        style={{ 
            width: "100%", 
            height: "auto", 
            objectFit: "cover",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
        }} 
        />
        <div style={{
            display: "flex",
            height: "auto",      
            padding: "20px 20px 20px 20px",
            minWidth: "314px",
            flexDirection: "column",
            alignItems: "flex-start",
            gap: "8px",
            flexShrink: 0,
            alignSelf: "stretch",
            border: "1px solid #ccc",
            borderBottomLeftRadius: "14px",
            borderBottomRightRadius: "14px",
            boxShadow: "2px 2px 8px rgba(0,0,0,0.1)",
            backgroundColor: "#fff",
            marginTop: "-4px",
            color: "#4A5565",
            fontFamily: "Arimo",
            fontSize: "14px",
            fontStyle: "normal",
            fontWeight: "400",
            linHeight: "20px",
        }}>
            <div style={{color: "#000", fontFamily: "Arimo", fontSize: "16px", fontStyle: "normal", fontWeight: "400", marginBottom: "12px"}}>{event.name}</div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <img src="/time.png" alt="date" style={{ width: "16px", height: "16px" }} />
                    {new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric" }).format(new Date(event.start_date))}
                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img src={"/location.png"} alt={"location"}/> {event.location}
            </div>
        </div>
    </div>
  );
}
