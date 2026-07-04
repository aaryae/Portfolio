import { ExternalLink } from 'lucide-react';
import image from '../constant/image';

const ProjectIcons = () => {
  const projectLinks = [
    { 
      src:image.eco,
      alt: "Eco", 
      link: "https://eco.aaryadangol.com.np",
      title: "Eco Commerce",
      description: "Full-featured e-commerce platform"
    },
    { 
      src:image.news,
      alt: "News", 
      link: "https://news.aaryadangol.com.np",
      title: "News Portal",
      description: "Real-time news aggregation"
    },
    { 
      src:image.food,
      alt: "Food", 
      link: "https://recipe.aaryadangol.com.np",
      title: "Recipe Finder",
      description: "Discover amazing recipes"
    },
    { 
      src:image.site,
      alt: "Site", 
      link: "https://site.aaryadangol.com.np",
      title: "Portfolio Site",
      description: "Modern portfolio showcase"
    },
    { 
      src:image.saloon,
      alt: "Saloon", 
      link: "https://saloon.aaryadangol.com.np",
      title: "Salon Booking",
      description: "Appointment scheduling system"
    },
    { 
      src:image.weather,
      alt: "Weather", 
      link: "https://weather.aaryadangol.com.np",
      title: "Weather App",
      description: "Live weather updates"
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#eff7f7] overflow-hidden py-20 px-4">
      {/* Animated gradient circles */}
      <div className="absolute top-20 -left-20 w-[600px] h-[600px] bg-blue-300 rounded-full filter blur-[80px] opacity-40 animate-pulse"></div>
      <div className="absolute bottom-20 -right-20 w-[700px] h-[700px] bg-blue-500 rounded-full filter blur-[90px] opacity-35 animate-pulse" style={{animationDelay: '3s'}}></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-6 px-6 py-2 border border-blue-300 rounded-full bg-white/50 backdrop-blur-sm">
            <span className="text-blue-700 text-sm tracking-wider font-semibold">MORE WORK</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black text-[#1a3659] mb-4">
            More Projects
          </h2>
          <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectLinks.map((project, index) => (
            <div
              key={index}
              className="group relative bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-200 shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={project.src}
                  alt={project.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-white text-black font-bold rounded-full hover:bg-blue-400 transition-colors duration-300"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-[#1a3659] mb-2">
                  {project.title}
                </h3>
                <p className="text-black text-base leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Bottom gradient accent */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <p className="text-xl text-black mb-6">
            Interested in working together?
          </p>
          <a
            href="#contactMe"
            className="inline-block px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 hover:scale-105 transition-all duration-300"
          >
            Get In Touch
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectIcons;