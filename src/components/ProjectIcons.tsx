import React from "react";
import image from "../constant/image";

const projectLinks = [
  { src: image.eco, alt: "Eco", link: "https://eco.aaryadangol.com.np" },
  { src: image.news, alt: "News", link: "https://news.aaryadangol.com.np" },
  { src: image.food, alt: "Food", link: "https://food.aaryandangol.com.np" },
  { src: image.site, alt: "Site", link: "https://site.aaryandangol.com.np" },
  {
    src: image.saloon,
    alt: "Saloon",
    link: "https://saloon.aaryandangol.com.np",
  },
  {
    src: image.weather,
    alt: "Weather",
    link: "https://weather.aaryandangol.com.np",
  },
];

const ProjectIcons = () => {
  return (
    <div className="bg-[#eff7f7] max-w-[1300px] mx-auto relative overflow-hidden p-6">
      <h2 className="text-4xl font-bold mb-10 text-[#1a3659] text-center underline">
        More Projects
      </h2>{" "}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {projectLinks.map((project, index) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="relative group"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-duration="1000"
            data-aos-delay={index * 100}
          >
            <img
              src={project.src}
              alt={project.alt}
              className="w-full object-cover "
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity "></div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectIcons;
