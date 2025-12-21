import axios from "axios";
import React, { useEffect, useState } from "react";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaFilter } from "react-icons/fa";
import DashboardLoader from "../../../DashboardLoader";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [loading, setLoading] = useState(false);

  const filteredUsers = statusFilter ? users.filter((user) => user.status === statusFilter) : users;

  const fetchUser = () => {
    setLoading(true);
    axios.get("https://server-11-zeta.vercel.app/users").then((res) => {
      setUsers(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleStatusChange = (email, status) => {
    axios.patch(`https://server-11-zeta.vercel.app/update/user-status?email=${email}&status=${status}`).then((res) => {
      console.log(res.data);
      fetchUser();
    });
  };

  const handleUserRoleChange = (email, role) => {
    axios.patch(`https://server-11-zeta.vercel.app/update/user-role?email=${email}&role=${role}`).then((res) => {
      console.log(res.data);
      fetchUser();
    });
  };

  if (loading) {
    return <DashboardLoader></DashboardLoader>;
  }

  return (
    <div>
      <div className="flex justify-end mb-8">
        <div className="form-control flex gap-1.5">
          <label className="label">
            <span className="label-text flex gap-1.5 items-center">
              <FaFilter className="text-md" />
              Filter:
            </span>
          </label>

          <select className="select select-bordered w-[200px]" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="" disabled>
              Filter by status
            </option>
            <option value="active">Active</option>
            <option value="blocked">Blocked</option>
            <option value="">All</option>
          </select>
        </div>
      </div>

      <div className="lg:overflow-visible overflow-x-auto">
        <table className="table text-white bg-black/15 backdrop-blur-sm">
          {/* head */}
          <thead>
            <tr className="text-white bg-black/10 rounded-t">
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {filteredUsers.map((user) => (
              <tr key={user._id} className="hover:bg-[#ffffff1d]">
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.photoURL} alt="Avatar Tailwind CSS Component" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                      <div className="text-sm opacity-50">{user.role}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <div className={`btn btn-sm h-6 shadow-none border-none w-[70px] ${user.status === "active" ? "bg-[#00a300] border-none shadow-none text-white" : "bg-[#d20000] text-gray-300"}`}>
                    {user.status}
                  </div>
                </td>
                <th>
                  <div className="dropdown dropdown-end ">
                    {user.email === "admin@donatex.com" ? (
                      <button className="btn btn-sm bg-linear-to-tr from-[#dc4900] to-[#ffa41c] text-white border-none h-6 shadow-none">Controller</button>
                    ) : (
                      <div tabIndex={0} role="button" className="btn border-none btn-ghost hover:bg-[#ffffff3a] hover:shadow-none hover:h-8 h-8">
                        <HiDotsHorizontal />
                      </div>
                    )}

                    {user.email != "admin@donatex.com" && (
                      <ul tabIndex="-1" className="dropdown-content menu font-medium bg-[#ffffff] text-gray-700 rounded-box w-52 p-2 shadow-sm z-10 ">
                        {user.role === "admin" ? (
                          <>
                            <li>
                              <button onClick={() => handleUserRoleChange(user?.email, "volunteer")}>Make Volunteer</button>
                            </li>
                            <li>
                              <button onClick={() => handleUserRoleChange(user?.email, "donor")}>Make Donor</button>
                            </li>
                          </>
                        ) : user.role === "donor" ? (
                          <>
                            {" "}
                            <li>
                              <button onClick={() => handleUserRoleChange(user?.email, "admin")}>Make Admin</button>
                            </li>
                            <li>
                              <button onClick={() => handleUserRoleChange(user?.email, "volunteer")}>Make Volunteer</button>
                            </li>
                          </>
                        ) : user.role === "volunteer" ? (
                          <>
                            {" "}
                            <li>
                              <button onClick={() => handleUserRoleChange(user?.email, "admin")}>Make Admin</button>
                            </li>
                            <li>
                              <button onClick={() => handleUserRoleChange(user?.email, "donor")}>Make Donor</button>
                            </li>
                          </>
                        ) : (
                          ""
                        )}

                        {user?.status === "active" ? (
                          <li>
                            <button onClick={() => handleStatusChange(user?.email, "blocked")}>Block</button>
                          </li>
                        ) : (
                          <li>
                            <button onClick={() => handleStatusChange(user?.email, "active")}>Unblock</button>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
