import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { useParams } from "react-router";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

const UpdateRequest = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [request, setRequest] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [reqDis, setReqDis] = useState("");
  const [reqUpazila, setReqUpazila] = useState("");

  console.log(bloodGroup);

  console.log(request);

  // fetch data of request
  useEffect(() => {
    axios
      .get(`http://localhost:3000/donation-request/${id}`)
      .then((res) => {
        setRequest(res.data);
        setBloodGroup(res.data.bloodGroup);
        setReqDis(res.data.district);
        setReqUpazila(res.data.upazila);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);

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
    };

    console.log(formData);

    axios
      .put(`http://localhost:3000/update/request/${id}`, formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Data updated successfully.");
      })
      .catch((err) => {
        console.log(err);
      });

    Swal.fire({
      title: "Drag me!",
      icon: "success",
      draggable: true,
    });
  };
  return (
    <div className="flex justify-center items-center ">
      <div className="max-w-4xl mx-auto p-6  shadow-xl rounded-box bg-black/20 backdrop-blur-sm ">
        <h2 className="text-2xl font-bold text-center mb-7 text-white">Update Your Request Info</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Requester Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Requester Name</span>
              </label>
              <input type="text" name="requesterName" value={user.displayName} readOnly className=" input input-bordered bg-base-300 w-full" />
            </div>

            {/* Requester Email */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Requester Email</span>
              </label>
              <input type="email" name="requesterEmail" value={user.email} readOnly className="input input-bordered bg-base-300 w-full" />
            </div>

            {/* Recipient Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Recipient Name</span>
              </label>
              <input type="text" name="recipientName" defaultValue={request.recipientName} placeholder="Recipient full name" className="input input-bordered w-full" />
            </div>

            {/* Blood Group */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Blood Group</span>
              </label>
              <select name="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="select select-bordered w-full">
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
              <select name="recipientDistrict" value={reqDis} onChange={(e) => setReqDis(e.target.value)} className="select select-bordered w-full">
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
              <select name="recipientUpazila" value={reqUpazila} onChange={(e) => setReqUpazila(e.target.value)} className="select select-bordered w-full">
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
              <input type="text" name="hospitalName" defaultValue={request.hospitalName} placeholder="Hospital Name" className="input input-bordered w-full" />
            </div>

            {/* Address (Full Width) */}
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Full Address Line</span>
              </label>
              <input type="text" name="fullAddress" defaultValue={request.fullAddress} placeholder="Hospital Address" className="input input-bordered w-full" />
            </div>

            {/* Donation Date */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Donation Date</span>
              </label>
              <input type="date" name="donationDate" defaultValue={request.donationDate} className="input input-bordered w-full" />
            </div>

            {/* Donation Time */}
            <div className="form-control">
              <label className="label">
                <span className="label-text">Donation Time</span>
              </label>
              <input type="time" name="donationTime" defaultValue={request.donationTime} className="input input-bordered w-full" />
            </div>

            {/* Request Message (Full Width) */}
            <div className="form-control md:col-span-2">
              <label className="label">
                <span className="label-text">Request Message</span>
              </label>
              <textarea
                name="requestMessage"
                defaultValue={request.message}
                rows="4"
                placeholder="Explain why you need blood in details..."
                className="textarea textarea-bordered resize-none w-full"
              ></textarea>
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
    </div>
  );
};

export default UpdateRequest;
