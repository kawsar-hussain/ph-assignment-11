import React from "react";

const LiveImpact = () => {
  const stats = [
    { label: "Lives Saved", value: "12,402", color: "from-[#ed4f00] to-[#ff9215]", icon: "❤️" },
    { label: "Active Donors", value: "8,941", color: "from-[#ff9215] to-[#ffbc15]", icon: "👥" },
    { label: "Blood Bags", value: "4,210", color: "from-[#ed4f00] to-[#9e3500]", icon: "🩸" },
    { label: "Success Rate", value: "99.8%", color: "from-[#ffbc15] to-[#ed4f00]", icon: "📈" },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-3xl border border-white/5 bg-black/30 backdrop-blur-2xl p-6 transition-all duration-500 hover:border-white/20 hover:-translate-y-1"
          >
            {/* 1. THE LIVE SIGNAL (Ping in the corner) */}
            <div className="absolute top-4 right-4 flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-linear-to-r ${stat.color}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 bg-linear-to-r ${stat.color}`}></span>
            </div>

            {/* 2. THE CONTENT */}
            <div className="relative z-10">
              <div className="text-3xl mb-4 grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110">{stat.icon}</div>

              <div className={`text-3xl md:text-4xl font-black italic tracking-tighter bg-clip-text text-transparent bg-linear-to-r ${stat.color}`}>{stat.value}</div>

              <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mt-2 italic group-hover:text-white/70 transition-colors">{stat.label}</div>
            </div>

            {/* 3. THE "DATA STREAM" (Moving line at the bottom) */}
            <div className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-transparent via-white/10 to-transparent overflow-hidden">
              <div className={`h-full w-1/2 bg-linear-to-r ${stat.color} animate-[data-flow_3s_linear_infinite]`}></div>
            </div>

            {/* 4. MOUSE HOVER GLOW */}
            <div className={`absolute inset-0 bg-linear-to-tr ${stat.color} opacity-0 group-hover:opacity-[0.03] transition-opacity duration-500`}></div>
          </div>
        ))}
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes data-flow {
          0% { transform: translateX(-200%); }
          100% { transform: translateX(200%); }
        }
      `,
        }}
      />
    </div>
  );
};

export default LiveImpact;
