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
    <div className="lg:h-[92vh] h-auto py-0 lg:py-15 flex items-center justify-center px-3 md:px-0 ">
      <title>DonateX - Register</title>

      <div className="card w-full lg:max-w-sm shrink-0 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl md:max-w-md overflow-hidden my-10">
        <div className="h-1.5 w-full bg-linear-to-r from-[#ed4f00] to-[#ffbc15]" />
        <h2 className="text-center mt-8 font-black italic tracking-wide uppercase text-transparent bg-clip-text bg-linear-to-tr from-[#ed4f00] to-[#ffbc15] text-xl md:text-3xl">Register Account</h2>

        <form onSubmit={handleRegister} className="card-body md:px-8 py-8">
          <fieldset className="fieldset space-y-3 *:w-full">
            {/* name */}
            <input
              type="text"
              name="name"
              className="input bg-white/5 border-white/10 focus:border-[#ed4f00] focus:ring-1 focus:ring-[#ed4f00] text-white placeholder-gray-500 rounded-xl transition-all input-md w-full"
              placeholder="Full Name"
              required
            />

            {/* email */}
            <input
              type="email"
              name="email"
              className="input bg-white/5 border-white/10 focus:border-[#ed4f00] focus:ring-1 focus:ring-[#ed4f00] text-white placeholder-gray-500 rounded-xl transition-all input-md w-full"
              placeholder="Email Address"
              required
            />

            {/* upload photo */}
            <input type="file" name="photo" className="file-input file-input-bordered bg-white/5 border-white/10 text-gray-400 rounded-xl w-full file-input-sm md:file-input-md" />

            {/* blood group*/}
            <select name="bloodGroup" className="select bg-white/5 border-white/10 text-base-300 focus:text-white rounded-xl w-full">
              <option value="" className="bg-base-300">
                Select Blood Group
              </option>
              {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
                <option key={group} className="bg-base-300">
                  {group}
                </option>
              ))}
            </select>

            {/* district */}
            <div className="grid grid-cols-2 gap-2">
              <select name="district" defaultValue="" className="select bg-white/5 border-white/10 text-gray-400 focus:text-white rounded-xl w-full select-sm md:select-md">
                <option value="" disabled className="bg-base-300 w-full">
                  District
                </option>
                {[...districts]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item, index) => (
                    <option key={index} value={item?.name} className="bg-base-300">
                      {item?.name}
                    </option>
                  ))}
              </select>

              {/* upazila */}
              <select name="upazila" defaultValue="" className="select bg-white/5 border-white/10 text-gray-400 focus:text-white rounded-xl w-full select-sm md:select-md">
                <option disabled value="" className="bg-base-300">
                  Upazila
                </option>
                {[...upazilas]
                  .sort((a, b) => a.name.localeCompare(b.name))
                  .map((item, index) => (
                    <option key={index} value={item?.name} className="bg-base-300">
                      {item?.name}
                    </option>
                  ))}
              </select>
            </div>

            {/* password*/}
            <div className="space-y-3">
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input bg-white/5 border-white/10 focus:border-[#ed4f00] focus:ring-1 focus:ring-[#ed4f00] text-white placeholder-gray-500 rounded-xl transition-all input-md w-full pr-12"
                  placeholder="Password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ffbc15]">
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  className="input bg-white/5 border-white/10 focus:border-[#ed4f00] focus:ring-1 focus:ring-[#ed4f00] text-white placeholder-gray-500 rounded-xl transition-all input-md w-full pr-12"
                  placeholder="Password"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ffbc15]">
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-white/70 text-xs text-center bg-red-500/10 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              className="btn mt-4 bg-linear-to-tr from-[#ed4f00] to-[#ffbc15] hover:scale-[1.02] active:scale-[0.98] text-white font-black uppercase tracking-widest border-none rounded-xl shadow-lg transition-all h-12"
            >
              Sign Up Now
            </button>
          </fieldset>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-[#ffbc15] font-bold hover:underline decoration-[#ed4f00] underline-offset-4">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
