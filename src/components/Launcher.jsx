import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { projects } from "../data/content";
import { useOS } from "../store/useOS";

export default function Launcher() {
  const open = useOS((s) => s.launcherOpen);
  const closeLauncher = useOS((s) => s.closeLauncher);
  const openApp = useOS((s) => s.openApp);
  const [query, setQuery] = useState("");
  const inputRef = useRef(null);

  const items = useMemo(
    () => [
      {
        label: "Quick View",
        hint: "everything at once",
        run: () => openApp("quickview", { singleton: true }),
      },
      { label: "Terminal", hint: "shell", run: () => openApp("terminal", {}) },
      { label: "Files", hint: "browse ~", run: () => openApp("files", { path: "/home/aarya" }) },
      { label: "About me", hint: "about.md", run: () => openApp("reader", { doc: "about", title: "about.md" }) },
      { label: "Skills", hint: "skills.txt", run: () => openApp("reader", { doc: "skills", title: "skills.txt" }) },
      { label: "Contact", hint: "contact.md", run: () => openApp("reader", { doc: "contact", title: "contact.md" }) },
      { label: "Compose mail", hint: "mail", run: () => openApp("mail", { singleton: true }) },
      { label: "System Monitor", hint: "monitor", run: () => openApp("monitor", { singleton: true }) },
      ...projects.map((p) => ({
        label: p.name,
        hint: `project · ${p.slug}`,
        run: () => openApp("project", { slug: p.slug, title: `${p.name} — README.md` }),
      })),
    ],
    [openApp],
  );

  const filtered = items.filter((item) =>
    `${item.label} ${item.hint}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  useEffect(() => {
    if (open) {
      setQuery("");
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.14 }}
          className="fixed inset-0 z-[9500] flex items-start justify-center bg-black/45 pt-[14vh]"
          onPointerDown={closeLauncher}
        >
          <motion.div
            initial={{ y: -10, scale: 0.985 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: -8, scale: 0.99 }}
            transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-[min(92vw,520px)] overflow-hidden rounded-xl border border-white/10 chrome win-shadow"
          >
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && filtered[0]) {
                  filtered[0].run();
                  closeLauncher();
                }
                if (e.key === "Escape") closeLauncher();
              }}
              placeholder="Search apps, files, projects…"
              className="w-full border-b border-line/70 bg-transparent px-4 py-3.5 text-[14px] text-fg outline-none placeholder:text-dim"
            />
            <div className="scroll max-h-[46vh] overflow-y-auto p-1.5">
              {filtered.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    item.run();
                    closeLauncher();
                  }}
                  className="flex w-full items-baseline gap-3 rounded-md px-3 py-2 text-left transition hover:bg-white/7"
                >
                  <span className="text-[13.5px] text-fg/90">{item.label}</span>
                  <span className="ml-auto font-mono text-[11px] text-dim">{item.hint}</span>
                </button>
              ))}
              {filtered.length === 0 && (
                <p className="px-3 py-3 font-mono text-[12px] text-dim">no matches</p>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
