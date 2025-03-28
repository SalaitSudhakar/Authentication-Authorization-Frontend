import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const { userData, backendUrl, setUserData, setIsLoggedIn } =
    useContext(AppContext);

  const logout = async () => {
    try {
      axios.defaults.withCredentials = true;

      const response = await axios.post(backendUrl + '/api/auth/logout')
      toast.success(response.data.message);
      setIsLoggedIn(false);
      setUserData('')
      navigate('/')

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;

      const response = await axios.post(backendUrl + '/api/auth/send-verify-otp');

      navigate('/verify-email')
      toast.success(response.data.message)
    } catch (error) {
      toast.error(error.message)
    }
  }


  return (
    <div className="w-full flex justify-between items-center p-4 sm:p-6 sm:px-25 absolute top-0">
      <img src={assets.logo} alt="logo" className="w-28 sm:w-52" />
      {userData ? (
        <div className="w-8 h-8 flex justify-center items-center rounded-full bg-indigo-600 text-white relative group">
          {userData.name[0].toUpperCase()}

          <div className="absolute hidden group-hover:block top-0 right-0 z-10 text-black rounded pt-10">
            <ul className="list-none m-0 p-2 bg-gra-100 text-sm">
              {!userData.isAccountVerified && (
                <li onClick={sendVerificationOtp} className="px-2 py-1 hover:bg-gray-200 cursor-pointer">
                  Verify Email
                </li>
              )}

              <li onClick={logout} className="px-2 py-1 hover:bg-gray-200 cursor-pointer pr-10">
                Logout
              </li>
            </ul>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 border border-black text-gray-800   rounded-full px-6 py-2 hover:bg-gray-100 transition-all"
        >
          <img src={assets.arrow_icon} alt="arrow right icon" />
          Login
        </button>
      )}
    </div>
  );
};

export default Navbar;
