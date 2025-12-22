import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { IoSearchSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { IoLocationOutline, IoCalendarOutline, IoTimeOutline, IoArrowForwardOutline } from "react-icons/io5";

const SearchDonor = () => {
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const [district, setDistrict] = useState("");
  const [upazila, setUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  // fetch donation requests
  useEffect(() => {
    axios
      .get("https://server-11-zeta.vercel.app/create-donation-request")
      .then((res) => {
        const data = res.data || [];
        setRequests(data);
      })
      .catch((err) => console.error(err));
  }, []);

  // districts
  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => setDistricts(res.data || []))
      .catch((err) => console.error("Error fetching districts:", err));
  }, []);

  // upazilas
  useEffect(() => {
    axios
      .get("/upazilas.json")
      .then((res) => setUpazilas(res.data || []))
      .catch((err) => console.error("Error fetching upazilas:", err));
  }, []);

  // search handler
  const handleSearch = () => {
    const filtered = requests.filter((req) => {
      return (district ? req.district === district : true) && (upazila ? req.upazila === upazila : true) && (bloodGroup ? req.bloodGroup === bloodGroup : true);
    });
    setFilteredRequests(filtered);
  };

  return (
    <div className="lg:px-20 py-10 px-4 lg:min-h-[92vh] min-h-[80vh]">
      <div className="bg-black/15 backdrop-blur-md py-7 px-5 lg:py-15 rounded-md ">
        <div className="text-center mb-0 lg:mb-14 relative">
          <h3 className="text-4xl lg:text-6xl font-black text-white italic tracking-tight">
            LIVE{" "}
            <span className="text-[#ff8800] not-italic relative">
              FEED
              <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="#ff8900" strokeWidth="4" fill="transparent" />
              </svg>
            </span>
          </h3>

          <p className="mt-6 text-white/70 font-bold text-xs lg:text-sm tracking-[0.3em] uppercase">connecting donors with hope • search below</p>
        </div>
        {/* filters */}
        <div className="flex lg:flex-row flex-col justify-center gap-3 mt-7 flex-wrap ">
          <div className="flex flex-col lg:flex-row justify-center items-center gap-1 *:w-full lg:*:w-[250px]">
            {/* district */}
            <select name="district" value={district} onChange={(e) => setDistrict(e.target.value)} className="select">
              <option value="">Select Your District</option>
              {districts
                ?.sort((a, b) => a?.name?.localeCompare(b?.name))
                .map((d, i) => (
                  <option key={i} value={d.name}>
                    {d.name}
                  </option>
                ))}
            </select>

            {/* upazila */}
            <select name="upazila" value={upazila} onChange={(e) => setUpazila(e.target.value)} className="select">
              <option value="">Select Your Upazila</option>
              {upazilas
                ?.sort((a, b) => a?.name?.localeCompare(b?.name))
                .map((u, i) => (
                  <option key={i} value={u.name}>
                    {u.name}
                  </option>
                ))}
            </select>

            {/* blood group */}
            <select name="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="select">
              <option value="">Select Blood Group</option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg, i) => (
                <option key={i} value={bg}>
                  {bg}
                </option>
              ))}
            </select>
          </div>

          <button onClick={handleSearch} className="btn bg-linear-to-tr from-[#dc4900] to-[#ffa41c] text-white border-none shadow-none flex items-center gap-1">
            <IoSearchSharp className="text-xl" /> Search
          </button>
        </div>
      </div>

      {/* filtered requests grid */}
      <div className="grid grid-cols-1 w-full lg:max-w-2xl m-auto  gap-6 mt-12">
        <AnimatePresence mode="popLayout">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request, index) => (
              <motion.div
                key={request._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group overflow-hidden bg-linear-to-br from-white/10 to-white/5 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl flex flex-col justify-between"
              >
                {/* subtle background glow */}
                <div className="absolute -right-10 -top-10 w-32 h-32 bg-red-600/20 blur-3xl rounded-full group-hover:bg-red-600/30 transition-colors" />

                <div>
                  <div className="flex justify-between  mb-4">
                    <div className="">
                      <h2 className="text-2xl font-bold text-white leading-tight">{request.recipientName}</h2>
                    </div>
                    <div className="bg-red-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-lg shadow-red-900/40">{request.bloodGroup}</div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-white/70">
                      <div className="p-2 bg-white/5 rounded-lg">
                        <IoLocationOutline className="text-red-400" />
                      </div>
                      <span className="text-sm font-medium">
                        {request.upazila}, {request.district}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-white/70">
                      <div className="p-2 bg-white/5 rounded-lg">
                        <IoCalendarOutline className="text-red-400" />
                      </div>
                      <span className="text-sm font-medium">{request.donationDate}</span>
                    </div>

                    <div className="flex items-center gap-3 text-white/70">
                      <div className="p-2 bg-white/5 rounded-lg">
                        <IoTimeOutline className="text-red-400" />
                      </div>
                      <span className="text-sm font-medium">{request.donationTime}</span>
                    </div>
                  </div>
                </div>

                <Link
                  to={`/donation-requests/${request._id}`}
                  className="btn  bg-linear-to-tr from-[#dc4900] to-[#ffa41c] text-white border-none shadow-none  flex items-center justify-center gap-2 w-full transition-all "
                >
                  <span>View Details</span>
                  <IoArrowForwardOutline className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center">
              <p className="text-white/60 italic">Your search results will appear here. If no results match, nothing will be shown.</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SearchDonor;
