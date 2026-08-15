import { useOS } from "../store/useOS";

const ICONS = {
  quickview: (
    <>
      <path d="M12 3.6l1.9 4 4.4.55-3.2 3.05.82 4.35L12 13.4l-3.92 2.15.82-4.35-3.2-3.05L10.1 7.6z" />
      <path d="M6 20.5h12" />
    </>
  ),
  terminal: (
    <>
      <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
      <path d="M7 10l2.5 2L7 14M12.5 14.5H17" />
    </>
  ),
  files: (
    <>
      <path d="M3 7.5A2 2 0 0 1 5 5.5h3.6l1.6 2H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </>
  ),
  reader: (
    <>
      <path d="M6 3.5h8.5L19 8v12.5H6z" />
      <path d="M14 3.5V8h5M9 12h7M9 15.5h7" />
    </>
  ),
  project: (
    <>
      <rect x="2.5" y="5" width="19" height="12" rx="2" />
      <path d="M8.5 20.5h7M12 17v3.5" />
    </>
  ),
  mail: (
    <>
      <rect x="2.5" y="5" width="19" height="14" rx="2" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </>
  ),
  monitor: (
    <>
      <path d="M3 16.5l4-7 3.5 4.5L14 6l3 6.5 4-3" />
    </>
  ),
};

const DOCK_ITEMS = [
  { app: "quickview", label: "Quick View — everything at once", props: { singleton: true }, glow: true },
  { app: "terminal", label: "Terminal", props: {} },
  { app: "files", label: "Files", props: { path: "/home/aarya", singleton: true } },
  { app: "reader", label: "About", props: { doc: "about", title: "about.md", singleton: true } },
  { app: "project", label: "Projects", props: { slug: "mudita", singleton: true } },
  { app: "mail", label: "Mail", props: { singleton: true } },
  { app: "monitor", label: "Monitor", props: { singleton: true } },
];

export default function Dock() {
  const openApp = useOS((s) => s.openApp);
  const windows = useOS((s) => s.windows);
  const workspace = useOS((s) => s.workspace);
  const focusWindow = useOS((s) => s.focusWindow);
  const minimizeWindow = useOS((s) => s.minimizeWindow);
  const focusId = useOS((s) => s.focusId);

  const handle = (item) => {
    const open = windows.filter((w) => w.app === item.app && w.workspace === workspace);
    if (open.length === 0) {
      openApp(item.app, item.props);
      return;
    }
    const focusedHere = open.find((w) => w.id === focusId && !w.minimized);
    if (focusedHere) {
      minimizeWindow(focusedHere.id);
      return;
    }
    focusWindow(open.sort((a, b) => b.z - a.z)[0].id);
  };

  return (
    <div className="absolute inset-x-0 bottom-0 z-[8500] flex justify-center pb-3">
      <nav className="flex items-end gap-1.5 rounded-2xl border border-white/8 chrome px-2 py-2">
        {DOCK_ITEMS.map((item) => {
          const open = windows.some((w) => w.app === item.app);
          const isFocused = windows.some((w) => w.app === item.app && w.id === focusId);
          return (
            <button
              key={item.app}
              type="button"
              onClick={() => handle(item)}
              title={item.label}
              className={`group relative flex h-11 w-11 items-center justify-center rounded-xl border transition hover:-translate-y-0.5 ${
                item.glow
                  ? "glow-tile text-amber"
                  : "border-white/6 bg-surface-2/70 text-muted hover:border-white/14 hover:text-fg"
              }`}
            >
              <svg
                viewBox="0 0 24 24"
                className="h-[19px] w-[19px]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {ICONS[item.app]}
              </svg>
              <span className="pointer-events-none absolute -top-8 whitespace-nowrap rounded-md border border-white/8 bg-surface px-2 py-1 text-[10.5px] text-fg/80 opacity-0 transition group-hover:opacity-100">
                {item.label}
              </span>
              {item.glow && !open && (
                <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-amber" />
              )}
              {open && (
                <span
                  className={`absolute -bottom-1 h-1 w-1 rounded-full ${
                    isFocused ? "bg-accent" : "bg-dim"
                  }`}
                />
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
