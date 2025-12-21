import React from "react";
import HashLoader from "react-spinners/HashLoader";

const DashboardLoader = () => {
  return (
    <div className="flex flex-col">
      <div className="fixed h-screen inset-0 flex items-center justify-center bg-[url('/bg.png')] bg-cover bg-center bg-fixed bg-no-repeat z-50">
        <HashLoader color="#ff9900" size={50} />
      </div>
    </div>
  );
};

export default DashboardLoader;
