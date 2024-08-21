import React from "react";
import { MdDashboard } from "react-icons/md";
import { LuUsers2 } from "react-icons/lu";
import { IoCartOutline, IoSettingsOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { TbLogout2 } from "react-icons/tb";
import axios from "axios"
import { useAuthContet } from "../context/AuthContext";
import toast from "react-hot-toast";
import { TiUser } from "react-icons/ti";


const Sidebar = ({ setIsOpen, isOpen }) => {
  const { setAuthUser, authUser } = useAuthContet();
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

  return (
    <div className="">
      <div
        className={`bg-gray-800 text-white fixed h-full w-64 p-5 pt-8 mt-[62px] top-0 ${
          isOpen ? "w-52 md:w-64" : "p-[0px] w-[0px]"
        } duration-300 z-20`}
      >
        <p className={`p-2 border-b w-full flex justify-center items-center gap-2 md:hidden ${isOpen ? "block" : "hidden"}`}><TiUser size={25} />{authUser.username}</p>
        <div className={`mt-10 ${isOpen ? "block" : "hidden"}`}>
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
          >
            <MdDashboard size={20} />
            Dashboard
          </Link>
          <Link
            to="/users"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
          >
            <LuUsers2 size={20} />
            Users
          </Link>
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
          >
            <IoCartOutline size={20} />
            Orders
          </Link>
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
          >
            <FaPlus size={20} />
            Product
          </Link>
          <Link
            to="/"
            className="text-gray-300 hover:bg-gray-700 hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
          >
            <IoSettingsOutline size={20} />
            Settings
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-300 hover:bg-gray-700 w-full hover:text-white p-2 rounded-md cursor-pointer flex items-center gap-2"
          >
            <TbLogout2 size={20} />
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
