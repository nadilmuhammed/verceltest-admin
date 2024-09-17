import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";
import { useAuthContet } from "../../context/AuthContext";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import app from "../../firebase/firebase.config";

const Profile = () => {
  const { setAuthUser, authUser } = useAuthContet();
  const [loading, setLoading] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [profilePicPreview, setProfilePicPreview] = useState("");
  const [store, setStore] = useState({
    fullname: "",
    username: "",
    email: "",
    password: "",
    profilePic: "",
  });

  const [initialStore, setInitialStore] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStore((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (store.profilePic) {
      setProfilePicPreview(store.profilePic);
    }
  }, [store.profilePic]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfilePicPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  console.log(store.profilePic,"pics");

  const handleClick = (e) => {
    e.preventDefault();
    document.getElementById("profilePicInput").click();
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
  };

  const { id } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isChanged =
      store.fullname !== initialStore.fullname ||
      store.username !== initialStore.username ||
      store.email !== initialStore.email ||
      (store.password && store.password !== "") ||
      selectedGender !== initialStore.gender ||
      profilePic;

    if (!isChanged) {
      toast.error("No changes detected");
      return;
    }

    try {
      setLoading(true);
      let oldProfilePicUrl = store.profilePic;
      let downloadURL = oldProfilePicUrl; // Default to existing image URL
      const storage = getStorage(app);
      if (profilePic) {

        // Delete the old profile picture from Firebase Storage
        if (oldProfilePicUrl) {
          console.log(oldProfilePicUrl,"old image");
          const oldImageRef = ref(storage, oldProfilePicUrl);
          await deleteObject(oldImageRef).catch((error) => {
            console.error("Error deleting old image: ", error);
          });
        }

        const storageRef = ref(storage, `adminimages/${profilePic.name}`);
        await uploadBytes(storageRef, profilePic);
        downloadURL = await getDownloadURL(storageRef);
      }

      const formData = {
        fullname: store.fullname,
        username: store.username,
        email: store.email,
        profilePic: downloadURL,
        gender: selectedGender,
      };
      if (store.password) {
        formData.password = store.password;
      }
      const update = await axios.put(
        `/api/api/admin/updateuser/${id}`,
        formData
      );
      const res = update.data;

      if (res.error) {
        throw new Error(res.error);
      }
      setAuthUser(res);
      toast.success("Profile Upated");
      setStore({
        password: "",
      });
    } catch (error) {
      console.error(error.message);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };


  const fetchData = async (id) => {
    try {
      setUserLoading(true);
      const response = await axios.get(`/api/api/admin/getuser/${id}`);
      setStore(response.data);
      setInitialStore(response.data);
      setProfilePicPreview(response.data.profilePic)
      setSelectedGender(response.data.gender);
    } catch (error) {
      console.log(error.message);
    } finally {
      setUserLoading(false);
    }
  };

  useEffect(() => {
    fetchData(id);
  }, []);

  return (
    <>
      {userLoading && (
        <div className="absolute bg-black/40 backdrop-blur-sm flex justify-center items-center w-full h-screen top-0 left-0 z-50">
          <span className="loading loading-dots loading-lg text-white" />
        </div>
      )}
      <div className="flex justify-center items-center">
        <div className="">
          <h1 className="text-3xl font-[550] text-center">
            Update your Profile
          </h1>
          <form
            onSubmit={handleSubmit}
            action=""
            className="flex flex-col gap-5 mt-5"
          >
            <div className="flex justify-center">
              <div className="relative p-1">
                <img
                  onClick={handleClick}
                  src={
                    profilePicPreview
                      ? profilePicPreview
                      : store.gender === "male"
                      ? "/logo/profile.png"
                      : "/logo/woman.png"
                  }
                  alt="profile-pic"
                  className="w-32 h-32 cursor-pointer rounded-full object-cover object-top border-2 border-gray-300 shadow-md"
                />
                <input
                  type="file"
                  id="profilePicInput"
                  accept="image/*"
                  onChange={handleImageChange}
                  style={{ display: "none" }}
                />
                <button
                  className="absolute bottom-3 right-2 bg-black rounded-full p-1 border border-gray-300 hover:bg-white text-white hover:text-black transition-all duration-300 ease-in-out"
                  onClick={handleClick}
                >
                  <MdModeEdit size={15} className="" />
                </button>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-5">
              <div className="flex flex-col gap-1">
                <label className="font-[500] text-sm">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="px-3 py-2 outline-none border border-black rounded-full"
                  name="fullname"
                  value={store.fullname}
                  onChange={handleChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-[500] text-sm">Username</label>
                <input
                  type="text"
                  placeholder="Enter your username"
                  className="px-3 py-2 outline-none border border-black rounded-full"
                  name="username"
                  value={store.username}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-[500] text-sm">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="px-3 py-2 outline-none border border-black rounded-full"
                name="email"
                value={store.email}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="font-[500] text-sm">Password</label>
              <input
                type="password"
                placeholder="Enter your new Password"
                className="px-3 py-2 outline-none border border-black rounded-full"
                name="password"
                value={store.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex gap-5 justify-center">
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={selectedGender === "male"}
                  onChange={handleGenderChange}
                />
                <label>Male</label>
              </div>
              <div className="flex gap-1">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={selectedGender === "female"}
                  onChange={handleGenderChange}
                />
                <label>Female</label>
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-black text-white px-3 py-2 rounded-lg hover:scale-105 transition-all duration-300 ease-in-out"
              >
                <span className="flex items-center gap-2">
                  <span>Update</span>
                  {loading && (
                    <span className="loading loading-spinner loading-sm"></span>
                  )}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;
