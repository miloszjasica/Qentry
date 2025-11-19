import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div style={{ display: "flex" }}>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Home />
      </div>
    </div>
    </Router>
  );
}

export default App;
