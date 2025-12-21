import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { Link } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DashboardLoader from "../../../DashboardLoader";

const AllRequest = () => {
  const [requests, setRequests] = useState([]);
  const { dbUser } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalCallback, setModalCallback] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchUser = () => {
    setLoading(true);
    axios.get("https://server-11-zeta.vercel.app/create-donation-request").then((res) => {
      console.log(res.data);
      setRequests(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUser();
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

  if (loading) {
    return <DashboardLoader></DashboardLoader>;
  }

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
              {dbUser.role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {[...requests].reverse().map((request) => (
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
                {dbUser.role === "admin" && (
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
                )}
              </tr>
            ))}
          </tbody>
        </table>
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
  );
};

export default AllRequest;
