import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import Req from "./req";
import { Link } from "react-router";
const MyDonationRequest = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);

  const fetchUser = () => {
    axios.get(`http://localhost:3000/my-requests?email=${user.email}`).then((res) => {
      console.log(res.data);
      setRequests(res.data);
    });
  };

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update donation status function
  const handleStatusChange = (id, status) => {
    axios.patch(`http://localhost:3000/update/donation-status/${id}`, { status }).then((res) => {
      console.log(res.data);
      fetchUser();
    });
  };

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
            {requests.map((request) => (
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
                  {request.status === "pending" && <button className="btn btn-xs bg-linear-to-tr from-[#0067ed] to-[#a9eaff] shadow-none border-none w-20">Pending</button>}

                  {request.status === "in progress" && (
                    <div className="flex gap-1">
                      <button onClick={() => handleStatusChange(request?._id, "completed")} className="btn btn-xs btn-info shadow-none border-none">
                        Done
                      </button>
                      <button onClick={() => handleStatusChange(request?._id, "canceled")} className="btn btn-xs shadow-none bg-[#ff2c2c] text-white border-none">
                        Cancel
                      </button>
                    </div>
                  )}

                  {request.status === "completed" && <button className="btn btn-xs shadow-none bg-linear-to-tr from-[#ed4f00] to-[#ffa41c] text-white border-none w-20">Completed</button>}
                  {request.status === "canceled" && <button className="btn btn-xs shadow-none bg-[#ff2c2c] text-white border-none w-20">Canceled</button>}
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
                  <Link to={`/donation-requests/${request._id}`} className="btn btn-xs bg-linear-to-tr from-[#ed4f00] to-[#ffa41c] text-white  border-none shadow-none">
                    View
                  </Link>

                  {/* Edit */}
                  <button className="btn btn-xs bg-linear-to-tr from-[#0067ed] to-[#a9eaff] border-none shadow-none">Edit</button>

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
