import React from "react";

const UrgentRequests = () => {
  const requests = [
    { id: 1, bloodType: "O+", location: "Central Hospital", urgency: "Critical", time: "2m ago" },
    { id: 2, bloodType: "A-", location: "City Medical", urgency: "High", time: "15m ago" },
    { id: 3, bloodType: "B+", location: "General Clinic", urgency: "Critical", time: "32m ago" },
  ];

  return (
    <div className="mb-5 lg:mb-15 p-0  lg:p-6 flex flex-col items-center">
      {/* Page Header */}
      <div className="w-full lg:max-w-4xl mb-6 lg:mb-10">
        <h1 className="text-3xl lg:text-4xl font-black italic tracking-wide text-white uppercase">
          Live <span className="bg-clip-text text-transparent bg-linear-to-tr from-[#ed4f00] to-[#ffbc15]">Emergency</span> Feed
        </h1>
        <p className="text-white/50 italic text-sm mt-2 flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-600"></span>
          </span>
          3 Active requests in your area
        </p>
      </div>

      {/* Request List */}
      <div className="w-full max-w-4xl space-y-3 lg:space-y-4">
        {requests.map((req) => (
          <div key={req.id} className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl p-1 transition-all hover:border-[#ff9215]/50">
            {/* Live Background Glow */}
            <div
              className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity bg-linear-to-r ${req.urgency === "Critical" ? "from-red-600" : "from-orange-500"} to-transparent`}
            ></div>

            <div className="relative z-10 flex  flex-wrap items-center justify-between p-3 lg:p-5 gap-4">
              {/* Blood Type Badge */}
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-xl bg-linear-to-br from-[#ed4f00] to-[#9e3500] flex items-center justify-center shadow-[0_0_20px_rgba(237,79,0,0.4)]">
                  <span className="text-2xl font-black italic text-white">{req.bloodType}</span>
                </div>
                <div>
                  <h3 className="text-white font-black italic uppercase tracking-widest">{req.location}</h3>
                  <p className="text-white/40 text-xs flex items-center gap-1">
                    <span className="animate-pulse">🕒</span> Posted {req.time}
                  </p>
                </div>
              </div>

              {/* Status & Action */}
              <div className="flex items-center lg:justify-end justify-between lg:w-auto w-full gap-6 ">
                <div className="text-right">
                  <span
                    className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                      req.urgency === "Critical" ? "border-red-500 text-red-500 animate-pulse" : "border-orange-500 text-orange-500"
                    }`}
                  >
                    {req.urgency}
                  </span>
                </div>

                <button className="relative px-6 py-2 rounded-lg bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] italic transition-all hover:bg-[#ed4f00] hover:border-transparent group-hover:shadow-[0_0_15px_rgba(237,79,0,0.5)] active:scale-95">
                  Respond
                </button>
              </div>
            </div>

            {/* Bottom Scanning Line */}
            <div className="absolute bottom-0 left-0 h-px w-full bg-linear-to-r from-transparent via-[#ff9215] to-transparent -translate-x-full animate-[shimmer_4s_infinite]"></div>
          </div>
        ))}
      </div>

      {/* Global CSS needed for the shimmer animation if not already added */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `,
        }}
      />
    </div>
  );
};

export default UrgentRequests;
