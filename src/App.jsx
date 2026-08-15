import { useEffect } from "react";
import Boot from "./components/Boot";
import BootSelect from "./components/BootSelect";
import Desktop from "./components/Desktop";
import { useOS } from "./store/useOS";

export default function App() {
  const phase = useOS((s) => s.phase);
  const platform = useOS((s) => s.platform);
  const openApp = useOS((s) => s.openApp);
  const toggleLauncher = useOS((s) => s.toggleLauncher);
  const closeLauncher = useOS((s) => s.closeLauncher);
  const closeMenu = useOS((s) => s.closeMenu);
  const setWorkspace = useOS((s) => s.setWorkspace);
  const bootInto = useOS((s) => s.boot);
  const setPhase = useOS((s) => s.setPhase);

  useEffect(() => {
    document.documentElement.dataset.platform = platform;
  }, [platform]);

  useEffect(() => {
    const requested =
      new URLSearchParams(window.location.search).get("os") ??
      window.location.hash.replace("#", "");
    if (requested === "windows" || requested === "linux") bootInto(requested);
    else if (requested === "choose") setPhase("chooser");
  }, [bootInto, setPhase]);

  useEffect(() => {
    if (phase !== "desktop") return undefined;

    const onKey = (event) => {
      const typing = ["INPUT", "TEXTAREA"].includes(event.target?.tagName);

      if (event.ctrlKey && event.altKey && event.key.toLowerCase() === "t") {
        event.preventDefault();
        openApp("terminal", {});
        return;
      }
      if (event.key === "Escape") {
        closeLauncher();
        closeMenu();
        return;
      }
      if (event.key === "Meta" && platform === "windows") {
        event.preventDefault();
        toggleLauncher();
        return;
      }
      if (event.altKey && platform === "linux" && /^[1-4]$/.test(event.key)) {
        event.preventDefault();
        setWorkspace(Number(event.key));
        return;
      }
      if (!typing && event.key === " " && event.ctrlKey) {
        event.preventDefault();
        toggleLauncher();
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeLauncher, closeMenu, openApp, phase, platform, setWorkspace, toggleLauncher]);

  return (
    <div className="h-full w-full">
      {phase === "chooser" ? (
        <BootSelect />
      ) : (
        <>
          <Desktop />
          {phase === "boot" && <Boot />}
        </>
      )}
    </div>
  );
}
