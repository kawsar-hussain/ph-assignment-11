import React, { useContext } from "react";
import RecentDonation from "./DashboardHome/RecentDonation";
import { AuthContext } from "../../Provider/AuthProvider";
import WebsiteInfo from "./DashboardHome/WebsiteInfo";

const DashboardMain = () => {
  const { user } = useContext(AuthContext);
  const { dbUser } = useContext(AuthContext);

  return (
    <div>
      <div className="">
        <h1 className="text-base-300 text-4xl font-bold nova-square-regular">Hello, {user.displayName}! Welcome Back.</h1>
      </div>
      {dbUser.role === "donor" && <RecentDonation></RecentDonation>}

      {(dbUser.role === "admin" || dbUser.role === "volunteer") && <WebsiteInfo></WebsiteInfo>}
    </div>
  );
};

export default DashboardMain;
