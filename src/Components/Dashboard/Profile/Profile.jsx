import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../Provider/AuthProvider";
import Swal from "sweetalert2";
import Loader from "../../../Loader";
import { FaRegEdit } from "react-icons/fa";
import DashboardLoader from "../../../DashboardLoader";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [loggedUser, setLoggedUser] = useState([]);
  const [isEditable, setIsEditable] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [reqDis, setReqDis] = useState("");
  const [reqUpazila, setReqUpazila] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(false);

  // fetch user data
  const fetchData = () => {
    setLoading(true);
    axios.get(`https://server-11-zeta.vercel.app/users/${user.email}`).then((res) => {
      setLoggedUser(res.data);
      setBloodGroup(res.data.bloodGroup);
      setReqDis(res.data.district);
      setReqUpazila(res.data.upazila);
      setLoading(false);
    });
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    setIsSubmitting(true);
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

    const formData = {
      name,
      photoURL: res.data.data.display_url,
      district,
      upazila,
      bloodGroup,
    };

    console.log(formData);

    axios
      .put(`https://server-11-zeta.vercel.app/update/profile/${user.email}`, formData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });

    // sweet alert
    Swal.fire({
      title: "Profile Updated Successfully!",
      icon: "success",
      draggable: true,
    });
    setIsEditable(false);
    setIsSubmitting(false);
    fetchData();
  };

  if (loading) {
    return <DashboardLoader></DashboardLoader>;
  }

  return (
    <div className="lg:h-[92vh] h-auto flex items-center justify-center md:px-0">
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
          <div className="flex flex-col items-center">
            <span className="loading loading-spinner loading-lg text-[#dc4900]"></span>
            <p className="text-white mt-4 font-bold">Updating Profile...</p>
          </div>
        </div>
      )}

      <div className="card w-full max-w-3xl bg-black/15 backdrop-blur-sm shadow-xl border border-white/20">
        {/* Profile Header */}
        <div className="flex lg:flex-row flex-col-reverse lg:justify-between gap-4 items-start lg:items-center p-6 md:p-8 border-b border-white/15">
          <div>
            <h2 className="text-xl md:text-2xl font-bold text-white">User Profile</h2>
            <p className="text-base-300 text-sm">Manage your personal information</p>
          </div>
          <button onClick={() => setIsEditable(!isEditable)} className="self-end lg:self-auto btn btn-sm bg-linear-to-tr from-[#dc4900] to-[#ffa41c] border-none text-white shadow-lg">
            {isEditable ? (
              "Cancel"
            ) : (
              <span className="flex gap-1 items-center">
                <FaRegEdit className="text-lg" /> Edit Profile
              </span>
            )}
          </button>
        </div>

        <form onSubmit={handleUpdate} className="p-6">
          <div className="flex flex-col gap-8 items-center ">
            {/* Avatar Section */}
            <div className="border-b flex flex-col lg:flex-row justify-center items-center gap-1 lg:gap-7 border-white/10 w-full pb-6">
              <div className="avatar ">
                <div className="w-[70%] md:w-40 m-auto rounded-full ring-2 ring-[#ffa41c] ring-offset-base-100 ring-offset-2">
                  <img src={loggedUser.photoURL} alt="User Avatar" />
                </div>
              </div>
              <div className="">
                <p className="text-xl font-bold text-white mt-4">{loggedUser.name}</p>
                {/* Status */}
                <div className="form-control">
                  <div className="flex gap-1 items-center lg:justify-start justify-center h-10 md:h-12">
                    <span className="btn btn-xs bg-[#f59700] border-none shadow-none text-white">{user?.role || "donor"}</span>
                    <span className="btn btn-xs bg-[#00ba00] border-none shadow-none text-white text-xs">Active</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-300">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={loggedUser?.name}
                  readOnly={!isEditable}
                  className={`input input-sm md:input-md ${!isEditable ? "bg-transparent border-white/10 text-base-300 w-full" : "bg-white text-black w-full"}`}
                />
              </div>

              {/* file */}
              {isEditable && (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-300">Choose Photo</span>
                  </label>
                  <input type="file" name="photo" className="file-input w-full" />
                </div>
              )}

              {/* email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-base-300">Email</span>
                </label>
                <input type="email" defaultValue={loggedUser?.email} readOnly={true} className="w-full input input-sm md:input-md bg-transparent border-white/10 text-base-300 cursor-not-allowed" />
              </div>

              {/* Blood Group */}
              {!isEditable ? (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base-300">Blood Group</span>
                  </label>
                  <input type="text" defaultValue={loggedUser?.bloodGroup} readOnly={!isEditable} className="input input-sm md:input-md bg-transparent border-white/10 text-base-300 w-full" />
                </div>
              ) : (
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Blood Group</span>
                  </label>
                  <select name="bloodGroup" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} className="select w-full">
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
                    <span className="label-text text-base-300">District</span>
                  </label>
                  <input type="text" defaultValue={loggedUser?.district} readOnly={!isEditable} className=" input input-sm md:input-md bg-transparent border-white/10 text-base-300 w-full" />
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
                    <span className="label-text text-base-300">Upazila</span>
                  </label>
                  <input type="text" defaultValue={loggedUser?.upazila} readOnly={!isEditable} className="input input-sm md:input-md bg-transparent border-white/10 text-base-300 w-full" />
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
            </div>
          </div>

          {/* Save Button */}
          {isEditable && (
            <div className="mt-8">
              <button type="submit" className="btn w-full bg-linear-to-tr shadow-none from-[#dc4900] to-[#ffa41c] text-white border-none">
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
