import React from "react";
import Login from "./Login/Login";
import { Outlet } from "react-router";

const AuthenticationLayout = () => {
  return (
    <div>
      <Outlet></Outlet>
    </div>
  );
};

export default AuthenticationLayout;
