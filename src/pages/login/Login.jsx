import React from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuthContet } from "../../context/AuthContext";

const Login = () => {
  const { setAuthUser } = useAuthContet();
  const [loading, setLoading] = useState(false);
  const [store, setStore] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setErrors((prevData) => ({
      ...prevData,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasErrors = false;
    const newErrors = {};
    for (const key in store) {
      if (!store[key]) {
        newErrors[key] = "This field is required";
        hasErrors = true;
      }
    }
    if (hasErrors) {
      setErrors(newErrors);
      return;
    }

    try {
      // API call to login
      setLoading(true);
      const response = await axios.post("/api/api/admin/login", {
        username: store.username,
        email: store.email,
        password: store.password,
      });
      const res = response.data;
      if (res.error) {
        throw new Error(res.error);
      }
      if (res.role === "admin") {
        localStorage.setItem("token", JSON.stringify(res));
        setAuthUser(response.data);
        toast.success("Logged in");
        setStore({
          username: "",
          email: "",
          password: "",
        });
      } else {
        toast.error("You are not authorised to access this page");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div>
        <div className="flex justify-center items-center">
          <img src="/logo/authentication.png" alt="logo" className="w-[20%]" />
        </div>
        <div className="mt-5">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col justify-center items-center gap-5"
          >
            <div className="flex flex-col gap-1">
              <label>
                Username<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="username:"
                name="username"
                value={store.username}
                onChange={handleChange}
                className="p-2 rounded-lg border border-gray-500 outline-none"
              />
              {errors.username && (
                <p className="text-red-500">Field is required</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="email:"
                name="email"
                value={store.email}
                onChange={handleChange}
                className="p-2 rounded-lg border border-gray-500 outline-none"
              />
              {errors.email && (
                <p className="text-red-500">Field is required</p>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <label>
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="password:"
                name="password"
                value={store.password}
                onChange={handleChange}
                className="p-2 rounded-lg border border-gray-500 outline-none"
              />
              {errors.password && (
                <p className="text-red-500">Field is required</p>
              )}
            </div>
            <button
              type="submit"
              className="px-5 py-2 rounded text-white bg-black flex items-center gap-2"
            >
              {loading ? (

                <div className="loading loading-spinner w-5 h-5"></div>
              ): (

              <span>Login</span>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
