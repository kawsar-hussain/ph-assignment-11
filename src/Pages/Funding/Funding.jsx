import axios from "axios";
import React, { useContext } from "react";
import { AuthContext } from "../../Provider/AuthProvider";

const Funding = () => {
  const { user } = useContext(AuthContext);

  const handleCheckout = (e) => {
    e.preventDefault();

    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;

    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    };
    axios.post("http://localhost:3000/create-payment-checkout", formData).then((res) => {
      console.log(res.data);
      window.location.href = res.data.url;
    });
  };

  return (
    <div className="lg:min-h-[92vh] h-auto">
      <div className="flex flex-col justify-center items-center h-[92vh] px-5">
        <div className="text-center mb-10 space-y-3">
          <h2 className="text-4xl md:text-5xl font-black text-white uppercase italic tracking-tighter drop-shadow-lg">
            Support <span className="text-yellow-400">DonateX</span>
          </h2>
          <p className="text-white/70 font-bold uppercase tracking-[0.3em] text-xs">Help us save lives together</p>
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-yellow-400 to-transparent mx-auto rounded-full"></div>
        </div>

        <div className="relative group p-0.5 rounded-[2.5rem] overflow-hidden max-w-xl w-full">
          <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#ffa41c_50%,#ffffff_100%)] opacity-30"></div>

          <form onSubmit={handleCheckout} className="relative flex flex-col gap-6 bg-black/15 backdrop-blur-2xl p-10 md:p-14 rounded-[2.5rem] border border-white/20 shadow-2xl z-10">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-white/50 ml-2">Amount to Donate</label>
              <div className="relative">
                <input
                  name="donateAmount"
                  type="text"
                  placeholder="0.00"
                  className="w-full bg-white/10 border border-white/20 rounded-2xl py-5 px-6 text-white text-2xl font-black placeholder:text-white outline-hidden focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                  required
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-yellow-400 font-black italic text-xl">USD</span>
              </div>
            </div>

            <button
              type="submit"
              className="relative group/btn cursor-pointer overflow-hidden bg-linear-to-r from-[#dc4900] to-[#ffa41c] py-5 rounded-2xl text-white font-black uppercase italic tracking-widest text-sm transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-[#dc4900]/30"
            >
              <span className="absolute inset-0 w-full h-full  bg-linear-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:animate-[shimmer_1.5s_infinite]"></span>
              <span className="relative z-10">Donate Now</span>
            </button>

            <p className="text-[10px] text-center text-white/40 uppercase font-bold tracking-widest">Secure Transaction • Global Impact</p>
          </form>
        </div>

        <style jsx>{`
          @keyframes shimmer {
            100% {
              transform: translateX(100%);
            }
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default Funding;
