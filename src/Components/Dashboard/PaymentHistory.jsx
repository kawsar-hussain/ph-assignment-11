import axios from "axios";
import React, { useEffect, useState } from "react";
import { MdCheckCircle, MdOutlineReceiptLong, MdContentCopy } from "react-icons/md";
import DashboardLoader from "../../DashboardLoader";

const PaymentHistory = () => {
  const [paymentData, setPaymentData] = useState([]);
  const [loading, setLoading] = useState(false);

  // payment data
  useEffect(() => {
    setLoading(true);
    axios.get("https://server-11-zeta.vercel.app/success-payment").then((res) => {
      // console.log(res.data.role);
      setPaymentData(res.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <DashboardLoader></DashboardLoader>;
  }

  return (
    <div className=" text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-black italic uppercase tracking-tighter">
          Transaction <span className="text-[#ffa41c]">Archive</span>
        </h2>
        <p className="text-white/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">verified financial records</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {[...paymentData].reverse().map((history) => (
          <div key={history.transactionId} className="group relative overflow-hidden rounded-2xl border border-white/5 bg-black/30 backdrop-blur-xl p-6 transition-all hover:border-[#dc4900]/40">
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-6">
              {/* left: status & amount */}
              <div className="flex items-center gap-5">
                <div className="h-14 w-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center text-green-500 shadow-[0_0_20px_rgba(34,197,94,0.1)]">
                  <MdCheckCircle className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-2xl font-black italic tracking-tight">
                    ${history.amount} <span className="text-xs uppercase text-white/40 font-bold tracking-widest">{history.currency}</span>
                  </h3>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#ffa41c] mt-0.5">{history.paymentStatus}</p>
                </div>
              </div>

              {/* center: id & email */}
              <div className="flex-1 min-w-[200px] border-l border-white/5 pl-6">
                <p className="text-[10px] uppercase  text-white/80 mb-1">Transaction ID</p>
                <div className="flex items-center gap-2 group/id">
                  <code className="text-xs font-mono text-white/70">{history.transactionId.slice(0, 15)}...</code>
                  <MdContentCopy className="text-xs text-white/50 cursor-pointer hover:text-[#ffa41c]" title="Copy ID" />
                </div>
                <p className="text-[10px] text-white/60 mt-1">{history.donorEmail}</p>
              </div>

              {/* right: date */}
              <div className="text-right">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70 mb-1">timestamp</p>
                <p className="text-xs font-black italic uppercase tracking-tighter ">
                  {new Date(history.paidAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-[10px] text-white/50 font-bold uppercase mt-1">{new Date(history.paidAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>

            {/* bottom scanning line glow */}
            <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-linear-to-r from-[#dc4900] to-[#ffa41c] group-hover:w-full transition-all duration-700"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
