import React from "react";
import { MdOutlineMarkEmailRead } from "react-icons/md";
import { IoSendSharp } from "react-icons/io5";

const Contact = () => {
  return (
    <div className="px-4 flex flex-col items-center">
      {/* 2. CLEAN CONTACT FORM */}
      <div className="max-w-2xl w-full">
        <div className="bg-black/15 backdrop-blur-sm border border-white/10 rounded-4xl lg:rounded-[2.5rem] overflow-hidden">
          <div className="p-3 pb-5 py-10 md:p-12">
            <div className="relative flex items-center justify-center mb-10 group">
              {/* 1. Outer Pulse Layer (Broadcasting effect) */}
              <span className="absolute h-24 w-24 rounded-full bg-[#dc4900] animate-ping opacity-20"></span>

              {/* 2. Middle Static Glow */}
              <span className="absolute h-20 w-20 rounded-full bg-[#ffa41c]/30 blur-xl animate-pulse"></span>

              {/* 3. The Main Circle Icon */}
              <div className="relative h-24 w-24 flex items-center justify-center bg-linear-to-tr from-[#dc4900] to-[#ffa41c] rounded-full shadow-[0_0_40px_rgba(220,73,0,0.6)] animate-bounce [animation-duration:3s] z-10 border-4 border-white/20">
                {/* The Icon itself */}
                <MdOutlineMarkEmailRead className="text-white text-4xl lg:text-5xl transition-transform group-hover:scale-110 duration-300" />
              </div>
            </div>

            <div className="text-center mb-10">
              <h2 className="text-2xl lg:text-3xl font-black text-white uppercase tracking-tighter italic">
                Send a <span className="text-[#ffa41c]">Message</span>
              </h2>
              <div className="w-20 h-1 bg-linear-to-r from-[#dc4900] to-[#ffa41c] mx-auto mt-2 rounded-full"></div>
            </div>

            <form className="space-y-3 lg:space-y-5">
              {/* Subject */}
              <div className="group">
                <label className="text-xs font-bold text-gray-400  ml-2 mb-2 block transition-colors group-focus-within:text-[#ffa41c]">Subject</label>
                <input
                  type="text"
                  placeholder="Inquiry about donation"
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-6 text-white outline-hidden focus:border-[#ffa41c] focus:ring-1 focus:ring-[#ffa41c]/30 transition-all duration-300"
                  required
                />
              </div>

              {/* Message */}
              <div className="group">
                <label className="text-xs font-bold text-gray-400   ml-2 mb-2 block transition-colors group-focus-within:text-[#ffa41c]">Your Message</label>
                <textarea
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-6 h-32 text-white outline-hidden focus:border-[#ffa41c] focus:ring-1 focus:ring-[#ffa41c]/30 transition-all duration-300 resize-none"
                  placeholder="How can we help you?"
                  required
                ></textarea>
              </div>

              {/* Contact Number */}
              <div className="group">
                <label className="text-xs font-bold text-gray-400   ml-2 mb-2 block transition-colors group-focus-within:text-[#ffa41c]">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+880 1XXXXXXXXX"
                  className="w-full bg-black/20 border border-white/10 rounded-2xl py-4 px-6 text-white outline-hidden focus:border-[#ffa41c] focus:ring-1 focus:ring-[#ffa41c]/30 transition-all duration-300"
                  required
                />
              </div>

              {/* Submit Button */}
              <button className="relative cursor-pointer w-full group overflow-hidden bg-linear-to-r from-[#dc4900] to-[#ffa41c] py-3 lg:py-4 rounded-2xl mt-6 transition-all active:scale-95 shadow-lg shadow-[#dc4900]/20">
                {/* Internal Shimmer Effect */}
                <span className="absolute inset-0 w-full h-full bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></span>

                <span className="relative flex items-center justify-center gap-3 text-white font-black uppercase italic tracking-wider">
                  Shoot Message <IoSendSharp className="text-xl group-hover:translate-x-2  transition-transform" />
                </span>
              </button>
            </form>
          </div>
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
  );
};

export default Contact;
