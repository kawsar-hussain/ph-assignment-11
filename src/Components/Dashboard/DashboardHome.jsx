import React from "react";
import { MdBloodtype, MdOutlineHealthAndSafety, MdTimeline, MdNotificationsActive, MdArrowForward } from "react-icons/md";

const DashboardHome = () => {
  return (
    <div className=" text-white">
      {/* stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-10">
        {[
          { label: "total donations", value: "08", icon: <MdBloodtype />, color: "from-[#dc4900] to-[#ffa41c]" },
          { label: "lives saved", value: "24", icon: <MdOutlineHealthAndSafety />, color: "from-[#ffa41c] to-[#ed4f00]" },
          { label: "next eligibility", value: "24 Jan", icon: <MdTimeline />, color: "from-[#ed4f00] to-[#dc4900]" },
        ].map((stat, i) => (
          <div key={i} className="group relative overflow-hidden rounded-3xl border border-white/5 bg-black/20 backdrop-blur-xl p-8 transition-all hover:border-[#dc4900]/30">
            <div className={`absolute top-0 right-0 p-6 opacity-10 text-6xl bg-clip-text text-transparent bg-linear-to-br ${stat.color}`}>{stat.icon}</div>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-2">{stat.label}</p>
            <h2 className="text-5xl font-black italic tracking-tighter">{stat.value}</h2>
            <div className={`h-1 w-12 mt-4 bg-linear-to-r ${stat.color} rounded-full`}></div>
          </div>
        ))}
      </div>

      {/* main layout: activity and alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* left: activity chart area */}
        <div className="lg:col-span-8 rounded-[2.5rem] border border-white/5 bg-black/20 backdrop-blur-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-black italic uppercase tracking-tight">Donation Activity</h3>
            <button className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-[#ffa41c] transition-colors">View All</button>
          </div>

          {/* simple bar visualization */}
          <div className="flex items-end justify-between h-48 gap-2 px-3 border-b border-white/5">
            {[40, 70, 45, 90, 65, 80, 50, 85, 30, 60, 95, 40].map((h, i) => (
              <div key={i} className="group relative w-full">
                <div
                  style={{ height: `${h}%` }}
                  className="bg-linear-to-t from-[#dc4900] to-[#ffa41c] rounded-t-lg opacity-20 group-hover:opacity-100 transition-all duration-500 shadow-[0_0_15px_rgba(220,73,0,0.3)]"
                ></div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-[10px] font-black text-white/20 uppercase tracking-widest">
            <span>Jan</span>
            <span>Jun</span>
            <span>Dec</span>
          </div>
        </div>

        {/* right: urgent alerts */}
        <div className="lg:col-span-4 space-y-6">
          <div className="rounded-[2.5rem] border border-white/5 bg-black/20 backdrop-blur-xl p-8 relative overflow-hidden">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#dc4900] opacity-5 blur-3xl rounded-full"></div>
            <h3 className="text-lg font-black italic uppercase tracking-tight mb-6 flex items-center gap-2">
              <MdNotificationsActive className="text-[#ffa41c] animate-pulse" />
              Urgent Requests
            </h3>

            <div className="space-y-4">
              {[
                { hospital: "City General", blood: "O+", time: "2m ago" },
                { hospital: "Central Clinic", blood: "B-", time: "15m ago" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-[#dc4900]/40 transition-all cursor-pointer">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-black italic text-white uppercase">{item.hospital}</p>
                      <p className="text-[10px] font-bold text-white/30 uppercase mt-1">{item.time}</p>
                    </div>
                    <span className="text-xl font-black italic text-[#dc4900]">{item.blood}</span>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-6 py-4 rounded-2xl bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.2em] italic hover:bg-linear-to-r from-[#dc4900] to-[#ffa41c] hover:border-transparent transition-all flex items-center justify-center gap-2">
              Respond Now <MdArrowForward />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
