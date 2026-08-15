import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { user } from "../data/content";
import { PLATFORMS } from "../os/apps";
import { useOS } from "../store/useOS";

const ORDER = ["linux", "windows"];

function TuxMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3" y="5.5" width="26" height="21" rx="3" />
      <path d="M9 12.5l3.6 3-3.6 3M16 18.5h7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function WinMark() {
  return (
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="currentColor">
      <rect x="4" y="4" width="10.4" height="10.4" rx="1.2" />
      <rect x="17.6" y="4" width="10.4" height="10.4" rx="1.2" />
      <rect x="4" y="17.6" width="10.4" height="10.4" rx="1.2" />
      <rect x="17.6" y="17.6" width="10.4" height="10.4" rx="1.2" />
    </svg>
  );
}

const MARKS = { linux: TuxMark, windows: WinMark };

function Preview({ id, active }) {
  const linux = id === "linux";
  return (
    <div
      className={`relative aspect-[16/8] overflow-hidden rounded-lg border transition ${
        active ? "border-white/20" : "border-white/8"
      }`}
      style={{
        background: linux
          ? "radial-gradient(120% 100% at 70% 10%, #1b2c46, #0a1220 70%)"
          : "radial-gradient(110% 110% at 50% 45%, #17548f, #061020 72%)",
      }}
    >
      {linux ? (
        <>
          <div className="absolute inset-x-0 top-0 flex h-[13%] items-center gap-1 bg-black/50 px-2">
            <span className="h-[3px] w-8 rounded bg-white/25" />
            <span className="h-[3px] w-2 rounded bg-[#7aa2f7]/80" />
            <span className="h-[3px] w-2 rounded bg-white/12" />
            <span className="ml-auto h-[3px] w-6 rounded bg-white/18" />
          </div>

          <div className="absolute bottom-[18%] left-[7%] right-[26%] top-[24%] rounded border border-white/12 bg-black/60 p-2">
            <p className="font-mono text-[7px] leading-[2] text-[#7fd1b9] sm:text-[8px]">
              <span className="text-[#7aa2f7]">~</span> $ whoami
              <br />
              <span className="text-white/60">aarya — full-stack developer</span>
              <br />
              <span className="text-[#7aa2f7]">~</span> $ ls projects
              <br />
              <span className="text-[#7aa2f7]">mudita/ skillswap/ nex-fit/</span>
            </p>
          </div>

          <div className="absolute inset-x-0 bottom-[4%] flex justify-center gap-1">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <span
                key={i}
                className={`h-2 w-2 rounded ${i === 0 ? "bg-[#e0af68]/80" : "bg-white/18"}`}
              />
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="absolute bottom-[22%] left-[9%] right-[18%] top-[13%] overflow-hidden rounded border border-white/16 bg-black/45">
            <div className="flex h-[22%] items-center justify-end gap-1 border-b border-white/10 pr-1.5">
              <span className="h-[3px] w-[4px] bg-white/45" />
              <span className="h-[4px] w-[4px] border border-white/45" />
              <span className="h-[4px] w-[4px] rotate-45 bg-white/45" />
            </div>
            <div className="space-y-1.5 p-2">
              <div className="h-1.5 w-[45%] rounded bg-[#4cc2ff]/60" />
              <div className="h-1 w-[70%] rounded bg-white/22" />
              <div className="h-1 w-[58%] rounded bg-white/16" />
              <div className="h-1 w-[64%] rounded bg-white/16" />
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex h-[16%] items-center justify-center gap-1.5 bg-black/55">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#4cc2ff]/80" />
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-2.5 w-2.5 rounded-sm bg-white/22" />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function BootSelect() {
  const boot = useOS((s) => s.boot);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        setIndex((i) => (i + 1) % ORDER.length);
      }
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        setIndex((i) => (i - 1 + ORDER.length) % ORDER.length);
      }
      if (event.key === "Enter") boot(ORDER[index]);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [boot, index]);

  return (
    <div className="fixed inset-0 z-[9990] flex flex-col bg-[#07090c] px-6 py-8 sm:px-12 sm:py-10">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(820px 560px at 20% 12%, rgba(122,162,247,0.16), transparent 62%), radial-gradient(760px 520px at 82% 88%, rgba(76,194,255,0.12), transparent 64%)",
          }}
        />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative m-auto w-full max-w-[1000px]">
        <header>
          <p className="font-mono text-[10.5px] uppercase tracking-[0.32em] text-amber/80">
            Boot manager
          </p>
          <h1 className="mt-3 text-[30px] font-semibold leading-none tracking-tight text-fg sm:text-[38px]">
            {user.name}
          </h1>
          <p className="mt-2 max-w-[52ch] text-[13.5px] text-muted">
            Two machines, one portfolio. Pick how you would like to look around — you can restart
            into the other one at any time.
          </p>
        </header>

        <div className="mt-7 grid gap-3 sm:grid-cols-2">
          {ORDER.map((id, i) => {
            const platform = PLATFORMS[id];
            const Mark = MARKS[id];
            const active = i === index;
            return (
              <motion.button
                key={id}
                type="button"
                onMouseEnter={() => setIndex(i)}
                onClick={() => boot(id)}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.18 }}
                className={`rounded-xl border p-4 text-left transition sm:p-5 ${
                  active ? "border-white/22 bg-white/[0.06]" : "border-white/8 bg-white/[0.02]"
                }`}
              >
                <div className="flex items-start gap-3">
                  <span style={{ color: platform.accent }}>
                    <Mark />
                  </span>
                  <div className="min-w-0">
                    <p className="text-[17px] font-semibold text-fg">{platform.name}</p>
                    <p className="font-mono text-[10.5px] text-dim">{platform.edition}</p>
                  </div>
                  <span
                    className={`ml-auto shrink-0 rounded px-2 py-0.5 font-mono text-[10px] transition ${
                      active ? "bg-white/12 text-fg" : "text-dim"
                    }`}
                  >
                    {active ? "enter ↵" : "select"}
                  </span>
                </div>

                <p className="mt-3 text-[13px] leading-relaxed text-muted">{platform.blurb}</p>
                <p className="mt-1 font-mono text-[10.5px] text-dim">{platform.hint}</p>

                <div className="mt-4">
                  <Preview id={id} active={active} />
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <footer className="relative flex flex-wrap items-end justify-between gap-4">
        <p className="font-mono text-[10.5px] text-dim">
          ← → to choose · enter to boot · or just click one
        </p>
        <p className="font-mono text-[10.5px] uppercase tracking-[0.2em] text-white/25">
          {user.headline}
        </p>
      </footer>
    </div>
  );
}
