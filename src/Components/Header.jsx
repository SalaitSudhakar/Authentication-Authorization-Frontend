import React, { useContext } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../Context/AppContext";

const Header = () => {
  const { userData } = useContext(AppContext);
  console.log(userData)

  return (
    <div className="flex flex-col text-center items-center mt-20 px-4 text-gray-800">
      <img
        src={assets.header_img}
        alt="Header"
        className="w-36 h-36 rounded-full mb-6"
      />
      <h1 className="flex gap-2 items-center text-lg sm:text-xl">
        Hello {userData ? userData.name : 'Developer'}! {" "}
        <img
          src={assets.hand_wave}
          alt="Hand wave image"
          className="w-8 aspect-square"
        />
      </h1>
      <h2 className="text-3xl sm:text-5xl font-semibold mb-4">Welcome to My APP</h2>
      <p className="mb-8 max-w-md">
        Thank You for visiting my site. 
      </p>
      <button className="border border-gray-500 rounded-full px-8 py-2.5 hover:bg-gray-200 ">Get Started</button>
    </div>
  );
};

export default Header;
