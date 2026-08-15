import { useState } from "react";
import WinIcon from "../components/WinIcons";
import { HOME, pretty, resolve } from "../os/fs";
import { useOS } from "../store/useOS";

const PLACES = [
  { label: "Home", path: HOME },
  { label: "Projects", path: `${HOME}/projects` },
  { label: "Pictures", path: `${HOME}/pictures` },
];

function Icon({ dir, name }) {
  const platform = useOS((s) => s.platform);
  const isPicture = name.endsWith(".png") || name.endsWith(".jpg");

  if (platform === "windows") {
    return (
      <WinIcon
        name={dir ? "folder" : isPicture ? "picture" : "doc"}
        className="h-[18px] w-[18px] shrink-0"
      />
    );
  }

  if (dir) {
    return (
      <svg viewBox="0 0 24 24" className="h-4 w-4 text-accent" fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M3 7.5A2 2 0 0 1 5 5.5h3.6l1.6 2H19a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </svg>
    );
  }
  return (
    <svg
      viewBox="0 0 24 24"
      className={`h-4 w-4 ${isPicture ? "text-mint" : "text-muted"}`}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      {isPicture ? (
        <>
          <rect x="3" y="4.5" width="18" height="15" rx="2" />
          <path d="M4 16l4.5-4.5 3.5 3.5 3-2.5 5 5" />
        </>
      ) : (
        <>
          <path d="M6 3.5h8.5L19 8v12.5H6z" />
          <path d="M14 3.5V8h5" />
        </>
      )}
    </svg>
  );
}

export default function Files({ win }) {
  const openApp = useOS((s) => s.openApp);
  const setTitle = useOS((s) => s.setTitle);
  const [path, setPath] = useState(win.props.path ?? HOME);
  const [selected, setSelected] = useState(null);

  const found = resolve(path) ?? resolve(HOME);
  const node = found.node;
  const entries = node.type === "dir" ? node.children : [];

  const go = (next) => {
    setPath(next);
    setSelected(null);
    setTitle(win.id, `Files — ${pretty(next)}`);
  };

  const activate = (child) => {
    if (child.type === "dir") {
      go(`${path === "/" ? "" : path}/${child.name}`);
      return;
    }
    if (child.app === "quickview") openApp("quickview", { singleton: true });
    else if (child.app === "image") openApp("image", { src: child.src, title: child.name });
    else if (child.app === "external") window.open(child.href, "_blank", "noopener");
    else if (child.app === "project") openApp("project", { slug: child.slug, title: child.name });
    else openApp("reader", { doc: child.doc ?? "readme", title: child.name });
  };

  const parent = path.split("/").slice(0, -1).join("/") || "/";

  return (
    <div className="flex min-h-0 flex-1 bg-surface/60 text-[13px]">
      <aside className="hidden w-40 shrink-0 border-r border-line/70 p-2 sm:block">
        <p className="px-2 pb-1.5 text-[10px] uppercase tracking-[0.14em] text-dim">Places</p>
        {PLACES.map((place) => (
          <button
            key={place.path}
            type="button"
            onClick={() => go(place.path)}
            className={`mb-0.5 flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left transition ${
              path === place.path ? "bg-white/8 text-fg" : "text-muted hover:bg-white/5"
            }`}
          >
            <Icon dir name={place.label} />
            {place.label}
          </button>
        ))}
      </aside>

      <div className="flex min-h-0 flex-1 flex-col">
        <div className="flex items-center gap-2 border-b border-line/70 px-3 py-2">
          <button
            type="button"
            onClick={() => go(parent)}
            disabled={path === "/"}
            className="rounded-md border border-line px-2 py-0.5 font-mono text-[11px] text-muted transition enabled:hover:text-fg disabled:opacity-35"
          >
            ..
          </button>
          <p className="truncate font-mono text-[11.5px] text-muted">{pretty(path)}</p>
          <span className="ml-auto font-mono text-[11px] text-dim">{entries.length} items</span>
        </div>

        <div className="scroll min-h-0 flex-1 overflow-y-auto p-2">
          {entries.map((child) => (
            <button
              key={child.name}
              type="button"
              onClick={() => setSelected(child.name)}
              onDoubleClick={() => activate(child)}
              className={`flex w-full items-center gap-2.5 rounded-md px-2.5 py-[7px] text-left transition ${
                selected === child.name ? "bg-accent/16 text-fg" : "text-muted hover:bg-white/5"
              }`}
            >
              <Icon dir={child.type === "dir"} name={child.name} />
              <span className="truncate">{child.name}</span>
              <span className="ml-auto shrink-0 font-mono text-[10.5px] text-dim">
                {child.type === "dir" ? "folder" : child.name.split(".").pop()}
              </span>
            </button>
          ))}
        </div>

        <p className="border-t border-line/70 px-3 py-1.5 text-[11px] text-dim">
          Double-click to open · {selected ?? "nothing selected"}
        </p>
      </div>
    </div>
  );
}
