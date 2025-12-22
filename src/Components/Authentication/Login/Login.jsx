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
    <div className="lg:h-[92vh] h-auto py-10 lg:py-15 flex items-center justify-center bg-cover bg-center px-3 md:px-0">
      <title>DonateX - Login</title>

      <div className="card w-full lg:max-w-sm shrink-0 bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl md:max-w-md overflow-hidden">
        <div className="h-1.5 w-full bg-linear-to-r from-[#ed4f00] to-[#ffbc15]" />
        <h2 className="text-center mt-8 font-black italic tracking-wide uppercase text-transparent bg-clip-text bg-linear-to-tr from-[#ed4f00] to-[#ffbc15] text-xl md:text-3xl">Login Your Account</h2>
        <form onSubmit={handleLogin} className="card-body md:px-8 py-8">
          <fieldset className="fieldset space-y-4 *:w-full">
            <div>
              <label className="label text-xs  text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                className="input bg-white/5 border-white/10 focus:border-[#ed4f00] focus:ring-1 focus:ring-[#ed4f00] text-white placeholder-gray-500  rounded-xl transition-all input-md w-full"
                placeholder="name@exmaple.com"
                required
              />
            </div>

            <div>
              <label className="label text-xs  text-gray-400 mb-1">Password</label>
              <div className="relative w-full">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  className="input bg-white/5 border-white/10 focus:border-[#ed4f00] focus:ring-1 focus:ring-[#ed4f00] text-white placeholder-gray-500 rounded-xl transition-all input-md w-full pr-12"
                  placeholder="••••••••"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#ffbc15] transition-colors">
                  {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-xl">
                <p className="text-red-500 text-xs text-center font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              className="btn mt-2 lg:mt-6 bg-linear-to-tr from-[#ed4f00] to-[#ffbc15] hover:scale-[1.02] active:scale-[0.98] text-white  font-black uppercase tracking-widest border-none rounded-xl shadow-lg shadow-[#ed4f00]/20 transition-all h-12"
            >
              Login
            </button>
          </fieldset>

          <p className="text-center text-gray-400 mt-6 text-sm">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#ffbc15] font-bold hover:underline decoration-[#ed4f00] underline-offset-4 transition-all">
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
