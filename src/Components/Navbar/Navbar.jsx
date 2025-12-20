import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { IoMoonOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dbUser, setDbuser] = useState("");
  const navigate = useNavigate();

  // fetch user data
  useEffect(() => {
    axios.get(`http://localhost:3000/users/${user?.email}`).then((res) => {
      setDbuser(res.data);
    });
  }, [user?.email]);

  const li = (
    <>
      <li>
        <NavLink to="/" className="text-[#dfdfdf]">
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/donation-requests" className="text-[#dfdfdf]">
          Donate
        </NavLink>
      </li>
      <li>
        <NavLink to="/funding" className="text-[#dfdfdf]">
          Funding
        </NavLink>
      </li>
    </>
  );

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out.");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  return (
    <nav className="navbar lg:h-[8vh] h-auto bg-[#00000034] backdrop-blur-sm  shadow-sm lg:px-20 pl-1 px-5 sticky top-0 z-10 py-0">
      <div className="flex">
        <div className="dropdown ">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-base-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {" "}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-black/90 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {li}
          </ul>
        </div>
        <Link to="/" className="lg:text-2xl text-xl font-bold flex items-center gap-1">
          <img className="lg:h-10 lg:w-10 h-8 w-8 " src="/logo.png" alt="" />
          <span>
            <span className="text-white">Donate</span>
            <span className="text-white">X</span>
          </span>
        </Link>
      </div>

      <div className="flex items-center justify-end lg:justify-between gap-1.5 w-full">
        <div className="navbar-center hidden lg:flex ml-15 ">
          <ul className="menu menu-horizontal px-1 font-medium menu-nav flex gap-2 ">{li}</ul>
        </div>
        {user ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-2 bg-transparent btn shadow-none border-none h-12 px-2">
              <div className="btn bg-linear-to-tr from-[#ed4f00] to-[#ff9215] text-white border-none shadow-none mr-1 h-9">
                <Link to="/dashboard"> Dashboard</Link>
              </div>
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn shadow-none bg-transparent px-0 border-none">
                  <img src={`${dbUser.photoURL}`} alt="user photo" className="w-10 h-10 object-cover rounded-full border border-[#ffa647]"></img>
                </div>

                <ul className="dropdown-content  bg-black/60  backdrop-blur-2xl space-y-3 rounded-box z-50 p-3 shadow-sm w-[200px] whitespace-normal *:text-white">
                  <li className="flex items-center gap-2.5 text-md font-medium">
                    <IoSettingsOutline className="text-[18px]" />
                    Setting
                  </li>
                  <li className="">
                    <Link className="flex items-center gap-2.5 text-md font-medium" to="/dashboard/profile">
                      {" "}
                      <FaRegUserCircle className="text-[18px]" />
                      Profile
                    </Link>
                  </li>
                  <li className="flex items-center gap-2.5 text-md font-medium">
                    {" "}
                    <IoMoonOutline className="text-[18px]" />
                    Appearance
                  </li>
                  <hr className="border-gray-400 my-3" />
                  <li className="">
                    <button onClick={handleLogOut} className="flex items-center gap-1 hover:cursor-pointer">
                      Logout <IoIosLogOut className="text-[17px]" />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="login" className="h-8 btn  shadow-none hover:shadow-none">
              Login
            </Link>
            <Link to="register" className="h-8 btn bg-linear-to-tr from-[#dc4900] to-[#ffa41c]  text-white border-none shadow-none hover:shadow-none">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
