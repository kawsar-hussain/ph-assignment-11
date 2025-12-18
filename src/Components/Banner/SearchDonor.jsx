import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import { IoSearchSharp } from "react-icons/io5";

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
      .get("http://localhost:3000/create-donation-request")
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
    <div className="lg:px-20 py-10 px-5">
      <div className="bg-black/15 backdrop-blur-md py-15 rounded-md">
        <h3 className="text-3xl font-bold text-white text-center">Search Blood Requests Here</h3>
        {/* filters */}
        <div className="flex justify-center gap-3 mt-7 flex-wrap">
          <div className="flex gap-1 *:w-[250px]">
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

      {/* filtered requests */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-10">
        {filteredRequests.length > 0
          ? filteredRequests.map((request) => (
              <div key={request._id} className="bg-white/10 backdrop-blur-md p-5 rounded-xl shadow-md text-white flex flex-col justify-between">
                <h3 className="text-2xl font-semibold mb-3">
                  Blood Needed: <span className="bg-white/30 px-3 py-1 rounded">{request.bloodGroup}</span>
                </h3>

                <h2 className="text-lg font-semibold mb-2">{request.recipientName}</h2>

                <div className="flex justify-between">
                  <div>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Location: </span>
                      {request.upazila}, {request.district}
                    </p>
                    <p className="text-sm mb-1">
                      <span className="font-medium">Date: </span>
                      {request.donationDate}
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Time: </span>
                      {request.donationTime}
                    </p>
                  </div>
                  <div className="self-end">
                    <Link
                      to={`/donation-requests/${request._id}`}
                      className="btn btn-sm bg-linear-to-tr from-[#dc4900] to-[#ffa41c] border-none shadow-none text-white transition-transform hover:scale-105 hover:duration-200"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default SearchDonor;
