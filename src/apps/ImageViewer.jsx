import { useState } from "react";

export default function ImageViewer({ win }) {
  const [zoom, setZoom] = useState(1);
  const src = win.props.src;

  return (
    <div className="flex min-h-0 flex-1 flex-col bg-[#080a0d]">
      <div className="scroll flex min-h-0 flex-1 items-center justify-center overflow-auto p-4">
        <img
          src={src}
          alt={win.props.title ?? "image"}
          style={{ transform: `scale(${zoom})` }}
          className="max-h-full max-w-full origin-center rounded border border-line/70 object-contain transition-transform duration-150"
        />
      </div>
      <div className="flex items-center gap-2 border-t border-line/70 bg-surface/70 px-3 py-1.5">
        <p className="truncate font-mono text-[11px] text-dim">{src}</p>
        <div className="ml-auto flex items-center gap-1">
          {[
            ["−", () => setZoom((z) => Math.max(0.4, +(z - 0.2).toFixed(2)))],
            ["reset", () => setZoom(1)],
            ["+", () => setZoom((z) => Math.min(3, +(z + 0.2).toFixed(2)))],
          ].map(([label, action]) => (
            <button
              key={label}
              type="button"
              onClick={action}
              className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted transition hover:text-fg"
            >
              {label}
            </button>
          ))}
          <span className="w-12 text-right font-mono text-[11px] text-dim">
            {Math.round(zoom * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
