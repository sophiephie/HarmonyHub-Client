import "./App.css";
import "./styles.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./pages/home";
import NavBar from "./NavBar";

function App() {
  return (
    <GoogleOAuthProvider clientId="747162908197-oa2drb4bgh86gn4sc9jg72q4hv83h2f9.apps.googleusercontent.com">
      <NavBar />
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
    </GoogleOAuthProvider>
  );
}

export default App;
