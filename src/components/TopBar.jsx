import { useEffect, useState } from "react";
import { user } from "../data/content";
import { useOS } from "../store/useOS";

function useClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 15000);
    return () => clearInterval(id);
  }, []);
  return now;
}

function Glyph({ path }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d={path} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function TopBar() {
  const now = useClock();
  const workspace = useOS((s) => s.workspace);
  const workspaces = useOS((s) => s.workspaces);
  const setWorkspace = useOS((s) => s.setWorkspace);
  const windows = useOS((s) => s.windows);
  const focusId = useOS((s) => s.focusId);
  const toggleLauncher = useOS((s) => s.toggleLauncher);
  const restart = useOS((s) => s.restart);

  const active = windows.find((w) => w.id === focusId);
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false });
  const day = now.toLocaleDateString([], { weekday: "short", day: "numeric", month: "short" });

  return (
    <header className="absolute inset-x-0 top-0 z-[9000] flex h-[34px] items-center gap-3 border-b border-white/6 bar px-3 text-[12px]">
      <button
        type="button"
        onClick={toggleLauncher}
        className="rounded px-2 py-0.5 font-mono text-[11.5px] text-fg/85 transition hover:bg-white/8"
      >
        {user.handle}@{user.host}
      </button>

      <div className="flex items-center gap-1">
        {workspaces.map((ws) => {
          const populated = windows.some((w) => w.workspace === ws);
          const current = ws === workspace;
          return (
            <button
              key={ws}
              type="button"
              onClick={() => setWorkspace(ws)}
              title={`Workspace ${ws}`}
              className={`h-[18px] w-[22px] rounded text-[10.5px] font-mono transition ${
                current
                  ? "bg-accent/22 text-accent"
                  : populated
                    ? "text-fg/60 hover:bg-white/8"
                    : "text-dim hover:bg-white/6"
              }`}
            >
              {ws}
            </button>
          );
        })}
      </div>

      <p className="min-w-0 flex-1 truncate text-center text-[11.5px] text-muted">
        {active ? active.title : "aaryaOS"}
      </p>

      <div className="flex items-center gap-3 text-muted">
        <button
          type="button"
          onClick={restart}
          title="Restart and boot the Windows version"
          className="rounded border border-white/8 px-2 py-0.5 font-mono text-[10.5px] text-muted transition hover:border-white/16 hover:text-fg"
        >
          switch to windows
        </button>
        <span className="hidden items-center gap-1.5 sm:flex">
          <Glyph path="M5 12.5a10 10 0 0 1 14 0M8.5 16a5.5 5.5 0 0 1 7 0M12 19.5h.01" />
        </span>
        <span className="hidden items-center gap-1.5 sm:flex">
          <Glyph path="M4 8h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H4zM21 11v2" />
          <span className="font-mono text-[11px]">92%</span>
        </span>
        <span className="font-mono text-[11.5px] text-fg/80">
          {day} · {time}
        </span>
      </div>
    </header>
  );
}
