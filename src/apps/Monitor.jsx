import { useEffect, useState } from "react";
import { projects, skills, systemInfo, user } from "../data/content";

const PROCESSES = [
  { pid: 412, cmd: "curiosity-daemon", state: "running" },
  { pid: 1187, cmd: "spring-boot --services", state: "running" },
  { pid: 2043, cmd: "vite dev --host", state: "running" },
  { pid: 3310, cmd: "postgres: writer", state: "sleeping" },
  { pid: 4402, cmd: "docker-compose up", state: "running" },
];

function useWave(seed) {
  const [value, setValue] = useState(38 + seed * 6);
  useEffect(() => {
    const id = setInterval(() => {
      setValue((prev) => {
        const drift = (Math.random() - 0.5) * 16;
        return Math.min(94, Math.max(12, prev + drift));
      });
    }, 1400);
    return () => clearInterval(id);
  }, []);
  return Math.round(value);
}

function Bar({ label, value, tone }) {
  return (
    <div>
      <div className="flex items-baseline justify-between font-mono text-[11px]">
        <span className="text-dim">{label}</span>
        <span className="text-muted">{value}%</span>
      </div>
      <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-white/6">
        <div
          className="h-full rounded-full transition-[width] duration-700 ease-out"
          style={{ width: `${value}%`, background: tone }}
        />
      </div>
    </div>
  );
}

export default function Monitor() {
  const cpu = useWave(1);
  const memory = useWave(3);
  const disk = 61;
  const totalTech = skills.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="scroll min-h-0 flex-1 overflow-y-auto bg-surface/55 px-5 py-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <section className="space-y-3 rounded-lg border border-line/70 p-3.5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">Resources</p>
          <Bar label="cpu" value={cpu} tone="var(--color-accent)" />
          <Bar label="memory" value={memory} tone="var(--color-mint)" />
          <Bar label="disk" value={disk} tone="var(--color-amber)" />
        </section>

        <section className="rounded-lg border border-line/70 p-3.5">
          <p className="font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">System</p>
          <dl className="mt-2 space-y-1 font-mono text-[11.5px]">
            {[
              ["host", `${user.handle}@${user.host}`],
              ["os", systemInfo.os],
              ["kernel", systemInfo.kernel],
              ["wm", systemInfo.wm],
              ["uptime", systemInfo.uptimeBase],
              ["projects", `${projects.length} shipped`],
              ["stack", `${totalTech} tools`],
            ].map(([key, value]) => (
              <div key={key} className="flex gap-3">
                <dt className="w-[9ch] shrink-0 text-dim">{key}</dt>
                <dd className="truncate text-muted">{value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <section className="mt-4 rounded-lg border border-line/70">
        <p className="border-b border-line/70 px-3.5 py-2 font-mono text-[10.5px] uppercase tracking-[0.14em] text-accent">
          Processes
        </p>
        <div className="divide-y divide-line/50">
          {PROCESSES.map((proc) => (
            <div key={proc.pid} className="flex items-center gap-3 px-3.5 py-1.5 font-mono text-[11.5px]">
              <span className="w-[5ch] text-dim">{proc.pid}</span>
              <span className="flex-1 truncate text-muted">{proc.cmd}</span>
              <span className={proc.state === "running" ? "text-mint" : "text-dim"}>{proc.state}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
