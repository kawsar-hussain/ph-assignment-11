import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
const MyDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/create-donation-request").then((res) => {
      console.log(res.data);
      setRequests(res.data);
    });
  }, []);
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table text-white bg-black/15 backdrop-blur-sm">
          {/* head */}
          <thead>
            <tr className="text-white bg-black/10 rounded-t">
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
  );
};

export default MyDonationRequest;
