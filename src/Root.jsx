import React from "react";
import { Outlet } from "react-router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Home from "./Pages/Home";

const Root = () => {
  return (
    <div>
      <Outlet>
        <Home></Home>
      </Outlet>

      <ToastContainer position="top-center" autoClose={2000}></ToastContainer>
    </div>
  );
};

export default Root;
