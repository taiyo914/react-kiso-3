import React from "react";
import { BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Home from '../pages/Home';

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};