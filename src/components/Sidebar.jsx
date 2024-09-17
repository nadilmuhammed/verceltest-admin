import React, { useEffect, useState } from "react";
import { MdDashboard } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { IoCartOutline, IoSettingsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios";
import { useAuthContet } from "../context/AuthContext";
import toast from "react-hot-toast";
import { TiUser } from "react-icons/ti";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Sidebar = ({ setIsOpen, isOpen, handleClose }) => {
  const { setAuthUser, authUser } = useAuthContet();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const handleLogout = async () => {
    try {
      let response = await axios.post("/api/api/admin/logout");
      const res = response.data;
      if (res.error) {
        throw new Error(res.error);
      }
      localStorage.removeItem("token");
      setAuthUser(null);
      toast.success("Logged out");
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.error);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="">
      <div
        className={`bg-gray-800 text-white fixed h-full w-64 px-5 py-5 top-0 ${
          isOpen ? "w-52 md:w-64 mt-0 md:mt-[72px]" : "px-[0px] w-[0px]"
        } duration-300 z-20`}
      >
        <div className="md:hidden flex justify-center items-center mb-3">
          <button
            onClick={handleClose}
            className={`${isOpen ? "block" : "hidden"}`}
          >
            <IoIosCloseCircleOutline size={35} />
          </button>
        </div>
        <div
          className={`p-2 border-b w-full flex justify-center items-center gap-2 md:hidden ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <img
            src={
              authUser.profilePic
                ? authUser.profilePic
                : authUser.gender === "male"
                ? `/logo/woman.png`
                : `/logo/profile.png`
            }
            alt="profile-sidebar"
            className="w-10 h-10 rounded-xl object-cover object-top"
          />
          <span>{authUser.username}</span>
        </div>
        <div className={`mt-10 ${isOpen ? "block" : "hidden"}`}>
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
            onClick={() => {
              if (isMobile) {
                handleClose();
              }
            }}
          >
            <MdDashboard size={20} />
            Dashboard
          </Link>
          <Link
            to="/users"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
            onClick={() => {
              if (isMobile) {
                handleClose();
              }
            }}
          >
            <LuUsers2 size={20} />
            Users
          </Link>
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
            onClick={() => {
              if (isMobile) {
                handleClose();
              }
            }}
          >
            <IoCartOutline size={20} />
            Orders
          </Link>
          <Link
            to="/product"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
            onClick={() => {
              if (isMobile) {
                handleClose();
              }
            }}
          >
            <FaPlus size={20} />
            Product
          </Link>
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
            onClick={() => {
              if (isMobile) {
                handleClose();
              }
            }}
          >
            <IoSettingsOutline size={20} />
            Settings
          </Link>
          <div className="absolute w-52 bottom-2 md:bottom-20 flex justify-between gap-3 bg-gray-900 px-3 py-4 rounded-lg shadow-sm">
            <div className="flex items-center gap-1">
              <TiUser size={25} />
              <div>
                <p>{authUser.username}</p>
                <p
                  className="
        w-20 text-sm                  
        overflow-hidden         
        whitespace-nowrap       
        [mask-image:linear-gradient(to_right,black_80%,transparent)]
      "
                >
                  {authUser.email}
                </p>
              </div>
            </div>
            <button onClick={handleLogout}>
              <TbLogout2 size={25} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
