import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Register from "../../Pages/Auth-pages/Register";
import Login from "../../Pages/Auth-pages/Login";
import Home from "../../Pages/Home/Home";
import Profile from "../../Pages/Profile/Profile";
import { AuthContext } from "../Context/Auth-context";
import Edit from "../../Pages/Edit-Profile/Edit";

function Routing() {
  const { user } = useContext(AuthContext);

  return (
    <Routes>
      <Route exact path="/" element={user ? <Home /> : <Register />} />
      <Route path="/profile/:username" element={<Profile />} />
      <Route
        path="/register"
        element={user ? <Navigate to="/" /> : <Register />}
      />
      <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
      <Route path="/edit" element={<Edit/>} />

    </Routes>
  );
}

export default Routing;
