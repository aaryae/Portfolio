import { useEffect, useState } from "react";
import { useOS } from "../store/useOS";
import WinIcon from "./WinIcons";

const PINNED = [
  { app: "quickview", label: "Quick View", props: { singleton: true }, glow: true },
  { app: "files", label: "File Explorer", props: { path: "/home/aarya", singleton: true } },
  { app: "terminal", label: "Windows Terminal", props: {} },
  { app: "reader", label: "About me", props: { doc: "about", title: "about.md", singleton: true } },
  { app: "project", label: "Projects", props: { slug: "mudita", singleton: true } },
  { app: "mail", label: "Mail", props: { singleton: true } },
  { app: "monitor", label: "Task Manager", props: { singleton: true } },
];

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 20000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function TaskButton({ item }) {
  const openApp = useOS((s) => s.openApp);
  const windows = useOS((s) => s.windows);
  const focusId = useOS((s) => s.focusId);
  const focusWindow = useOS((s) => s.focusWindow);
  const minimizeWindow = useOS((s) => s.minimizeWindow);

  const open = windows.filter((w) => w.app === item.app);
  const isFocused = open.some((w) => w.id === focusId && !w.minimized);

  const handle = () => {
    if (open.length === 0) {
      openApp(item.app, item.props);
      return;
    }
    if (isFocused) {
      minimizeWindow(open.find((w) => w.id === focusId).id);
      return;
    }
    focusWindow([...open].sort((a, b) => b.z - a.z)[0].id);
  };

  return (
    <button
      type="button"
      onClick={handle}
      title={item.label}
      className={`group relative flex h-10 w-10 items-center justify-center rounded-md transition ${
        isFocused ? "bg-white/12" : "hover:bg-white/8"
      }`}
    >
      <WinIcon name={item.app} className="h-[23px] w-[23px]" />
      <span className="pointer-events-none absolute -top-9 whitespace-nowrap rounded-md border border-white/10 bg-surface px-2 py-1 text-[10.5px] text-fg/85 opacity-0 transition group-hover:opacity-100">
        {item.label}
      </span>
      {item.glow && open.length === 0 && (
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[#4cc2ff] shadow-[0_0_8px_rgba(76,194,255,0.9)]" />
      )}
      <span
        className={`absolute bottom-0.5 h-[2.5px] rounded-full bg-[#4cc2ff] transition-all ${
          open.length === 0 ? "w-0 opacity-0" : isFocused ? "w-4 opacity-100" : "w-1.5 opacity-70"
        }`}
      />
    </button>
  );
}

export default function Taskbar() {
  const toggleLauncher = useOS((s) => s.toggleLauncher);
  const launcherOpen = useOS((s) => s.launcherOpen);
  const windows = useOS((s) => s.windows);
  const pinnedApps = PINNED.map((p) => p.app);
  const extra = windows
    .filter((w) => !pinnedApps.includes(w.app))
    .map((w) => ({ app: w.app, label: w.title, props: {} }))
    .filter((item, i, all) => all.findIndex((x) => x.app === item.app) === i);
  const now = useClock();

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-[8500] h-12 border-t border-white/8 bar"
      onPointerDown={(event) => event.stopPropagation()}
      onContextMenu={(event) => event.stopPropagation()}
    >
      <div className="relative flex h-full items-center justify-center gap-1 px-2">
        <button
          type="button"
          onClick={toggleLauncher}
          title="Start"
          className={`flex h-10 w-10 items-center justify-center rounded-md transition ${
            launcherOpen ? "bg-white/12" : "hover:bg-white/8"
          }`}
        >
          <svg viewBox="0 0 32 32" className="h-[19px] w-[19px] text-[#4cc2ff]" fill="currentColor">
            <rect x="4" y="4" width="10.4" height="10.4" rx="1.4" />
            <rect x="17.6" y="4" width="10.4" height="10.4" rx="1.4" />
            <rect x="4" y="17.6" width="10.4" height="10.4" rx="1.4" />
            <rect x="17.6" y="17.6" width="10.4" height="10.4" rx="1.4" />
          </svg>
        </button>

        {[...PINNED, ...extra].map((item) => (
          <TaskButton key={item.app} item={item} />
        ))}

        <div className="absolute right-2 flex items-center gap-3 pr-1 text-fg/70">
          <div className="hidden items-center gap-2.5 sm:flex">
            <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M4 9.5a11 11 0 0 1 16 0M7 13a7 7 0 0 1 10 0" />
              <circle cx="12" cy="17" r="1.1" fill="currentColor" stroke="none" />
            </svg>
            <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              <path d="M5 10v4h3l4 3.5v-11L8 10z" />
              <path d="M16 9.5a4 4 0 0 1 0 5" />
            </svg>
            <svg viewBox="0 0 24 24" className="h-[15px] w-[15px]" fill="none" stroke="currentColor" strokeWidth="1.4">
              <rect x="3" y="8.5" width="16" height="7" rx="1.6" />
              <rect x="4.5" y="10" width="11" height="4" rx="0.6" fill="currentColor" stroke="none" />
              <path d="M20.5 11v2" strokeLinecap="round" />
            </svg>
          </div>
          <div className="text-right leading-tight">
            <p className="text-[11.5px] text-fg/80">
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </p>
            <p className="text-[11px] text-fg/55">
              {now.toLocaleDateString([], { day: "2-digit", month: "2-digit", year: "numeric" })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
