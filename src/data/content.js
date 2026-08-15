export const user = {
  name: "Aarya Dangol",
  handle: "aarya",
  host: "arch",
  role: "Full-stack Developer",
  location: "Kathmandu, Nepal",
  email: "aaryaed@gmail.com",
  github: "https://github.com/aaryae",
  linkedin: "https://www.linkedin.com/in/aaryae/",
  instagram: "https://instagram.com/aaryae_",
  portrait: "/images/aarya1.jpg",
  headline: "The Strength of Curiosity",
  tagline: "The drive behind every breakthrough",
  summary:
    "Curiosity drives my journey in tech. I build modern web apps using React, Tailwind, and Spring Boot. Solving real-world problems with clean code and creativity is what I love.",
  quote:
    "I don't just write code — I craft experiences that solve real problems and leave a lasting impression.",
  about: [
    "My journey in tech is fueled by an insatiable curiosity. I specialize in building modern web experiences with React, Next.js, Node.js, and TypeScript, backed by robust servers with Java, Spring Boot and PostgreSQL.",
    'Every project I ship started as a question — "What if?" — and ended as a live application serving real users. That is the kind of work that excites me.',
  ],
};

export const skills = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Vite"] },
  { group: "Backend", items: ["Java", "Spring Boot", "Node.js", "REST", "JWT"] },
  { group: "Data", items: ["PostgreSQL", "MySQL", "Redis"] },
  { group: "Tooling", items: ["Git", "Docker", "Linux", "Figma"] },
];

export const projects = [
  {
    slug: "mudita",
    name: "Mudita Store",
    tagline: "Full-scale e-commerce platform for computers & electronics",
    stack: ["Next.js", "Node.js", "React"],
    link: "https://mudita.technirvana.com.np/",
    image: "/images/mudita.png",
    kind: "live",
    featured: true,
    notes: [
      "Storefront, catalogue and checkout for a computer and electronics retailer.",
      "Server-rendered product pages for search visibility, with a Node.js API behind them.",
    ],
  },
  {
    slug: "skillswap",
    name: "SkillSwap",
    tagline: "Microservices skill exchange platform with Spring Boot",
    stack: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
    link: "https://github.com/aaryae/SkillSwap",
    kind: "repo",
    notes: [
      "Users trade skills instead of money; matching, sessions and reputation are separate services.",
      "Service discovery and an API gateway sit in front, each service owning its own schema.",
    ],
  },
  {
    slug: "inventory",
    name: "Inventory Management",
    tagline: "Enterprise inventory system with resources, batches & barcodes",
    stack: ["Java", "Spring Boot", "PostgreSQL", "JWT"],
    link: "https://github.com/aaryae/Inventory-Management-System",
    kind: "repo",
    notes: [
      "Tracks resources down to batch level, with barcode lookup for fast stock movements.",
      "Role-based access with JWT so warehouse staff and managers see different surfaces.",
    ],
  },
  {
    slug: "eco",
    name: "Eco Commerce",
    tagline: "Full-featured e-commerce platform",
    stack: ["React", "TypeScript", "Tailwind"],
    link: "https://eco.aaryadangol.com.np",
    image: "/images/eco.png",
    kind: "live",
    notes: [
      "Cart, filtering and product detail flows built as a typed React front end.",
    ],
  },
  {
    slug: "news",
    name: "News Portal",
    tagline: "Real-time news from APIs worldwide",
    stack: ["React", "API"],
    link: "https://news.aaryadangol.com.np",
    image: "/images/news.png",
    kind: "live",
    notes: ["Aggregates several news APIs into one reading surface with category routing."],
  },
  {
    slug: "weather",
    name: "Weather App",
    tagline: "Live forecasts for any city",
    stack: ["React", "API"],
    link: "https://weather.aaryadangol.com.np",
    image: "/images/weather.png",
    kind: "live",
    notes: ["City search with current conditions and a multi-day forecast."],
  },
];

export const socials = [
  { label: "GitHub", href: user.github, handle: "@aaryae" },
  { label: "LinkedIn", href: user.linkedin, handle: "in/aaryae" },
  { label: "Instagram", href: user.instagram, handle: "@aaryae_" },
  { label: "Email", href: `mailto:${user.email}`, handle: user.email },
];

export const systemInfo = {
  os: "aaryaOS 1.0 x86_64",
  kernel: "6.9.4-curiosity",
  shell: "bash 5.2",
  wm: "aaryawm",
  terminal: "aarya-term",
  uptimeBase: "since 2023",
};
