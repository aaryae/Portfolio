import { useState } from "react";
import { user } from "../data/content";

export default function Mail() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", body: "" });
  const [copied, setCopied] = useState(false);

  const send = (event) => {
    event.preventDefault();
    const subject = form.subject || `Hello from ${form.name || "your portfolio"}`;
    const body = `${form.body}\n\n— ${form.name}\n${form.email}`;
    window.location.href = `mailto:${user.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(user.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const field =
    "w-full rounded-md border border-line bg-[#0f1216] px-3 py-2 text-[13px] text-fg outline-none transition focus:border-accent/60";

  return (
    <form onSubmit={send} className="scroll min-h-0 flex-1 overflow-y-auto bg-surface/55 px-5 py-5">
      <div className="mb-4 flex items-center justify-between gap-3 border-b border-line/70 pb-3">
        <div>
          <p className="font-mono text-[11px] text-dim">to</p>
          <p className="font-mono text-[13px] text-fg">{user.email}</p>
        </div>
        <button
          type="button"
          onClick={copy}
          className="rounded-md border border-line px-2.5 py-1 font-mono text-[11px] text-muted transition hover:text-fg"
        >
          {copied ? "copied" : "copy"}
        </button>
      </div>

      <div className="space-y-3.5">
        <div className="grid gap-3.5 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
              Your name
            </span>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className={field}
            />
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
              Your email
            </span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className={field}
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
            Subject
          </span>
          <input
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            placeholder="Project, role, or just hello"
            className={`${field} placeholder:text-dim/70`}
          />
        </label>

        <label className="block">
          <span className="mb-1 block font-mono text-[10.5px] uppercase tracking-[0.14em] text-dim">
            Message
          </span>
          <textarea
            required
            rows={7}
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            className={`${field} resize-none leading-relaxed`}
          />
        </label>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button
          type="submit"
          className="rounded-md bg-accent/18 px-4 py-2 font-mono text-[12px] text-accent transition hover:bg-accent/26"
        >
          send message →
        </button>
        <p className="font-mono text-[11px] text-dim">hands off to your mail client</p>
      </div>
    </form>
  );
}
