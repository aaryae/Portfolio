import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { systemInfo, user } from "../data/content";
import { useOS } from "../store/useOS";

const LINUX_LINES = [
  { text: "aaryaOS bootloader v1.0 — loading kernel", tone: "dim" },
  { text: `Linux version ${systemInfo.kernel} (${user.handle}@${user.host})`, tone: "dim" },
  { text: "[  OK  ] Mounted /home/aarya", tone: "ok" },
  { text: "[  OK  ] Started curiosity.service", tone: "ok" },
  { text: "[  OK  ] Reached target Projects (6 loaded)", tone: "ok" },
  { text: "[  OK  ] Started aaryawm display manager", tone: "ok" },
  { text: `login: ${user.handle}`, tone: "prompt" },
];

function LinuxBoot({ shown }) {
  const tone = { dim: "text-dim", ok: "text-muted", prompt: "text-fg" };

  return (
    <div className="flex h-full flex-col justify-between font-mono text-[12.5px]">
      <div className="space-y-0.5">
        {LINUX_LINES.slice(0, shown).map((line) => (
          <p key={line.text} className={tone[line.tone]}>
            {line.tone === "ok" ? (
              <>
                <span className="text-mint">[  OK  ]</span>
                {line.text.replace("[  OK  ]", "")}
              </>
            ) : (
              line.text
            )}
          </p>
        ))}
        {shown >= LINUX_LINES.length && (
          <p className="text-fg">
            Password: <span className="text-dim">••••••••</span>
            <span className="caret" />
          </p>
        )}
      </div>

      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-[11px] uppercase tracking-[0.2em] text-dim">{systemInfo.os}</p>
          <p className="mt-1 text-[15px] text-fg">
            {user.name} — {user.role}
          </p>
        </div>
        <p className="text-[11px] text-dim">press any key to skip</p>
      </div>
    </div>
  );
}

function WindowsBoot() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-8">
      <svg viewBox="0 0 32 32" className="h-14 w-14 text-[#4cc2ff]" fill="currentColor">
        <rect x="4" y="4" width="10.4" height="10.4" rx="1.2" />
        <rect x="17.6" y="4" width="10.4" height="10.4" rx="1.2" />
        <rect x="4" y="17.6" width="10.4" height="10.4" rx="1.2" />
        <rect x="17.6" y="17.6" width="10.4" height="10.4" rx="1.2" />
      </svg>

      <div className="flex gap-1.5">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-white/70"
            animate={{ opacity: [0.15, 1, 0.15] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.14, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="text-center">
        <p className="text-[15px] text-fg/90">Preparing your desktop</p>
        <p className="mt-1.5 font-mono text-[11px] text-dim">
          aaryaWin 11 · {user.name} · press any key to skip
        </p>
      </div>
    </div>
  );
}

export default function Boot() {
  const platform = useOS((s) => s.platform);
  const setPhase = useOS((s) => s.setPhase);
  const openApp = useOS((s) => s.openApp);
  const [shown, setShown] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const leavingRef = useRef(false);

  const finish = useCallback(() => {
    if (leavingRef.current) return;
    leavingRef.current = true;
    setLeaving(true);
    setTimeout(() => {
      setPhase("desktop");
      if (platform === "windows") openApp("quickview", { singleton: true });
      else openApp("terminal", {});
    }, 480);
  }, [openApp, platform, setPhase]);

  useEffect(() => {
    if (platform !== "linux") return undefined;
    if (shown >= LINUX_LINES.length) {
      const id = setTimeout(finish, 620);
      return () => clearTimeout(id);
    }
    const delay = shown === 0 ? 200 : 140 + Math.random() * 130;
    const id = setTimeout(() => setShown((n) => n + 1), delay);
    return () => clearTimeout(id);
  }, [finish, platform, shown]);

  useEffect(() => {
    if (platform !== "windows") return undefined;
    const id = setTimeout(finish, 2100);
    return () => clearTimeout(id);
  }, [finish, platform]);

  useEffect(() => {
    window.addEventListener("keydown", finish);
    window.addEventListener("pointerdown", finish);
    return () => {
      window.removeEventListener("keydown", finish);
      window.removeEventListener("pointerdown", finish);
    };
  }, [finish]);

  return (
    <AnimatePresence>
      {!leaving && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45 }}
          className="fixed inset-0 z-[9999] bg-[#07090b] px-6 py-6 sm:px-10 sm:py-9"
        >
          {platform === "windows" ? <WindowsBoot /> : <LinuxBoot shown={shown} />}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
