import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaBars, FaRegUserCircle, FaUsers } from "react-icons/fa";
import { MdHistory, MdOutlineDashboardCustomize, MdOutlineSdStorage, MdVerified } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { IoIosGitPullRequest, IoIosLogOut } from "react-icons/io";
import { VscRequestChanges } from "react-icons/vsc";
import axios from "axios";
import { HiOutlineHome } from "react-icons/hi";
import { toast } from "react-toastify";
import DashboardLoader from "../../DashboardLoader";

const Aside = () => {
  const { user, logOut } = useContext(AuthContext);
  const [dbUser, setDbUser] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://server-11-zeta.vercel.app/users/${user.email}`).then((res) => {
      setDbUser(res.data);
      setLoading(false);
    });
  }, [user]);

  if (loading) {
    return <DashboardLoader></DashboardLoader>;
  }

  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Successfully logged out.");
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
    handleNavClick(); // Close the drawer
  };

  const handleNavClick = () => {
    const drawerCheckbox = document.getElementById("my-drawer-3");
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  };

  return (
    <div className="">
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="my-drawer-3" className="lg:hidden">
            <div className="bg-[#00000065] backdrop-blur-2xl py-3 px-5 flex justify-between items-center ">
              <FaBars className="text-xl hover:cursor-pointer" />
              <span className="flex italic font-bold text-xl">
                <span className="text-white ">Donate</span>
                <span className="relative font-black italic bg-clip-text text-transparent bg-size-[200%_200%] bg-linear-to-tr from-[#ed4f00] via-[#ffbc15] to-[#ff9215] animate-[gradient-shift_3s_ease_infinite] filter drop-shadow-[0_0_10px_rgba(255,188,21,0.4)]">
                  X
                </span>
              </span>
            </div>
          </label>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
          <div className="menu lg:bg-black/20 bg-[#00000065] backdrop-blur-2xl lg:backdrop-blur-sm h-screen w-[300px] p-4">
            {/* Sidebar content here */}
            <Link to="/dashboard/profile" className="relative mx-auto mb-6 group mt-6 ">
              <div className="absolute inset-0 bg-linear-to-tr from-[#ed4f00] to-[#ff9215] rounded-full blur-lg opacity-40 transition-opacity"></div>
              <img src={dbUser.photoURL} alt="" className="relative w-40 h-40 m-auto object-cover rounded-full border-2 border-white/10 p-1" />
            </Link>

            <div className="text-center mb-10">
              <p className="text-white text-xl font-black italic tracking-tight uppercase">{dbUser.name}</p>
              <p className=" text-[10px] mt-2 text-white/70  items-center justify-center gap-1 uppercase font-black tracking-widest bg-white/5 py-1 px-3 rounded-full border border-white/5 inline-flex">
                <MdVerified className="text-[#1b76ff] text-[14px]" /> {dbUser.role}
              </p>
            </div>

            {/* dashboard link */}
            <div className="flex flex-col gap-1.5 *:text-white *:rounded *:p-2 *:font-semibold *:hover:bg-[#0000003b] aside-div">
              <NavLink to="/dashboard" className="flex gap-4 items-center" end onClick={handleNavClick}>
                <MdOutlineDashboardCustomize className="text-xl" /> Dashboard
              </NavLink>

              {/* admin link */}
              {dbUser.role === "admin" && (
                <>
                  <NavLink to="/dashboard/all-users" className="flex gap-4 items-center" onClick={handleNavClick}>
                    <FaUsers className="text-xl" /> Users
                  </NavLink>
                  <NavLink to="/dashboard/payment-history" className="flex gap-4 items-center" onClick={handleNavClick}>
                    <MdHistory className="text-xl" /> Payment History
                  </NavLink>
                </>
              )}

              {/* admin and volunteer link */}
              {(dbUser.role === "admin" || dbUser.role === "volunteer") && (
                <NavLink to="/dashboard/all-blood-donation-request" className="flex gap-4 items-center" onClick={handleNavClick}>
                  {" "}
                  <VscRequestChanges className="text-xl" /> All Donation Request
                </NavLink>
              )}

              {/* donor links */}
              {dbUser.role === "donor" && (
                <>
                  <NavLink to="/dashboard/create-donation-request" className="flex gap-4 items-center" onClick={handleNavClick}>
                    {" "}
                    <IoCreateOutline className="text-xl" />
                    Create Donation Request
                  </NavLink>
                  <NavLink to="/dashboard/my-donation-requests" className="flex gap-4 items-center" onClick={handleNavClick}>
                    {" "}
                    <IoIosGitPullRequest className="text-xl" /> My Donation Request
                  </NavLink>
                </>
              )}

              <NavLink to="/dashboard/profile" className="flex gap-4 items-center" onClick={handleNavClick}>
                <FaRegUserCircle className="text-xl" /> Profile
              </NavLink>
            </div>

            {/* home and logout */}
            <div className="absolute bottom-6 text-white">
              <Link to="/" className="flex text-md gap-2 mb-3" onClick={handleNavClick}>
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
