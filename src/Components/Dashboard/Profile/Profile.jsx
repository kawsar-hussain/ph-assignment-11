import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  const [reqDis, setReqDis] = useState("");
  const [reqUpazila, setReqUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");

  // fetch use data
  useEffect(() => {
    axios.get(`http://localhost:3000/users/${user.email}`).then((res) => {
      setLoggedUser(res.data);
      setBloodGroup(res.data.bloodGroup);
      setReqDis(res.data.district);
      setReqUpazila(res.data.upazila);
    });
  }, [user.email]);

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

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const photoURL = form.photo;
    const file = photoURL.files[0];
    const district = form.district.value;
    const upazila = form.upazila.value;
    const bloodGroup = form.bloodGroup.value;

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=5033f18b458c917ae4642dc2b34e41db`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const uploadedPhotoURL = res.data.data.display_url;
    console.log(uploadedPhotoURL);

    const formData = {
      name,
      photoURL: uploadedPhotoURL,
      district,
      upazila,
      bloodGroup,
    };

    console.log(formData);

    axios
      .put(`http://localhost:3000/update/profile/${user.email}`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsEditable(false);
  };

  return (
    <div className="lg:h-[92vh] h-auto flex items-center justify-center px-4 md:px-0 py-10">
      <div className="card w-full max-w-2xl bg-black/15 backdrop-blur-sm shadow-xl border border-white/10">
        {/* Profile Header */}
        <div className="flex justify-between items-center p-6 md:p-8 border-b border-white/5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">User Profile</h2>
            <p className="text-gray-400 text-sm">Manage your personal information</p>
          </div>
          <button onClick={() => setIsEditable(!isEditable)} className="btn btn-sm bg-linear-to-tr from-[#dc4900] to-[#ffa41c] border-none text-white shadow-lg">
            {isEditable ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <form onSubmit={handleUpdate} className="card-body p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar Section */}
            <div className="flex flex-col items-center gap-4">
              <div className="avatar">
                <div className="w-24 md:w-32 rounded-full ring-2 ring-[#ffa41c] ring-offset-base-100 ring-offset-2">
                  <img src={loggedUser.photoURL} alt="User Avatar" />
                </div>
              </div>
              {isEditable && <input type="file" name="photo" className="file-input " />}
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={loggedUser?.name}
                  readOnly={!isEditable}
                  className={`input input-sm md:input-md ${!isEditable ? "bg-transparent border-white/10 text-gray-400" : "bg-white/10 text-white border-[#ffa41c]"}`}
                />
              </div>

              {/* Email - Strictly Read Only */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300">Email (Fixed)</span>
                </label>
                <input type="email" defaultValue={loggedUser?.email} readOnly={true} className="input input-sm md:input-md bg-transparent border-white/10 text-gray-500 cursor-not-allowed" />
              </div>

              {/* Blood Group */}
              {!isEditable ? (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Blood Group</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={loggedUser?.bloodGroup}
                    readOnly={!isEditable}
                    className={`input input-sm md:input-md ${!isEditable ? "bg-transparent border-white/10 text-gray-400" : "bg-white/10 text-white border-[#ffa41c]"}`}
                  />
                </div>
              ) : (
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
              )}

              {/* District */}
              {!isEditable ? (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">District</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={loggedUser?.district}
                    readOnly={!isEditable}
                    className={`input input-sm md:input-md ${!isEditable ? "bg-transparent border-white/10 text-gray-400" : "bg-white/10 text-white border-[#ffa41c]"}`}
                  />
                </div>
              ) : (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Recipient District</span>
                  </label>
                  <select name="district" value={reqDis} onChange={(e) => setReqDis(e.target.value)} className="select select-bordered w-full">
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
              )}

              {/* Upazila */}
              {!isEditable ? (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-gray-300">Upazila</span>
                  </label>
                  <input
                    type="text"
                    defaultValue={loggedUser?.upazila}
                    readOnly={!isEditable}
                    className={`input input-sm md:input-md ${!isEditable ? "bg-transparent border-white/10 text-gray-400" : "bg-white/10 text-white border-[#ffa41c]"}`}
                  />
                </div>
              ) : (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Recipient Upazila</span>
                  </label>
                  <select name="upazila" value={reqUpazila} onChange={(e) => setReqUpazila(e.target.value)} className="select select-bordered w-full">
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
              )}

              {/* Status */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-gray-300">Role & Status</span>
                </label>
                <div className="flex gap-2 items-center h-10 md:h-12">
                  <span className="badge badge-outline text-[#ffa41c] border-[#ffa41c] uppercase text-xs">{user?.role || "donor"}</span>
                  <span className="badge badge-success text-white text-xs">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          {isEditable && (
            <div className="mt-8">
              <button type="submit" className="btn w-full bg-linear-to-tr from-[#dc4900] to-[#ffa41c] text-white border-none">
                Save Updated Information
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Profile;
