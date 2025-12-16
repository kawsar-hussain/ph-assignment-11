import React, { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import { FaBars } from "react-icons/fa";

const Aside = () => {
  const { user } = useContext(AuthContext);

  console.log(user);

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

          <div className="menu lg:bg-[#00000034] bg-[#00000065] backdrop-blur-2xl lg:backdrop-blur-sm   min-h-screen w-80 p-4">
            {/* Sidebar content here */}

            <div className="mt-4 ">
              <div className="w-full aspect-square ">
                <Link>
                  {" "}
                  <img src={user.photoURL} alt="" className="w-[180px] h-[180px] m-auto object-cover rounded-full border-4 border-base-300" />
                </Link>
              </div>
            </div>
            <div className="text-center pt-3 pb-5">
              <p className="text-white  text-xl font-bold ">{user.displayName}</p>
              <p className="text-sm text-gray-300">Admin</p>
            </div>

            <div className="flex flex-col gap-1.5 *:bg-[#ffdfdf] *:rounded *:py-1.5 *:px-2 *:font-semibold">
              <Link to="/dashboard/my-donation-requests">My Donation Request</Link>
              <Link to="/dashboard/create-donation-request">Create Donation Request</Link>
              <Link>Profile</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Aside;
