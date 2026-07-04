import { ArrowUpRight, Github, Instagram, Linkedin, Mail } from "lucide-react";
import { useState } from "react";

const socialLinks = [
  { href: "https://www.linkedin.com/in/aaryae/", icon: Linkedin, label: "LinkedIn" },
  { href: "https://github.com/aaryae", icon: Github, label: "GitHub" },
  { href: "https://instagram.com/aaryae_", icon: Instagram, label: "Instagram" },
  { href: "mailto:aaryaed@gmail.com", icon: Mail, label: "Email" },
];

const ContactUs = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    window.location.href = `mailto:aaryaed@gmail.com?subject=Portfolio Contact from ${formData.name}&body=${formData.message}%0A%0AFrom: ${formData.email}`;
  };

  return (
    <section id="contactMe" className="relative bg-[#eff7f7] overflow-hidden py-28 md:py-36 scroll-mt-20">
      <svg
        className="absolute bottom-0 left-0 pointer-events-none"
        width="420"
        height="280"
        viewBox="0 0 538 586"
        aria-hidden="true"
      >
        <path
          strokeWidth="4"
          stroke="#FBAC18"
          d="M91.357 770.913h-452.054c-212.137 0-384.108-171.971-384.108-384.108v-.001c0-212.137 171.971-384.108 384.108-384.108H91.357c212.137 0 384.108 171.971 384.108 384.108v.001c0 212.137-171.971 384.108-384.108 384.108z"
          fill="none"
          opacity="0.5"
        />
      </svg>

      <div className="relative z-10 max-w-[1500px] mx-auto px-5">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-20">
          <div className="lg:col-span-2 flex flex-col justify-center" data-aos="fade-right">
            <p className="text-[#127E9B] text-sm font-bold uppercase tracking-[0.3em] mb-4">
              Contact
            </p>
            <h2 className="text-5xl md:text-7xl font-extrabold text-[#1a3659] leading-[1.05] mb-6">
              Let's create
              <br />
              something
              <br />
              <span className="text-[#127E9B]">great.</span>
            </h2>
            <p className="text-[#1a3659]/60 text-lg leading-relaxed mb-10 max-w-sm">
              Whether it's a freelance project, collaboration, or just a friendly hello
              — my inbox is always open.
            </p>

            <a
              href="mailto:aaryaed@gmail.com"
              className="group inline-flex items-center gap-3 text-[#1a3659] font-extrabold text-xl hover:text-[#127E9B] transition-colors mb-12"
            >
              <span className="w-12 h-12 rounded-full bg-[#0a0a3b] flex items-center justify-center group-hover:scale-110 transition-transform">
                <Mail className="w-5 h-5 text-white" />
              </span>
              aaryaed@gmail.com
            </a>

            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.href.startsWith("mailto") ? undefined : "_blank"}
                    rel={link.href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                    aria-label={link.label}
                    className="w-12 h-12 rounded-full border-2 border-[#1a3659]/15 flex items-center justify-center text-[#1a3659] hover:bg-[#0a0a3b] hover:text-white hover:border-[#0a0a3b] transition-all duration-300 hover:scale-110"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="lg:col-span-3" data-aos="fade-left">
            <form
              onSubmit={handleSubmit}
              className="relative bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_20px_80px_rgba(26,54,89,0.08)] border border-[#ECE8FC]"
            >
              <div className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#1a3659]/40 mb-3">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                      className="w-full bg-transparent border-b-2 border-[#ECE8FC] pb-3 text-[#1a3659] text-lg font-medium outline-none focus:border-[#127E9B] transition-colors placeholder:text-[#1a3659]/25"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-[#1a3659]/40 mb-3">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="you@email.com"
                      className="w-full bg-transparent border-b-2 border-[#ECE8FC] pb-3 text-[#1a3659] text-lg font-medium outline-none focus:border-[#127E9B] transition-colors placeholder:text-[#1a3659]/25"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-widest text-[#1a3659]/40 mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Tell me about your project..."
                    className="w-full bg-transparent border-b-2 border-[#ECE8FC] pb-3 text-[#1a3659] text-lg font-medium outline-none focus:border-[#127E9B] transition-colors resize-none placeholder:text-[#1a3659]/25"
                  />
                </div>

                <button
                  type="submit"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#0a0a3b] text-white font-extrabold text-lg hover:shadow-[0_8px_30px_rgba(10,10,59,0.3)] transition-all hover:scale-[1.02]"
                >
                  Send Message
                  <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
