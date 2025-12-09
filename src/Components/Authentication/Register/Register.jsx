import React, { useContext, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../../../Firebase/firebase.config";
import axios from "axios";

const Register = () => {
  const { createUser, updateUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photo;
    const file = photoURL.files[0];
    const email = form.email.value;
    const password = form.password.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      setError("Password must contain one uppercase, one lowercase and be at least 6 characters long.");
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
      photoURL: uploadedPhotoURL,
      password,
    };

    console.log(formData);

    if (res.data.success === true) {
      createUser(email, password)
        .then((result) => {
          updateUser({ displayName: name, photoURL: uploadedPhotoURL })
            .then(() => {
              setUser(result.user);
              axios
                .post("http://localhost:3000/users", formData)
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

  // login with google
  const handleGoogleLogin = async () => {
    try {
      const auth = getAuth(app);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setUser(user);
      toast.success("Successfully registered with Google.");
      navigate(`${location.state ? location.state : "/"}`);
    } catch (error) {
      console.error("Google sign-in error:", error);
      setError("Google registration failed.");
    }
  };

  return (
    <div className="lg:h-[92vh] h-auto bg-[#1c1003] flex items-center bg-cover bg-center px-4 md:px-0">
      <title>PawMart - Register</title>
      <div className="w-full h-full overflow-hidden hidden lg:block">
        <img src="/cat-cover.jpg" alt="" className="w-full object-cover" />
      </div>
      <div className="card w-full max-w-sm shrink-0 bg-[#78dd7900] backdrop-blur-xl shadow md:max-w-md">
        <h2 className="text-center mt-5 font-bold text-white text-lg md:text-xl">Register Your Account</h2>
        <form onSubmit={handleRegister} className="card-body md:px-6">
          <fieldset className="fieldset *:w-full">
            <input type="text" name="name" className="input placeholder-gray-500 input-sm md:input-md" placeholder="Name" required />

            <input type="file" name="photo" className="file-input " />
            <input type="email" name="email" className="input placeholder-gray-500 input-sm md:input-md" placeholder="Email" required />
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
            <p className="text-red-500 text-xs md:text-sm">{error}</p>

            <button type="submit" className="btn mt-4 bg-linear-to-tr from-[#ff6a00] to-[#ffb03a] text-white border-none shadow-none btn-sm md:btn-md">
              Register
            </button>
          </fieldset>

          <p className="text-center mt-2 text-sm text-gray-100 md:text-base">
            Already have an account?{" "}
            <Link to="/auth/login" className="primary-text underline font-medium">
              Login
            </Link>
          </p>
        </form>
        <div className="card-body pt-0 md:px-6">
          <div className="flex items-center gap-2">
            <hr className="flex-1 border-gray-200" />
            <span className="text-gray-200 text-center text-xs md:text-sm">or</span>
            <hr className="flex-1 border-gray-200" />
          </div>

          {/* login with google */}
          <button className="btn bg-white text-black shadow-none border-[#e5e5e5] h-9" onClick={handleGoogleLogin}>
            <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <g>
                <path d="m0 0H512V512H0" fill="#fff"></path>
                <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
              </g>
            </svg>
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
