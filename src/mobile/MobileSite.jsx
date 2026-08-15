import { motion, useReducedMotion } from "framer-motion";
import { projects, skills, socials, user } from "../data/content";

function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 0.61, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function SectionHead({ title, note }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber/90">{title}</h2>
      {note && <span className="font-mono text-[10px] text-dim">{note}</span>}
    </div>
  );
}

function Arrow({ className = "h-3 w-3" }) {
  return (
    <svg viewBox="0 0 12 12" className={className} fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 9 9 3M4.4 3H9v4.6" />
    </svg>
  );
}

function Stat({ value, label }) {
  return (
    <div className="rounded-xl border border-line/70 bg-white/[0.02] px-3.5 py-3">
      <p className="text-[20px] font-semibold leading-none tracking-tight text-fg">{value}</p>
      <p className="mt-1.5 font-mono text-[9.5px] uppercase tracking-[0.12em] text-dim">{label}</p>
    </div>
  );
}

function ProjectCard({ project }) {
  const live = project.kind === "live";

  return (
    <a
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="block overflow-hidden rounded-2xl border border-line/70 bg-white/[0.02] transition active:border-white/20 active:bg-white/[0.05]"
    >
      {project.image ? (
        <img
          src={project.image}
          alt={`${project.name} screenshot`}
          loading="lazy"
          className="aspect-[16/10] w-full border-b border-line/60 object-cover object-top"
        />
      ) : (
        // Backend services have nothing to screenshot, so they get a path instead of a blank frame.
        <div className="flex items-center gap-2 border-b border-line/60 bg-[linear-gradient(135deg,rgba(122,162,247,0.14),transparent_65%)] px-4 py-3">
          <span className="font-mono text-[11px] text-accent/80">~/projects/{project.slug}</span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.16em] text-dim">
            no ui — server side
          </span>
        </div>
      )}

      <div className="p-4">
        <div className="flex items-center gap-2">
          <h3 className="min-w-0 flex-1 truncate text-[16px] font-medium tracking-tight text-fg">
            {project.name}
          </h3>
          <span
            className={`shrink-0 rounded px-1.5 py-0.5 font-mono text-[9.5px] uppercase tracking-wide ${
              live ? "bg-mint/14 text-mint" : "bg-amber/14 text-amber"
            }`}
          >
            {project.kind}
          </span>
        </div>

        <p className="mt-1.5 text-[13px] leading-[1.6] text-muted">{project.tagline}</p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.stack.map((tool) => (
            <span
              key={tool}
              className="rounded border border-line px-1.5 py-0.5 font-mono text-[10px] text-dim"
            >
              {tool}
            </span>
          ))}
        </div>

        <p className="mt-3.5 flex items-center gap-1.5 font-mono text-[11.5px] text-accent">
          {live ? "visit the site" : "read the code"}
          <Arrow />
        </p>
      </div>
    </a>
  );
}

export default function MobileSite() {
  const liveCount = projects.filter((project) => project.kind === "live").length;
  const toolCount = skills.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <div className="relative min-h-full bg-base pb-[env(safe-area-inset-bottom)]">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute -top-28 left-1/2 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-accent/12 blur-[90px]" />
        <div className="absolute bottom-[-80px] right-[-70px] h-[240px] w-[240px] rounded-full bg-amber/10 blur-[80px]" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="relative">
        <header className="bar sticky top-0 z-20 border-b border-line/60">
          <div className="flex items-center justify-between px-5 py-3">
            <span className="font-mono text-[12px] text-muted">
              aarya<span className="text-dim">@</span>arch
            </span>
            <a
              href={`mailto:${user.email}`}
              className="rounded-full border border-accent/30 bg-accent/12 px-3 py-1 font-mono text-[11px] text-accent"
            >
              get in touch
            </a>
          </div>
        </header>

        <main className="px-5">
          <section className="pt-9">
            <div className="flex items-center gap-4">
              <img
                src={user.portrait}
                alt={user.name}
                className="h-[76px] w-[76px] shrink-0 rounded-2xl border border-line object-cover"
              />
              <div className="min-w-0">
                <p className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-amber/90">
                  {user.headline}
                </p>
                <h1 className="mt-1.5 text-[27px] font-semibold leading-[1.08] tracking-tight text-fg">
                  {user.name}
                </h1>
                <p className="mt-1.5 text-[12.5px] text-muted">{user.role}</p>
                <p className="mt-1 font-mono text-[11px] text-dim">{user.location}</p>
              </div>
            </div>

            <p className="mt-5 text-[14.5px] leading-[1.75] text-muted">{user.summary}</p>

            <div className="mt-6 space-y-2">
              <a
                href={`mailto:${user.email}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-accent/18 px-4 py-3 font-mono text-[12.5px] text-accent"
              >
                {user.email}
              </a>
              <div className="grid grid-cols-3 gap-2">
                {socials
                  .filter((social) => social.label !== "Email")
                  .map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl border border-line px-2 py-2.5 text-center font-mono text-[11.5px] text-muted"
                    >
                      {social.label}
                    </a>
                  ))}
              </div>
            </div>
          </section>

          <Reveal className="mt-9">
            <div className="grid grid-cols-2 gap-2.5">
              <Stat value={projects.length} label="projects shipped" />
              <Stat value={liveCount} label="live in production" />
              <Stat value={toolCount} label="tools in the stack" />
              <Stat value="Full-stack" label="front to database" />
            </div>
          </Reveal>

          <Reveal className="mt-11">
            <SectionHead title="Stack" />
            <div className="mt-4 space-y-4">
              {skills.map((group) => (
                <div key={group.group}>
                  <p className="font-mono text-[11px] text-accent">{group.group}</p>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-md border border-line bg-white/[0.02] px-2 py-1 font-mono text-[11px] text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-11">
            <SectionHead title="Work" note={`${projects.length} projects`} />
            <div className="mt-4 space-y-3.5">
              {projects.map((project) => (
                <ProjectCard key={project.slug} project={project} />
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-11">
            <SectionHead title="About" />
            <blockquote className="mt-4 border-l-2 border-amber/60 pl-4 text-[15px] italic leading-[1.65] text-fg/85">
              {user.quote}
            </blockquote>
            <div className="mt-4 space-y-3.5 text-[13.5px] leading-[1.75] text-muted">
              {user.about.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>
          </Reveal>

          <Reveal className="mt-11">
            <SectionHead title="Elsewhere" />
            <div className="mt-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-3 border-b border-line/60 py-3.5 last:border-0"
                >
                  <span className="text-[14px] text-fg">{social.label}</span>
                  <span className="flex min-w-0 items-center gap-2 font-mono text-[11.5px] text-muted">
                    <span className="truncate">{social.handle}</span>
                    <Arrow className="h-3 w-3 shrink-0 text-dim" />
                  </span>
                </a>
              ))}
            </div>
          </Reveal>
        </main>

        <footer className="mt-12 border-t border-line/60 px-5 py-8">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-amber/80">
            One more thing
          </p>
          <p className="mt-2.5 text-[13px] leading-[1.7] text-muted">
            On a laptop this portfolio is an operating system. Two machines — a Windows desktop and
            an Arch Linux one with a real shell — where every project is a file you can open or{" "}
            <span className="font-mono text-[12px] text-fg">cat</span>. It needs a keyboard and a
            bigger screen, so this page is the short version.
          </p>
          <a
            href="?view=desktop"
            className="mt-4 inline-flex items-center gap-2 rounded-xl border border-line px-4 py-2.5 font-mono text-[11.5px] text-muted"
          >
            open it here anyway
            <Arrow />
          </a>
          <p className="mt-7 font-mono text-[10px] text-dim">
            © {new Date().getFullYear()} {user.name} · {user.tagline}
          </p>
        </footer>
      </div>
    </div>
  );
}
