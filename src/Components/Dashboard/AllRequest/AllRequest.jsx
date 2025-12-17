import axios from "axios";
import React, { useEffect, useState } from "react";

const AllRequest = () => {
  const [request, setRequest] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/create-donation-request").then((res) => {
      console.log(res.data);
      setRequest(res.data);
    });
  }, []);
  return (
    <div>
      <h1>all req</h1>
    </div>
  );
};

export default AllRequest;
