import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Login = () => {
  const { logIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  // login with email & password
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    logIn(email, password)
      .then((result) => {
        const user = result.user;
        setUser(user);
        toast.success("Successfully logged in.");
        navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        console.log(error.code, error.message);
        setError("Email or password is incorrect");
      });
  };

  return (
    <div className="lg:h-[92vh] h-auto flex items-center justify-center bg-cover bg-center px-4 md:px-0">
      <title>PawMart - Login</title>

      <div className="card  rounded-none w-full max-w-sm shrink-0 bg-[#0000001d] backdrop-blur-sm  shadow md:max-w-md">
        <h2 className="text-center mt-5 font-bold text-white text-lg md:text-xl">Login Your Account </h2>
        <form onSubmit={handleLogin} className="card-body md:px-6">
          <fieldset className="fieldset *:w-full">
            {/* email */}
            <label className="label text-sm md:text-gray-100">Email</label>
            <input type="email" name="email" className="input placeholder-gray-500 input-sm md:input-md" placeholder="Email" required />
            {/* password */}
            <label className="label text-sm md:text-gray-100">Password</label>
            <div className="relative w-full">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                className="input placeholder-gray-500 input-bordered input-sm md:input-md w-full pr-10 "
                placeholder="Password"
                required
              />
              {/* Toggle Icon */}
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-[14px] md:text-[16px] hover:text-gray-700">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {error && <p className="text-red-500 text-xs md:text-sm">{error}</p>}
            <button type="submit" className="btn mt-4 bg-linear-to-tr from-[#dc4900] to-[#ffa41c] text-white border-none shadow-none btn-sm md:btn-md">
              Login
            </button>
          </fieldset>
          <p className="text-center text-gray-100 mt-2 text-sm md:text-base">
            Don't have an account? {""}
            <Link to="/register" className="underline  font-medium text-[#ff8903]">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
