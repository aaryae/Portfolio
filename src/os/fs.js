import { projects, skills, socials, user } from "../data/content";

const HOME = "/home/aarya";

function file(name, text, extra = {}) {
  return { type: "file", name, text, ...extra };
}

function dir(name, children) {
  return { type: "dir", name, children };
}

const aboutText = [
  `${user.name} — ${user.role}`,
  `${user.location}`,
  "",
  user.headline.toUpperCase(),
  user.tagline,
  "",
  ...user.about.flatMap((p) => [p, ""]),
  `"${user.quote}"`,
].join("\n");

const contactText = [
  "Reach me on any of these. Email is fastest.",
  "",
  ...socials.map((s) => `${s.label.padEnd(10)} ${s.handle}${s.label === "Email" ? "" : `  (${s.href})`}`),
  "",
  "Open the Mail app with `mail` to write a message directly.",
].join("\n");

const skillsText = skills
  .map((group) => `${group.group}\n${group.items.map((i) => `  - ${i}`).join("\n")}`)
  .join("\n\n");

const readmeText = [
  `Welcome to aaryaOS — the portfolio of ${user.name}.`,
  "",
  "This is a small desktop. Everything about me lives in files you can read,",
  "and every project is a directory you can enter.",
  "",
  "Try:",
  "  quickview         everything about me on one page",
  "  help              list every available command",
  "  cat about.md      who I am",
  "  ls projects       what I have built",
  "  open mudita       launch a project in a window",
  "  mail              write me a message",
  "",
  "Or ignore the shell entirely and use the dock at the bottom.",
].join("\n");

const quickViewText = [
  `${user.name} — ${user.role}`,
  `${user.location} · ${user.email}`,
  "",
  "SUMMARY",
  user.summary,
  "",
  "STACK",
  ...skills.map((group) => `  ${group.group.padEnd(10)} ${group.items.join(", ")}`),
  "",
  "PROJECTS",
  ...projects.map(
    (project) =>
      `  ${project.slug.padEnd(11)} ${project.name} — ${project.tagline}\n  ${" ".repeat(11)} ${project.stack.join(", ")}\n  ${" ".repeat(11)} ${project.link}`,
  ),
  "",
  "LINKS",
  ...socials.map((social) => `  ${social.label.padEnd(10)} ${social.href}`),
  "",
  `"${user.quote}"`,
].join("\n");

function projectReadme(project) {
  return [
    `# ${project.name}`,
    "",
    project.tagline,
    "",
    "## Stack",
    project.stack.map((s) => `- ${s}`).join("\n"),
    "",
    "## Notes",
    project.notes.map((n) => `- ${n}`).join("\n"),
    "",
    "## Link",
    project.link,
  ].join("\n");
}

function projectNode(project) {
  const children = [
    file("README.md", projectReadme(project), { app: "project", slug: project.slug }),
    file("link.url", project.link, { app: "external", href: project.link }),
  ];
  if (project.image) {
    children.push(
      file("screenshot.png", `[binary image: ${project.image}]`, {
        app: "image",
        src: project.image,
        binary: true,
      }),
    );
  }
  return dir(project.slug, children);
}

export const root = dir("/", [
  dir("home", [
    dir("aarya", [
      file("QUICK-VIEW.md", quickViewText, { app: "quickview" }),
      file("README.md", readmeText, { app: "reader", doc: "readme" }),
      file("about.md", aboutText, { app: "reader", doc: "about" }),
      file("contact.md", contactText, { app: "reader", doc: "contact" }),
      file("skills.txt", skillsText, { app: "reader", doc: "skills" }),
      dir("projects", projects.map(projectNode)),
      dir("pictures", [
        file("portrait.jpg", `[binary image: ${user.portrait}]`, {
          app: "image",
          src: user.portrait,
          binary: true,
        }),
      ]),
    ]),
  ]),
]);

export function normalize(path, cwd) {
  const raw = path.startsWith("/")
    ? path
    : path.startsWith("~")
      ? path.replace("~", HOME)
      : `${cwd}/${path}`;

  const out = [];
  for (const part of raw.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") out.pop();
    else out.push(part);
  }
  return `/${out.join("/")}`;
}

export function resolve(path, cwd = HOME) {
  const abs = normalize(path, cwd);
  if (abs === "/") return { node: root, path: "/" };
  let node = root;
  for (const part of abs.slice(1).split("/")) {
    if (node.type !== "dir") return null;
    const next = node.children.find((c) => c.name === part);
    if (!next) return null;
    node = next;
  }
  return { node, path: abs };
}

export function pretty(path) {
  return path === HOME ? "~" : path.startsWith(`${HOME}/`) ? `~${path.slice(HOME.length)}` : path;
}

export function listNames(path) {
  const found = resolve(path);
  if (!found || found.node.type !== "dir") return [];
  return found.node.children.map((c) => (c.type === "dir" ? `${c.name}/` : c.name));
}

export { HOME };
