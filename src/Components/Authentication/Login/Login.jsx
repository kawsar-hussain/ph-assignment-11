import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from "axios";

const Login = () => {
  const { logIn, setUser, googleSignIn } = useContext(AuthContext);
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

  // login with google
  const handleGoogleLogin = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        // Check if user exists in database
        axios
          .get(`https://server-11-zeta.vercel.app/users/${user.email}`)
          .then((res) => {
            // User exists, just set user
            setUser(user);
            toast.success("Successfully logged in with Google.");
            navigate(`${location.state ? location.state : "/"}`);
          })
          .catch((err) => {
            // User doesn't exist, create basic entry
            const formData = {
              name: user.displayName,
              email: user.email,
              role: "donor",
              photoURL: user.photoURL,
              district: "",
              upazila: "",
              password: "",
              status: "active",
              bloodGroup: "",
            };
            axios
              .post("https://server-11-zeta.vercel.app/users", formData)
              .then(() => {
                setUser(user);
                toast.success("Successfully logged in with Google.");
                navigate(`${location.state ? location.state : "/"}`);
              })
              .catch((dbErr) => {
                console.error("Error saving user to DB:", dbErr);
                toast.error("Login successful, but failed to save user data.");
                navigate(`${location.state ? location.state : "/"}`);
              });
          });
      })
      .catch((error) => {
        console.error("Google sign-in error:", error);
        let errorMessage = "Google login failed";

        // Provide more specific error messages
        switch (error.code) {
          case "auth/popup-blocked":
            errorMessage = "Popup was blocked by browser. Please allow popups and try again.";
            break;
          case "auth/popup-closed-by-user":
            errorMessage = "Login cancelled. Please try again.";
            break;
          case "auth/cancelled-popup-request":
            errorMessage = "Login was cancelled.";
            break;
          case "auth/network-request-failed":
            errorMessage = "Network error. Please check your connection and try again.";
            break;
          default:
            errorMessage = `Login failed: ${error.message}`;
        }

        setError(errorMessage);
      });
  };

  return (
    <div className="lg:h-[92vh] h-auto py-10 lg:py-15 flex items-center justify-center bg-cover bg-center px-3 md:px-0">
      <title>DonateX - Login</title>

      <div className="card w-full lg:max-w-sm shrink-0 bg-black/20 backdrop-blur-md rounded-3xl border border-white/10 shadow-2xl md:max-w-md overflow-hidden">
        <div className="h-1.5 w-full bg-linear-to-r from-[#ed4f00] to-[#ffbc15]" />
        <h2 className="text-center mt-8 font-black italic tracking-wide uppercase text-transparent bg-clip-text bg-linear-to-tr from-[#ed4f00] to-[#ffbc15] text-xl md:text-2xl">Login Your Account</h2>
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

            <button type="submit" className="btn mt-2 lg:mt-6 bg-linear-to-tr from-[#ed4f00] to-[#ffbc15]  text-white  font-black  border-none shadow-lg shadow-[#ed4f00]/20 transition-all">
              Login
            </button>
            {/* google login */}
            <div className="">
              <div className="flex items-center gap-2">
                <hr className="flex-1 border-gray-200" />
                <span className="text-gray-200 text-center text-xs md:text-sm">or</span>
                <hr className="flex-1 border-gray-200" />
              </div>

              <button type="button" className="btn bg-white text-black shadow-none border-[#e5e5e5] w-full mt-2" onClick={handleGoogleLogin}>
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
