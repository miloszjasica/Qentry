export default function EventCard({ event, onOpen, onCategoryClick }) {
    const imageUrl = event.image 
    ? event.image 
    : "/ImageWithFallback.png";
    const category = event.category || "Inne";
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

  return (
    <div onClick={() => onOpen(event)} style={{ cursor: "pointer" }}>
        <div style={{ position: "relative" }}>
            <img 
                src={imageUrl} 
                alt={event.name} 
                style={{ 
                    width: "314px", 
                    height: "177px", 
                    objectFit: "cover",
                    borderTopLeftRadius: "14px",
                    borderTopRightRadius: "14px",
                    display: "block" 
                }} 
            />
            <div style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                width: '71px', 
                height: '26px', 
                background: '#544E61', 
                borderRadius: '37282700px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div style={{
                    color: 'white', 
                    fontSize: 14, 
                    fontFamily: 'Arimo', 
                    fontWeight: '400', 
                    lineHeight: '20px', 
                    wordWrap: 'break-word'
                }}>
                    {category}
                </div>
            </div>

        </div>
        <div style={{
            display: "flex",
            height: "auto",      
            padding: "20px 20px 20px 20px",
            Width: "250px",
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
                    {date + " · " + time}

                </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <img src={"/location.png"} alt={"location"}/> {event.location}
            </div>
        </div>
    </div>
  );
}
