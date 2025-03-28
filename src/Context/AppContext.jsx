import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();
axios.defaults.withCredentials = true;

const AppContextProvider = ({ children }) => {

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState('');

  const getAuthState = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/auth/is-auth");

      if (response.data.success) {
        setIsLoggedIn(true);
        getUserData();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/user/data");
      console.log(response.data);
      response.data.success
        ? setUserData(response.data.userData)
        : toast.error(response.data.message);
    } catch (error) {
      console.log(error);
      toast.error(
        error.response?.data?.message ||
          "An error occurred while fetching user data"
      );
    }
  };

  useEffect(() => {
    getAuthState();
  }, [])

  const value = {
    backendUrl,
    isLoggedIn,
    setIsLoggedIn,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>{children}</AppContext.Provider>
  );
};

export default AppContextProvider