import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";

const FilterAside = ({ setFilteredRequests, requests, setRequests }) => {
  //   const [requests, setRequests] = useState([]);

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
  }, [setRequests]);

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

  // automatic filtering
  useEffect(() => {
    const filtered = requests.filter((req) => {
      return (district ? req.district === district : true) && (upazila ? req.upazila === upazila : true) && (bloodGroup && bloodGroup !== "All" ? req.bloodGroup === bloodGroup : true);
    });
    setFilteredRequests(filtered);
  }, [district, upazila, bloodGroup, requests, setFilteredRequests]);

  return (
    <div className="">
      <div className="bg-black/30 backdrop-blur-md py-7 px-5 rounded-3xl border border-white/10 ">
        {/* filters */}
        <div className="">
          <div className="">
            {/* blood group */}
            <div className="mb-4 hidden md:block">
              <h3 className="text-white font-semibold mb-2">Blood Group</h3>
              <div className="grid grid-cols-2 gap-2">
                {["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg, i) => (
                  <label key={i} className="flex items-center gap-2 cursor-pointer">
                    <input type="radio" name="bloodGroup" value={bg} checked={bloodGroup === bg} onChange={(e) => setBloodGroup(e.target.value)} className="radio radio-xs radio-warning" />
                    <span className="text-white">{bg}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-3 block md:hidden">
              <select name="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="select w-full">
                <option value="">Select Blood Group</option>
                {["All", "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((bg, i) => (
                  <option key={i} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            {/* district */}
            <select name="district" value={district} onChange={(e) => setDistrict(e.target.value)} className="select mb-3">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterAside;
