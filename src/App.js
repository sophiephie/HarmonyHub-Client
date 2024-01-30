import "./App.css";
import "./styles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/navBar";
import Dashboard from './pages/adminDashboard';

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="747162908197-oa2drb4bgh86gn4sc9jg72q4hv83h2f9.apps.googleusercontent.com">
        <Router>
          <NavBar />
          <Routes>
            <Route path="/admin/" element={<Dashboard />} />
          </Routes>

        </Router>
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
