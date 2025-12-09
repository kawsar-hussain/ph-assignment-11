import React from "react";
import HashLoader from "react-spinners/HashLoader";

const Loader = () => {
  return (
    <div className="flex flex-col">
      <div className="fixed h-auto lg:h-[92vh] inset-0 flex items-center justify-center bg-white z-50 self-center lg:self-end">
        <HashLoader color="#ff9900" size={50} />
      </div>
    </div>
  );
};

export default Loader;
