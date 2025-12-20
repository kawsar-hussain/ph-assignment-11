import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const DonationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/create-donation-request").then((res) => {
      setRequests(res.data);
    });
  }, []);
  return (
    <div className="lg:px-20 py-10 px-5 h-auto lg:min-h-[92vh]">
      <h2 className="text-4xl text-base-300 font-bold text-center mb-10">Donation Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {requests.map((request) => (
          <div key={request._id} className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-md border border-white/15 text-white flex flex-col justify-between">
            <div className="flex justify-between items-center mb-6">
              <div className="">
                <h2 className="text-2xl font-semibold">{request.recipientName}</h2>
                <p className="text-sm text-gray-300">
                  {request.upazila}, {request.district}
                </p>
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                <div className="relative inline-flex items-center justify-center p-0.5 overflow-hidden rounded-full group">
                  <div className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ed4f00_0%,#ffffff_50%,#991b1b_100%)]"></div>

                  <span className="relative bg-linear-to-b from-[#ed4f00] to-[#991b1b] text-white px-5 py-1 rounded-full italic font-black z-10">{request.bloodGroup}</span>
                </div>
              </h3>
            </div>

            {/* Recipient Name */}
            <div className="flex justify-between">
              <div className="">
                {/* Date */}
                <p className="text-sm mb-1">
                  <span className="font-medium">Date: </span>
                  {request.donationDate}
                </p>

                {/* Time */}
                <p className="text-sm">
                  <span className="font-medium">Time: </span>
                  {request.donationTime}
                </p>
              </div>
              <div className="self-end">
                <Link
                  to={`/donation-requests/${request._id}`}
                  className="btn btn-sm bg-linear-to-tr from-[#dc4900] to-[#ffa41c] border-none shadow-none text-white transition-transform hover:scale-105 hover:duration-200"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationRequests;
