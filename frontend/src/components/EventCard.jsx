export default function EventCard({ event, onOpen }) {
  const imageUrl = event.image || "/ImageWithFallback.png";
  const category = event.category || "Inne";

  const dateObj = new Date(event.start_date);
  const date = new Intl.DateTimeFormat("pl-PL", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(dateObj);

  const time = new Intl.DateTimeFormat("pl-PL", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(dateObj);

  return (
    <div
      onClick={() => onOpen(event)}
      style={{
        cursor: "pointer",
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* IMAGE */}
      <div style={{ position: "relative", width: "100%" }}>
        <img
          src={imageUrl}
          alt={event.name}
          style={{
            width: "100%",
            height: "180px",
            objectFit: "cover",
            borderTopLeftRadius: "14px",
            borderTopRightRadius: "14px",
            display: "block",
          }}
        />

        {/* CATEGORY */}
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            padding: "4px 12px",
            background: "#544E61",
            borderRadius: "999px",
            color: "white",
            fontSize: "14px",
            fontFamily: "Arimo",
          }}
        >
          {category}
        </div>
      </div>

      {/* CONTENT */}
      <div
        style={{
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          border: "1px solid #E2E8F0",
          borderTop: "none",
          borderBottomLeftRadius: "14px",
          borderBottomRightRadius: "14px",
          backgroundColor: "#fff",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          flexGrow: 1,
        }}
      >
        <div
          style={{
            fontSize: "16px",
            fontWeight: "600",
            color: "#000",
            fontFamily: "Arimo",
          }}
        >
          {event.name}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#4A5565",
            fontSize: "14px",
          }}
        >
          <img src="/time.png" alt="date" width={16} height={16} />
          {date} · {time}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            color: "#4A5565",
            fontSize: "14px",
          }}
        >
          <img src="/location.png" alt="location" width={16} height={16} />
          {event.location}
        </div>
      </div>
    </div>
  );
}
