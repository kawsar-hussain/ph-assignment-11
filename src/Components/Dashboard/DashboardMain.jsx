import React, { useContext } from "react";
import RecentDonation from "./DashboardHome/RecentDonation";
import { AuthContext } from "../../Provider/AuthProvider";
import WebsiteInfo from "./DashboardHome/WebsiteInfo";
import Welcome from "./Welcome";
import DashboardHome from "./DashboardHome";

const DashboardMain = () => {
  const { dbUser } = useContext(AuthContext);

  return (
    <div>
      <Welcome dbUser={dbUser}></Welcome>

      {dbUser.role === "donor" && <DashboardHome></DashboardHome>}
      {dbUser.role === "donor" && <RecentDonation></RecentDonation>}

      {(dbUser.role === "admin" || dbUser.role === "volunteer") && <WebsiteInfo></WebsiteInfo>}
    </div>
  );
};

export default DashboardMain;
