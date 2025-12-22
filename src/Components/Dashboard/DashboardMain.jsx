import React, { useContext } from "react";
import RecentDonation from "./DashboardHome/RecentDonation";
import { AuthContext } from "../../Provider/AuthProvider";
import WebsiteInfo from "./DashboardHome/WebsiteInfo";
import Welcome from "./Welcome";
import DashboardHome from "./DashboardHome";
import AdminDashboard from "./DashboardHome/AdminDashboard";

const DashboardMain = () => {
  const { dbUser } = useContext(AuthContext);

  return (
    <div>
      {!dbUser.role === "admin" && <Welcome dbUser={dbUser}></Welcome>}

      {dbUser.role === "donor" && <DashboardHome></DashboardHome>}
      {dbUser.role === "donor" && <RecentDonation></RecentDonation>}

      {dbUser.role === "volunteer" && <WebsiteInfo></WebsiteInfo>}
      {dbUser.role === "admin" && <AdminDashboard></AdminDashboard>}
    </div>
  );
};

export default DashboardMain;
