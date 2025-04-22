import React from "react";
import image from "../constant/image";
import "../index.css";
import InfoCards from "./InfoCards";

export default function Hero() {
  return (
    <section className="bg-[#fbf8ef] relative overflow-hidden ">
      {/* Top Right SVG */}
      <svg
        className="absolute right-0 top-0"
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 463 937"
        height="837"
        width="663"
        aria-hidden="true"
      >
        <g>
          <path
            fill="#ECE8FC"
            d="M0-315h789v835.5C789 738.376 612.376 915 394.5 915S0 738.376 0 520.5z"
          ></path>
          <path
            strokeWidth="5"
            stroke="#127E9B"
            d="M20.5-290.5H303c276.971 0 501.5 224.53 501.5 501.5v331.5c0 216.496-175.504 392-392 392s-392-175.504-392-392z"
            fill="none"
          ></path>
        </g>
      </svg>

      {/* Bottom Left SVG */}
      <svg
        className="absolute bottom-0 left-0 "
        preserveAspectRatio="xMidYMid meet"
        viewBox="0 0 538 586"
        height="386"
        width="538"
        aria-hidden="true"
      >
        <g>
          <path
            fill="#EFF7F7"
            d="M57.57 969.923h-780.108c-264.799 0-479.461-214.662-479.461-479.461v-.001C-1201.999 225.662-987.337 11-722.538 11H57.57c264.799 0 479.461 214.662 479.461 479.461v.001c0 264.799-214.662 479.461-479.461 479.461"
          ></path>
          <path
            strokeWidth="5"
            stroke="#FBAC18"
            d="M91.357 770.913h-452.054c-212.137 0-384.108-171.971-384.108-384.108v-.001c0-212.137 171.971-384.108 384.108-384.108H91.357c212.137 0 384.108 171.971 384.108 384.108v.001c0 212.137-171.971 384.108-384.108 384.108z"
            fill="none"
          ></path>
        </g>
      </svg>

      {/* Content */}
      <div className="max-w-[1500px] mx-auto mb-10 px-5 text-[#1a3659] flex flex-col md:flex-row relative z-10 ">
        <div className="md:pt-60 pt-36 flex-1 ">
          <h1
            className="md:text-7xl text-3xl font-extrabold "
            data-aos="fade-up"
          >
            The Strength <br />
            of Curosity
            <br />
            <span className="text-8xl relative">
              Learning.
              <span className="absolute left-0 p-80 bg-[#306dcf] rounded-full -z-50 opacity-10 animate-float"></span>
            </span>
          </h1>
          <h3
            className="text-3xl font-extrabold py-5"
            data-aos="fade-up"
            data-aos-delay="500"
          >
            The drive behind every breakthrough
          </h3>
          <p className="text-xl" data-aos="fade-up" data-aos-delay="1000">
            Curiosity drives my journey in tech. I build modern web apps using
            React, Tailwind, and Spring Boot. Solving real-world problems with
            clean code and creativity is what I love. Join me as I explore new
            tools, share ideas, and create something meaningful through
            technology.
          </p>

          {/* ✨ Cool Button ✨ */}
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 py-2 px-9 rounded-lg bg-[#0a0a3b] text-xl text-white my-3 cursor-pointer relative overflow-hidden"
          >
            <span className="z-10">Get Started</span>
            <svg
              className="w-5 h-5 transition-transform transform group-hover:translate-x-1 group-hover:scale-110 z-10"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
            {/* Glow overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a3b] via-[#1a3bb9] to-[#0a0a3b] opacity-0 group-hover:opacity-40 transition-all duration-300 rounded-lg blur-sm"></div>
          </a>
        </div>

        <div className="relative pt-44 flex-1">
          <img
            data-aos="fade-up"
            data-aos-duration="500"
            className="rounded-full ml-[100px] scale-110 "
            src={image.aarya}
            alt="Portrait"
          />
        </div>
      </div>
      <InfoCards />
    </section>
  );
}
