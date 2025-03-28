import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../Context/AppContext";
import { toast } from "react-toastify";

const Login = () => {
  const [page, setPage] = useState("Sign Up");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { backendUrl, setIsLoggedIn, getUserData } = useContext(AppContext);

  const handleCheckboxChange = (e) => {
    setShowPassword(e.target.checked);
  };

  const handleOnSubmit = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true; // to send cookies

      if (page === "Sign Up") {
        const response = await axios.post(backendUrl + "/api/auth/register", {
          name,
          email,
          password,
        });

        console.log(response.data.message);
        toast.success(response.data.message);
        setIsLoggedIn(true);
        getUserData()
        navigate("/");
      } else {
        const response = await axios.post(backendUrl + "/api/auth/login", {
          email,
          password,
        });

        console.log(response.data.message);
        toast.success(response.data.message);
        setIsLoggedIn(true);
        getUserData();
        navigate("/");
      }
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.message || "An error occurred");
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
      <div className="bg-slate-900 p-5 sm:p-10 rounded-lg shadow-lg w-full sm:w-2/3 lg:w-1/3 xl:w-1/4 text-indigo-300 text-sm  ">
        <h2 className="text-3xl font-semibold text-white text-center mb-2">
          {page === "Sign Up" ? "Create  account" : "Login"}
        </h2>
        <p className="text-center text-xs mb-6">
          {page === "Sign Up"
            ? "Join us today and unlock access to exclusive features. Creating an account is quick and easy!"
            : "Welcome back! Please log in to continue and explore all the exciting features we offer."}
        </p>

        <form onSubmit={handleOnSubmit}>
          {page === "Sign Up" && (
            <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
              <img src={assets.person_icon} alt="person" />
              <input
                className="bg-transparent focus:outline-none text-white"
                type="text"
                placeholder="Enter Your Full Name"
                onChange={(e) => setName(e.target.value)}
                value={name}
                required
              />
            </div>
          )}
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <img src={assets.mail_icon} alt="person" />
            <input
              className="bg-transparent focus:outline-none text-white"
              type="text"
              placeholder="Enter Your Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-full bg-[#333A5c]">
            <img src={assets.lock_icon} alt="person" />
            <input
              className="bg-transparent focus:outline-none text-white"
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <div className="flex mb-4  gap-5 items-center justify-between">
            <p
              onClick={() => navigate("/reset-password")}
              className="text-sm text-indigo-500 cursor-pointer hover:underline decoration-indigo-700"
            >
              Forgot Password
            </p>
            <div className="flex gap-1 items-center justify-center">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={handleCheckboxChange}
                name="show-password"
                id="show-password"
                className="accent-purple-600"
              />
              <label
                htmlFor="show-password"
                className=" text-indigo-500 cursor-pointer hover:underline decoration-indigo-700"
              >
                Show Password
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="text-base sm:text-lg w-full py-4 rounded-full bg-gradient-to-r from-purple-600 to-indigo-900 text-white font-medium"
          >
            {page === "Sign Up" ? "Sign Up" : "Log in"}
          </button>

          {page === "Sign Up" ? (
            <p className="text-gray-400 text-center text-xs mt-4">
              {" "}
              Already have an account{" "}
              <span
                className="text-blue-400 cursor-pointer underline pl-0.5"
                onClick={() => setPage("Log in")}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-gray-400 text-center text-xs mt-4">
              Don't Have an account{" "}
              <span
                className="text-blue-400 cursor-pointer underline pl-0.5"
                onClick={() => setPage("Sign Up")}
              >
                Sign Up
              </span>
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
