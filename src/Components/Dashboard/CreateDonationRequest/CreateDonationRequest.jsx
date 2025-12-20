import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";
import BlockedUser from "./BlockedUser";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const CreateDonationRequest = () => {
  const { user, dbUser } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const navigate = useNavigate();

  // fetch districts
  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => {
        setDistricts(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  // fetch upazilas
  useEffect(() => {
    axios
      .get("/upazilas.json")
      .then((res) => {
        setUpazilas(res.data);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = {
      requesterName: form.requesterName.value,
      requesterEmail: form.requesterEmail.value,
      recipientName: form.recipientName.value,
      bloodGroup: form.bloodGroup.value,
      district: form.recipientDistrict.value,
      upazila: form.recipientUpazila.value,
      hospitalName: form.hospitalName.value,
      fullAddress: form.fullAddress.value,
      donationDate: form.donationDate.value,
      donationTime: form.donationTime.value,
      message: form.requestMessage.value,
      status: "pending",
    };

    console.log(formData);

    axios
      .post("https://server-11-zeta.vercel.app/create-donation-request", formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    form.reset();

    // sweet alert
    Swal.fire({
      title: "Request Submittet Successfully!",
      icon: "success",
      draggable: true,
    });

    navigate("/dashboard/my-donation-requests");
  };

  return (
    <div className="flex justify-center items-center ">
      {dbUser.status === "active" && (
        <div className="max-w-4xl mx-auto p-6  shadow-xl rounded-box bg-black/20 backdrop-blur-sm border border-white/15 ">
          <h2 className="text-2xl font-bold text-center mb-7 text-white">Post Request For Blood</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Requester Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Requester Name</span>
                </label>
                <input type="text" name="requesterName" value={user.displayName} readOnly className="cursor-not-allowed  input input-bordered bg-[#e4e4e4] w-full" required />
              </div>

              {/* Requester Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Requester Email</span>
                </label>
                <input type="email" name="requesterEmail" value={user.email} readOnly className="cursor-not-allowed input input-bordered bg-[#e4e4e4] w-full" required />
              </div>

              {/* Recipient Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Name</span>
                </label>
                <input type="text" name="recipientName" placeholder="Recipient full name" className="input input-bordered w-full" required />
              </div>

              {/* Blood Group */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Blood Group</span>
                </label>
                <select name="bloodGroup" className="select select-bordered w-full" required>
                  <option value="">Select Blood Group</option>
                  <option>A+</option>
                  <option>A-</option>
                  <option>B+</option>
                  <option>B-</option>
                  <option>AB+</option>
                  <option>AB-</option>
                  <option>O+</option>
                  <option>O-</option>
                </select>
              </div>

              {/* District */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient District</span>
                </label>
                <select name="recipientDistrict" className="select select-bordered w-full" required>
                  <option value="">Select District</option>
                  {[...districts]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item, index) => (
                      <option key={index} value={item?.name}>
                        {item?.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Upazila */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Recipient Upazila</span>
                </label>
                <select name="recipientUpazila" className="select select-bordered w-full" required>
                  <option value="">Select Upazila</option>
                  {[...upazilas]
                    .sort((a, b) => a.name.localeCompare(b.name))
                    .map((item, index) => (
                      <option key={index} value={item?.name}>
                        {item?.name}
                      </option>
                    ))}
                </select>
              </div>

              {/* Hospital Name (Full Width) */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Hospital Name</span>
                </label>
                <input type="text" name="hospitalName" placeholder="Hospital Name" className="input input-bordered w-full" required />
              </div>

              {/* Address (Full Width) */}
              <div className="form-control ">
                <label className="label">
                  <span className="label-text">Full Address Line</span>
                </label>
                <input type="text" name="fullAddress" placeholder="Hospital Address" className="input input-bordered w-full" required />
              </div>

              {/* Donation Date */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donation Date</span>
                </label>
                <input type="date" name="donationDate" className="input input-bordered w-full" required />
              </div>

              {/* Donation Time */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Donation Time</span>
                </label>
                <input type="time" name="donationTime" className="input input-bordered w-full" required />
              </div>

              {/* Request Message (Full Width) */}
              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Request Message</span>
                </label>
                <textarea required name="requestMessage" rows="4" placeholder="Explain why you need blood in details..." className="textarea textarea-bordered resize-none w-full"></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button type="submit" className="btn  border-none shadow-none bg-[#ffd4d4] w-full">
                Submit Blood Request
              </button>
            </div>
          </form>
        </div>
      )}

      {dbUser.status === "blocked" && <BlockedUser></BlockedUser>}
    </div>
  );
};

export default CreateDonationRequest;
