import React, { useContext } from "react";
import RecentDonation from "./DashboardHome/RecentDonation";
import { AuthContext } from "../../Provider/AuthProvider";

const DashboardMain = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <div className="">
        <h1 className="text-base-300 text-4xl font-bold nova-square-regular">Hello, {user.displayName}! Welcome Back.</h1>
      </div>
      <RecentDonation></RecentDonation>
    </div>
  );
};

export default DashboardMain;
