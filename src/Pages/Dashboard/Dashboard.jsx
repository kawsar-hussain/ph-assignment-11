import React from "react";
import Aside from "../../Components/Dashboard/Aside";
import { Outlet } from "react-router";

const Dashboard = () => {
  return (
    <div className="bg-[url('/bg.png')] bg-cover bg-center  bg-fixed min-h-screen flex lg:flex-row flex-col">
      <div className="lg:h-screen sticky left-0 top-0 z-50">
        <Aside></Aside>
      </div>
      <div className="w-full px-8 py-10">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
