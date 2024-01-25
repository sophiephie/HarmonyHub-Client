import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/home";

function App() {
  return (
    <div className="App">
      <h1>WELCOME TO HARMONY HUB</h1>
      <h2>PLACE HOLDER</h2>
      <Router>
        <div className="navbar">
          <Link to="/">Home</Link>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
