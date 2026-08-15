import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { commandNames, commands } from "../os/commands";
import { HOME, listNames, normalize, pretty, resolve } from "../os/fs";
import { useOS } from "../store/useOS";
import Output from "./terminal/Output";

let lineSeq = 0;

const BANNER = {
  kind: "banner",
};

export default function Terminal({ win }) {
  const openApp = useOS((s) => s.openApp);
  const closeWindow = useOS((s) => s.closeWindow);
  const setTitle = useOS((s) => s.setTitle);
  const restart = useOS((s) => s.restart);
  const focused = useOS((s) => s.focusId === win.id);
  const platform = useOS((s) => s.platform);

  const [cwd, setCwd] = useState(HOME);
  const [lines, setLines] = useState(() => [{ id: ++lineSeq, result: BANNER }]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIndex, setHistIndex] = useState(null);
  const [ghost, setGhost] = useState(null);

  const inputRef = useRef(null);
  const scrollRef = useRef(null);
  const prompt = useMemo(() => pretty(cwd), [cwd]);

  useEffect(() => {
    setTitle(
      win.id,
      platform === "windows" ? `Windows Terminal — ${prompt}` : `aarya@arch: ${prompt}`,
    );
  }, [platform, prompt, setTitle, win.id]);

  useEffect(() => {
    if (focused) inputRef.current?.focus();
  }, [focused]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  const push = useCallback((entry) => {
    setLines((prev) => [...prev, { id: ++lineSeq, ...entry }]);
  }, []);

  const exec = useCallback(
    (raw) => {
      const trimmed = raw.trim();
      push({ prompt: pretty(cwd), input: raw });
      if (!trimmed) return;

      setHistory((prev) => [...prev, trimmed]);

      const [name, ...args] = trimmed.split(/\s+/);
      const command = commands[name];

      if (!command) {
        push({
          result: {
            kind: "error",
            text: `${name}: command not found. Run \`help\` to see what this machine knows.`,
          },
        });
        return;
      }

      const ctx = {
        cwd,
        setCwd,
        history,
        openApp,
        clear: () => {
          setLines([]);
          return null;
        },
        exit: () => closeWindow(win.id),
        restart,
      };

      const result = command.run(args, ctx);
      if (result) push({ result });
    },
    [closeWindow, cwd, history, openApp, push, restart, win.id],
  );

  const complete = useCallback(() => {
    const parts = input.split(/\s+/);
    const editingCommand = parts.length === 1 && !input.endsWith(" ");

    if (editingCommand) {
      const matches = commandNames.filter((c) => c.startsWith(parts[0]));
      if (matches.length === 1) setInput(`${matches[0]} `);
      else if (matches.length > 1) {
        setGhost(matches.join("   "));
        setInput(sharedPrefix(matches));
      }
      return;
    }

    const fragment = input.endsWith(" ") ? "" : parts[parts.length - 1];
    const slash = fragment.lastIndexOf("/");
    const dirPart = slash >= 0 ? fragment.slice(0, slash + 1) : "";
    const stub = slash >= 0 ? fragment.slice(slash + 1) : fragment;
    const base = resolve(dirPart || ".", cwd);
    if (!base || base.node.type !== "dir") return;

    const options = listNames(normalize(dirPart || ".", cwd)).filter((n) => n.startsWith(stub));
    if (options.length === 0) return;

    if (options.length === 1) {
      const head = parts.slice(0, input.endsWith(" ") ? parts.length : -1).join(" ");
      setInput(`${head} ${dirPart}${options[0]}`.replace(/\s+/, " "));
      return;
    }
    setGhost(options.join("   "));
    const head = parts.slice(0, -1).join(" ");
    setInput(`${head} ${dirPart}${sharedPrefix(options)}`.trimStart());
  }, [cwd, input]);

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      setGhost(null);
      exec(input);
      setInput("");
      setHistIndex(null);
      return;
    }
    if (event.key === "Tab") {
      event.preventDefault();
      complete();
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (history.length === 0) return;
      const next = histIndex === null ? history.length - 1 : Math.max(0, histIndex - 1);
      setHistIndex(next);
      setInput(history[next]);
      return;
    }
    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (histIndex === null) return;
      const next = histIndex + 1;
      if (next >= history.length) {
        setHistIndex(null);
        setInput("");
      } else {
        setHistIndex(next);
        setInput(history[next]);
      }
      return;
    }
    if (event.ctrlKey && (event.key === "l" || event.key === "L")) {
      event.preventDefault();
      setLines([]);
      return;
    }
    if (event.ctrlKey && event.key === "c") {
      event.preventDefault();
      push({ prompt: pretty(cwd), input: `${input}^C` });
      setInput("");
    }
  };

  const claimFocus = (event) => {
    if (event.target.closest("button, a, input, textarea")) return;
    if (window.getSelection()?.toString()) return;
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex min-h-0 flex-1 flex-col bg-[#0c0e12]/92 font-mono text-[13px] leading-[1.62]"
      onMouseUp={claimFocus}
      onTouchEnd={claimFocus}
    >
      <div ref={scrollRef} className="scroll min-h-0 flex-1 cursor-text overflow-y-auto px-4 py-3">
        {lines.map((line) => (
          <div key={line.id}>
            {line.input !== undefined && (
              <p className="flex gap-2 whitespace-pre-wrap break-words">
                <span className="shrink-0 text-mint">
                  <span className="text-accent">{line.prompt}</span>
                  <span className="text-dim"> $</span>
                </span>
                <span className="text-fg/90">{line.input}</span>
              </p>
            )}
            {line.result && <Output result={line.result} openApp={openApp} exec={exec} />}
          </div>
        ))}

        {ghost && <p className="whitespace-pre-wrap text-dim">{ghost}</p>}

        <div className="flex gap-2">
          <span className="shrink-0">
            <span className="text-accent">{prompt}</span>
            <span className="text-dim"> $</span>
          </span>
          <input
            ref={inputRef}
            value={input}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
            aria-label="Terminal input"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="term-input"
          />
        </div>
      </div>
    </div>
  );
}

function sharedPrefix(list) {
  if (list.length === 0) return "";
  let prefix = list[0];
  for (const item of list.slice(1)) {
    while (!item.startsWith(prefix) && prefix) prefix = prefix.slice(0, -1);
  }
  return prefix;
}
