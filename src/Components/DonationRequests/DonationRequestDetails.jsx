import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Modal from "./Modal";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState("");
  console.log(request);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/donation-request/${id}`)
      .then((res) => {
        setRequest(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  return (
    <div className="w-[35%] m-auto lg:py-15 py-10 px-5">
      <div className="card bg-white/10 backdrop-blur-xl shadow-2xl text-white border border-white/10">
        <div className="card-body gap-3">
          <h2 className="text-2xl font-bold text-center mb-3">Looking for {request.bloodGroup} Blood</h2>

          <div className="mb-2">
            <h2 className="text-xl font-semibold">{request.recipientName}</h2>
            <p className="text-sm opacity-70">
              {request.district}, {request.upazila}
            </p>
          </div>

          <div className="bg-white/15 rounded-lg p-3 text-sm">{request.message}</div>

          <div className="bg-white/15 rounded-lg p-3">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col">
                <span className="opacity-60">Hospital</span>
                <span className="font-medium">{request.hospitalName}</span>
              </div>

              <div className="flex flex-col">
                <span className="opacity-60">Address</span>
                <span className="font-medium">{request.fullAddress}</span>
              </div>

              <div className="flex flex-col">
                <span className="opacity-60">Date</span>
                <span className="font-medium">{request.donationDate}</span>
              </div>

              <div className="flex flex-col">
                <span className="opacity-60">Time</span>
                <span className="font-medium">{request.donationTime}</span>
              </div>
            </div>
          </div>

          {/* Requester Info */}

          <div className=" text-sm border-t border-white/10 pt-3">
            <p className="text-white">Post by</p>
            <div className="">
              <p className="text-lg">{request.requesterName}</p>
              <p className="text-sm opacity-70 cursor-pointer hover:underline">{request.requesterEmail}</p>
            </div>
          </div>
          <div className="mt-2">
            <Modal></Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
