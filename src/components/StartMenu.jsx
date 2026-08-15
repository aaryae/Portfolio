import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects, user } from "../data/content";
import { useOS } from "../store/useOS";
import WinIcon from "./WinIcons";

function Tile({ label, icon, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex flex-col items-center gap-2 rounded-md px-2 py-3 text-center transition hover:bg-white/8"
    >
      <WinIcon name={icon} className="h-[26px] w-[26px]" />
      <span className="text-[11.5px] leading-tight text-fg/85">{label}</span>
    </button>
  );
}

export default function StartMenu() {
  const open = useOS((s) => s.launcherOpen);
  const closeLauncher = useOS((s) => s.closeLauncher);
  const openApp = useOS((s) => s.openApp);
  const restart = useOS((s) => s.restart);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  const pinned = useMemo(
    () => [
      {
        label: "Quick View",
        icon: "quickview",
        run: () => openApp("quickview", { singleton: true }),
      },
      { label: "Terminal", icon: "terminal", run: () => openApp("terminal", {}) },
      {
        label: "File Explorer",
        icon: "files",
        run: () => openApp("files", { path: "/home/aarya" }),
      },
      {
        label: "About me",
        icon: "reader",
        run: () => openApp("reader", { doc: "about", title: "about.md" }),
      },
      {
        label: "Projects",
        icon: "project",
        run: () => openApp("project", { slug: projects[0].slug, singleton: true }),
      },
      { label: "Mail", icon: "mail", run: () => openApp("mail", { singleton: true }) },
      {
        label: "Task Manager",
        icon: "monitor",
        run: () => openApp("monitor", { singleton: true }),
      },
      {
        label: "Skills",
        icon: "doc",
        run: () => openApp("reader", { doc: "skills", title: "skills.txt" }),
      },
    ],
    [openApp],
  );

  const recommended = useMemo(
    () => [
      {
        label: "QUICK-VIEW.md",
        note: "everything on one page",
        run: () => openApp("quickview", { singleton: true }),
      },
      {
        label: "about.md",
        note: "who is typing",
        run: () => openApp("reader", { doc: "about", title: "about.md" }),
      },
      {
        label: "contact.md",
        note: "how to reach me",
        run: () => openApp("reader", { doc: "contact", title: "contact.md" }),
      },
      ...projects.slice(0, 2).map((project) => ({
        label: `${project.slug}/README.md`,
        note: project.name,
        run: () => openApp("project", { slug: project.slug, title: `${project.name} — README.md` }),
      })),
    ],
    [openApp],
  );

  const results = query.trim()
    ? [...pinned, ...recommended].filter((item) =>
        item.label.toLowerCase().includes(query.trim().toLowerCase()),
      )
    : null;

  return (
    <AnimatePresence>
      {open && (
        <>
          <div className="fixed inset-0 z-[9400]" onPointerDown={closeLauncher} />
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.99 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.995 }}
            transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
            onPointerDown={(e) => e.stopPropagation()}
            className="fixed bottom-[60px] left-1/2 z-[9450] w-[min(94vw,540px)] -translate-x-1/2 overflow-hidden rounded-xl border border-white/10 chrome win-shadow"
          >
            <div className="p-4">
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Escape") closeLauncher();
                  if (e.key === "Enter" && results?.[0]) {
                    results[0].run();
                    closeLauncher();
                  }
                }}
                placeholder="Search apps, files and projects"
                className="w-full rounded-full border border-line bg-[#0f1216] px-4 py-2.5 text-[13px] text-fg outline-none placeholder:text-dim focus:border-accent/60"
              />

              {results ? (
                <div className="scroll mt-3 max-h-[42vh] overflow-y-auto">
                  {results.map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => {
                        item.run();
                        closeLauncher();
                      }}
                      className="flex w-full items-baseline gap-3 rounded-md px-3 py-2 text-left transition hover:bg-white/8"
                    >
                      <span className="text-[13px] text-fg/90">{item.label}</span>
                      {item.note && (
                        <span className="ml-auto font-mono text-[10.5px] text-dim">{item.note}</span>
                      )}
                    </button>
                  ))}
                  {results.length === 0 && (
                    <p className="px-3 py-3 font-mono text-[12px] text-dim">no results</p>
                  )}
                </div>
              ) : (
                <>
                  <p className="mb-1 mt-4 px-1 text-[12px] font-medium text-fg/80">Pinned</p>
                  <div className="grid grid-cols-4 gap-1">
                    {pinned.map((item) => (
                      <Tile
                        key={item.label}
                        label={item.label}
                        icon={item.icon}
                        onClick={() => {
                          item.run();
                          closeLauncher();
                        }}
                      />
                    ))}
                  </div>

                  <p className="mb-1 mt-4 px-1 text-[12px] font-medium text-fg/80">Recommended</p>
                  <div className="grid gap-0.5 sm:grid-cols-2">
                    {recommended.map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => {
                          item.run();
                          closeLauncher();
                        }}
                        className="flex flex-col rounded-md px-2.5 py-2 text-left transition hover:bg-white/8"
                      >
                        <span className="truncate font-mono text-[11.5px] text-fg/85">
                          {item.label}
                        </span>
                        <span className="truncate text-[11px] text-dim">{item.note}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-line/70 bg-white/[0.03] px-4 py-2.5">
              <img
                src={user.portrait}
                alt=""
                className="h-7 w-7 rounded-full border border-line object-cover"
              />
              <p className="text-[12.5px] text-fg/85">{user.name}</p>
              <button
                type="button"
                onClick={() => {
                  closeLauncher();
                  restart();
                }}
                title="Restart and choose another machine"
                className="ml-auto flex items-center gap-2 rounded-md px-2.5 py-1.5 text-[11.5px] text-muted transition hover:bg-white/8 hover:text-fg"
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M12 4v7" strokeLinecap="round" />
                  <path d="M7.5 6.4a7 7 0 1 0 9 0" strokeLinecap="round" />
                </svg>
                Restart
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
