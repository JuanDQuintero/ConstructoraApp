import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import 'leaflet/dist/leaflet.css'
import AuthProvider from "./utils/auth0provider.jsx";
import { BrowserRouter } from "react-router-dom";

//const domain = process.env.REACT_APP_AUTH0_DOMAIN; 

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
);
