import React from "react";
import image from "../constant/image";

const Contactus = () => {
  return (
    <div className="bg-[#c7d6c7]  w-full flex items-start justify-center px-4 relative overflow-hidden">
      <img
        src={image.mandala}
        className="absolute  w-[600px] sm:w-[800px] lg:w-[1000px] left-[938px] top-0 -translate-x-1/2 -translate-y-1/2 slowspin "
        alt="Mandala"
      />
      <form
        action="https://formsubmit.co/aaryaed@gmail.com"
        method="POST"
        className=" p-8   w-full max-w-md space-y-4"
      >
        <h2 className="text-6xl font-bold text-center text-[#1a3659] my-30 underline w-full">
          Contact Me
        </h2>

        <div>
          <label className="block text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full bg-white outline-none border border-gray-300 p-2 "
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            required
            rows="4"
            className="w-full bg-white outline-none border border-gray-300 p-2 "
            placeholder="Enter your message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-[#1a3659] text-white py-2 rounded hover:bg-[#0f2545] transition-colors"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contactus;
