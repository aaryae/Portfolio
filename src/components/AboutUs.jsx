import image from "../constant/image";

const AboutUs = () => {
  return (
    <div
      className="bg-[#eff7f7]  w-full flex items-start justify-center px-4 relative overflow-hidden py-5
     "
      data-aos="fade-up"
      data-aos-duration="500"
      data-aos-delay="300"
      id="aboutMe"
    >
      <img
        src={image.mandala}
        className="absolute  w-[600px] sm:w-[800px] lg:w-[1000px] left-[24px] top-0 -translate-x-1/2 -translate-y-1/2 slowspin "
        alt="Mandala"
      />

      <div className="max-w-6xl  p-4 mb-30 ">
        <h1 className="text-5xl font-extrabold text-[#1a3659] text-center  my-30 underline">
          About Me
        </h1>

        <p className="text-gray-800 text-lg text-justify  mx-auto">
          Hello, I'm <span className="font-semibold text-[#1a3659]">Aarya</span>
          . In the ever-evolving world of technology, my journey is driven by
          curiosity and a passion for continuous learning. I specialize in
          modern web development with a strong command of{" "}
          <span className="font-medium text-[#0f2545]">React</span>,{" "}
          <span className="font-medium text-[#0f2545]">Tailwind CSS</span>, and{" "}
          <span className="font-medium text-[#0f2545]">TypeScript</span>,
          complemented by backend expertise in{" "}
          <span className="font-medium text-[#0f2545]">Java</span> and{" "}
          <span className="font-medium text-[#0f2545]">Spring Boot</span>.
        </p>

        <p className="mt-4 text-gray-800 leading-relaxed text-lg text-justify  mx-auto">
          For me, coding is more than just writing lines of code—it's about
          solving real-world problems, building impactful solutions, and turning
          ideas into reality through technology. I actively explore new tools
          and frameworks, staying current with the latest industry trends to
          sharpen my skills and deliver efficient, scalable applications.
        </p>

        <p className="mt-4 text-gray-800 leading-relaxed text-lg text-justify mx-auto">
          GitHub is my collaborative playground, where I manage projects and
          contribute to code that matters. If you're looking to connect,
          collaborate, or discuss exciting opportunities, feel free to reach out
          at{" "}
          <a
            href="mailto:aaryaed@gmail.com"
            className="text-blue-600 underline hover:text-blue-800"
          >
            aaryaed@gmail.com
          </a>
          . I'm always open to new challenges and enthusiastic about exploring
          what's next in tech.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
