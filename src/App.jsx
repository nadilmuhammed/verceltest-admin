import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Homepage from "./pages/homepage/Homepage";
import { useAuthContet } from "./context/AuthContext";
import User from "./pages/users/User";
import Profile from "./pages/profile/Profile";
import Product from "./pages/product/Product";

function App() {
  const { authUser } = useAuthContet();
  return (
    <>
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to="/login" />}
          >
            <Route path="/" element={<Homepage />} />
            <Route path="/users" element={<User />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="/product" element={<Product />} />
          </Route>
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
    </>
  );
}

export default App;
