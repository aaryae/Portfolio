const Footer = () => {
  return (
    <footer className="bg-[#0a0a3b] border-t border-white/5 py-10">
      <div className="max-w-[1500px] mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-2xl font-extrabold text-white tracking-tight">
          AARYA<span className="text-[#FBAC18]">.</span>
        </p>
        <p className="text-sm text-white/40">
          © {new Date().getFullYear()} Crafted with curiosity
        </p>
        <a
          href="#"
          className="text-sm font-bold text-white/40 hover:text-[#FBAC18] transition-colors uppercase tracking-widest"
        >
          Back to top ↑
        </a>
      </div>
    </footer>
  );
};

export default Footer;
