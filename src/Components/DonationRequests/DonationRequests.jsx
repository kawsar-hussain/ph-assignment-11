import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";
const DonationRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/create-donation-request").then((res) => {
      console.log(res.data);
      setRequests(res.data);
    });
  }, []);
  return (
    <div className="lg:px-20 lg:py-10 px-5">
      <h2 className="text-4xl text-base-300 font-bold text-center mb-10">Donation Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request) => (
          <div key={request._id} className="bg-[#ffffff18] backdrop-blur-sm p-5 rounded-xl shadow-md text-white flex flex-col justify-between">
            <h3 className="text-2xl font-semibold mb-3">
              Blood Needed: <span className="bg-[#0089fa] px-3 py-1 rounded ">{request.bloodGroup}</span>
            </h3>

            {/* Recipient Name */}
            <h2 className="text-lg font-semibold mb-2">{request.recipientName}</h2>

            <div className="flex justify-between">
              <div className="">
                {/* Location */}
                <p className="text-sm mb-1">
                  <span className="font-medium">Location: </span>
                  {request.upazila}, {request.district}
                </p>

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
                <Link to={`/donation-requests/${request._id}`} className="btn btn-sm bg-[#ff8903] border-none shadow-none text-white hover:scale-105 duration-75">
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
