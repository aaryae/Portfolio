import { ArrowUpRight } from "lucide-react";
import image from "../constant/image";

const projects = [
  {
    src: image.mudita,
    link: "https://mudita.technirvana.com.np/",
    title: "Mudita Store",
    description: "Full-scale e-commerce platform for computers & electronics",
    tags: ["Next.js", "Node.js", "React"],
    accent: "#E53935",
    featured: true,
  },
  {
    gradient: "from-[#127E9B] to-[#0a0a3b]",
    link: "https://github.com/aaryae/SkillSwap",
    title: "SkillSwap",
    description: "Microservices skill exchange platform with Spring Boot ",
    tags: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    accent: "#127E9B",
  },
  {
    gradient: "from-[#2E7D32] to-[#0a0a3b]",
    link: "https://github.com/aaryae/Inventory-Management-System",
    title: "Inventory Management",
    description: "Enterprise inventory system with resources, batches & barcodes",
    tags: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
    accent: "#4CAF50",
  },
  {
    src: image.eco,
    link: "https://eco.aaryadangol.com.np",
    title: "Eco Commerce",
    description: "Full-featured e-commerce platform",
    tags: ["React", "TypeScript", "Tailwind"],
    accent: "#7B6FD4",
  },
  {
    src: image.news,
    link: "https://news.aaryadangol.com.np",
    title: "News Portal",
    description: "Real-time news from APIs worldwide",
    tags: ["React", "API"],
    accent: "#FBAC18",
  },
  // {
  //   src: image.food,
  //   link: "https://recipe.aaryadangol.com.np",
  //   title: "Recipe Finder",
  //   description: "Discover recipes from around the globe",
  //   tags: ["React", "JavaScript"],
  //   accent: "#127E9B",
  // },
  // {
  //   src: image.site,
  //   link: "https://site.aaryadangol.com.np",
  //   title: "Portfolio Site",
  //   description: "Modern responsive showcase",
  //   tags: ["React", "Tailwind"],
  //   accent: "#ECE8FC",
  // },
  // {
  //   src: image.saloon,
  //   link: "https://saloon.aaryadangol.com.np",
  //   title: "Salon Booking",
  //   description: "Smart appointment scheduling",
  //   tags: ["React", "Spring Boot"],
  //   accent: "#FBAC18",
  // },
  {
    src: image.weather,
    link: "https://weather.aaryadangol.com.np",
    title: "Weather App",
    description: "Live forecasts for any city",
    tags: ["React", "API"],
    accent: "#127E9B",
  },
];

function ProjectCard({ project, index, className = "" }) {
  const isLink = Boolean(project.link);
  const Tag = isLink ? "a" : "div";
  const isGithub = project.link?.includes("github.com");
  const ctaLabel = isLink ? (isGithub ? "View on GitHub" : "Visit Live") : "Backend Project";

  return (
    <Tag
      {...(isLink
        ? {
            href: project.link,
            target: "_blank",
            rel: "noopener noreferrer",
          }
        : {})}
      data-aos="fade-up"
      data-aos-delay={index * 80}
      className={`group relative overflow-hidden rounded-[2rem] card-shimmer block ${className}`}
      style={{ minHeight: project.featured ? "100%" : "280px" }}
    >
      {project.src ? (
        <img
          src={project.src}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a3b] via-[#0a0a3b]/50 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

      <div
        className="absolute top-0 left-0 w-full h-1 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
        style={{ backgroundColor: project.accent }}
      />

      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <div className="flex flex-wrap gap-2 mb-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-bold rounded-full backdrop-blur-md bg-white/15 text-white border border-white/20"
            >
              {tag}
            </span>
          ))}
        </div>

        <h3
          className={`font-extrabold text-white leading-tight mb-1 ${project.featured ? "text-3xl md:text-4xl" : "text-xl md:text-2xl"}`}
        >
          {project.title}
        </h3>
        <p className="text-white/60 text-sm md:text-base mb-4 max-w-md">
          {project.description}
        </p>

        <div className="flex items-center gap-2 text-white font-bold text-sm">
          <span
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 group-hover:gap-3"
            style={{
              backgroundColor: project.accent,
              color: project.accent === "#ECE8FC" ? "#1a3659" : "#fff",
            }}
          >
            {ctaLabel}
            {isLink && <ArrowUpRight className="w-4 h-4" />}
          </span>
        </div>
      </div>
    </Tag>
  );
}

export default function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section id="projects" className="relative bg-[#0a0a3b] overflow-hidden scroll-mt-20">
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#127E9B]/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#FBAC18]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-[1500px] mx-auto px-5 py-24 md:py-32">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16 md:mb-20">
          <div data-aos="fade-right">
            <p className="text-[#FBAC18] text-sm font-bold uppercase tracking-[0.3em] mb-4">
              Portfolio
            </p>
            <h2 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05]">
              Things I've
              <br />
              <span className="text-stroke">Built</span>
            </h2>
          </div>
          <p
            className="text-white/50 text-lg max-w-md leading-relaxed md:text-right"
            data-aos="fade-left"
          >
            Full-stack applications — from Next.js storefronts to Spring Boot
            microservices, built with clean architecture and attention to detail.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 auto-rows-[280px]">
          <ProjectCard
            project={featured}
            index={0}
            className="md:col-span-2 lg:col-span-7 lg:row-span-2 min-h-[360px] lg:min-h-0"
          />
          {rest.slice(0, 2).map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i + 1} className="lg:col-span-5" />
          ))}
          {rest.slice(2).map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i + 3} className="lg:col-span-4" />
          ))}
        </div>

        <div
          className="mt-16 flex flex-col sm:flex-row items-center justify-between gap-6 p-8 md:p-10 rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm"
          data-aos="fade-up"
        >
          <div>
            <p className="text-white font-extrabold text-xl md:text-2xl">
              Have an idea worth building?
            </p>
            <p className="text-white/50 mt-1">Let's turn it into something real.</p>
          </div>
          <a
            href="#contactMe"
            className="group shrink-0 inline-flex items-center gap-3 px-8 py-4 rounded-full bg-[#FBAC18] text-[#0a0a3b] font-extrabold text-lg hover:shadow-[0_0_40px_rgba(251,172,24,0.35)] transition-all duration-300 hover:scale-105"
          >
            Start a Conversation
            <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
