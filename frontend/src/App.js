import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ marginLeft: "296px", flex: 1,}}>
        <Home />
      </div>
    </div>
  );
}

export default App;
