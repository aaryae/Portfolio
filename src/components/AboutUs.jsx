import image from "../constant/image";

const techStack = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "Tailwind CSS",
  "Java",
  "Spring Boot",
  "PostgreSQL",
];

const AboutUs = () => {
  return (
    <section
      className="relative bg-[#fbf8ef] overflow-visible py-12 md:py-36 scroll-mt-20"
      id="aboutMe"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#127E9B]/20 to-transparent" />

      <svg
        className="absolute bottom-0 left-0 pointer-events-none opacity-70"
        width="420"
        height="280"
        viewBox="0 0 538 586"
        aria-hidden="true"
      >
        <path
          fill="#EFF7F7"
          d="M57.57 969.923h-780.108c-264.799 0-479.461-214.662-479.461-479.461v-.001C-1201.999 225.662-987.337 11-722.538 11H57.57c264.799 0 479.461 214.662 479.461 479.461v.001c0 264.799-214.662 479.461-479.461 479.461"
        />
        <path
          strokeWidth="3"
          stroke="#FBAC18"
          d="M91.357 770.913h-452.054c-212.137 0-384.108-171.971-384.108-384.108v-.001c0-212.137 171.971-384.108 384.108-384.108H91.357c212.137 0 384.108 171.971 384.108 384.108v.001c0 212.137-171.971 384.108-384.108 384.108z"
          fill="none"
        />
      </svg>

      <div className="relative z-10 max-w-[1500px] mx-auto px-5 min-w-0">
        <div className="grid lg:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center">
          <div className="relative flex justify-center lg:justify-start min-w-0 max-lg:order-2 p-8" data-aos="fade-right">
            <div className="relative">
              <svg
                className="absolute -inset-8 ring-spin pointer-events-none overflow-visible"
                viewBox="0 0 400 400"
                aria-hidden="true"
              >
                <circle cx="200" cy="200" r="190" fill="none" stroke="#FBAC18" strokeWidth="2" strokeDasharray="12 18" opacity="0.6" />
                <circle cx="200" cy="200" r="170" fill="none" stroke="#127E9B" strokeWidth="1.5" strokeDasharray="8 14" opacity="0.4" />
              </svg>

              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white shadow-[0_20px_60px_rgba(26,54,89,0.15)]">
                <img
                  src={image.aarya}
                  alt="Aarya"
                  className="w-full h-full object-cover scale-110"
                />
              </div>
            </div>
          </div>

          <div className="min-w-0 max-w-full break-words max-lg:order-1" data-aos="fade-left">
            <p className="text-[#127E9B] text-sm font-bold uppercase tracking-[0.3em] mb-4">
              About Me
            </p>
            <h2 className="text-4xl md:text-6xl font-extrabold text-[#1a3659] leading-tight mb-8 break-words">
              Turning curiosity
              <br />
              into{" "}
              <span className="relative inline-block">
                code
                <span className="absolute -bottom-1 left-0 w-full h-3 bg-[#FBAC18]/30 -z-10 rounded" />
              </span>
            </h2>

            <blockquote className="text-xl md:text-2xl text-[#1a3659]/70 font-light leading-relaxed border-l-4 border-[#FBAC18] pl-6 mb-10 break-words">
              "I don't just write code — I craft experiences that solve real problems
              and leave a lasting impression."
            </blockquote>

            <div className="space-y-5 text-[#1a3659]/75 text-lg leading-relaxed mb-12 break-words">
              <p>
                My journey in tech is fueled by an insatiable curiosity. I specialize in
                building modern web experiences with{" "}
                <strong className="text-[#127E9B] font-semibold">React</strong>,{" "}
                <strong className="text-[#127E9B] font-semibold">Next.js</strong>,{" "}
                <strong className="text-[#127E9B] font-semibold">Node.js</strong>, and{" "}
                <strong className="text-[#127E9B] font-semibold">TypeScript</strong>,
                backed by robust servers with{" "}
                <strong className="text-[#127E9B] font-semibold">Java</strong>,{" "}
                <strong className="text-[#127E9B] font-semibold">Spring Boot</strong> &{" "}
                <strong className="text-[#127E9B] font-semibold">PostgreSQL</strong>.
              </p>
              <p>
                Every project in my portfolio started as a question — "What if?" — and
                ended as a live application serving real users. That's the kind of work
                that excites me.
              </p>
            </div>

            <div className="overflow-hidden marquee-fade">
              <div className="flex animate-scroll">
                {[...Array(2)].map((_, set) => (
                  <div key={set} className="flex gap-3 px-1.5">
                    {techStack.map((tech) => (
                      <span
                        key={`${tech}-${set}`}
                        className="px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap bg-[#ECE8FC] text-[#1a3659] hover:bg-[#127E9B] hover:text-white transition-colors duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4 mt-10">
              <a
                href="https://github.com/aaryae"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0a0a3b] text-white font-bold hover:shadow-lg transition-all hover:scale-105"
              >
                GitHub Profile
              </a>
              <a
                href="#contactMe"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-[#0a0a3b] text-[#0a0a3b] font-bold hover:bg-[#0a0a3b] hover:text-white transition-all"
              >
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
