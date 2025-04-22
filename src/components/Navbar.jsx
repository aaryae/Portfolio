import React from "react";

export default function Navbar() {
  return (
    <nav className="bg-white text-[#000000af] w-full fixed top-0 z-40 shadow-md">
      <div className="max-w-[1500px] mx-auto w-full flex gap-8 items-center justify-between py-4 px-5">
        <h1 className="text-6xl uppercase cursor-pointer text-black font-bold relative">
          AARYA
        </h1>
        <button id="menu-toggle" className="md:hidden text-2xl">
          &#9776;
        </button>
        <div className="hidden md:flex">
          <ul className="flex gap-7">
            {["Home", "Projects", "About Us", "Contact Us"].map((item) => (
              <li key={item} className="font-bold uppercase text-sm">
                <a href="/items">{item}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
