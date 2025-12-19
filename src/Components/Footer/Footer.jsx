import React from "react";
import { Link } from "react-router";

const Footer = () => {
  return (
    <div className="px-0 lg:px-20 bg-[#1a1a1a] border-t border-red-900/20 p-10 px-5">
      {/* Main footer */}
      <footer className="footer sm:footer-horizontal text-white pb-10">
        {/* Donation Info */}
        <nav>
          <h6 className="text-red-500 text-xl font-bold mb-2">Blood Groups</h6>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1">
            <span className="opacity-80">A+ / A-</span>
            <span className="opacity-80">B+ / B-</span>
            <span className="opacity-80">AB+ / AB-</span>
            <span className="opacity-80">O+ / O-</span>
          </div>
          <Link to="/search-donor" className="btn btn-sm shadow-none mt-2 text-red-600">
            Search Donors
          </Link>
        </nav>

        {/* Quick Navigation */}
        <nav>
          <h6 className="text-white text-xl font-bold mb-2">Navigation</h6>
          <Link to="/" className="link link-hover">
            Home
          </Link>
          <Link to="/donation-requests" className="link link-hover">
            Donation Requests
          </Link>
          <Link to="/blog" className="link link-hover">
            Health Tips
          </Link>
          <Link to="/funding" className="link link-hover">
            Funding
          </Link>
        </nav>

        {/* Support & Legal */}
        <nav>
          <h6 className="text-white text-xl font-bold mb-2">Support</h6>
          <a className="link link-hover">Contact Us</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Terms of Service</a>
          <a className="link link-hover">Volunteer Login</a>
        </nav>
      </footer>

      {/* Bottom footer */}
      <footer className="footer flex lg:flex-row flex-col justify-between items-center text-white border-t border-gray-800 px-10 py-8">
        <aside className="flex items-center gap-4">
          <div className="bg-white rounded p-1 w-12 h-12 flex items-center justify-center shadow-lg shadow-red-900/20">
            {/* Simple Blood Drop Icon for Logo */}
            <img src="/logo.png" alt="" />
          </div>
          <div className="text-left">
            <p className="text-xl font-bold leading-none">DonateX</p>
            <p className="text-gray-400 text-sm mt-2 max-w-xs">Connecting heroes with those in need. A MERN-stack platform for seamless blood donation management.</p>
          </div>
        </aside>

        <nav className="flex flex-col items-center lg:items-end gap-4 mt-6 lg:mt-0">
          <div className="grid grid-flow-col gap-6">
            {/* Updated X (Twitter) Logo as per requirements */}
            <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.055-4.425 5.055H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.6.75zm-.86 13.028h1.36L4.323 2.145H2.865l8.875 11.633z" />
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
            <a href="#" aria-label="YouTube">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
          </div>
          <p className="text-xs text-gray-500">Contact: +880 1234-567890</p>
        </nav>
      </footer>

      <div className="bg-[#141414] py-6  border-gray-800">
        <p className="text-gray-500 text-center text-sm">
          &copy; 2025 Blood Donation Application.
          <span className="mx-2">|</span>
          Built with MERN Stack
          <span className="block mt-1 opacity-70">Empowering Donors, Saving Lives. All rights reserved.</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
