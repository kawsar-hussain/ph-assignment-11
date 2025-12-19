import React, { useContext, useEffect, useState } from "react";
import axios from "axios"; // 1. Import Axios
import { AuthContext } from "../../../Provider/AuthProvider";

const Req = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  console.log(requests);

  useEffect(() => {
    // 2. Only run if user email exists
    if (user?.email) {
      axios
        .get(`http://localhost:3000/my-requests?email=${user.email}`)
        .then((response) => {
          // Axios puts the data inside a .data property
          setRequests(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    }
  }, [user?.email]); // 3. Dependency array ensures it runs when user is found

  if (loading) return <p>Loading your requests...</p>;

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">My Requests ({requests.length})</h2>

      {requests.length > 0 ? (
        <ul className="space-y-2">
          {requests.map((item) => (
            <li key={item._id} className="p-3 bg-gray-100 rounded shadow-sm">
              {/* Change 'title' to whatever field name you have in MongoDB */}
              {item.title || "Untitled Request"} - <span className="text-blue-600">{item.status}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p>No requests found for {user?.email}</p>
      )}
    </div>
  );
};

export default Req;
