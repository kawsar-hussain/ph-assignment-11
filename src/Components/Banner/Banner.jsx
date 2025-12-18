import React, { useContext } from "react";
import { IoMdPersonAdd } from "react-icons/io";
import { MdPersonSearch } from "react-icons/md";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";

const Banner = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="lg:px-20 py-10 px-5">
      <div className="bg-black/15 backdrop-blur-md rounded-md flex justify-center items-center gap-5 py-[120px] px-[500px]">
        {!user && (
          <Link
            to="/register"
            className="w-full lg:w-[300px] bg-linear-to-tr from-[#dc4900] to-[#ffa41c] text-white text-center rounded-md py-6 transition-transform hover:scale-105 hover:duration-200"
          >
            <IoMdPersonAdd className="m-auto text-7xl mb-3" />
            <p className="text-3xl font-semibold">Join as a donor</p>
          </Link>
        )}

        <Link
          to="/search-donor"
          className="w-full lg:w-[300px] bg-linear-to-tl from-[#dc4900] to-[#ffa41c] text-white text-center rounded-md py-6 transition-transform hover:scale-105 hover:duration-200"
        >
          <MdPersonSearch className="m-auto text-7xl mb-3" />
          <p className="text-3xl font-semibold">Search Doner</p>
        </Link>
      </div>
    </div>
  );
};

export default Banner;
