import React from "react";
import { FaEnvelope, FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import image from "../constant/image";

const Contactus = () => {
  return (
    <div className="bg-[#c7d6c7] w-full flex flex-col items-center justify-center px-4 relative overflow-hidden py-16">
      <img
        src={image.mandala}
        className="absolute w-[600px] sm:w-[800px] lg:w-[1000px] left-[1000px] top-[900px] -translate-x-1/2 -translate-y-1/2 slowspin pointer-events-none "
        alt="Mandala"
      />

      <form
        action="https://formsubmit.co/aaryaed@gmail.com"
        method="POST"
        className="p-8 w-full max-w-md space-y-6 z-10"
      >
        <h2
          className="text-4xl sm:text-6xl font-bold text-center text-[#1a3659] underline"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          Contact Me
        </h2>

        <div data-aos="fade-up" data-aos-duration="900">
          <label className="block text-gray-700 mb-1">Your Name</label>
          <input
            type="text"
            name="name"
            required
            className="w-full bg-white outline-none border border-gray-300 p-3 rounded"
            placeholder="Enter your name"
          />
        </div>

        <div data-aos="fade-up" data-aos-duration="1000">
          <label className="block text-gray-700 mb-1">Message</label>
          <textarea
            name="message"
            required
            rows="4"
            className="w-full bg-white outline-none border border-gray-300 p-3 rounded"
            placeholder="Enter your message"
          ></textarea>
        </div>

        <button
          type="submit"
          data-aos="fade-up"
          data-aos-duration="1100"
          className="w-full bg-[#1a3659] text-white py-3 rounded hover:bg-[#0f2545] transition-all"
        >
          Send Message
        </button>
      </form>

      {/* Social Icons */}
      <div
        className="flex space-x-6 mt-10 text-[#1a3659] text-2xl z-10"
        data-aos="fade-up"
        data-aos-duration="1300"
      >
        <a
          href="https://www.linkedin.com/in/aaryaed"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform duration-300"
        >
          <FaLinkedin />
        </a>
        <a
          href="https://github.com/aaryaed"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform duration-300"
        >
          <FaGithub />
        </a>
        <a
          href="https://instagram.com/aaryaed"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-125 transition-transform duration-300"
        >
          <FaInstagram />
        </a>
        <a
          href="mailto:aaryaed@gmail.com"
          className="hover:scale-125 transition-transform duration-300"
        >
          <FaEnvelope />
        </a>
      </div>
    </div>
  );
};

export default Contactus;
