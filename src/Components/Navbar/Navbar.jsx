import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);
  const navigate = useNavigate();

  const li = (
    <>
      <li>
        <NavLink to="/" className=" text-white">
          Home
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
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden hover:bg-base-300">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 " fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {" "}
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />{" "}
            </svg>
          </div>
          <ul tabIndex="-1" className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
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

      <div className="navbar-end flex gap-1.5">
        <div className="navbar-center hidden lg:flex mr-3">
          <ul className="menu menu-horizontal px-1 font-medium menu-nav">{li}</ul>
        </div>
        {user ? (
          <div className="flex items-center gap-2">
            <div className="flex gap-2 bg-transparent btn shadow-none border-none h-12 px-2">
              <div className="dropdown dropdown-bottom dropdown-end">
                <div tabIndex={0} role="button" className="btn shadow-none bg-transparent px-0 border-none">
                  <img src={`${user.photoURL}`} alt="user photo" className="w-10 h-10 object-cover rounded-full"></img>
                </div>
                <ul className="dropdown-content bg-[#00000052] backdrop-blur-2xl  rounded-box z-1 p-3 shadow-sm w-[200px] whitespace-normal *:text-base-300">
                  <li className="text-start">
                    <Link to="/dashboard"> Dashboard</Link>
                  </li>
                  <hr className="border-gray-400 my-1" />
                  <li className="">
                    <button onClick={handleLogOut} className="flex items-center gap-1 hover:cursor-pointer">
                      Logout <IoIosLogOut />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="login" className="h-8 btn bg-[#ca2500] text-white border-none shadow-none hover:shadow-none">
              Login
            </Link>
            <Link to="register" className="h-8 btn bg-transparent text-white border-white shadow-none hover:shadow-none">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
