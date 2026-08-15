import { systemInfo, user } from "../../data/content";

function DocLine({ text }) {
  if (!text.trim()) return <p>&nbsp;</p>;
  if (text.startsWith("# ") || text === text.toUpperCase()) {
    return <p className="text-fg">{text.replace(/^#\s*/, "")}</p>;
  }
  if (text.startsWith("## ")) return <p className="mt-1 text-accent">{text.slice(3)}</p>;
  if (text.startsWith("- ") || text.startsWith("  - ")) {
    return (
      <p className="text-muted">
        <span className="text-dim">·</span> {text.replace(/^\s*-\s*/, "")}
      </p>
    );
  }
  if (text.startsWith('"')) return <p className="text-amber italic">{text}</p>;
  if (/^https?:\/\//.test(text.trim())) {
    return (
      <a
        href={text.trim()}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent underline decoration-accent/30 hover:decoration-accent"
      >
        {text}
      </a>
    );
  }
  return <p className="text-muted">{text}</p>;
}

export default function Output({ result, openApp, exec }) {
  switch (result.kind) {
    case "banner":
      return (
        <div className="mb-2 border-b border-line/60 pb-3">
          <p className="text-accent">
            {user.handle}@{user.host}
            <span className="text-dim"> — {systemInfo.os}</span>
          </p>
          <p className="mt-1 text-muted">
            {user.name} · {user.role} · {user.location}
          </p>
          <p className="mt-2 text-fg/80">
            In a hurry? Run{" "}
            <button
              type="button"
              onClick={() => exec("quickview")}
              className="text-amber underline decoration-amber/40"
            >
              quickview
            </button>{" "}
            for everything at once.
          </p>
          <p className="mt-0.5 text-muted">
            Otherwise{" "}
            <button type="button" onClick={() => exec("help")} className="text-mint underline decoration-mint/30">
              help
            </button>{" "}
            lists the commands and{" "}
            <button type="button" onClick={() => exec("neofetch")} className="text-mint underline decoration-mint/30">
              neofetch
            </button>{" "}
            prints the summary.
          </p>
        </div>
      );

    case "text":
      return (
        <div className="whitespace-pre-wrap text-muted">
          {result.lines.map((line, i) => (
            <p key={i}>{line || "\u00a0"}</p>
          ))}
        </div>
      );

    case "doc":
      return (
        <div className="my-1 whitespace-pre-wrap">
          {result.lines.map((line, i) => (
            <DocLine key={i} text={line} />
          ))}
        </div>
      );

    case "error":
      return <p className="text-rose">{result.text}</p>;

    case "note":
      return <p className="text-dim">{result.text}</p>;

    case "listing":
      return (
        <div className="flex flex-wrap gap-x-5 gap-y-0.5">
          {result.entries.map((entry) => (
            <span key={entry.name} className={entry.dir ? "text-accent" : "text-muted"}>
              {entry.name}
              {entry.dir ? "/" : ""}
            </span>
          ))}
        </div>
      );

    case "help":
      return (
        <div className="my-1 space-y-3">
          {result.groups.map((group) => (
            <div key={group.label}>
              <p className="text-dim">{group.label.toUpperCase()}</p>
              <div className="mt-0.5 grid gap-x-6 gap-y-0.5 sm:grid-cols-2">
                {group.items.map(([cmd, note]) => (
                  <p key={cmd} className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => exec(cmd.replace(/ <.*/, "").replace(/ \[.*/, ""))}
                      className="w-[15ch] shrink-0 text-left text-mint hover:underline"
                    >
                      {cmd}
                    </button>
                    <span className="text-muted">{note}</span>
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      );

    case "columns":
      return (
        <div className="my-1 grid gap-4 sm:grid-cols-2">
          {result.groups.map((group) => (
            <div key={group.label}>
              <p className="text-accent">{group.label}</p>
              {group.items.map((item) => (
                <p key={item} className="text-muted">
                  <span className="text-dim">·</span> {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      );

    case "projects":
      return (
        <div className="my-1 space-y-1">
          {result.items.map((item) => (
            <div key={item.slug} className="flex flex-wrap items-baseline gap-x-3">
              <button
                type="button"
                onClick={() => exec(`open ${item.slug}`)}
                className="w-[12ch] shrink-0 text-left text-accent hover:underline"
              >
                {item.slug}
              </button>
              <span className="text-fg/85">{item.name}</span>
              <span className={item.kind === "live" ? "text-mint" : "text-amber"}>
                [{item.kind}]
              </span>
              <span className="w-full text-muted sm:pl-[calc(12ch+0.75rem)]">{item.tagline}</span>
            </div>
          ))}
          <p className="pt-1 text-dim">Run `open &lt;name&gt;` to read one, or `cd projects` to browse.</p>
        </div>
      );

    case "contact":
      return (
        <div className="my-1 space-y-0.5">
          {result.items.map((item) => (
            <p key={item.label} className="flex gap-3">
              <span className="w-[11ch] shrink-0 text-dim">{item.label}</span>
              <a
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {item.handle}
              </a>
            </p>
          ))}
          <p className="pt-1 text-dim">
            Or run{" "}
            <button type="button" onClick={() => exec("mail")} className="text-mint hover:underline">
              mail
            </button>{" "}
            to write here.
          </p>
        </div>
      );

    case "gitlog":
      return (
        <div className="my-1 space-y-1.5">
          {result.items.map((item) => (
            <div key={item.hash}>
              <p>
                <span className="text-amber">commit {item.hash}</span>
                <span className="text-dim"> ({item.when})</span>
              </p>
              <p className="text-muted">
                &nbsp;&nbsp;&nbsp;&nbsp;feat({item.name}): {item.note}
              </p>
            </div>
          ))}
        </div>
      );

    case "neofetch":
      return (
        <div className="my-1 flex gap-5">
          <img
            src={user.portrait}
            alt=""
            className="hidden h-[104px] w-[104px] shrink-0 rounded-md border border-line object-cover grayscale-[35%] sm:block"
          />
          <div className="whitespace-pre">
            {result.lines.map((line, i) => (
              <p key={i} className={i < 2 ? "text-accent" : "text-muted"}>
                {line || "\u00a0"}
              </p>
            ))}
            <button
              type="button"
              onClick={() => openApp("reader", { doc: "about", title: "about.md" })}
              className="mt-1 text-mint hover:underline"
            >
              read about.md →
            </button>
          </div>
        </div>
      );

    default:
      return null;
  }
}
