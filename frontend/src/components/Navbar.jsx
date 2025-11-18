import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/users/me/", {
      headers: {
        "Accept": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    })
    .then(res => res.json())
    .then(data => {
      if (!data.detail) {
        setUser(data);
      }
    })
    .catch(err => console.error("Fetch error:", err));
  }, []);

  return (
    <nav style={{
      display: "flex",
      flexDirection: "column",
      width: "256px",
      height: "100vh",
      background: "#544E61",
      boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
      position: "fixed",
      top: 0,
      left: 0,
    }}>

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
            QentRy
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
          marginBottom: "8px"
        })}>
          {({ isActive }) => (
            <>
              <img src="/Home.png" alt="Home Page" style={{ width: '20px', height: '20px', marginRight: "12px", filter: isActive ? "none" : "invert(1)" }} />
              <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: isActive ? 'black' : 'white' }}>Strona Główna</div>
            </>
          )}
        </NavLink>

        <NavLink to="/polubione" style={({ isActive }) => ({
          padding: '12px 16px',
          display: "flex",
          alignItems: 'center',
          textDecoration: 'none',
          borderRadius: '10px',
          background: isActive ? '#9893DA' : 'transparent',
          color: isActive ? 'black' : 'white',
          marginBottom: "8px"
        })}>
          {({ isActive }) => (
            <>
              <img src="/heart.png" alt="Favorites" style={{ width: '20px', height: '20px', marginRight: "12px", filter: isActive ? "invert(1)" : "brightness(100%)" }} />
              <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: isActive ? 'black' : 'white' }}>Polubione</div>
            </>
          )}
        </NavLink>

        <NavLink to="/biorę-udział" style={({ isActive }) => ({
          padding: '12px 16px',
          display: "flex",
          alignItems: 'center',
          textDecoration: 'none',
          borderRadius: '10px',
          background: isActive ? '#9893DA' : 'transparent',
          color: isActive ? 'black' : 'white',
          marginBottom: "8px"
        })}>
          {({ isActive }) => (
            <>
              <img src="/Saved.png" alt="Saved" style={{ width: '20px', height: '20px', marginRight: "12px", filter: isActive ? "invert(1)" : "brightness(100%)" }} />
              <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: isActive ? 'black' : 'white' }}>Biorę udział</div>
            </>
          )}
        </NavLink>

        <NavLink to="/w-pobliżu" style={({ isActive }) => ({
          padding: '12px 16px',
          display: "flex",
          alignItems: 'center',
          textDecoration: 'none',
          borderRadius: '10px',
          background: isActive ? '#9893DA' : 'transparent',
          color: isActive ? 'black' : 'white',
          marginBottom: "8px"
        })}>
          {({ isActive }) => (
            <>
              <img src="/Localization.png" alt="Nearby" style={{ width: '20px', height: '20px', marginRight: "12px", filter: isActive ? "invert(1)" : "brightness(100%)" }} />
              <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: isActive ? 'black' : 'white' }}>W pobliżu</div>
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
        })}>
          {({ isActive }) => (
            <>
              <img src="/Profile.png" alt="Profile" style={{ width: '20px', height: '20px', marginRight: "12px", filter: isActive ? "invert(1)" : "brightness(100%)" }} />
              <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: isActive ? 'black' : 'white' }}>Profil</div>
            </>
          )}
        </NavLink>

        {user?.role === "organizer" && (
          <NavLink to="/stwórz-wydarzenie" style={{
            padding: '12px 16px',
            display: "flex",
            alignItems: 'center',
            textDecoration: 'none',
            borderRadius: '10px',
            background: '#157145',
            color: 'white',
            marginTop: "24px"
          }}>
            <img src="/plus.png" alt="Dodaj wydarzenie" style={{ width: '20px', height: '20px', marginRight: "12px", filter: "brightness(100%)" }} />
            <div style={{ fontFamily: 'Arimo', fontSize: '16px', color: 'white' }}>Dodaj wydarzenie</div>
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
                onClick={() => {
                  if (user) {
                    localStorage.removeItem("token");
                    window.location.reload();
                  } else {
                    window.location.href = "/"; //trzeba dodac link do logowania
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
                  display: 'flex'
                }}
              >
                <img 
                  src={user ? "/logout.svg" : "/login-icon.png"} //dodac ikony
                  alt={user ? "Wyloguj" : "Zaloguj"} 
                  style={{ width: '20px', height: '20px', marginRight: '12px' }} 
                />
                {user ? "Wyloguj" : "Zaloguj"}
              </button>
          </div>
        </div>
      </div>

    </nav>
  );
}
