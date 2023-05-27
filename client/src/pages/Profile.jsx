import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import {Navigate } from "react-router-dom";


const Profile = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);

  const saveUserProfile = async (name, email, token,isAdmin) => {
    try {
      const response = await axios.post("http://localhost:3000/api/user", {
        name,
        email,
        isAdmin
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      console.log("Usuario guardado en el backend:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error al guardar el usuario en el backend:", error);
      throw error;
    }
  };

  const saveAdmin = async (token) => {
    try {
      await axios.get("http://localhost:3000/api/admin", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setIsAdmin(true);
    } catch (error) {
      console.error("Error al enviar los datos del usuario al back-end", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (isAuthenticated && user) {
        try {
          
          const token = await getAccessTokenSilently(
            {
              audience: "https://hello-world.example.com/",
            }
          );
          saveUserProfile(user.name, user.email, token);       

          saveAdmin(token);
          console.log("Token JWT obtenido correctamente", user);
        } catch (error) {
          console.error("Error al obtener el token JWT", error);
        }
      }
    };
    fetchData();
  }, [isAuthenticated, user, getAccessTokenSilently]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!isAuthenticated) {
    return <div>No autenticado</div>;
  }

  return (
    <div>
    <Navbar />
      {isAdmin ?     
        <Navigate to="/admin" />
      : 
        <h1 className=" text-center text-xl pt-5">Contenido para usuarios no administradores</h1>}
        
    </div>
  );
};

export default Profile;
