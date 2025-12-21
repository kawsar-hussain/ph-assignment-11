import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Register = () => {
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);

  console.log(districts);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo;
    const file = photoURL.files[0];
    const district = form.district.value;
    const upazila = form.upazila.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    const bloodGroup = form.bloodGroup.value;

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain one uppercase, one lowercase and be at least 6 characters long.");
      return;
    }

    if (password != confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=5033f18b458c917ae4642dc2b34e41db`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(res.data.data.display_url);
    const uploadedPhotoURL = res.data.data.display_url;

    const formData = {
      name,
      email,
      role: "donor",
      photoURL: uploadedPhotoURL,
      district,
      upazila,
      password,
      status: "active",
      bloodGroup,
    };

    console.log(formData);

    if (res.data.success === true) {
      createUser(email, password)
        .then((result) => {
          updateUser({ displayName: name, photoURL: uploadedPhotoURL })
            .then(() => {
              setUser(result.user);
              axios
                .post("https://server-11-zeta.vercel.app/users", formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              e.target.reset();
              toast.success("Registration successful!");
              navigate(`${location.state ? location.state : "/"}`);
            })
            .catch((error) => {
              console.log(error);
            });
        })
        .catch((error) => {
          setError("Email already in use.");
          console.log(error.code, error.message);
        });
    }
  };

  return (
    <div className="lg:h-[92vh] h-auto flex items-center justify-center px-4 md:px-0">
      <title>DonateX - Register</title>

      <div className="card w-full max-w-sm shrink-0 bg-[#0000001d] backdrop-blur-sm shadow md:max-w-md">
        <h2 className="text-center mt-5 font-bold text-white text-lg md:text-xl">Register Your Account</h2>
        <form onSubmit={handleRegister} className="card-body md:px-6">
          <fieldset className="fieldset *:w-full">
            <input type="text" name="name" className="input placeholder-gray-500 input-sm md:input-md" placeholder="Name" required />
            <input type="email" name="email" className="input placeholder-gray-500 input-sm md:input-md" placeholder="Email" required />
            <input type="file" name="photo" className="file-input " />

            {/* Blood Group */}
            <select name="bloodGroup" className="select">
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

            {/* district */}
            <select name="district" defaultValue="" className="select">
              <option value="" disabled>
                Select Your District
              </option>
              {[...districts]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item, index) => (
                  <option key={index} value={item?.name}>
                    {item?.name}
                  </option>
                ))}
            </select>

            {/* upazila */}
            <select name="upazila" defaultValue="" className="select">
              <option disabled={true} value="">
                Select Your Upazila
              </option>
              {[...upazilas]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((item, index) => (
                  <option key={index} value={item?.name}>
                    {item?.name}
                  </option>
                ))}
            </select>
            {/* password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input placeholder-gray-500 input-bordered input-sm md:input-md w-full pr-10"
                placeholder="Password"
                required
              />
              {/* toggle Icon */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[16px] hover:text-gray-700">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* confirm password */}
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                className="input placeholder-gray-500 input-bordered input-sm md:input-md w-full pr-10"
                placeholder="Confirm Password"
                required
              />
              {/* toggle Icon */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[16px] hover:text-gray-700">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-red-500 text-xs md:text-sm">{error}</p>

            <button type="submit" className="btn mt-4 bg-linear-to-tr from-[#dc4900] to-[#ffa41c] text-white border-none shadow-none btn-sm md:btn-md">
              Sign Up
            </button>
          </fieldset>

          <p className="text-center mt-2 text-sm text-gray-100 md:text-base">
            Already have an account?{" "}
            <Link to="/login" className="underline font-medium text-[#ff8903]">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
