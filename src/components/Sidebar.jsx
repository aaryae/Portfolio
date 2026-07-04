import { useEffect } from "react";

const navItems = [
  { label: "Home", href: "#" },
  { label: "About Me", href: "#aboutMe" },
  { label: "Projects", href: "#projects" },
  { label: "Contact Me", href: "#contactMe" },
];

export default function Sidebar() {
  useEffect(() => {
    const menuToggle = document.getElementById("menu-toggle");
    const closeMenu = document.getElementById("close-menu");
    const mobileMenu = document.getElementById("mobile-menu");
    const overlay = document.getElementById("overlay");

    const open = () => {
      mobileMenu?.classList.remove("translate-x-full");
      overlay?.classList.remove("hidden");
      document.body.style.overflow = "hidden";
    };

    const close = () => {
      mobileMenu?.classList.add("translate-x-full");
      overlay?.classList.add("hidden");
      document.body.style.overflow = "";
    };

    menuToggle?.addEventListener("click", open);
    closeMenu?.addEventListener("click", close);
    overlay?.addEventListener("click", close);

    mobileMenu?.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", close);
    });

    return () => {
      menuToggle?.removeEventListener("click", open);
      closeMenu?.removeEventListener("click", close);
      overlay?.removeEventListener("click", close);
    };
  }, []);

  return (
    <div
      id="mobile-menu"
      className="fixed top-0 right-0 h-full w-[min(300px,85vw)] bg-[#0a0a3b] text-white transform translate-x-full transition-transform duration-300 ease-in-out z-50 p-6 md:hidden"
    >
      <button id="close-menu" className="text-3xl absolute right-5 top-4 leading-none" aria-label="Close menu">
        &times;
      </button>
      <p className="text-2xl font-extrabold mt-2 mb-8">
        AARYA<span className="text-[#FBAC18]">.</span>
      </p>
      <ul className="flex flex-col gap-1">
        {navItems.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className="block py-3 px-2 text-base font-semibold uppercase tracking-wider text-white/80 hover:text-[#FBAC18] border-b border-white/10 transition-colors"
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
