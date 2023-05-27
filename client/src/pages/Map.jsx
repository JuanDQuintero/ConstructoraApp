import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import Navbar from "../components/Navbar";
//import axios from "axios";
import LocationControl from '../components/Leaflet/LocationControl';


const Map = () => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      const map = mapRef.current.leafletElement;
      map.setView([6.244203, -75.581211], 13); // Ubicación de Medellín, Colombia con nivel de zoom 13
    }
  }, []);

  return (
    <div className='w-full h-screen'>
      <Navbar />
      <div className=' h-5/6'>
        <MapContainer center={[6.244203, -75.581211]} zoom={13} style={{ height: '100%' }} ref={mapRef}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <LocationControl />
        </MapContainer>
      </div>
    </div>
  );

};

export default Map;
