import React, { useContext } from "react";
import RecentDonation from "./DashboardHome/RecentDonation";
import { AuthContext } from "../../Provider/AuthProvider";
import WebsiteInfo from "./DashboardHome/WebsiteInfo";

const DashboardMain = () => {
  const { user } = useContext(AuthContext);
  const { dbUser } = useContext(AuthContext);

  return (
    <div>
      <div className="relative mb-10 group ">
        <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="flex items-center gap-4 mb-2">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/80">Active Session</span>
          </div>
          <div className="h-px w-12 bg-linear-to-r from-white/20 to-transparent"></div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter nova-square-regular">
          Hello, <span className="pr-3 text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-white to-yellow-500 drop-shadow-[0_0_15px_rgba(253,224,71,0.3)]">{user.displayName}!</span>
          <span className="block text-2xl md:text-3xl mt-1 opacity-80 font-medium tracking-normal not-italic">Welcome Back.</span>
        </h1>

        <div className="mt-4 flex gap-1">
          <div className="h-1 w-12 bg-yellow-400 rounded-full"></div>
          <div className="h-1 w-2 bg-white/30 rounded-full"></div>
          <div className="h-1 w-2 bg-white/10 rounded-full"></div>
        </div>
      </div>
      {dbUser.role === "donor" && <RecentDonation></RecentDonation>}

      {(dbUser.role === "admin" || dbUser.role === "volunteer") && <WebsiteInfo></WebsiteInfo>}
    </div>
  );
};

export default DashboardMain;
