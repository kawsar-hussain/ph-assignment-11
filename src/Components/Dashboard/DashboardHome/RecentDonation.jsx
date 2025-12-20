import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const RecentDonation = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCallback, setModalCallback] = useState(null);

  const fetchUser = () => {
    axios.get(`https://server-11-zeta.vercel.app/my-requests?email=${user.email}`).then((res) => {
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
    axios.patch(`https://server-11-zeta.vercel.app/update/donation-status/${id}`, { status }).then((res) => {
      console.log(res.data);
      fetchUser();
    });
  };

  // delete request function
  const handleDelete = (id) => {
    axios
      .delete(`https://server-11-zeta.vercel.app/delete/${id}`)
      .then((res) => {
        console.log(res.data);
        const filterData = requests.filter((request) => request._id !== id);
        setRequests(filterData);
        toast.success("Item deleted successfully!");
      })
      .catch((err) => {
        console.error(err);
      });

    // sweet alert
    Swal.fire({
      title: "Request Deleted Successfully!",
      icon: "success",
      draggable: true,
    });
  };

  return (
    <div className="mt-10 ">
      {requests.length < 1 ? (
        ""
      ) : (
        <div className="">
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
                          {request.status === "pending" && <button className="btn btn-xs bg-linear-to-tr from-[#0067ed] to-[#a9eaff] text-white shadow-none border-none w-20">Pending</button>}

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
                          <Link to={`/dashboard/update/request/${request._id}`} className="btn btn-xs bg-linear-to-tr from-[#0067ed] to-[#a9eaff] text-white border-none shadow-none">
                            Edit
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              setModalCallback(() => () => handleDelete(request._id));
                              setIsModalOpen(true);
                            }}
                            className="btn btn-xs bg-[#ff2c2c] text-white border-none shadow-none"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
            {/* modal */}
            {isModalOpen && (
              <div className="modal modal-open bg-black/30">
                <div className="modal-box bg-base-300">
                  <h3 className="font-bold text-lg text-black">Confirm Delete</h3>
                  <p className="py-4 text-black">Are you sure you want to delete this item?</p>
                  <div className="modal-action">
                    <button className="btn bg-gray-800 text-white" onClick={() => setIsModalOpen(false)}>
                      Cancel
                    </button>
                    <button
                      className="btn bg-[#ff3700] shadow-none border-none text-white"
                      onClick={() => {
                        modalCallback?.(); // run stored callback
                        setIsModalOpen(false); // close modal
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentDonation;
