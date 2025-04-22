import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-6 text-center ">
      <p className="text-sm sm:text-base">
        © {new Date().getFullYear()} Designed and Developed by{" "}
        <span className="font-semibold text-[#7ed6df]">Aaryae</span>
      </p>
    </footer>
  );
};

export default Footer;
