import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Navbar({ isExpanded, setIsExpanded }) {
  const [user, setUser] = useState(null);

  const fetchUser = async () => {
    const token = localStorage.getItem("access");
    if (!token) return setUser(null);

    try {
      const res = await fetch("http://localhost:8000/api/users/me/", {
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await res.json();
      if (!data.detail) setUser(data);
      else setUser(null);
    } catch (err) {
      console.error(err);
      setUser(null);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <nav style={{
      display: "flex",
      flexDirection: "column",
      width: isExpanded ? 256 : 80,
      transition: "width 0.3s",
      overflow: "visible",
      height: "100vh",
      background: "#544E61",
      boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
      position: "fixed",
      top: 0,
      left: 0,
    }}>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          style={{
            position: "absolute",
            top: "75px",
            right: "-12px",
            background: "#9893DA",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: "24px",
            borderRadius: "50%",
            width: "24px",
            height: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000
          }}
        >
          <img
            src={isExpanded ? "/arrowLeft.svg" : "/arrowRight.svg"}
            alt={isExpanded ? "Collapse" : "Expand"}
            style={{ width: "16px", height: "16px" }}
          />
        </button>

      <div style={{
        width: '100%',
        height: '72px',
        borderBottom: '1px #6D5F7A solid',
        display: 'inline-flex',
        alignItems: "center",
        justifyContent: 'space-between'
      }}>
        <div style={{width: 64, height: 24, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start'}}>
          <div style={{color: 'white', fontSize: 16, fontFamily: 'Arimo', fontWeight: '400', paddingLeft: 24, paddingRight: 24}}>
            {isExpanded && <div>QentRy</div>}
          </div>
        </div>
      </div>

      <div style={{ width: "100%", padding: "16px", boxSizing: "border-box", flex: 1 }}>

        <NavLink to="/" style={({ isActive }) => ({
          padding: '12px 16px',
          display: "flex",
          alignItems: 'center',
          textDecoration: 'none',
          borderRadius: '10px',
          background: isActive ? '#9893DA' : 'transparent',
          color: isActive ? 'black' : 'white',
          marginBottom: "8px",
          minHeight: "48px"
        })}>
          {({ isActive }) => (
            <>
              <img src="/Home.png" alt="Home Page" style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', marginRight: isExpanded ? "12px" : "0",  filter: isActive ? "none" : "invert(1)" }} />
              {isExpanded && <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: isActive ? 'black' : 'white', whiteSpace: 'nowrap', overflow: 'hidden' }}>Strona Główna</div>}
            </>
          )}
        </NavLink>
        <NavLink to="/biore-udzial" style={({ isActive }) => ({
          padding: '12px 16px',
          display: "flex",
          alignItems: 'center',
          textDecoration: 'none',
          borderRadius: '10px',
          background: isActive ? '#9893DA' : 'transparent',
          color: isActive ? 'black' : 'white',
          marginBottom: "8px",
          minHeight: "48px"
        })}>
          {({ isActive }) => (
            <>
              <img src="/Saved.png" alt="Saved" style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', marginRight: "12px", filter: isActive ? "invert(1)" : "brightness(100%)" }} />
              {isExpanded && <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: isActive ? 'black' : 'white', whiteSpace: 'nowrap', overflow: 'hidden' }}>Biorę udział</div>}
            </>
          )}
        </NavLink>

        <NavLink to="/w-poblizu" style={({ isActive }) => ({
          padding: '12px 16px',
          display: "flex",
          alignItems: 'center',
          textDecoration: 'none',
          borderRadius: '10px',
          background: isActive ? '#9893DA' : 'transparent',
          color: isActive ? 'black' : 'white',
          marginBottom: "8px",
          minHeight: "48px"
        })}>
          {({ isActive }) => (
            <>
              <img src="/Localization.png" alt="Nearby" style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', marginRight: "12px", filter: isActive ? "invert(1)" : "brightness(100%)" }} />
              {isExpanded && <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: isActive ? 'black' : 'white', whiteSpace: 'nowrap', overflow: 'hidden' }}>W pobliżu</div>}
            </>
          )}
        </NavLink>

        <NavLink to="/profil" style={({ isActive }) => ({
          padding: '12px 16px',
          display: "flex",
          alignItems: 'center',
          textDecoration: 'none',
          borderRadius: '10px',
          background: isActive ? '#9893DA' : 'transparent',
          color: isActive ? 'black' : 'white',
          minHeight: "48px"
        })}>
          {({ isActive }) => (
            <>
              <img src="/Profile.png" alt="Profile" style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', marginRight: "12px", filter: isActive ? "invert(1)" : "brightness(100%)" }} />
              {isExpanded && <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: isActive ? 'black' : 'white', whiteSpace: 'nowrap', overflow: 'hidden' }}>Profil</div>}
            </>
          )}
        </NavLink>

        {user?.role === "organizer" && (
          <NavLink to="/createevent" style={{
            padding: '12px 16px',
            display: "flex",
            alignItems: 'center',
            textDecoration: 'none',
            borderRadius: '10px',
            background: '#157145',
            color: 'white',
            marginTop: "24px",
            minHeight: "48px"
          }}>
            <img src="/plus.png" alt="Dodaj wydarzenie" style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', marginRight: "12px", filter: "brightness(100%)" }} />
            {isExpanded && <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: 'white', whiteSpace: 'nowrap', overflow: 'hidden' }}>Dodaj wydarzenie</div>}
          </NavLink>
        )}

      </div>
      <div style={{ padding: '16px', borderTop: '1px #6D5F7A solid', }}>
        <div style={{
          width: '100%',
          display: 'inline-flex',
          alignItems: "center",
        }}>
          <div style={{display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', width: '100%'}}>
              <button
                onClick={async () => {
                  if (user) {
                    try {
                      await fetch("http://localhost:8000/api/users/logout/", {
                        method: "POST",
                        headers: {
                          "Accept": "application/json",
                          "Content-Type": "application/json",
                          "Authorization": `Bearer ${localStorage.getItem("access")}`
                        }
                      });
                    } catch (error) {
                      console.error("Logout error:", error);
                    }
                    localStorage.removeItem("access");
                    localStorage.removeItem("refresh");
                    setUser(null);
                    window.location.href = "/";
                  } else {
                    window.location.href = "/login";
                  }
                }}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontFamily: 'Arimo',
                  fontSize: '16px',
                  fontWeight: '400',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                  padding: '12px 16px',
                  alignItems: 'center',
                  display: 'flex',
                  minHeight: "48px"
                }}
              >
                <img 
                  src={user ? "/logout.svg" : "/logout.svg"}
                  alt={user ? "Wyloguj" : "Zaloguj"} 
                  style={{ width: '20px', height: '20px', minWidth: '20px', minHeight: '20px', marginRight: '12px' }} 
                />
                {isExpanded && (user ? "Wyloguj" : "Zaloguj")}

              </button>
          </div>
        </div>
      </div>

    </nav>
  );
}
