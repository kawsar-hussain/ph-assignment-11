import React from "react";

const About = () => {
  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-base text-white font-semibold tracking-wide uppercase">Who We Are</h2>
          <h2 className="text-center mt-2 font-black italic tracking-wide uppercase text-transparent bg-clip-text bg-linear-to-tr from-[#ed4f00] to-[#ffbc15] text-xl md:text-2xl">
            Every Drop Matters, Every Donor is a Hero
          </h2>

          <p className="mt-4 max-w-2xl text-xl text-gray-300 mx-auto">
            Our platform connects voluntary blood donors with those in need, ensuring that no one has to struggle to find blood during an emergency.
          </p>
        </div>

        {/* Main Content: Image & Mission */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center mb-20">
          <div className="relative">
            <img
              className="rounded-2xl shadow-xl w-full h-96 object-cover"
              src="https://pathkindwebsiteprod.blob.core.windows.net/websiteprod/uploads/blogs/BenefitsofDonatingBlood_SideEffects,Advantages,andMore26062511061822.webp"
              alt="Blood donation process"
            />
            <div className="absolute -bottom-6 -left-6 bg-red-600 p-8 rounded-2xl hidden md:block">
              <p className="text-white text-2xl font-bold italic">Save a Life</p>
              <p className="text-red-100 font-medium">Be a Donor Today</p>
            </div>
          </div>

          <div className="mt-12 lg:mt-0">
            <h3 className="text-2xl font-bold text-gray-100 mb-4">Our Mission</h3>
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              We aim to digitize the blood donation process in our community. By maintaining a real-time database of donors, we reduce the time spent searching for blood from hours to minutes. Our
              goal is to ensure a 100% voluntary blood donation system where every patient has access to safe blood.
            </p>

            <div className="space-y-4">
              {[
                { title: "Urgent Requests", desc: "Post an emergency blood request and reach hundreds of donors instantly." },
                { title: "Donor Privacy", desc: "Your contact information is only shared with verified recipients." },
                { title: "Community Network", desc: "Connecting donors, hospitals, and blood banks on one single platform." },
              ].map((item, index) => (
                <div key={index} className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-8 w-8 rounded-md bg-red-100 text-red-600">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-medium text-white">{item.title}</h4>
                    <p className="text-gray-300">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section / Impact */}
        <div className="bg-red-50 rounded-3xl p-8 md:p-12 border border-red-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl font-extrabold text-red-600">2.5K+</p>
              <p className="text-gray-600 mt-1 font-medium">Happy Donors</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-red-600">800+</p>
              <p className="text-gray-600 mt-1 font-medium">Lives Saved</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-red-600">15+</p>
              <p className="text-gray-600 mt-1 font-medium">Blood Groups</p>
            </div>
            <div>
              <p className="text-4xl font-extrabold text-red-600">24/7</p>
              <p className="text-gray-600 mt-1 font-medium">Support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
