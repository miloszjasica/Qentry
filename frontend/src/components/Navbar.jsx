  import { useEffect, useState } from "react";
  import { NavLink } from "react-router-dom";
  import { useIsMobile } from "../hooks/useIsMobile";

  export default function Navbar({
    isExpanded,
    setIsExpanded,
    isOpen,
    setIsOpen,
  }) {
    const [user, setUser] = useState(null);
    const isMobile = useIsMobile();

    const fetchUser = async () => {
      const token = localStorage.getItem("access");
      if (!token) return setUser(null);

      try {
        const res = await fetch("/api/users/me/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!data.detail) setUser(data);
        else setUser(null);
      } catch {
        setUser(null);
      }
    };

    useEffect(() => {
      fetchUser();
      const handler = () => fetchUser();
      window.addEventListener("auth-change", handler);
      return () => window.removeEventListener("auth-change", handler);
    }, []);

    useEffect(() => {
      if (isMobile) setIsExpanded(true);
    }, [isMobile, setIsExpanded]);

    return (
      <>
        {isMobile && isOpen && (
          <div
            onClick={() => setIsOpen(false)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(0,0,0,0.4)",
              zIndex: 998,
            }}
          />
        )}

        <nav
          style={{
            position: "fixed",
            top: 0,
            left: isMobile ? (isOpen ? 0 : "-100vw") : 0,
            width: isMobile ? "100vw" : isExpanded ? 256 : 80,
            height: "100dvh",
            background: "#544E61",
            display: "flex",
            flexDirection: "column",
            transition: "all 0.3s",
            zIndex: 999,
            boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
          }}
        >
          
          {isMobile && (
            <button
              onClick={() => setIsOpen(false)}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <img src="/close.svg" width={42} />
            </button>
          )}

          {!isMobile && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              style={{
                position: "absolute",
                top: 75,
                right: -12,
                background: "#9893DA",
                border: "none",
                borderRadius: "50%",
                width: 24,
                height: 24,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <img
                src={isExpanded ? "/arrowLeft.svg" : "/arrowRight.svg"}
                width={16}
              />
            </button>
          )}

          <div
            style={{
              height: 72,
              borderBottom: "1px solid #6D5F7A",
              display: "flex",
              alignItems: "center",
              paddingLeft: 24,
              color: "white",
              fontFamily: "Arimo",
            }}
          >
            {isExpanded && "QentRy"}
          </div>

          <div style={{ padding: 16, flex: 1 }}>
            {[
              ["/", "Home.svg", "Strona Główna"],
              ["/biore-udzial", "Saved.png", "Biorę udział"],
              ["/w-poblizu", "Localization.png", "W pobliżu"],
              ["/profil", "Profile.png", "Profil"],
            ].map(([to, icon, label]) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => {
                  if (isMobile) setIsOpen(false);
                }}
                style={({ isActive }) => ({
                  display: "flex",
                  alignItems: "center",
                  padding: "12px 12px",
                  marginBottom: 8,
                  borderRadius: 10,
                  textDecoration: "none",
                  background: isActive ? "#9893DA" : "transparent",
                  color: isActive ? "black" : "white",
                })}
              >
                {({ isActive }) => (
                  <>
                    <img
                      src={`/${icon}`}
                      width={20}
                      height={20}
                      style={{
                        filter: isActive
                          ? "brightness(0) invert(0)"
                          : "brightness(0) invert(1)"
                      }}
                    />
                    {isExpanded && (
                      <span style={{ marginLeft: 12, whiteSpace: "nowrap" }}>
                        {label}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          <div style={{ padding: 16, borderTop: "1px solid #6D5F7A" }}>
            <button
              onClick={() => {
                localStorage.clear();
                window.location.href = user ? "/" : "/login";
              }}
              style={{
                padding: "0px 12px",
                background: "transparent",
                border: "none",
                color: "white",
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                width: "100%",
              }}
            >
              <img src="/logout.svg" width={20} />
              {isExpanded && (
                <span style={{ marginLeft: 12 }}>
                  {user ? "Wyloguj" : "Zaloguj"}
                </span>
              )}
            </button>
          </div>
        </nav>
      </>
    );
  }
