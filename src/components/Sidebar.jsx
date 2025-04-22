import React, { useEffect } from "react";
export default function Sidebar() {
  useEffect(() => {
    const menuToggle = document.getElementById("menu-toggle");
    const closeMenu = document.getElementById("close-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("overlay");

    menuToggle.addEventListener("click", () => {
      mobileMenu.classList.remove("translate-x-full");
      overlay.classList.remove("hidden");
    });

    closeMenu.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
      overlay.classList.add("hidden");
    });

    overlay.addEventListener("click", () => {
      mobileMenu.classList.add("translate-x-full");
      overlay.classList.add("hidden");
    });
  }, []);

  return (
    <div
      id="mobile-menu"
      className="fixed top-0 right-0 h-full w-1/2 bg-black text-white transform translate-x-full transition-transform duration-300 ease-in-out z-50 p-5 md:hidden"
    >
      <button id="close-menu" className="text-3xl absolute right-4">
        &times;
      </button>
      <ul className="flex flex-col gap-6 mt-10">
        {["Home", "Projects", "About Us", "Contact Us"].map((item) => (
          <li key={item}>
            <a href="#">{item}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
