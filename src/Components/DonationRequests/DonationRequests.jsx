import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const DonationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("https://server-11-zeta.vercel.app/create-donation-request").then((res) => {
      setRequests(res.data);
    });
  }, []);
  return (
    <div className="lg:px-20 py-10 px-5 h-auto lg:min-h-[92vh]">
      <div className="relative flex flex-col items-center mb-16 select-none">
        {/* Soft background glow to separate text from the red BG */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-20 bg-white/10 blur-[80px] pointer-events-none"></div>

        <h2 className="relative text-5xl md:text-6xl font-black text-center uppercase italic tracking-tighter">
          <span className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]">Donation</span>
          <span className="block md:inline pr-2 ml-0 md:ml-4 text-transparent bg-clip-text bg-linear-to-r from-yellow-300 via-white to-yellow-500 drop-shadow-[0_0_10px_rgba(253,224,71,0.3)]">
            Requests
          </span>
        </h2>

        <div className="relative mt-6 flex items-center justify-center gap-3">
          {/* Left Line */}
          <div className="h-px w-12 bg-linear-to-r from-transparent to-white/50"></div>

          {/* Center Live Pulse */}
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-400"></span>
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90">Live Feed</span>
          </div>

          {/* Right Line */}
          <div className="h-px w-12 bg-linear-to-r from-white/50 to-transparent"></div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {requests.map((request) => (
          <div
            key={request._id}
            className="group relative bg-black/30 backdrop-blur-xl p-0.5 rounded-3xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 active:scale-95 shadow-[0_0_20px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(220,73,0,0.3)] overflow-hidden"
          >
            <div className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>

            <div className="relative  rounded-[1.4rem] p-6 h-full flex flex-col justify-between z-10 border border-white/5">
              <div className="flex justify-between items-start mb-8">
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-white italic tracking-tight group-hover:text-[#ffa41c] transition-colors">{request.recipientName}</h2>
                  <div className="flex items-center gap-2 text-gray-300">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                    </span>
                    <p className="text-xs font-bold uppercase tracking-widest">
                      {request.upazila}, {request.district}
                    </p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center p-0.5 overflow-hidden rounded-full shadow-[0_0_15px_rgba(237,79,0,0.4)]">
                  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ed4f00_0%,#ffffff_50%,#991b1b_100%)]"></div>
                  <span className="relative bg-linear-to-b from-[#ed4f00] to-[#991b1b] text-white px-5 py-1.5 rounded-full italic font-black text-xl z-10 border border-white/10">
                    {request.bloodGroup}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2 bg-white/5 p-4 rounded-2xl border border-white/5">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Date</p>
                    <p className="text-sm font-bold text-gray-200">{request.donationDate}</p>
                  </div>
                  <div className="border-l border-white/10 pl-4">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Time</p>
                    <p className="text-sm font-bold text-gray-200">{request.donationTime}</p>
                  </div>
                </div>

                <Link
                  to={`/donation-requests/${request._id}`}
                  className="group/btn relative w-full h-10 flex items-center justify-center overflow-hidden rounded-xl bg-linear-to-r from-[#dc4900] to-[#ffa41c] text-white font-black uppercase italic tracking-widest text-xs transition-all shadow-lg shadow-[#dc4900]/20"
                >
                  <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
                  <span className="relative z-10">View Details</span>
                </Link>
              </div>
            </div>

            <style jsx>{`
              @keyframes shimmer {
                100% {
                  transform: translateX(100%);
                }
              }
            `}</style>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
