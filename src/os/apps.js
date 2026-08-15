export const APP_LABELS = {
  quickview: { linux: "Quick View", windows: "Quick View" },
  terminal: { linux: "aarya-term", windows: "Windows Terminal" },
  files: { linux: "Files", windows: "File Explorer" },
  reader: { linux: "Reader", windows: "Notepad" },
  project: { linux: "Project", windows: "Project" },
  image: { linux: "Image Viewer", windows: "Photos" },
  mail: { linux: "Compose", windows: "Mail" },
  monitor: { linux: "System Monitor", windows: "Task Manager" },
};

export function appLabel(app, platform = "linux") {
  return APP_LABELS[app]?.[platform] ?? app;
}

export const PLATFORMS = {
  linux: {
    id: "linux",
    name: "aaryaOS",
    edition: "Arch Linux · aaryawm",
    blurb: "Terminal first. Type commands, read files, walk the tree.",
    hint: "for people who like a keyboard",
    accent: "#7aa2f7",
  },
  windows: {
    id: "windows",
    name: "aaryaWin",
    edition: "Windows 11 · build 26100",
    blurb: "Desktop first. Start menu, taskbar, File Explorer, one click each.",
    hint: "for people who like to point and click",
    accent: "#4cc2ff",
  },
};
