import React from "react";
import { RiErrorWarningFill } from "react-icons/ri";

const BlockedUser = () => {
  return (
    <div className="bg-black/20 backdrop-blur-md w-full flex justify-center items-center rounded-md h-[calc(100vh-5rem)] ">
      <div className="text-base-300 text-center">
        {" "}
        <RiErrorWarningFill className="text-[170px] m-auto" />
        <h3 className="text-6xl font-bold mb-7">Opps!</h3>
        <p className="text-xl ">Your have been blocked by an admin.</p>
        <p className="mt-1">Donation request is no longer available for you.</p>
      </div>
    </div>
  );
};

export default BlockedUser;
