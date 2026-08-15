import { projects, skills, socials, user } from "../data/content";
import { useOS } from "../store/useOS";

function Label({ children }) {
  return (
    <p className="font-mono text-[10.5px] uppercase tracking-[0.18em] text-amber/90">{children}</p>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-lg border border-line/70 bg-white/[0.02] px-3.5 py-3">
      <p className="text-[19px] font-semibold leading-none text-fg">{value}</p>
      <p className="mt-1.5 font-mono text-[10.5px] uppercase tracking-[0.12em] text-dim">{label}</p>
    </div>
  );
}

export default function QuickView() {
  const openApp = useOS((s) => s.openApp);
  const live = projects.filter((p) => p.kind === "live").length;
  const tools = skills.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="scroll min-h-0 flex-1 overflow-y-auto bg-surface/55">
      <div className="mx-auto max-w-[900px] px-6 py-6 sm:px-8 sm:py-8">
        <header className="flex flex-col gap-5 border-b border-line/70 pb-7 sm:flex-row sm:items-start sm:gap-7">
          <img
            src={user.portrait}
            alt={user.name}
            className="h-24 w-24 shrink-0 rounded-xl border border-line object-cover sm:h-[116px] sm:w-[116px]"
          />
          <div className="min-w-0">
            <Label>Quick view · everything on one page</Label>
            <h1 className="mt-2 text-[26px] font-semibold leading-tight tracking-tight text-fg sm:text-[30px]">
              {user.name}
            </h1>
            <p className="mt-1 text-[14px] text-muted">
              {user.role} · {user.location}
            </p>
            <p className="mt-4 max-w-[62ch] text-[13.5px] leading-[1.7] text-muted">
              {user.summary}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <a
                href={`mailto:${user.email}`}
                className="rounded-md bg-accent/18 px-3.5 py-1.5 font-mono text-[11.5px] text-accent transition hover:bg-accent/26"
              >
                {user.email}
              </a>
              {socials
                .filter((s) => s.label !== "Email")
                .map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-md border border-line px-3.5 py-1.5 font-mono text-[11.5px] text-muted transition hover:border-white/18 hover:text-fg"
                  >
                    {social.label}
                  </a>
                ))}
            </div>
          </div>
        </header>

        <section className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          <Stat value={projects.length} label="projects shipped" />
          <Stat value={live} label="live in production" />
          <Stat value={tools} label="tools in the stack" />
          <Stat value="Full-stack" label="front to database" />
        </section>

        <section className="mt-8">
          <Label>Stack</Label>
          <div className="mt-3 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
            {skills.map((group) => (
              <div key={group.group}>
                <p className="font-mono text-[11px] text-accent">{group.group}</p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded border border-line px-2 py-0.5 font-mono text-[11px] text-muted"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-8">
          <div className="flex items-baseline justify-between gap-4">
            <Label>Work</Label>
            <p className="font-mono text-[10.5px] text-dim">click a card to open it</p>
          </div>
          <div className="mt-3 grid gap-2.5 sm:grid-cols-2">
            {projects.map((project) => (
              <button
                key={project.slug}
                type="button"
                onClick={() =>
                  openApp("project", { slug: project.slug, title: `${project.name} — README.md` })
                }
                className="group flex gap-3.5 rounded-lg border border-line/70 bg-white/[0.02] p-3 text-left transition hover:border-white/16 hover:bg-white/[0.05]"
              >
                {project.image ? (
                  <img
                    src={project.image}
                    alt=""
                    className="h-[74px] w-[104px] shrink-0 rounded border border-line object-cover"
                  />
                ) : (
                  <div className="flex h-[74px] w-[104px] shrink-0 items-center justify-center rounded border border-line bg-[linear-gradient(135deg,rgba(122,162,247,0.16),transparent_70%)]">
                    <span className="font-mono text-[10px] text-dim">service</span>
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-[14px] font-medium text-fg">{project.name}</p>
                    <span
                      className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[9.5px] ${
                        project.kind === "live" ? "bg-mint/14 text-mint" : "bg-amber/14 text-amber"
                      }`}
                    >
                      {project.kind}
                    </span>
                  </div>
                  <p className="mt-1 line-clamp-2 text-[12px] leading-snug text-muted">
                    {project.tagline}
                  </p>
                  <p className="mt-1.5 truncate font-mono text-[10.5px] text-dim">
                    {project.stack.join(" · ")}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-lg border border-line/70 bg-white/[0.02] p-4">
          <Label>In my own words</Label>
          <blockquote className="mt-2.5 border-l-2 border-amber/60 pl-3.5 text-[14.5px] italic leading-relaxed text-fg/85">
            {user.quote}
          </blockquote>
          <div className="mt-4 space-y-3 text-[13px] leading-[1.7] text-muted">
            {user.about.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </section>

        <section className="mt-6 flex flex-wrap items-center gap-2.5 border-t border-line/70 pt-6">
          <button
            type="button"
            onClick={() => openApp("mail", { singleton: true })}
            className="rounded-md bg-accent/18 px-4 py-2 font-mono text-[12px] text-accent transition hover:bg-accent/26"
          >
            write me a message →
          </button>
          <button
            type="button"
            onClick={() => openApp("terminal", {})}
            className="rounded-md border border-line px-4 py-2 font-mono text-[12px] text-muted transition hover:text-fg"
          >
            explore the long way — open a terminal
          </button>
          <p className="ml-auto font-mono text-[10.5px] text-dim">
            {user.headline} · {new Date().getFullYear()}
          </p>
        </section>
      </div>
    </div>
  );
}
