export default function Navbar() {
  return (
    <nav style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      width: "256px",
      height: "100vh",
      background: "#544E61",
      boxShadow: "2px 0 8px rgba(0,0,0,0.1)",
      position: "fixed",
      top: 0,
      left: 0,
    }}>
      
      <div style={{color: 'white', fontSize: 16, fontFamily: 'Arimo', fontWeight: '400', wordWrap: 'break-word'}}>QuentRy</div>
      {/* tutaj później linki/menu */}
    </nav>
  );
}
