import React from "react";

const ContactUs = () => {
  // Custom Colors
  const primaryOrange = "#dc4900";
  const highlightYellow = "#ffa41c";

  return (
    <section className="md:h-[92vh] h-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Get in <span style={{ color: highlightYellow }}>Touch</span>
          </h2>
          <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">Have an emergency? Or want to join our donor network? Drop us a message and our team will get back to you immediately.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Info Cards - Glassmorphism Style */}
          <div className="space-y-6">
            {[
              {
                title: "Emergency Hotline",
                detail: "+880 1234 567 890",
                sub: "Available 24/7 for blood requests",
                icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
              },
              {
                title: "Official Email",
                detail: "save-life@donation.com",
                sub: "General inquiries & partnerships",
                icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
              },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center p-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 transition-transform hover:scale-105">
                <div className="p-4 rounded-xl mr-5 shadow-lg" style={{ backgroundColor: primaryOrange }}>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                  </svg>
                </div>
                <div>
                  <h4 className="text-white font-bold text-lg">{item.title}</h4>
                  <p className="text-2xl font-bold" style={{ color: highlightYellow }}>
                    {item.detail}
                  </p>
                  <p className="text-white/60 text-sm">{item.sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form - Glassmorphism Style */}
          <div className="p-8 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl">
            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffa41c] transition"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffa41c] transition"
                />
              </div>
              <select className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#ffa41c] transition [&>option]:bg-[#ffff]">
                <option>Inquiry Type</option>
                <option>Urgent Blood Request</option>
                <option>Volunteer Registration</option>
                <option>Donation Feedback</option>
              </select>
              <textarea
                rows="4"
                placeholder="Tell us how we can help..."
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffa41c] transition"
              ></textarea>
              <button
                type="submit"
                className="w-full py-4 rounded-xl text-white font-bold text-lg shadow-xl transition-all duration-300 transform hover:brightness-110 active:scale-95"
                style={{ backgroundColor: primaryOrange }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
