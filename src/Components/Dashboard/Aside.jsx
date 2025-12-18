import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaBars, FaRegUserCircle, FaUsers } from "react-icons/fa";
import { MdOutlineDashboardCustomize, MdOutlineSdStorage, MdVerified } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosGitPullRequest, IoIosLogOut } from "react-icons/io";
import { VscRequestChanges } from "react-icons/vsc";
import axios from "axios";
import { HiOutlineHome } from "react-icons/hi";
import { toast } from "react-toastify";

const Aside = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/users/${user.email}`).then((res) => {
      // console.log(res.data.role);
      setDbUser(res.data);

      console.log(res.data);
    });
  }, [user]);

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
    <div className="">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-3" className="lg:hidden">
            <div className="bg-[#00000065] backdrop-blur-2xl py-3 px-5 flex justify-between items-center">
              <FaBars className="text-xl hover:cursor-pointer" />
              <h3 className="text-xl font-bold">Dashboard</h3>
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu lg:bg-black/20 bg-[#00000065] backdrop-blur-2xl lg:backdrop-blur-sm   min-h-screen w-80 p-4">
            {/* Sidebar content here */}
            <div className="mt-4 ">
              <div className="w-full aspect-square ">
                <Link>
                  {" "}
                  <img src={user.photoURL} alt="" className="w-[180px] h-[180px] m-auto object-cover rounded-full border-4 border-base-300" />
                </Link>
              </div>
            </div>
            <div className="text-center pt-3 pb-8">
              <p className="text-white  text-xl font-bold ">{user.displayName}</p>
              <p className="text-md mt-1 text-gray-300 flex items-center justify-center gap-1 capitalize">
                <MdVerified className="text-xl text-[#1b76ff]" /> {dbUser.role}
              </p>
            </div>

            {/* dashboard link */}
            <div className="flex flex-col gap-1.5 *:text-white *:rounded *:p-2 *:font-semibold *:hover:bg-[#0000003b] aside-div">
              <NavLink to="/dashboard" className="flex gap-4 items-center" end>
                <MdOutlineDashboardCustomize className="text-xl" /> Dashboard
              </NavLink>

              {/* admin link */}
              {dbUser.role === "admin" && (
                <NavLink to="/dashboard/all-users" className="flex gap-4 items-center">
                  <FaUsers className="text-xl" /> Users
                </NavLink>
              )}

              {/* admin and volunteer link */}
              {(dbUser.role === "admin" || dbUser.role === "volunteer") && (
                <NavLink to="/dashboard/all-blood-donation-request" className="flex gap-4 items-center">
                  {" "}
                  <VscRequestChanges className="text-xl" /> All Donation Request
                </NavLink>
              )}

              {/* donor links */}
              {dbUser.role === "donor" && (
                <>
                  <NavLink to="/dashboard/create-donation-request" className="flex gap-4 items-center">
                    {" "}
                    <IoCreateOutline className="text-xl" />
                    Create Donation Request
                  </NavLink>
                  <NavLink to="/dashboard/my-donation-requests" className="flex gap-4 items-center">
                    {" "}
                    <IoIosGitPullRequest className="text-xl" /> My Donation Request
                  </NavLink>
                </>
              )}

              <NavLink to="/dashboard/profile" className="flex gap-4 items-center">
                <FaRegUserCircle className="text-xl" /> Profile
              </NavLink>
            </div>

            {/* home and logout */}
            <div className="absolute bottom-6 text-white">
              <Link to="/" className="flex text-md gap-2 mb-3">
                {" "}
                <HiOutlineHome className="text-xl " /> Home
              </Link>
              <button onClick={handleLogOut} className="flex text-md gap-2 cursor-pointer">
                {" "}
                <IoIosLogOut className="text-xl " />
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
