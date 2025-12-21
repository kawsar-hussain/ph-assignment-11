import axios from "axios";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router";
import { Link } from "react-router";
import { FaCheckCircle, FaArrowRight, FaDownload } from "react-icons/fa";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    axios.post(`http://localhost:3000/success-payment?session_id=${sessionId}`).then((res) => {
      console.log(res.data);
    });
  }, [sessionId]);

  return (
    <div className="h-auto lg:h-[92vh]">
      <div className="min-h-[90vh] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Background Animated Blobs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#dc4900]/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-[#ffa41c]/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        {/* Main Success Card */}
        <div className="relative group max-w-lg w-full">
          {/* The Spinning Border Effect (Same as your buttons) */}
          <div className="absolute inset-0.5 rounded-3xl overflow-hidden">
            <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#dc4900_0%,#ffffff_50%,#ffa41c_100%)] opacity-30"></div>
          </div>

          <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 text-center shadow-2xl">
            {/* Success Icon with Double Ripple */}
            <div className="relative inline-flex mb-6">
              <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-20"></span>
              <span className="absolute inset-2.5 rounded-full bg-green-500 animate-ping opacity-10 [animation-duration:1.5s]"></span>
              <div className="relative bg-linear-to-tr from-green-500 to-emerald-400 p-5 rounded-full shadow-[0_0_30px_rgba(16,185,129,0.5)]">
                <FaCheckCircle className="text-white text-6xl animate-[scale_0.5s_ease-out]" />
              </div>
            </div>

            {/* Text Content */}
            <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
              Payment <span className="text-transparent bg-clip-text bg-linear-to-r from-[#dc4900] to-[#ffa41c]">Successful!</span>
            </h1>
            <p className="text-gray-300 text mb-8">Thank you for your contribution. Your donation helps save lives.</p>

            {/* Transaction Info Box */}
            <div className="bg-white/5 rounded-2xl p-4 mb-8 border border-white/5 flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">Transaction ID:</span>
                <span className="text-gray-200 font-mono">TXN-9928374650</span>
              </div>
              <div className="flex justify-between text-sm border-t border-white/5 pt-2">
                <span className="text-gray-300">Amount Paid:</span>
                <span className="text-[#ffa41c] font-bold">$50.00</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/dashboard"
                className="flex-1 bg-linear-to-r from-[#dc4900] to-[#ffa41c] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform active:scale-95 shadow-lg shadow-[#dc4900]/20"
              >
                Go to Dashboard <FaArrowRight />
              </Link>

              <button className="flex-1 cursor-pointer bg-white/10 hover:bg-white/20 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all border border-white/10">
                <FaDownload className="text-sm" /> Receipt
              </button>
            </div>
          </div>
        </div>{" "}
      </div>
      {/* Custom Styles for Animations */}
      <style jsx>{`
        @keyframes scale {
          0% {
            transform: scale(0);
          }
          80% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default PaymentSuccess;
