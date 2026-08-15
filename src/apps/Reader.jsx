import { skills, socials, user } from "../data/content";
import { useOS } from "../store/useOS";

function Head({ file, note }) {
  return (
    <div className="mb-6 border-b border-line/70 pb-4">
      <p className="font-mono text-[11px] text-dim">{file}</p>
      <h1 className="mt-1.5 text-[22px] font-semibold tracking-tight text-fg">{note}</h1>
    </div>
  );
}

function About() {
  return (
    <>
      <Head file="~/about.md" note="Who is typing" />
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <img
          src={user.portrait}
          alt={user.name}
          className="h-28 w-28 shrink-0 rounded-lg border border-line object-cover"
        />
        <div>
          <p className="text-[15px] font-medium text-fg">{user.name}</p>
          <p className="text-muted">
            {user.role} · {user.location}
          </p>
          <p className="mt-3 font-mono text-[12px] uppercase tracking-[0.16em] text-accent">
            {user.headline}
          </p>
          <p className="text-[13px] text-dim">{user.tagline}</p>
        </div>
      </div>

      <blockquote className="my-6 border-l-2 border-amber/60 pl-4 text-[15px] italic text-fg/85">
        {user.quote}
      </blockquote>

      <div className="space-y-4 text-[14px] leading-[1.75] text-muted">
        {user.about.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
    </>
  );
}

function Skills() {
  return (
    <>
      <Head file="~/skills.txt" note="What I work with" />
      <div className="grid gap-5 sm:grid-cols-2">
        {skills.map((group) => (
          <section key={group.group}>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              {group.group}
            </p>
            <ul className="mt-2 space-y-1">
              {group.items.map((item) => (
                <li key={item} className="text-[13.5px] text-muted">
                  <span className="mr-2 text-dim">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </>
  );
}

function Contact() {
  const openApp = useOS((s) => s.openApp);
  return (
    <>
      <Head file="~/contact.md" note="How to reach me" />
      <div className="space-y-2">
        {socials.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target={social.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="flex items-baseline gap-4 rounded-md border border-line/70 px-3 py-2.5 transition hover:border-white/16 hover:bg-white/4"
          >
            <span className="w-20 shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-dim">
              {social.label}
            </span>
            <span className="text-[13.5px] text-fg/90">{social.handle}</span>
          </a>
        ))}
      </div>
      <button
        type="button"
        onClick={() => openApp("mail", { singleton: true })}
        className="mt-5 rounded-md bg-accent/16 px-4 py-2 font-mono text-[12px] text-accent transition hover:bg-accent/24"
      >
        compose a message →
      </button>
    </>
  );
}

function Readme() {
  const openApp = useOS((s) => s.openApp);
  return (
    <>
      <Head file="~/README.md" note="Start here" />
      <p className="text-[14px] leading-[1.75] text-muted">
        This desktop is the portfolio. Everything about me is a file you can read, and every project
        is a directory you can enter. Use the terminal if you like typing, or the dock if you do not.
      </p>
      <div className="mt-5 space-y-1.5 font-mono text-[12.5px]">
        {[
          ["help", "list every command"],
          ["cat about.md", "who I am"],
          ["ls projects", "what I have built"],
          ["open mudita", "launch a project"],
          ["mail", "write to me"],
        ].map(([cmd, note]) => (
          <p key={cmd} className="flex gap-3">
            <span className="w-[14ch] text-mint">{cmd}</span>
            <span className="text-muted">{note}</span>
          </p>
        ))}
      </div>
      <button
        type="button"
        onClick={() => openApp("terminal", {})}
        className="mt-5 rounded-md bg-accent/16 px-4 py-2 font-mono text-[12px] text-accent transition hover:bg-accent/24"
      >
        open a terminal →
      </button>
    </>
  );
}

const DOCS = { about: About, skills: Skills, contact: Contact, readme: Readme };

export default function Reader({ win }) {
  const Doc = DOCS[win.props.doc] ?? Readme;
  return (
    <div className="scroll min-h-0 flex-1 overflow-y-auto bg-surface/55 px-6 py-6 sm:px-8">
      <div className="mx-auto max-w-[62ch]">
        <Doc />
      </div>
    </div>
  );
}
