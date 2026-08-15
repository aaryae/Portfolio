import { useState } from "react";
import { useOS } from "../store/useOS";
import WinIcon from "./WinIcons";

const WIN_ART = { star: "quickview", file: "doc", dir: "folder", app: "terminal" };

const ITEMS = [
  {
    id: "quickview",
    label: "QUICK-VIEW.md",
    kind: "star",
    glow: true,
    run: (openApp) => openApp("quickview", { singleton: true }),
  },
  {
    id: "readme",
    label: "README.md",
    kind: "file",
    run: (openApp) => openApp("reader", { doc: "readme", title: "README.md" }),
  },
  {
    id: "about",
    label: "about.md",
    kind: "file",
    run: (openApp) => openApp("reader", { doc: "about", title: "about.md" }),
  },
  {
    id: "projects",
    label: "projects",
    kind: "dir",
    run: (openApp) => openApp("files", { path: "/home/aarya/projects", title: "Files — ~/projects" }),
  },
  {
    id: "terminal",
    label: "Terminal",
    kind: "app",
    run: (openApp) => openApp("terminal", {}),
  },
];

function Art({ kind }) {
  if (kind === "star") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-amber" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M6 3.5h8.5L19 8v12.5H6z" />
        <path d="M14 3.5V8h5" />
        <path d="M12.2 11l1.05 2.2 2.35.3-1.72 1.62.44 2.33-2.12-1.14-2.12 1.14.44-2.33-1.72-1.62 2.35-.3z" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (kind === "dir") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-accent/85" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 7.5A2 2 0 0 1 5 5.5h3.6l1.6 2H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    );
  }
  if (kind === "app") {
    return (
      <svg viewBox="0 0 24 24" className="h-7 w-7 text-mint/85" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2.5" y="4" width="19" height="16" rx="2.5" />
        <path d="M7 10l2.5 2L7 14M12.5 14.5H17" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="h-7 w-7 text-muted" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M6 3.5h8.5L19 8v12.5H6z" />
      <path d="M14 3.5V8h5M9 12.5h7M9 16h4.5" />
    </svg>
  );
}

export default function DesktopIcons() {
  const openApp = useOS((s) => s.openApp);
  const platform = useOS((s) => s.platform);
  const [selected, setSelected] = useState(null);

  return (
    <div
      className={`absolute left-3 z-[10] flex w-[120px] flex-col gap-2.5 ${
        platform === "windows" ? "top-3" : "top-11"
      }`}
    >
      {ITEMS.map((item) => (
        <div key={item.id} className="flex flex-col items-center">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(item.id);
            }}
            onDoubleClick={() => item.run(openApp)}
            onKeyDown={(e) => {
              if (e.key === "Enter") item.run(openApp);
            }}
            className={`flex w-full flex-col items-center gap-1 rounded-lg border px-2 py-2.5 text-center transition ${
              item.glow
                ? "glow-tile"
                : selected === item.id
                  ? "border-accent/30 bg-accent/16"
                  : "border-transparent hover:bg-white/6"
            }`}
          >
            {platform === "windows" ? (
              <WinIcon name={WIN_ART[item.kind]} className="h-7 w-7" />
            ) : (
              <Art kind={item.kind} />
            )}
            <span
              className={`icon-label max-w-full break-words leading-tight ${
                platform === "windows" ? "text-[11px]" : "font-mono text-[10.5px]"
              } ${item.glow ? "text-amber" : "text-white"}`}
            >
              {item.label}
            </span>
          </button>
          {item.glow && (
            <span className="icon-label mt-1 font-mono text-[9.5px] uppercase tracking-[0.14em] text-amber/80">
              start here
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
