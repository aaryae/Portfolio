import { AnimatePresence, motion } from "framer-motion";
import { WALLPAPERS } from "../os/wallpapers";
import { useOS } from "../store/useOS";

export default function ContextMenu() {
  const menu = useOS((s) => s.menu);
  const closeMenu = useOS((s) => s.closeMenu);
  const openApp = useOS((s) => s.openApp);
  const platform = useOS((s) => s.platform);
  const wallpaper = useOS((s) => s.wallpapers[s.platform]);
  const setWallpaper = useOS((s) => s.setWallpaper);
  const restart = useOS((s) => s.restart);

  const win11 = platform === "windows";
  const options = WALLPAPERS[platform] ?? WALLPAPERS.linux;

  const items = [
    {
      label: "Quick View",
      hint: "everything",
      accent: true,
      run: () => openApp("quickview", { singleton: true }),
    },
    {
      label: win11 ? "Open in Terminal" : "Open Terminal",
      hint: "Ctrl+Alt+T",
      run: () => openApp("terminal", {}),
    },
    {
      label: win11 ? "Open File Explorer" : "Open Files",
      hint: "~",
      run: () => openApp("files", { path: "/home/aarya" }),
    },
    {
      label: win11 ? "Task Manager" : "System Monitor",
      hint: "",
      run: () => openApp("monitor", { singleton: true }),
    },
    {
      label: win11 ? "Restart into aaryaOS" : "Restart into aaryaWin",
      hint: "boot menu",
      run: restart,
    },
  ];

  return (
    <AnimatePresence>
      {menu && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.1 }}
          style={{
            left: Math.min(menu.x, window.innerWidth - 224),
            top: Math.min(menu.y, window.innerHeight - 340),
          }}
          className="absolute z-[9200] w-[212px] overflow-hidden rounded-lg border border-white/10 chrome win-shadow p-1"
          onPointerDown={(e) => e.stopPropagation()}
        >
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => {
                item.run();
                closeMenu();
              }}
              className={`flex w-full items-baseline gap-3 rounded px-2.5 py-1.5 text-left text-[12.5px] transition hover:bg-white/8 ${
                item.accent ? "text-amber" : "text-muted hover:text-fg"
              }`}
            >
              {item.label}
              {item.hint && (
                <span className="ml-auto font-mono text-[10.5px] text-dim">{item.hint}</span>
              )}
            </button>
          ))}

          <div className="my-1 border-t border-line/70" />
          <p className="px-2.5 pb-1 pt-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
            {win11 ? "Personalize" : "Wallpaper"}
          </p>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => {
                setWallpaper(option.id);
                closeMenu();
              }}
              className="flex w-full items-center gap-2.5 rounded px-2.5 py-1.5 text-left text-[12.5px] text-muted transition hover:bg-white/8 hover:text-fg"
            >
              <span
                className={`h-2.5 w-2.5 rounded-sm border ${
                  wallpaper === option.id ? "border-accent bg-accent/60" : "border-line bg-white/5"
                }`}
              />
              {option.label}
            </button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
