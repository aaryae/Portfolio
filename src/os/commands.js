import { projects, skills, socials, systemInfo, user } from "../data/content";
import { HOME, pretty, resolve } from "./fs";

const LOGO = [
  "  ▄▀█ ▄▀█ █▀█ █▄█ ▄▀█",
  "  █▀█ █▀█ █▀▄  █  █▀█",
];

function neofetch() {
  const info = [
    ["", ""],
    [`${user.handle}@${user.host}`, ""],
    ["─────────────────", ""],
    ["OS", systemInfo.os],
    ["Kernel", systemInfo.kernel],
    ["Shell", systemInfo.shell],
    ["WM", systemInfo.wm],
    ["Terminal", systemInfo.terminal],
    ["Role", user.role],
    ["Location", user.location],
    ["Stack", "React · Next.js · Spring Boot · PostgreSQL"],
    ["Email", user.email],
  ];

  const lines = [...LOGO, ""];
  info.forEach(([key, value]) => {
    if (!key) return;
    lines.push(value ? `  ${key.padEnd(9)} ${value}` : `  ${key}`);
  });
  return { kind: "neofetch", lines };
}

function longFormat(node) {
  const isDir = node.type === "dir";
  const size = isDir ? 4096 : Math.max(64, (node.text?.length ?? 0) + 12);
  const perms = isDir ? "drwxr-xr-x" : "-rw-r--r--";
  const name = isDir ? `${node.name}/` : node.name;
  return `${perms}  aarya  ${String(size).padStart(5)}  ${name}`;
}

function treeLines(node, prefix = "") {
  const out = [];
  node.children.forEach((child, i) => {
    const last = i === node.children.length - 1;
    out.push(`${prefix}${last ? "└── " : "├── "}${child.name}${child.type === "dir" ? "/" : ""}`);
    if (child.type === "dir") {
      out.push(...treeLines(child, `${prefix}${last ? "    " : "│   "}`));
    }
  });
  return out;
}

export const commands = {
  quickview: {
    usage: "quickview",
    about: "Everything about me on a single page.",
    run: (_args, ctx) => {
      ctx.openApp("quickview", { singleton: true });
      return { kind: "note", text: "Quick View open — the whole portfolio on one page." };
    },
  },

  help: {
    usage: "help",
    about: "List available commands.",
    run: () => ({
      kind: "help",
      groups: [
        {
          label: "Start here",
          items: [["quickview", "everything on one page"]],
        },
        {
          label: "Me",
          items: [
            ["about", "read about.md"],
            ["skills", "what I work with"],
            ["contact", "how to reach me"],
            ["mail", "open the mail composer"],
            ["whoami", "the short version"],
          ],
        },
        {
          label: "Work",
          items: [
            ["projects", "list every project"],
            ["open <name>", "open a project, file or link"],
            ["git log", "commit history, portfolio edition"],
          ],
        },
        {
          label: "System",
          items: [
            ["ls [-l] [path]", "list a directory"],
            ["cd <path>", "change directory"],
            ["cat <file>", "print a file"],
            ["tree", "show the whole tree"],
            ["pwd", "print working directory"],
            ["neofetch", "system summary"],
            ["monitor", "open system monitor"],
            ["files", "open the file manager"],
            ["date", "current time"],
            ["reboot", "switch machine (linux ⇄ windows)"],
            ["clear", "clear the screen"],
            ["exit", "close this terminal"],
          ],
        },
      ],
    }),
  },

  ls: {
    usage: "ls [-l] [path]",
    about: "List directory contents.",
    run: (args, ctx) => {
      const long = args.includes("-l") || args.includes("-la") || args.includes("-al");
      const target = args.find((a) => !a.startsWith("-")) ?? ".";
      const found = resolve(target, ctx.cwd);
      if (!found) return { kind: "error", text: `ls: cannot access '${target}': No such file or directory` };
      if (found.node.type === "file") return { kind: "text", lines: [found.node.name] };
      if (long) return { kind: "text", lines: found.node.children.map(longFormat) };
      return { kind: "listing", entries: found.node.children.map((c) => ({ name: c.name, dir: c.type === "dir" })) };
    },
  },

  cd: {
    usage: "cd <path>",
    about: "Change the working directory.",
    run: (args, ctx) => {
      const target = args[0] ?? "~";
      const found = resolve(target, ctx.cwd);
      if (!found) return { kind: "error", text: `cd: no such file or directory: ${target}` };
      if (found.node.type !== "dir") return { kind: "error", text: `cd: not a directory: ${target}` };
      ctx.setCwd(found.path);
      return null;
    },
  },

  pwd: {
    usage: "pwd",
    about: "Print the working directory.",
    run: (_args, ctx) => ({ kind: "text", lines: [ctx.cwd] }),
  },

  cat: {
    usage: "cat <file>",
    about: "Print a file to the screen.",
    run: (args, ctx) => {
      if (!args[0]) return { kind: "error", text: "cat: missing file operand" };
      const found = resolve(args[0], ctx.cwd);
      if (!found) return { kind: "error", text: `cat: ${args[0]}: No such file or directory` };
      if (found.node.type === "dir") return { kind: "error", text: `cat: ${args[0]}: Is a directory` };
      if (found.node.binary) {
        ctx.openApp("image", { src: found.node.src, title: found.node.name });
        return { kind: "note", text: `${found.node.name} is binary — opened in Image Viewer.` };
      }
      return { kind: "doc", lines: found.node.text.split("\n") };
    },
  },

  tree: {
    usage: "tree [path]",
    about: "Print the directory tree.",
    run: (args, ctx) => {
      const found = resolve(args[0] ?? ".", ctx.cwd);
      if (!found || found.node.type !== "dir") return { kind: "error", text: "tree: not a directory" };
      return { kind: "text", lines: [pretty(found.path), ...treeLines(found.node)] };
    },
  },

  about: {
    usage: "about",
    about: "Read about.md in the Reader.",
    run: (_args, ctx) => {
      ctx.openApp("reader", { doc: "about", title: "about.md", singleton: false });
      return { kind: "note", text: "Opened about.md — or run `cat about.md` to keep it inline." };
    },
  },

  skills: {
    usage: "skills",
    about: "Show the stack I work in.",
    run: () => ({
      kind: "columns",
      groups: skills.map((g) => ({ label: g.group, items: g.items })),
    }),
  },

  projects: {
    usage: "projects",
    about: "List every project.",
    run: () => ({
      kind: "projects",
      items: projects.map((p) => ({
        slug: p.slug,
        name: p.name,
        tagline: p.tagline,
        kind: p.kind,
        stack: p.stack,
      })),
    }),
  },

  open: {
    usage: "open <project|file|url>",
    about: "Open a project, file or link.",
    run: (args, ctx) => {
      const target = args[0];
      if (!target) return { kind: "error", text: "open: what should I open? Try `open mudita`." };

      if (/^https?:\/\//.test(target)) {
        window.open(target, "_blank", "noopener");
        return { kind: "note", text: `Opening ${target} in a new tab.` };
      }

      const project = projects.find((p) => p.slug === target.replace(/\/$/, ""));
      if (project) {
        ctx.openApp("project", { slug: project.slug, title: `${project.name} — README.md` });
        return { kind: "note", text: `Opened ${project.name}.` };
      }

      const found = resolve(target, ctx.cwd);
      if (!found) return { kind: "error", text: `open: cannot open '${target}': not found` };
      const node = found.node;

      if (node.type === "dir") {
        ctx.openApp("files", { path: found.path, title: `Files — ${pretty(found.path)}` });
        return { kind: "note", text: `Opened ${pretty(found.path)} in Files.` };
      }
      if (node.app === "quickview") {
        ctx.openApp("quickview", { singleton: true });
      } else if (node.app === "image") {
        ctx.openApp("image", { src: node.src, title: node.name });
      } else if (node.app === "external") {
        window.open(node.href, "_blank", "noopener");
      } else if (node.app === "project") {
        ctx.openApp("project", { slug: node.slug, title: `${node.name}` });
      } else {
        ctx.openApp("reader", { doc: node.doc ?? "readme", title: node.name });
      }
      return { kind: "note", text: `Opened ${node.name}.` };
    },
  },

  contact: {
    usage: "contact",
    about: "Show every way to reach me.",
    run: () => ({
      kind: "contact",
      items: socials.map((s) => ({ label: s.label, handle: s.handle, href: s.href })),
    }),
  },

  mail: {
    usage: "mail",
    about: "Open the mail composer.",
    run: (_args, ctx) => {
      ctx.openApp("mail", { singleton: true });
      return { kind: "note", text: "Composer open. Sending hands off to your mail client." };
    },
  },

  files: {
    usage: "files [path]",
    about: "Open the file manager.",
    run: (args, ctx) => {
      const found = resolve(args[0] ?? ".", ctx.cwd);
      const path = found && found.node.type === "dir" ? found.path : HOME;
      ctx.openApp("files", { path, title: `Files — ${pretty(path)}` });
      return null;
    },
  },

  monitor: {
    usage: "monitor",
    about: "Open the system monitor.",
    run: (_args, ctx) => {
      ctx.openApp("monitor", { singleton: true });
      return null;
    },
  },

  whoami: {
    usage: "whoami",
    about: "Print the current user.",
    run: () => ({
      kind: "text",
      lines: [`${user.handle} — ${user.role}, ${user.location}`, `"${user.headline}"`],
    }),
  },

  neofetch: { usage: "neofetch", about: "System summary.", run: () => neofetch() },

  git: {
    usage: "git log",
    about: "Commit history, portfolio edition.",
    run: (args) => {
      if (args[0] !== "log") return { kind: "error", text: "git: only `git log` is wired up here." };
      return {
        kind: "gitlog",
        items: projects.map((p, i) => ({
          hash: p.slug.slice(0, 7).padEnd(7, "0"),
          name: p.name,
          note: p.tagline,
          when: `${(i + 1) * 3} months ago`,
        })),
      };
    },
  },

  date: {
    usage: "date",
    about: "Print the current date and time.",
    run: () => ({ kind: "text", lines: [new Date().toString()] }),
  },

  echo: {
    usage: "echo <text>",
    about: "Print text back.",
    run: (args) => ({ kind: "text", lines: [args.join(" ")] }),
  },

  uname: {
    usage: "uname [-a]",
    about: "Print system information.",
    run: (args) => ({
      kind: "text",
      lines: [
        args.includes("-a")
          ? `${systemInfo.os} ${systemInfo.kernel} ${systemInfo.wm} curiosity-driven`
          : "aaryaOS",
      ],
    }),
  },

  man: {
    usage: "man <command>",
    about: "Show the manual for a command.",
    run: (args) => {
      const name = args[0];
      if (!name) return { kind: "error", text: "What manual page do you want?" };
      const cmd = commands[name];
      if (!cmd) return { kind: "error", text: `No manual entry for ${name}` };
      return {
        kind: "text",
        lines: [`NAME`, `    ${name} — ${cmd.about}`, "", "SYNOPSIS", `    ${cmd.usage}`],
      };
    },
  },

  history: {
    usage: "history",
    about: "Show command history.",
    run: (_args, ctx) => ({
      kind: "text",
      lines: ctx.history.map((h, i) => `${String(i + 1).padStart(4)}  ${h}`),
    }),
  },

  sudo: {
    usage: "sudo <command>",
    about: "Execute a command as another user.",
    run: () => ({
      kind: "error",
      text: "aarya is not in the sudoers file. This incident has been reported.",
    }),
  },

  reboot: {
    usage: "reboot",
    about: "Return to the boot menu and pick a machine.",
    run: (_args, ctx) => {
      ctx.restart();
      return null;
    },
  },

  clear: { usage: "clear", about: "Clear the terminal.", run: (_args, ctx) => ctx.clear() },

  exit: {
    usage: "exit",
    about: "Close this terminal.",
    run: (_args, ctx) => {
      ctx.exit();
      return null;
    },
  },
};

export const commandNames = Object.keys(commands).sort();
