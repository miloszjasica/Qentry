import { useState, useEffect } from "react";

export default function Header({
  search,
  setSearch,
  isExpanded,
  isMobile,
  isOpen,
  setIsOpen,
}) {
  const [user, setUser] = useState(null);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const fetchUser = async () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setUser(null);
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/users/me/", {
        headers: { Authorization: `Bearer ${token}` },
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
    const handleAuthChange = () => fetchUser();
    window.addEventListener("auth-change", handleAuthChange);
    return () =>
      window.removeEventListener("auth-change", handleAuthChange);
  }, []);

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: 0,
          left: isMobile ? 0 : isExpanded ? 256 : 80,
          right: 0,
          height: "72px",
          background: "white",
          borderBottom: "1px solid #D1D5DC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
          zIndex: 100,
          transition: "left 0.3s",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {isMobile && (
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img src="/burger.svg" alt="Menu" width={24} height={24} />
            </button>
          )}

          <div style={{ fontSize: 24, fontFamily: "Arimo" }}>
            Witaj{user?.name ? `, ${user.name}!` : "!"}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {!isMobile && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "white",
                  padding: "6px 12px",
                  borderRadius: 8,
                  border: "1px solid #D1D5DC",
                  width: 384,
                }}
              >
                <img
                  src="/Search.png"
                  alt="search"
                  style={{ width: 20, height: 20, marginRight: 12 }}
                />
                <input
                  type="text"
                  placeholder="Wyszukaj wydarzenie..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  style={{
                    border: "none",
                    background: "transparent",
                    outline: "none",
                    fontSize: 16,
                    width: "100%",
                    fontFamily: "Arimo",
                  }}
                />
              </div>
            )}
            {isMobile && !showMobileSearch && (
              <button
                onClick={() => setShowMobileSearch(true)}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                <img src="/blacksearch.svg" alt="Szukaj" width={40} height={40} />
              </button>
            )}
          </div>
        </div>
      </div>


      {isMobile && showMobileSearch && (
        <div
          style={{
            
            top: 72,
            left: 0,
            right: 0,
            padding: 12,
            background: "white",
            borderBottom: "1px solid #D1D5DC",
            zIndex: 200,
            display: "flex",
            gap: 8,
          }}
        >
          <input
            autoFocus
            type="text"
            placeholder="Wyszukaj wydarzenie..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              flex: 1,
              padding: "10px 12px",
              fontSize: 16,
              borderRadius: 8,
              border: "1px solid #D1D5DC",
              fontFamily: "Arimo",
            }}
          />

          <button
            onClick={() => setShowMobileSearch(false)}
            style={{
              background: "transparent",
              border: "none",
              fontSize: 18,
              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>
      )}
    </>
  );
}
