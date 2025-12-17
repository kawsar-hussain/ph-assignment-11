import React, { use, useEffect, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { toast } from "react-toastify";

const Profile = () => {
  const { user, updateUser, setUser } = use(AuthContext);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    setName(user?.displayName || "");
    setPhoto(user?.photoURL || "");
  }, [user]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.value);
  };

  const saveProfile = () => {
    if (!updateUser) return;
    setSaving(true);
    updateUser({ displayName: name, photoURL: photo })
      .then(() => {
        if (setUser) setUser({ ...user, displayName: name, photoURL: photo });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setSaving(false);
        setEditing(false);
      });
  };

  return (
    <div className=" lg:h-[90vh] h-auto flex justify-center items-center px-8 py-15 lg:py-0 md:px-0">
      <title>GreenNest - Profile</title>
      <div className="rounded-xl shadow-md p-5 md:p-6 text-center md:max-w-md ">
        {editing ? (
          <div className=" flex flex-col w-[250px] md:w-[300px]">
            <label className="label text-xs md:text-sm mb-1">Photo URL</label>
            <input type="text" value={photo} onChange={handlePhotoChange} placeholder="photo URL" className="input placeholder-gray-500 input-sm md:input-md" />
          </div>
        ) : (
          <div className="flex justify-center">
            <img src={user.photoURL} alt="user photo" className=" w-[350px] h-[350px] md:w-[300px] md:h-[300px] object-cover rounded-full border-4 border-[#5fdf61]" />
          </div>
        )}

        {editing ? (
          <div className="mt-2 flex flex-col w-[250px] md:w-[300px]">
            <label className="label text-xs md:text-sm mb-1">Name</label>
            <input type="text" value={name} onChange={handleNameChange} placeholder="Your Name" className="input placeholder-gray-500 input-sm md:input-md" />
          </div>
        ) : (
          <p className="mt-4 text-xl md:text-2xl font-bold">{user.displayName}</p>
        )}

        {editing ? <p className="hidden text-xs md:text-sm text-gray-600">{user.email}</p> : <p className="text-xs md:text-sm text-gray-600">{user.email}</p>}
        <div className="mt-4">
          <button
            className="btn btn-sm bg-[#00a700] text-white md:btn-md"
            onClick={() => {
              if (editing) {
                saveProfile();
                toast.success("Profile updated successfully.");
              } else {
                setEditing(true);
              }
            }}
            aria-pressed={editing}
          >
            {editing ? (saving ? "Saving..." : "Done") : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
