import { AnimatePresence } from "framer-motion";
import Files from "../apps/Files";
import ImageViewer from "../apps/ImageViewer";
import Mail from "../apps/Mail";
import Monitor from "../apps/Monitor";
import ProjectView from "../apps/ProjectView";
import QuickView from "../apps/QuickView";
import Reader from "../apps/Reader";
import Terminal from "../apps/Terminal";
import { user } from "../data/content";
import { useOS } from "../store/useOS";
import ContextMenu from "./ContextMenu";
import DesktopIcons from "./DesktopIcons";
import Dock from "./Dock";
import Launcher from "./Launcher";
import StartMenu from "./StartMenu";
import StickyNote from "./StickyNote";
import Taskbar from "./Taskbar";
import TopBar from "./TopBar";
import Wallpaper from "./Wallpaper";
import Window from "./Window";

const APPS = {
  quickview: QuickView,
  terminal: Terminal,
  files: Files,
  reader: Reader,
  project: ProjectView,
  image: ImageViewer,
  mail: Mail,
  monitor: Monitor,
};

export default function Desktop() {
  const windows = useOS((s) => s.windows);
  const workspace = useOS((s) => s.workspace);
  const platform = useOS((s) => s.platform);
  const openMenu = useOS((s) => s.openMenu);
  const closeMenu = useOS((s) => s.closeMenu);
  const closeLauncher = useOS((s) => s.closeLauncher);

  const wallpaper = useOS((s) => s.wallpapers[s.platform]);
  const win11 = platform === "windows";
  const brightWall = wallpaper === "bliss";
  const isHidden = (win) => win.minimized || (!win11 && win.workspace !== workspace);

  return (
    <main
      className="relative h-full w-full overflow-hidden bg-base"
      onContextMenu={(event) => {
        event.preventDefault();
        openMenu({ x: event.clientX, y: event.clientY });
      }}
      onPointerDown={() => {
        closeMenu();
        closeLauncher();
      }}
    >
      <Wallpaper />

      <div
        className={`pointer-events-none absolute inset-x-0 flex flex-col items-center gap-1 text-center ${
          win11 ? "bottom-[66px]" : "bottom-[92px]"
        }`}
      >
        <p
          className={`font-mono text-[11px] uppercase tracking-[0.32em] ${
            brightWall ? "icon-label text-white/60" : "text-white/22"
          }`}
        >
          {user.headline}
        </p>
        <p
          className={`font-mono text-[10.5px] ${
            brightWall ? "icon-label text-white/45" : "text-white/14"
          }`}
        >
          {win11
            ? "double-click an icon · start menu for everything else"
            : "right-click for a menu · ctrl+alt+t for a terminal"}
        </p>
      </div>

      <DesktopIcons />
      {win11 ? <StickyNote /> : <TopBar />}

      <AnimatePresence>
        {windows.map((win) => {
          const Component = APPS[win.app];
          return (
            <Window key={win.id} win={win} hidden={isHidden(win)}>
              <Component win={win} />
            </Window>
          );
        })}
      </AnimatePresence>

      <ContextMenu />
      {win11 ? (
        <>
          <StartMenu />
          <Taskbar />
        </>
      ) : (
        <>
          <Launcher />
          <Dock />
        </>
      )}
    </main>
  );
}
