import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa6";
import { VscGitPullRequestGoToChanges } from "react-icons/vsc";
import { FaSackDollar } from "react-icons/fa6";

const WebsiteInfo = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  const totalPrice = paymentData.reduce((total, item) => total + item.amount, 0);

  console.log(paymentData);

  // users
  useEffect(() => {
    axios.get("https://server-11-zeta.vercel.app/users").then((res) => {
      // console.log(res.data.role);
      setUsers(res.data);
    });
  }, []);

  // payment data
  useEffect(() => {
    axios.get("https://server-11-zeta.vercel.app/success-payment").then((res) => {
      // console.log(res.data.role);
      setPaymentData(res.data);
    });
  }, []);

  // requests

  useEffect(() => {
    axios.get("https://server-11-zeta.vercel.app/create-donation-request").then((res) => {
      console.log(res.data);
      setRequests(res.data);
    });
  }, []);

  return (
    <div className="mt-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 px-[200px]">
      <div className="bg-linear-to-t from-black/0 via-[#dc4900ba] to-[#ffa41c] text-white text-center py-5 pb-12 rounded-t-md ">
        <div className="">
          <h4 className="text-2xl">Total Users</h4>
          <FaUsers className="text-6xl mt-3 m-auto" />
          <p className="text-5xl mt-8 font-bold">{users.filter((user) => user.role === "donor").length}</p>
        </div>
      </div>
      <div className="bg-linear-to-t from-black/0 via-[#dc4900ba] to-[#ffa41c] text-white text-center py-5 pb-12 rounded-t-md ">
        <div className="">
          <h4 className="text-2xl">Total Funding</h4>
          <FaSackDollar className="text-6xl mt-3 m-auto" />
          <p className="text-5xl mt-8 font-bold">${totalPrice}</p>
        </div>
      </div>
      <div className="bg-linear-to-t from-black/0 via-[#dc4900ba] to-[#ffa41c] text-white text-center py-5 pb-12 rounded-t-md ">
        <div className="">
          <h4 className="text-2xl">Total Requests</h4>
          <VscGitPullRequestGoToChanges className="text-6xl mt-3 m-auto" />
          <p className="text-5xl mt-8 font-bold">{requests.length}</p>
        </div>
      </div>
    </div>
  );
};

export default WebsiteInfo;
