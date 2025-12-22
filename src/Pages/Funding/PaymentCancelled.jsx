import React from "react";
import { Link } from "react-router";
import { MdErrorOutline, MdRefresh, MdHome } from "react-icons/md";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-3  relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative max-w-lg w-full">
        <div className="absolute inset-0.5 rounded-3xl overflow-hidden">
          <div className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffa41c_0%,#ffffff_50%,#dc4900_100%)] opacity-20"></div>
        </div>

        <div className="relative bg-black/40 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
          <div className="inline-flex mb-6">
            <div className="relative bg-orange-500/20 p-5 rounded-full animate-[wiggle_1s_ease-in-out_infinite]">
              <MdErrorOutline className="text-[#ffa41c] text-6xl" />
            </div>
          </div>

          <h1 className="text-4xl font-black text-white mb-3 tracking-tight">
            Payment <span className="text-[#ffa41c]">Failed</span>
          </h1>
          <p className="text-gray-400 text-lg mb-8">The transaction was not completed. No funds were deducted from your account.</p>

          <div className="bg-white/5 rounded-2xl p-5 mb-8 border border-white/5 text-left">
            <h4 className="text-white font-bold text-sm mb-2 uppercase tracking-wider">Common reasons:</h4>
            <ul className="text-gray-400 text-sm space-y-2">
              <li className="flex gap-2">
                <span>•</span> User cancelled the window
              </li>
              <li className="flex gap-2">
                <span>•</span> Card authorization failed
              </li>
              <li className="flex gap-2">
                <span>•</span> Session timeout
              </li>
            </ul>
          </div>

          {/* btn */}
          <div className="flex flex-col gap-4">
            <button className="w-full bg-linear-to-r from-[#dc4900] to-[#ffa41c] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform active:scale-95 shadow-lg shadow-[#dc4900]/20">
              <MdRefresh className="text-xl" /> Try Paying Again
            </button>

            <Link to="/" className="w-full bg-white/5 hover:bg-white/10 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10">
              <MdHome className="text-xl" /> Return to Home
            </Link>
          </div>

          <p className="mt-8 text-xs text-gray-500 uppercase tracking-widest">
            Need help?{" "}
            <a href="mailto:support@bloodhub.com" className="text-[#ffa41c] hover:underline">
              Contact Support
            </a>
          </p>
        </div>
      </div>

      {/* css */}
      <style jsx>{`
        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentCancelled;
