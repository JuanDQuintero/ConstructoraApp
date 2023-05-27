import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "../Buttons/LoginButton";
import LogoutButton from "../Buttons/LogoutButton";
import SignupButton from "../Buttons/SignUpButton";
import Navbar from "../Navbar";


const ButtonsLogin = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <div className="nav-bar__buttons">
      {!isAuthenticated && (
        <>
        
          <div className="h-screen w-full container ">
            <Navbar />
            <div className="flex justify-center overflow-hidden">
              <div className="shadow-lg bg-white rounded-lg mt-16 p-14  hover:shadow-2xl flex flex-col items-center ">
                <h1 className="text-2xl font-semibold text-gray-900 pb-3 border-b-2">
                  Inicia sesión
                </h1>
                <LoginButton />
                <SignupButton />
                
              </div>
            </div>
          </div>
        </>
      )}
      {isAuthenticated && (
        <>
          <div className="flex justify-center">
            <h2 className="text-2xl">
              Estas registrado, ¿quieres cerrar sesión?
            </h2>
            <LogoutButton />
          </div>
        </>
      )}
    </div>
  );
};

export default ButtonsLogin;
