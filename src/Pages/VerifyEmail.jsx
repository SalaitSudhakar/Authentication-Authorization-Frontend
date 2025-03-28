import React, { useContext, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppContext } from "../Context/AppContext";
import axios from "axios";

const VerifyEmail = () => {
  const inputRefs = useRef([]);
  const { backendUrl, isLoggedIn, userData, getUserData } =
    useContext(AppContext);
  const navigate = useNavigate();

  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    axios.defaults.withCredentials = true;

    try {
      e.preventDefault();
      const otpArray = inputRefs.current.map((e) => e.value);
      const otp = otpArray.join("");

      const response = await axios.post(
        backendUrl + "/api/auth/verify-account",
        { otp }
      );

      await getUserData();   
      toast.success(response.data.message);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasterArray = paste.split("");
    pasterArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  useEffect (() => {
    isLoggedIn && userData && userData.isAccountVerified && navigate('/')
  }, [isLoggedIn, userData, navigate])


  return (
    <div className="flex items-center justify-center min-h-screen px-3 sm:px-0 bg-gradient-to-br from-blue-300 to-purple-500">
      <Link to={"/"}>
        <img
          src={assets.logo}
          alt=""
          className="absolute left-1/2 sm:left-20 top-5 w-24 sm:w-32 cursor-pointer"
        />
      </Link>
      <form
        onSubmit={handleSubmit}
        className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
      >
        <h1 className="text-white text-2xl font-semibold text-center mb-4">
          Verify Your Email
        </h1>
        <p className="text-center text-indigo-300">
          Enter the 6-digit OTP sent to your email ID
        </p>

        <div className="flex justify-center mb-8 mt-5" onPaste={handlePaste}>
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <input
                type="text"
                maxLength={1}
                key={index}
                required
                ref={(e) => (inputRefs.current[index] = e)}
                className="w-12 m-1  h-12 bg-[#333A5C] text-gray-200 text-center text-xl rounded-lg focus:outline-purple-600 focus:ring-2 focus:ring-purple-900"
                onInput={(e) => handleInput(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-full"
        >
          Verify
        </button>
      </form>
    </div>
  );
};

export default VerifyEmail;
