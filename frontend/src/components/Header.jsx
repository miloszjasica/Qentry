import { useState, useEffect } from "react";

export default function Header({ search, setSearch, isExpanded }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/users/me/", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();

    const handleAuthChange = () => {
      fetchUser();
    };

    window.addEventListener("auth-change", handleAuthChange);

    return () => {
      window.removeEventListener("auth-change", handleAuthChange);
    };
  }, []);

  // Logowanie dla sprawdzenia
  console.log("Header user data:", user);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: isExpanded ? 256 : 80,
        right: 0,
        height: "72px",
        background: "white",
        borderBottom: "1px #D1D5DC solid",
        display: "flex",
        alignItems: "center",
        paddingLeft: "40px",
        paddingRight: "40px",
        justifyContent: "space-between",
        zIndex: 100,
        transition: "left 0.3s"
      }}
    >
      <div style={{ fontSize: 24, fontFamily: "Arimo" }}>
        Witaj{user && user.name ? `, ${user.name}!` : '!'}
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
          onClick={() => alert("Tu trzeba zmienic logike powiadomień")}
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