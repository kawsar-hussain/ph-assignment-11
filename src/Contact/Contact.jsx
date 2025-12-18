import React from "react";

const Contact = () => {
  return (
    <div className="lg:px-20 pb-10 px-5">
      <div className="max-w-3xl mx-auto p-6 ">
        <div className="card shadow-xl bg-black/15 backdrop-blur-md text-base-300">
          <div className="card-body">
            <h2 className="text-3xl font-bold text-center mb-4">Contact Us</h2>

            <form className="space-y-2 ">
              {/* Subject */}
              <div className="form-control flex">
                <label className="label flex-4">
                  <span className="label-text ">Subject</span>
                </label>
                <input type="text" placeholder="Subject" className="input input-bordered flex-8 w-full text-black" required />
              </div>

              {/* Message */}
              <div className="form-control flex">
                <label className="label flex-4">
                  <span className="label-text ">Message</span>
                </label>
                <textarea className="textarea textarea-bordered h-32 flex-8 w-full text-black resize-none" placeholder="Write your message..." required></textarea>
              </div>
              {/* Contact Number */}
              <div className="form-control flex">
                <label className="label flex-4">
                  <span className="label-text ">Contact Number</span>
                </label>
                <input type="tel" placeholder="+880 1XXXXXXXXX" className="input input-bordered flex-8 w-full text-black" required />
              </div>

              {/* Button */}
              <div className="form-control mt-6">
                <button className="btn bg-linear-to-tr from-[#dc4900] to-[#ffa41c] text-white border-none shadow-none w-full">Send Message</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
