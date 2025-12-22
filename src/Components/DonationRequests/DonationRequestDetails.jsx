import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Modal from "./Modal";
import { AuthContext } from "../../Provider/AuthProvider";
import Loader from "../../Loader";

const DonationRequestDetails = () => {
  const { id } = useParams();
  const [request, setRequest] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://server-11-zeta.vercel.app/donation-request/${id}`)
      .then((res) => {
        setRequest(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

  if (loading) {
    return <Loader></Loader>;
  }

  return (
    <div className="lg:px-20 px-4 lg:min-h-[92vh] h-auto pt-10">
      <div className="relative group max-w-2xl mx-auto overflow-hidden rounded-[2.5rem] p-0.5">
        <div className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ffffff_0%,#ffa41c_50%,#ffffff_100%)] opacity-40"></div>
        <div className="relative bg-black/20 backdrop-blur-2xl shadow-2xl text-white border border-white/20 rounded-[2.5rem] z-10 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-b from-white/5 to-black/20 pointer-events-none"></div>
          <div className="card-body p-4 py-8 md:p-12 gap-6 relative z-10">
            <div className="flex flex-col items-center gap-4 mb-0 lg:mb-4">
              <h2 className="text-2xl lg:text-3xl font-black text-center italic flex flex-wrap items-center justify-center gap-3">
                LOOKING FOR
                <span className="relative inline-block animate-[heartbeat_1.5s_ease-in-out_infinite]">
                  <span className="absolute inset-0 rounded-full bg-white blur-md opacity-30"></span>
                  <span className="relative bg-white text-[#991b1b] px-6 py-2 rounded-full shadow-2xl italic font-black text-2xl border border-white/50">{request.bloodGroup}</span>
                </span>
                BLOOD
              </h2>
              <div className="w-24 h-1 bg-linear-to-r from-transparent via-white/40 to-transparent rounded-full"></div>
            </div>

            <div className="text-center space-y-1">
              <h2 className="text-2xl lg:text-4xl font-bold group-hover:text-yellow-300 transition-colors uppercase italic leading-none">{request.recipientName}</h2>
              <p className="text-sm font-bold capitalize lg:uppercase tracking-wide lg:tracking-[0.3em] text-white/70">
                {request.upazila} • {request.district}
              </p>
            </div>

            {request.message && (
              <div className=" bg-white/10 rounded-2xl p-2 py-4 lg:p-4 text-sm italic border-l-4 border-yellow-400 backdrop-blur-md">
                <p className="px-4 text-gray-100">{request.message}</p>
              </div>
            )}

            <div className="bg-black/30 rounded-[1.8rem] p-4 py-6 lg:p-6 border border-white/10 shadow-inner">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Hospital</span>
                  <span className="font-bold text-lg leading-tight">{request.hospitalName}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Address</span>
                  <span className="font-bold text-[17px] lg:text-lg leading-tight">{request.fullAddress}</span>
                </div>

                <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Donation Date</span>
                  <span className="font-bold text-lg text-yellow-300">{request.donationDate}</span>
                </div>

                <div className="flex flex-col gap-1 border-t border-white/10 pt-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">Time</span>
                  <span className="font-bold text-lg text-yellow-300">{request.donationTime}</span>
                </div>
              </div>
            </div>

            <div className=" border-t border-white/10 pt-6">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/70 mb-1">Posted By</p>
                <p className="text-xl font-black italic">{request.requesterName}</p>
                <p className="text-xs text-white/60 hover:text-yellow-300 transition-colors cursor-pointer underline">{request.requesterEmail}</p>
              </div>
            </div>

            <div className="">
              {user.email === request.requesterEmail ? (
                <button className="relative overflow-hidden w-full h-14 rounded-2xl bg-white/10 border border-white/20 text-white font-black uppercase italic text-xs tracking-widest transition-all cursor-default opacity-80 backdrop-blur-md">
                  This is your submission
                </button>
              ) : (
                <div className="group/btn relative">
                  <Modal request={request} />
                </div>
              )}
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes heartbeat {
            0%,
            100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </div>
    </div>
  );
};

export default DonationRequestDetails;
