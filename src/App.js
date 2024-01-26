import "./App.css";
import "./styles.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import NavBar from "./NavBar";

function App() {
  return (
    <div className="App">
      <GoogleOAuthProvider clientId="747162908197-oa2drb4bgh86gn4sc9jg72q4hv83h2f9.apps.googleusercontent.com">
        <NavBar />
      </GoogleOAuthProvider>
    </div>
  );
}

export default App;
