import React, { use } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logOut } = use(AuthContext);

  const li = (
    <>
      <li>
        <NavLink to="/" className="rounded-none">
          Home
        </NavLink>
      </li>
    </>
  );

  const navigate = useNavigate();

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
    <nav className="navbar lg:h-[8vh] h-auto bg-base-100 shadow-sm lg:px-20 pl-1 px-5 sticky top-0 z-10">
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
          <img className="lg:h-10 lg:w-10 h-8 w-8" src="/logo.png" alt="" />
          <span>
            <span className="primary-text">Website</span>
            <span className="secondary-text">Name</span>
          </span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 font-medium menu-nav">{li}</ul>
      </div>

      <div className="navbar-end flex gap-1.5">
        {user ? (
          <div className="flex items-center gap-2">
            <div tabIndex={0} role="button" className="">
              <img src={`${user.photoURL}`} alt="user photo" className="w-10 h-10 object-cover rounded-full"></img>
            </div>

            <button onClick={handleLogOut} className=" z-1 p-3 h-8 btn rounded-sm bg-linear-to-tr from-[#ff6f00] to-[#ffb03a] text-white hover:shadow-none">
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <Link to="login" className="h-8 btn bg-linear-to-tr from-[#ff6a00] to-[#ffb03a] text-white border-none hover:shadow-none">
              Login
            </Link>
            <Link to="register" className="h-8 btn bg-transparent primary-text border-[#ff9900] hover:shadow-none">
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
