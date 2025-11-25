export default function Header({ user, search, setSearch }) {

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: "256px",
        right: 0,
        height: "72px",
        background: "white",
        borderBottom: "1px #D1D5DC solid",
        display: "flex",
        alignItems: "center",
        paddingLeft: "40px",
        paddingRight: "40px",
        justifyContent: "space-between",
        zIndex: 100
      }}
    >
      <div style={{ fontSize: 24, fontFamily: "Arimo" }}>
        Witaj{user?.name ? `, ${user.name}!` : '!'}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "white",
            padding: "6px 12px",
            borderRadius: "8px",
            border: "1px solid #D1D5DC",
            width: "384px",
          }}
        >
          <img src="/Search.png" alt="search" style={{ width: "20px", height: "20px", marginRight: "12px" }} />
          <input
            type="text"
            placeholder="Wyszukaj wydarzenie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              border: "none",
              background: "transparent",
              outline: "none",
              fontSize: "16px",
              width: "100%",
              fontFamily: "Arimo",
            }}
          />
        </div>
        <button
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "transparent",
            border: "none",
            cursor: "pointer",
            padding: 0
          }}
          onClick={() => alert("Tu trzeba zmienic logike")} //trzeba zmienic tu logike
        >
          <img
            src="/Notifications.svg"
            alt="Powiadomienia"
            style={{ width: "20px", height: "20px" }}
          />
        </button>
      </div>
    </div>
  );
}
