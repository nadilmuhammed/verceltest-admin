import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import { useAuthContet } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { FiSun } from "react-icons/fi";
import { IoMoon } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";
import { useTheme } from "../context/ThemeContext";
import { FiUser } from "react-icons/fi";
import { useParams } from "react-router-dom"
import { useEffect } from "react";
import toast  from "react-hot-toast"
import axios from "axios"

const Navbar = ({ isOpen, setIsOpen }) => {
  const { authUser } = useAuthContet();
  const { theme, toggleTheme } = useTheme();
  const [ userData, setUserData ] = useState('');
  const [ refresh, setRefresh ] = useState(false);

  const { id } = useParams();
  const fetchUser = async(id)=>{
    try {
      const response = await axios.get(`/api/api/admin/getuser/${id}`)
      setUserData(response.data);
      setRefresh(!refresh)
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.error)
    }
  }

  useEffect(()=>{
    if(id){
      fetchUser(id)
    }
  },[id, refresh])

  return (
    <nav className="bg-gray-800 px-4 md:px-8 py-4 text-white fixed w-full top-0 z-10">
      <div className="mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2 md:gap-5 ">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`duration-500 ${isOpen && `rotate-180`}`}
          >
            {!isOpen ? <RxHamburgerMenu size={30} /> : <IoClose size={30} />}
          </button>
            <div>
              <img
                src={userData.profilePic ? `/api/adminuploads/${userData.profilePic}` : authUser.gender === 'male' ? `/logo/profile.png` : `/logo/woman.png`}
                alt="user-image"
                className="w-10 h-10 rounded-full object-cover object-top"
              />
            </div>
            <div className="hidden md:block">
              <h1 className="text-xl">{authUser?.username}</h1>
            </div>
        </div>
        <div className="flex items-center gap-2 md:gap-5">
          <Link to={`/profile/${authUser._id}`}>
            <FiUser className="h-5 w-5" />
          </Link>
          <div>
            <IoMdNotificationsOutline className="h-6 w-6" />
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
            <FiSun className="swap-on h-5 w-5" />
            <IoMoon className="swap-off h-5 w-5" />
          </label>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
