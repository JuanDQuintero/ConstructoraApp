import { useState, useEffect } from 'react';
import { useMapEvents } from 'react-leaflet';
import { Marker, Popup } from 'react-leaflet';
import { Modal, Box, Typography } from '@mui/material';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const LocationControl = () => {
  const [position, setPosition] = useState(null);
  const [selectedPosition, setSelectedPosition] = useState([0, 0]);
  const [open, setOpen] = useState(false);
  const [empresaName, setEmpresaName] = useState('');
  const { user, getAccessTokenSilently } = useAuth0();

  const handleClose = () => setOpen(false);

  const handleSave = async (userName, userId) => {
    const locationData = {
      lt: selectedPosition[0],
      lg: selectedPosition[1],
      name: empresaName,
      userName: userName,
      userId: userId,
    };
  
    try {
      const token = await getAccessTokenSilently(); // Obtener el token de acceso

      const response = await axios.post(
        "http://localhost:3000/api/location",
        locationData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Agregar el token de autorización al encabezado
          },
        }
      );
  
      console.log("Ubicación guardada:", response.data);
      setOpen(false);
    } catch (error) {
      console.error("Error al guardar la ubicación:", error);
    }
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      setPosition([location.coords.latitude, location.coords.longitude]);
    });
  }, []);

  
  useMapEvents({
    dblclick(e) {
      setSelectedPosition([e.latlng.lat, e.latlng.lng]);
      setOpen(true);
    },
  });

  const handleInputChange = (e) => {
    setEmpresaName(e.target.value);
  };

  return position === null ? null : (
    <>
      <Marker position={position}>
        <Popup>Tú estás aquí.</Popup>
      </Marker>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className='edit-container'>
              <label htmlFor="name_company" className="block mb-2 text-sm font-medium text-gray-900 ">Nombre de la empresa</label>
              <input type="text" id="name_company" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nombre empresa" required value={empresaName} onChange={handleInputChange} />
            </div>
            <button className="flex mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600  dark:focus:ring-blue-800"
              onClick={() => handleSave(user.name, user.sub)}>Guardar</button>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default LocationControl;
