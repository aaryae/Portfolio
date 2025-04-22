import React from "react";
import crown from "../assets/crown.png";

const Projects = () => {
  const projectData = [
    {
      title: "Eco Project",
      url: "https://eco.aaryadangol.com.np",
      color: "#bbf7d0", // green-100
    },
    {
      title: "Weather App",
      url: "https://weather.aaryadangol.com.np",
      color: "#dbeafe", // blue-100
    },
    {
      title: "News App",
      url: "https://news.aaryadangol.com.np",
      color: "#ffedd5", // orange-100
    },
  ];

  return (
    <div className="m-3">
      <h2 className="text-4xl font-bold mb-10 text-[#1a3659] text-center underline">
        Projects
      </h2>
      <div className="flex flex-col md:flex-row justify-center items-center gap-8 max-w-6xl mx-auto px-4">
        {projectData.map((project, index) => (
          <a
            key={index}
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-1/3 p-6 transition-transform duration-300 hover:scale-105 border border-black md:hover:brightness-110 rounded-xl"
            style={{
              backgroundColor: project.color,
            }}
          >
            <img src={crown} className="w-10 tilt-animation absolute " alt="" />
            <h3 className="text-2xl font-semibold  text-[#1a3659] mb-4">
              {project.title}
            </h3>

            <p className="text-gray-700 mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias
              voluptate odit illum esse
            </p>
            <div className="flex items-center justify-center w-full rounded-full bg-transparent">
              <span
                className="text-xl rounded-full p-1"
                style={{ backgroundColor: project.color }}
              >
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
