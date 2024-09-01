import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose, IoMoonOutline } from "react-icons/io5";
import { useAuthContet } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";
import { FiUser } from "react-icons/fi";

const Navbar = ({ isOpen, setIsOpen }) => {
  const { authUser } = useAuthContet();
  const [ image, setImage ] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const handleImageLoad = ()=>{
    setImage(true);
  }
  return (
    <nav className="bg-gray-800 px-4 md:px-8 py-4 text-white fixed w-full top-0 z-10">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3 md:gap-5 ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`duration-500 ${isOpen && `rotate-180`}`}
          >
            {!isOpen ? <RxHamburgerMenu size={30} /> : <IoClose size={30} />}
          </button>
            <div>
              <img
                src={authUser.profilePic ? authUser.profilePic : authUser.gender === 'male' ? `/logo/woman.png` : `/logo/profile.png`}
                alt="user-image"
                className={`w-10 h-10 rounded-full object-cover object-top ${image ? "blur-0" : "blur-md"}`}
                onLoad={handleImageLoad}
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl">{authUser?.username}</h1>
            </div>
        </div>
        <div className="flex items-center gap-5">
          <Link to={`/profile/${authUser._id}`}>
            <FiUser size={25}/>
          </Link>
          <div>
            <IoMdNotificationsOutline size={25} />
          </div>

          {/* toggle theme */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
              className="theme-controller"
              checked={theme === "night"}
              onChange={toggleTheme}
              value={theme}
            />
            <FiSun className="swap-off text-yellow-300" size={25} />
            <IoMoonOutline className="swap-on" size={25} />
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
