import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../components/Navbar";

const AdminPage = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);
  const [locations, setLocations] = useState([]);


  const locationsAdmin = async (token) => {
    try {
      const response =await axios.get("http://localhost:3000/api/locations", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLocations(response.data)
      setIsAdmin(true);
    } catch (error) {
      console.error("Error al enviar los datos del usuario al back-end", error);
    }
  };

  const deleteLocation = async (locationId) => {
    try {
      const token = await getAccessTokenSilently({
        audience: "https://hello-world.example.com/",
      });
  
      await axios.delete(`http://localhost:3000/api/locations/${locationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      // Actualizar la lista de ubicaciones eliminando la ubicación eliminada
      setLocations((prevLocations) =>
        prevLocations.filter((location) => location._id !== locationId)
      );
    } catch (error) {
      console.error("Error al eliminar la ubicación", error);
    }
  };

  useEffect(() => {
   const fetchData = async () => {
      if (isAuthenticated) {
        try {
          const token = await getAccessTokenSilently(
            {
              audience: "https://hello-world.example.com/",
            }
          );
          locationsAdmin(token);
        } catch (error) {
          console.error("Error al obtener locaciones", error);
        }
      }
    };
    fetchData();
  }, [isAuthenticated, getAccessTokenSilently]);

return (
  <div className="flex-grow">        
    <Navbar />
    {isAdmin ? (
      <div className="p-10">
        <div className="flex justify-center items-center flex-col py-8 gap-4">
            <h1 className="text-4xl">Contenido para administradores</h1> 
        </div>
        <h2 className="text-2xl font-bold mb-4">Constructoras registradas:</h2>
        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Nombre
                </th>
              
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Constructora registrada
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {locations.map((location) => (
      
                  <tr key={location._id}>
                    <td className="px-6 py-4 whitespace-nowrap">{location.userName}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{location.name}</td>      
                    <div className="h-max flex text-center items-center py-4">
                      <button onClick={() => deleteLocation(location._id)} className="text-red-500 hover:text-red-700">Eliminar</button>
                    </div> 
                  </tr>  
                
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-center text-xl pt-5">Contenido solo para administradores</h1>
        <button
          className="flex  mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600  dark:focus:ring-blue-800"
        >
          Volver
        </button>
      </div>)}
  </div>
  );


};

export default AdminPage;