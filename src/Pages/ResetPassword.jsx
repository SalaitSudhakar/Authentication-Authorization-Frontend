import React, { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState(0);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmited, setIsOtpSubmited] = useState(false);

  const { backendUrl } = useContext(AppContext);

  axios.defaults.withCredentials = true;

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

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasterArray = paste.split("");
    pasterArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        backendUrl + "/api/auth/send-reset-otp",
        { email }
      );

      toast.success(response.data.message);
      setIsEmailSent(true);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((e) => e.value);
    const enteredOtp = otpArray.join("");

    setOtp(enteredOtp); // Store OTP properly
    setIsOtpSubmited(true);
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(backendUrl + "/api/auth/reset-password", {
        email,
        otp, 
        newPassword: password, //This name should be same in front and backend
      });
  
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update password");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-3 sm:px-0 bg-gradient-to-br from-blue-300 to-purple-500">
      <Link to={"/"}>
        <img
          src={assets.logo}
          alt=""
          className="absolute left-1/2 sm:left-20 top-5 w-24 sm:w-32 cursor-pointer"
        />
      </Link>
      {/* send Email */}
      {!isEmailSent && (
        <form
          onSubmit={handleEmailSubmit}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-2">
            Reset Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter Your Registered Email Address
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <img src={assets.mail_icon} alt="" />
            <input
              type="email"
              placeholder="Enter Your Email Id"
              className="bg-transparent focus:outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-full"
          >
            Send OTP
          </button>
        </form>
      )}

      {/* Otp Input form */}
      {isEmailSent && !isOtpSubmited && (
        <form
          onSubmit={handleOtpSubmit}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-4">
            Reset Password OTP
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
            Submit
          </button>
        </form>
      )}

      {/* New Password */}
      {isEmailSent && isOtpSubmited && (
        <form
          onSubmit={handlePasswordUpdate}
          className="bg-slate-900 p-8 rounded-lg shadow-lg w-96 text-sm"
        >
          <h1 className="text-white text-2xl font-semibold text-center mb-2">
            Update Password
          </h1>
          <p className="text-center mb-6 text-indigo-300">
            Enter Your New Password
          </p>

          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <img src={assets.lock_icon} alt="" />
            <input
              type="password"
              placeholder="Enter New Password"
              className="bg-transparent focus:outline-none text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-full"
          >
            Update Password
          </button>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
