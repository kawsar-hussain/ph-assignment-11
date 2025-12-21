import React, { useContext } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="">
      <div className=" flex flex-wrap justify-center items-center gap-10  px-6">
        {!user && (
          <div className="relative group p-[3px] overflow-hidden rounded-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 active:scale-95 shadow-[0_0_20px_rgba(220,73,0,0.2)] hover:shadow-[0_20px_40px_rgba(220,73,0,0.5)]">
            {/* Spinning Light Beam - Speeds up on hover */}
            <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ed4f00_0%,#ffffff_50%,#991b1b_100%)]"></div>

            <Link
              to="/register"
              className="relative w-full lg:w-[320px] h-[200px] flex flex-col justify-center bg-linear-to-tr from-[#dc4900] via-[#dc4900] to-[#ffa41c] text-white text-center rounded-lg py-8 z-10 transition-colors duration-500 overflow-hidden"
            >
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

              <IoMdPersonAdd className="m-auto text-7xl mb-4 group-hover:rotate-12 transition-transform duration-500" />
              <p className="text-3xl font-bold tracking-tight">Join as a donor</p>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
            </Link>
          </div>
        )}

        <div className="relative group p-[3px] overflow-hidden rounded-xl transition-all duration-500 hover:scale-110 hover:-translate-y-2 active:scale-95 shadow-[0_0_20px_rgba(255,164,28,0.2)] hover:shadow-[0_20px_40px_rgba(255,164,28,0.5)]">
          <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] group-hover:animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#dc4900_0%,#ffffff_50%,#ffa41c_100%)]"></div>

          <Link
            to="/search-donor"
            className="relative w-full lg:w-[320px] h-[200px] flex flex-col justify-center bg-linear-to-tl from-[#dc4900] via-[#dc4900] to-[#ffa41c] text-white text-center rounded-lg py-8 z-10 transition-colors duration-500 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
            <MdPersonSearch className="m-auto text-7xl mb-4 group-hover:-rotate-12 transition-transform duration-500" />
            <p className="text-3xl font-bold tracking-tight">Search Donor</p>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-white/30 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
