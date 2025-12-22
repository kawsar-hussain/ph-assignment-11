import { IoPeople, IoWater, IoAlertCircle, IoCheckmarkDoneCircle, IoCash } from "react-icons/io5";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const [paymentData, setPaymentData] = useState([]);

  const totalPrice = paymentData.reduce((total, item) => total + item.amount, 0);

  // Fetch Users
  useEffect(() => {
    axios.get("https://server-11-zeta.vercel.app/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  // Fetch Payment Data
  useEffect(() => {
    axios.get("https://server-11-zeta.vercel.app/success-payment").then((res) => {
      setPaymentData(res.data);
    });
  }, []);

  // Fetch Donation Requests
  useEffect(() => {
    axios.get("https://server-11-zeta.vercel.app/create-donation-request").then((res) => {
      setRequests(res.data);
    });
  }, []);

  const pendingRequests = requests.filter((req) => req.status === "pending" || req.status === "in progress").length;
  const doneRequests = requests.filter((req) => req.status === "completed").length;

  return (
    <div className="min-h-screen bg-black/30 rounded-2xl backdrop-blur-lg text-white p-4 lg:p-10">
      {/* header */}
      <header className="mb-10">
        <h1 className="text-2xl lg:text-3xl font-black italic tracking-wide text-white uppercase">
          Admin <span className="bg-clip-text text-transparent bg-linear-to-tr from-[#ed4f00] to-[#ffbc15]">Command Center</span>
        </h1>
        <p className="text-gray-400 text-sm mt-1 uppercase tracking-[0.2em]">system overview & analytics</p>
      </header>

      {/* stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
        {[
          { label: "Total Users", value: users.length, icon: <IoPeople />, color: "from-blue-500 to-cyan-400" },
          { label: "Blood Requests", value: requests.length, icon: <IoWater />, color: "from-red-600 to-orange-500" },
          { label: "Pending", value: pendingRequests, icon: <IoAlertCircle />, color: "from-amber-500 to-yellow-400" },
          { label: "Fulfilled", value: doneRequests, icon: <IoCheckmarkDoneCircle />, color: "from-emerald-500 to-teal-400" },
          { label: "Revenue", value: `$${totalPrice}`, icon: <IoCash />, color: "from-purple-500 to-pink-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-sm group hover:border-white/20 transition-all">
            <div className={`text-2xl mb-3 bg-clip-text text-transparent bg-linear-to-tr ${stat.color}`}>{stat.icon}</div>
            <h4 className="text-gray-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</h4>
            <p className="text-2xl font-black mt-1 tracking-tight">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* dynamic activity section */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-4 lg:p-8 backdrop-blur-md">
          <div className="flex lg:flex-row flex-col justify-between items-center mb-6">
            <h3 className="text-xl font-black italic uppercase tracking-wider">
              Recent <span className="text-[#ed4f00]">Donation Requests</span>
            </h3>
            <Link to="/dashboard/all-blood-donation-request" className="self-end lg:self-auto lg:mt-0 mt-3 text-xs font-bold text-gray-300 hover:text-white transition-colors">
              VIEW ALL
            </Link>
          </div>

          <div className="space-y-4">
            {[...requests].slice(0, 4).map((request, i) => (
              <div
                key={i}
                className="flex lg:flex-row flex-col items-start gap-3 lg:items-center justify-between p-4 bg-white/3 rounded-2xl border border-white/5 hover:bg-white/[0.07] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#ed4f00]/20 flex items-center justify-center font-bold text-[#ffbc15]">{request.bloodGroup}</div>
                  <div>
                    <h5 className="font-bold text-sm">Recipient: {request.recipientName}</h5>
                    <p className="text-xs text-gray-400">
                      {request.hospitalName} • {request.donationDate}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                    request.status === "pending" ? "bg-amber-500/10 text-amber-500" : "bg-emerald-500/10 text-emerald-500"
                  }`}
                >
                  {request.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* system health remains static for UI feel */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-4 lg:p-8 backdrop-blur-md flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-black italic uppercase tracking-wider mb-6">
              System <span className="text-[#ffbc15]">Health</span>
            </h3>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold uppercase mb-2">
                  <span className="text-gray-400">Server Load</span>
                  <span className="text-[#ffbc15]">Stable</span>
                </div>
                <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                  <div className="w-[24%] h-full bg-linear-to-r from-[#ed4f00] to-[#ffbc15]" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="w-full btn border-none text-base-300 bg-linear-to-tr from-[#ed4f00] to-[#ffbc15]  font-black uppercase rounded-2xl shadow-lg shadow-[#ed4f00]/20 hover:scale-[1.02] transition-transform">
              Download Summary
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
