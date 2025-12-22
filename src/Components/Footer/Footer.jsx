import React from "react";
import { Link } from "react-router";
import { FaFacebookF, FaYoutube, FaTwitter } from "react-icons/fa";
import { MdSearch, MdPhone } from "react-icons/md";

const Footer = () => {
  return (
    <div className="relative mt-10 lg:mt-15 border-t border-white/5 bg-[#0a0a0a] overflow-hidden">
      {/* top section: main navigation */}
      <footer className="max-w-7xl mx-auto px-6 lg:px-12 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-white">
        {/* brand column */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-linear-to-tr from-[#dc4900] to-[#ffa41c] shadow-[0_0_20px_rgba(220,73,0,0.3)]">
              <img src="/logo.png" alt="Logo" className="w-8 h-8 " />
            </div>
            <span className="text-2xl font-black italic tracking-tighter uppercase">
              Donate<span className="text-[#ffa41c]">X</span>
            </span>
          </div>
          <p className="text-white/40 text-sm leading-relaxed italic">Connecting heroes with those in need. A high-performance platform for seamless blood donation management.</p>
          <div className="flex gap-4">
            {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#dc4900] hover:text-white transition-all duration-300">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* blood groups column */}
        <div>
          <h6 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-[#dc4900]">Blood Groups</h6>
          <div className="grid grid-cols-2 gap-3 text-[11px] font-black italic tracking-widest text-white/40 uppercase">
            {[
              { type: "A+", sub: "A-" },
              { type: "B+", sub: "B-" },
              { type: "AB+", sub: "AB-" },
              { type: "O+", sub: "O-" },
            ].map((group, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-white/3 border border-white/5 hover:border-[#dc4900]/30 hover:bg-[#dc4900]/5 hover:text-white transition-all duration-300 group"
              >
                <span className="group-hover:text-[#ffa41c] transition-colors">{group.type}</span>
                <span className="text-[8px] opacity-30">/</span>
                <span className="group-hover:text-[#ffa41c] transition-colors">{group.sub}</span>
              </div>
            ))}
          </div>
          <Link
            to="/search-donor"
            className="mt-6 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest py-3 px-5 rounded-xl bg-white/5 border border-white/10 hover:border-[#ffa41c] hover:text-[#ffa41c] transition-all w-fit"
          >
            <MdSearch size={18} /> Search Donors
          </Link>
        </div>

        {/* navigation column */}
        <div>
          <h6 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-white">Navigation</h6>
          <nav className="flex flex-col gap-3">
            {[{ name: "Home", path: "/" }, { name: "Donation Requests", path: "/donation-requests" }, { name: "Health Tips" }, { name: "Funding", path: "/funding" }].map((link) => (
              <Link key={link.path} to={link.path} className="text-sm text-white/40 hover:text-[#ffa41c] hover:translate-x-1 transition-all italic font-medium">
                {link.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* support column */}
        <div>
          <h6 className="text-sm font-black uppercase tracking-[0.2em] mb-6 text-white">Support</h6>
          <nav className="flex flex-col gap-3">
            {["Contact Us", "Privacy Policy", "Terms of Service", "Volunteer Login"].map((item) => (
              <a key={item} className="text-sm text-white/40 hover:text-white transition-all cursor-pointer italic font-medium">
                {item}
              </a>
            ))}
            <div className="mt-4 flex items-center gap-3 text-white/60">
              <MdPhone className="text-[#dc4900]" />
              <span className="text-xs font-mono">+880 1234-567890</span>
            </div>
          </nav>
        </div>
      </footer>

      {/* bottom credits with background image */}
      <div className="relative border-t border-white/5 bg-[url('/bg.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 text-center md:text-left">
            © 2025 <span className="text-white">DonateX System</span> | Built with MERN Stack
          </p>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#dc4900] italic">Empowering Donors, Saving Lives.</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
