import { AnimatePresence, motion } from "framer-motion";
import { useOS } from "../store/useOS";

export default function StickyNote() {
  const open = useOS((s) => s.noteOpen);
  const closeNote = useOS((s) => s.closeNote);
  const restart = useOS((s) => s.restart);

  return (
    <AnimatePresence>
      {open && (
        <motion.aside
          initial={{ opacity: 0, y: -12, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -1.6 }}
          exit={{ opacity: 0, scale: 0.96, y: -8 }}
          transition={{ duration: 0.35, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
          onPointerDown={(event) => event.stopPropagation()}
          onContextMenu={(event) => event.stopPropagation()}
          className="absolute right-6 top-6 z-[8000] w-[268px] overflow-hidden rounded-[3px] bg-[#fef7a8] text-[#3a3520] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.6)]"
        >
          <div className="flex h-8 items-center gap-2 bg-[#fdf07e] px-2.5">
            <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 text-[#6b6330]" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M5 4.5h14v10.5L14.5 19.5H5z" />
              <path d="M19 15h-4.5v4.5" />
            </svg>
            <p className="text-[11px] font-medium tracking-wide text-[#6b6330]">Sticky Notes</p>
            <button
              type="button"
              onClick={closeNote}
              aria-label="Close note"
              className="ml-auto flex h-5 w-5 items-center justify-center rounded text-[#6b6330] transition hover:bg-black/10"
            >
              <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M2.5 2.5l7 7M9.5 2.5l-7 7" />
              </svg>
            </button>
          </div>

          <div className="px-3.5 pb-4 pt-3">
            <p className="text-[13.5px] font-semibold">There is a Linux version too</p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-[#4a4429]">
              Same portfolio, but as Arch Linux with a real shell — <span className="font-mono">ls</span>,{" "}
              <span className="font-mono">cat about.md</span>,{" "}
              <span className="font-mono">open mudita</span>.
            </p>
            <p className="mt-2 text-[12.5px] leading-relaxed text-[#4a4429]">
              To use it, restart and choose <strong>aaryaOS</strong> in the boot menu.
            </p>

            <div className="mt-3.5 flex items-center gap-2">
              <button
                type="button"
                onClick={restart}
                className="rounded-[3px] bg-[#3a3520] px-2.5 py-1.5 text-[11.5px] font-medium text-[#fef7a8] transition hover:bg-[#2b2718]"
              >
                Restart now
              </button>
              <button
                type="button"
                onClick={closeNote}
                className="rounded-[3px] px-2 py-1.5 text-[11.5px] text-[#6b6330] transition hover:bg-black/8"
              >
                Maybe later
              </button>
            </div>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
