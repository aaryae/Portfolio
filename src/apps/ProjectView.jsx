import { useState } from "react";
import { projects } from "../data/content";
import { useOS } from "../store/useOS";

export default function ProjectView({ win }) {
  const setTitle = useOS((s) => s.setTitle);
  const [slug, setSlug] = useState(win.props.slug ?? projects[0].slug);
  const project = projects.find((p) => p.slug === slug) ?? projects[0];

  const select = (next) => {
    setSlug(next.slug);
    setTitle(win.id, `${next.name} — README.md`);
  };

  return (
    <div className="flex min-h-0 flex-1 bg-surface/55 text-[13px]">
      <aside className="hidden w-44 shrink-0 border-r border-line/70 p-2 md:block">
        <p className="px-2 pb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-dim">
          ~/projects
        </p>
        {projects.map((item) => (
          <button
            key={item.slug}
            type="button"
            onClick={() => select(item)}
            className={`mb-0.5 flex w-full flex-col rounded-md px-2 py-1.5 text-left transition ${
              item.slug === slug ? "bg-white/8" : "hover:bg-white/5"
            }`}
          >
            <span className={item.slug === slug ? "font-mono text-accent" : "font-mono text-muted"}>
              {item.slug}
            </span>
            <span className="truncate text-[11px] text-dim">{item.name}</span>
          </button>
        ))}
      </aside>

      <div className="scroll min-h-0 flex-1 overflow-y-auto">
        {project.image ? (
          <div className="relative border-b border-line/70">
            <img src={project.image} alt={project.name} className="h-52 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/25 to-transparent" />
          </div>
        ) : (
          <div className="flex h-32 items-end border-b border-line/70 bg-[linear-gradient(135deg,rgba(122,162,247,0.14),transparent_60%)] px-6 pb-4">
            <p className="font-mono text-[11px] text-dim">no screenshot · service repository</p>
          </div>
        )}

        <div className="px-6 py-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-[21px] font-semibold tracking-tight text-fg">{project.name}</h1>
            <span
              className={`rounded px-2 py-0.5 font-mono text-[10.5px] ${
                project.kind === "live" ? "bg-mint/14 text-mint" : "bg-amber/14 text-amber"
              }`}
            >
              {project.kind === "live" ? "live" : "repository"}
            </span>
          </div>
          <p className="mt-1.5 text-muted">{project.tagline}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">Notes</p>
            <ul className="mt-2 space-y-2">
              {project.notes.map((note) => (
                <li key={note.slice(0, 20)} className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted">
                  <span className="text-dim">·</span>
                  {note}
                </li>
              ))}
            </ul>
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-accent/16 px-4 py-2 font-mono text-[12px] text-accent transition hover:bg-accent/24"
          >
            {project.kind === "live" ? "visit live site" : "view repository"} →
          </a>
        </div>
      </div>
    </div>
  );
}
