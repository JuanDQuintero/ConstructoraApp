import { useAuth0 } from "@auth0/auth0-react";
import { useState } from "react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  const [isLoadingBackend, setIsLoadingBackend] = useState(false);

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
    });
    setIsLoadingBackend(true);
  };

  return (
    <div>
      <button
        type="submit"
        className="flex mt-10 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600  dark:focus:ring-blue-800"
        onClick={handleLogin} disabled={isLoadingBackend}
      >
        Ingresar
      </button>
    </div>
  );
};

export default LoginButton;
