import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ButtonsLogin from "./components/Navigation/ButtonsLogin";
import { useAuth0 } from "@auth0/auth0-react";
import Profile from "./pages/Profile";
import AdminPage from "./pages/AdminPage";
import Map from "./pages/Map";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  if (isLoading) {
    return (
      <div className="page-layout">
        <p>Loading ...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/profile" />
            
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="/login" element={<ButtonsLogin />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/map" element={<Map />} />
        
    </Routes>
  );
}

export default App;
