import { useAuth0 } from "@auth0/auth0-react";
import LogoutButton from "./Buttons/LogoutButton";
import MapButton from "./Buttons/MapButton";
import { useLocation } from "react-router-dom";
import HomeButton from "./Buttons/BackHomeButton";


const Navbar = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();

  const showMapButton = location.pathname !== "/map";

  return (
    <nav className="border-gray-200 bg-gradient-to-r from-red-800 via-yellow-600 to-yellow-500 dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 ">
        <a className="flex items-center ">
          <img
            src="../src/assets/xd.png"
            className="h-16 mr-3"
            alt="Casco logo"
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Gestiona tu constructora
          </span>
        </a>
        {isAuthenticated && (
          <div className="flex justify-end gap-6">
          {showMapButton ? <MapButton /> : <HomeButton />}

          <LogoutButton />
          </div>
          
        )}
      </div>
    </nav>
  );
};

export default Navbar;
