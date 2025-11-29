import image from "../constant/image";

const Projects = () => {
  const projectData = [
    {
      title: "Eco Project",
      url: "https://eco.aaryadangol.com.np",
      background: "linear-gradient(to right, #91a2e3 10%, #3f3a60 90%)",
      intro: "ECommerce website created with tailwind and typescript"
    },
    {
      title: "Weather App",
      url: "https://weather.aaryadangol.com.np",
      background: "linear-gradient(to right, #3f3a60 20%, #1e1b3a 80%)",
      intro: "A website that shows weather of different parts of countries"
    },
    {
      title: "News App",
      url: "https://news.aaryadangol.com.np",
      background: "linear-gradient(to right, #1e1b3a 30%, #0a0a3b 100%)",
      intro:"External Api fetched news portal"
    },
  ];

  return (
    <div className="m-3">
      <h2 className="text-5xl font-extrabold mb-10 text-[#1a3659] text-center underline">
        Projects
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl mx-auto px-4">
        {projectData.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ background: project.background }}
            className="w-full md:w-1/3 p-6 transition-transform duration-300 hover:scale-105 border border-black md:hover:brightness-110 rounded-2xl text-white relative overflow-hidden gradient-animate"
          >
            <img
              src={image.crown}
              className="w-10 tilt-animation absolute"
              alt=""
            />
            <h3 className="text-2xl font-extrabold underline mb-4 ">
              {project.title}
            </h3>
            <p className="mb-4 ">
              {project.intro}
            </p>
            <div className="flex items-center justify-center w-full rounded-full bg-transparent">
              <span className="text-xl rounded-full p-1 bg-transparent ">
                ⬇
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Projects;
