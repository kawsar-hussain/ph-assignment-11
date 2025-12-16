import React from "react";
import { Outlet } from "react-router";
import Home from "./Home";
import Navbar from "../Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "../Provider/AuthProvider";

const Root = () => {
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center bg-fixed min-h-screen">
      <Navbar></Navbar>
      <Outlet>
        <Home></Home>
      </Outlet>
      <ToastContainer position="top-center" autoClose={2000}></ToastContainer>
    </div>
  );
};

export default Root;
