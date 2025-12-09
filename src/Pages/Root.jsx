import React from "react";
import { Outlet } from "react-router";
import Home from "./Home";
import Navbar from "../Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";

const Root = () => {
  return (
    <div>
      <Navbar></Navbar>
      <Outlet>
        <Home></Home>
      </Outlet>
      <ToastContainer position="top-center" autoClose={2000}></ToastContainer>
    </div>
  );
};

export default Root;
