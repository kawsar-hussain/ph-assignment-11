import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";

const RecentDonation = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/create-donation-request").then((res) => {
      console.log(res.data);
      setRequests(res.data);
    });
  }, []);

  return (
    <div className="mt-10">
      <div className="flex justify-between items-center  text-base-300  font-bold p-3 bg-black/35 backdrop-blur-sm rounded-t">
        <h3 className="text-2xl ">Your Recent 3 Requests</h3>
        <Link to="/dashboard/my-donation-requests" className="flex items-center gap-1.5 mr-5">
          See All Requests <FaArrowRight />
        </Link>
      </div>
      <div>
        <div className="overflow-x-auto text-white bg-black/15 backdrop-blur-sm rounded-b">
          <table className="table">
            {/* head */}
            <thead>
              <tr className="text-white bg-black/10">
                <th>Recipient</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Blood</th>
                <th>Status</th>
                <th>Donor</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {requests
                .filter((item) => item.requesterEmail === user.email)
                .slice(0, 3)
                .reverse()
                .map((request) => (
                  <tr key={request._id} className="hover:bg-[#ffffff1d]">
                    {/* Recipient Name */}
                    <td>{request.recipientName}</td>

                    {/* Location */}
                    <td>
                      {request.upazila}, {request.district}
                    </td>

                    {/* Donation Date */}
                    <td>{request.donationDate}</td>

                    {/* Donation Time */}
                    <td>{request.donationTime}</td>

                    {/* Blood Group */}
                    <td className="font-semibold">{request.bloodGroup}</td>

                    {/* Donation Status */}
                    <td>
                      <div className="flex gap-1">
                        <button className="btn btn-xs btn-info shadow-none border-none">Done</button>
                        <button className="btn btn-xs shadow-none bg-[#ff2c2c] text-white border-none">Cancel</button>
                      </div>
                    </td>

                    {/* Donor Info */}
                    <td>
                      {request.status === "inprogress" ? (
                        <div className="text-sm">
                          <p>{request.donorName}</p>
                          <p className="text-xs opacity-70">{request.donorEmail}</p>
                        </div>
                      ) : (
                        <span className="opacity-50">—</span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="flex gap-1 flex-wrap">
                      {/* View */}
                      <button className="btn btn-xs btn-info  border-none shadow-none">View</button>

                      {/* Edit */}
                      <button className="btn btn-xs btn-warning  border-none shadow-none">Edit</button>

                      {/* Delete */}
                      <button className="btn btn-xs bg-[#ff2c2c] text-white border-none shadow-none">Delete</button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RecentDonation;
