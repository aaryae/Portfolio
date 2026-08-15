import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { APP_META, useOS } from "../store/useOS";

const CHROME = {
  linux: { top: 34, bottom: 78, radius: "rounded-xl" },
  windows: { top: 0, bottom: 48, radius: "rounded-lg" },
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function useViewport() {
  const [size, setSize] = useState(() => ({
    w: typeof window === "undefined" ? 1440 : window.innerWidth,
    h: typeof window === "undefined" ? 900 : window.innerHeight,
  }));
  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return size;
}

function WinButton({ label, onClick, className = "hover:bg-white/10", children }) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onPointerDown={(e) => e.stopPropagation()}
      className={`flex h-full w-[44px] items-center justify-center text-fg/70 transition ${className}`}
    >
      <svg viewBox="0 0 12 12" className="h-[10px] w-[10px]" fill="none" stroke="currentColor" strokeWidth="1.1">
        {children}
      </svg>
    </button>
  );
}

export default function Window({ win, hidden = false, children }) {
  const focusWindow = useOS((s) => s.focusWindow);
  const closeWindow = useOS((s) => s.closeWindow);
  const minimizeWindow = useOS((s) => s.minimizeWindow);
  const toggleMaximize = useOS((s) => s.toggleMaximize);
  const moveWindow = useOS((s) => s.moveWindow);
  const resizeWindow = useOS((s) => s.resizeWindow);
  const focused = useOS((s) => s.focusId === win.id);
  const platform = useOS((s) => s.platform);
  const viewport = useViewport();
  const chrome = CHROME[platform] ?? CHROME.linux;

  const startDrag = useCallback(
    (event) => {
      if (event.button !== 0 || win.maximized) return;
      event.preventDefault();
      focusWindow(win.id);
      const originX = event.clientX;
      const originY = event.clientY;
      const baseX = win.x;
      const baseY = win.y;

      const onMove = (e) => {
        const maxX = window.innerWidth - 120;
        const maxY = window.innerHeight - chrome.bottom;
        moveWindow(
          win.id,
          clamp(baseX + (e.clientX - originX), -win.w + 120, maxX),
          clamp(baseY + (e.clientY - originY), chrome.top, maxY),
        );
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [chrome.bottom, chrome.top, focusWindow, moveWindow, win.id, win.maximized, win.w, win.x, win.y],
  );

  const startResize = useCallback(
    (event) => {
      if (event.button !== 0 || win.maximized) return;
      event.preventDefault();
      event.stopPropagation();
      focusWindow(win.id);
      const originX = event.clientX;
      const originY = event.clientY;
      const baseW = win.w;
      const baseH = win.h;
      const [minW, minH] = APP_META[win.app].min;

      const onMove = (e) => {
        resizeWindow(
          win.id,
          clamp(baseW + (e.clientX - originX), minW, window.innerWidth - win.x - 16),
          clamp(baseH + (e.clientY - originY), minH, window.innerHeight - win.y - 16),
        );
      };
      const onUp = () => {
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("pointerup", onUp);
      };
      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
    },
    [focusWindow, resizeWindow, win],
  );

  const geometry = win.maximized
    ? platform === "windows"
      ? {
          left: 0,
          top: 0,
          width: viewport.w,
          height: viewport.h - chrome.bottom,
        }
      : {
          left: 8,
          top: chrome.top + 6,
          width: viewport.w - 16,
          height: viewport.h - chrome.top - chrome.bottom - 2,
        }
    : { left: win.x, top: win.y, width: win.w, height: win.h };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.97, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: 6 }}
      transition={{ duration: 0.16, ease: [0.32, 0.72, 0, 1] }}
      onPointerDown={() => focusWindow(win.id)}
      className={`absolute flex flex-col overflow-hidden border chrome win-shadow ${chrome.radius} ${
        focused ? "border-white/14" : "border-white/6"
      }`}
      style={{ ...geometry, zIndex: win.z, display: hidden ? "none" : "flex" }}
    >
      {platform === "windows" ? (
        <header
          onPointerDown={startDrag}
          onDoubleClick={() => toggleMaximize(win.id)}
          className={`flex h-8 shrink-0 select-none items-center border-b border-line/70 pl-3 ${
            focused ? "bg-surface-2/85" : "bg-surface/75"
          }`}
        >
          <p className={`truncate text-[12px] ${focused ? "text-fg/85" : "text-dim"}`}>
            {win.title}
          </p>
          <div className="ml-auto flex h-full shrink-0">
            <WinButton label="Minimize window" onClick={() => minimizeWindow(win.id)}>
              <path d="M2 6h8" />
            </WinButton>
            <WinButton label="Maximize window" onClick={() => toggleMaximize(win.id)}>
              <rect x="2.5" y="2.5" width="7" height="7" />
            </WinButton>
            <WinButton
              label="Close window"
              onClick={() => closeWindow(win.id)}
              className="hover:bg-[#c42b1c] hover:text-white"
            >
              <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
            </WinButton>
          </div>
        </header>
      ) : (
        <header
          onPointerDown={startDrag}
          onDoubleClick={() => toggleMaximize(win.id)}
          className={`flex h-9 shrink-0 select-none items-center gap-2 border-b border-line/70 px-3 ${
            focused ? "bg-surface-2/80" : "bg-surface/70"
          }`}
        >
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Close window"
              onClick={() => closeWindow(win.id)}
              onPointerDown={(e) => e.stopPropagation()}
              className="h-3 w-3 rounded-full bg-rose/80 transition hover:bg-rose"
            />
            <button
              type="button"
              aria-label="Minimize window"
              onClick={() => minimizeWindow(win.id)}
              onPointerDown={(e) => e.stopPropagation()}
              className="h-3 w-3 rounded-full bg-amber/70 transition hover:bg-amber"
            />
            <button
              type="button"
              aria-label="Maximize window"
              onClick={() => toggleMaximize(win.id)}
              onPointerDown={(e) => e.stopPropagation()}
              className="h-3 w-3 rounded-full bg-mint/70 transition hover:bg-mint"
            />
          </div>
          <p
            className={`mx-auto truncate font-mono text-[11.5px] tracking-tight ${
              focused ? "text-fg/80" : "text-dim"
            }`}
          >
            {win.title}
          </p>
          <span className="w-12" />
        </header>
      )}

      <div className="relative flex min-h-0 flex-1 flex-col">{children}</div>

      {!win.maximized && (
        <button
          type="button"
          aria-label="Resize window"
          onPointerDown={startResize}
          className="absolute bottom-0 right-0 h-4 w-4 cursor-nwse-resize"
        />
      )}
    </motion.section>
  );
}
