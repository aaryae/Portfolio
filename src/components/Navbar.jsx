export default function Navbar() {
  return (
    <nav className="bg-white text-[#000000af] w-full fixed top-0 z-40 shadow-md">
      <div className="max-w-[1500px] mx-auto w-full flex gap-8 items-center justify-between py-4 px-5">
        <a href="#" className="text-6xl uppercase text-black font-bold relative">
          AARYA
        </a>
        <button id="menu-toggle" className="md:hidden text-2xl" aria-label="Open menu">
          &#9776;
        </button>
        <div className="hidden md:flex">
          <ul className="flex gap-7">
            {[
              { label: "Home", href: "#" },
              { label: "Projects", href: "#projects" },
              { label: "About Me", href: "#aboutMe" },
              { label: "Contact Me", href: "#contactMe" },
            ].map(({ label, href }) => (
              <li key={label} className="font-bold uppercase text-sm">
                <a href={href}>{label}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
