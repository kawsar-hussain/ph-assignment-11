import React from "react";
import { Link } from "react-router";

const Leaderboard = () => {
  const champions = [
    { name: "Samiul Islam", donations: 42, lives: 126, rank: 1, blood: "O+", status: "Legendary" },
    { name: "Rakib Ahmed", donations: 38, lives: 114, rank: 2, blood: "A-", status: "Elite" },
    { name: "Tahmid Hasan", donations: 31, lives: 93, rank: 3, blood: "B+", status: "Hero" },
  ];

  return (
    <div className="min-h-screen py-5 lg:py-20 px-3 bg-transparent mb-5 ">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-5xl font-black italic tracking-tighter text-white uppercase mb-4">
            Donor <span className="pr-2 bg-clip-text text-transparent bg-linear-to-tr from-[#ffa41c] to-[#ed4f00]">Leaderboard</span>
          </h1>
          <p className="text-white/60 font-medium tracking-[0.2em] uppercase text-xs">Recognizing the top life-savers in our community</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-8 mb-7 lg:mb-12 items-end">
          {champions.map((hero, index) => (
            <div
              key={index}
              className={`relative group rounded-[2.5rem] border border-white/10 bg-black/40 backdrop-blur-3xl p-12 text-center transition-all duration-700 hover:-translate-y-4 ${
                hero.rank === 1 ? "h-[400px] border-[#ffa41c]/40 order-1 md:order-2" : "h-[350px] order-2"
              }`}
            >
              <div
                className={`absolute -top-8 left-1/2 -translate-x-1/2 w-15 h-15 rounded-full flex items-center justify-center font-black italic text-black ${
                  hero.rank === 1 ? "bg-[#ffa41c] shadow-[0_0_20px_#ffa41c]" : "bg-gray-400"
                }`}
              >
                #{hero.rank}
              </div>

              <div
                className={`w-24 h-24 mx-auto rounded-full mb-6 border-2 flex items-center justify-center text-4xl shadow-inner ${
                  hero.rank === 1 ? "border-[#ffa41c] bg-[#ffa41c]/10" : "border-white/20 bg-white/5"
                }`}
              >
                👤
              </div>

              <h3 className="text-xl font-black italic text-white mb-1 uppercase tracking-tight">{hero.name}</h3>
              <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-6 ${hero.rank === 1 ? "text-[#ffa41c]" : "text-white/40"}`}>{hero.status}</p>

              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                <div>
                  <p className="text-[10px] text-white/60 uppercase font-black">Donations</p>
                  <p className="text-xl font-black text-white">{hero.donations}</p>
                </div>
                <div>
                  <p className="text-[10px] text-white/60 uppercase font-black">Lives Saved</p>
                  <p className="text-xl font-black text-[#ed4f00]">{hero.lives}</p>
                </div>
              </div>

              {hero.rank === 1 && (
                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
                  <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0%,rgba(255,164,28,0.1)_50%,transparent_100%)] animate-[spin_10s_linear_infinite]"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#ed4f00] to-[#ffa41c] p-10 text-center shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl font-black italic text-white uppercase tracking-wide mb-2">Ready to become a hero?</h2>
            <p className="text-white/80 text-sm mb-6 max-w-md mx-auto">Join the ranks of our top donors today and start making a real impact in your city.</p>
            <Link to="/donation-requests" className="px-10 py-3 bg-black text-white font-black italic uppercase tracking-widest text-xs rounded-full hover:scale-110 transition-transform">
              Donate Now
            </Link>
          </div>

          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
