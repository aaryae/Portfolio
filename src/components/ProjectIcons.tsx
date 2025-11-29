import image from "../constant/image";

const projectLinks = [
  { src: image.eco, alt: "Eco", link: "https://eco.aaryadangol.com.np" },
  { src: image.news, alt: "News", link: "https://news.aaryadangol.com.np" },
  { src: image.food, alt: "Food", link: "https://recipe.aaryadangol.com.np" },
  { src: image.site, alt: "Site", link: "https://site.aaryadangol.com.np" },
  {
    src: image.saloon,
    alt: "Saloon",
    link: "https://saloon.aaryadangol.com.np",
  },
  {
    src: image.weather,
    alt: "Weather",
    link: "https://weather.aaryadangol.com.np",
  },
];

const ProjectIcons = () => {
  return (
    <div className="bg-[#eff7f7] max-w-[1300px] mx-auto relative overflow-hidden p-6">
      <h2 className="text-5xl font-extrabold mb-10 text-[#1a3659] text-center underline">
        More Projects
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 my-20">
        {projectLinks.map((project, index) => (
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="relative group overflow-hidden border border-black"
            data-aos={index % 2 === 0 ? "fade-right" : "fade-left"}
            data-aos-duration="1000"
            data-aos-delay={index * 100}
          >
            <img
              src={project.src}
              alt={project.alt}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 hover:bg-[#00000062] bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
              <span className="text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity underline">
                visit the site
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ProjectIcons;
