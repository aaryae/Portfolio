import { create } from "zustand";
import { appLabel } from "../os/apps";

export const APP_META = {
  quickview: { title: "Quick View", w: 1000, h: 660, min: [420, 340] },
  terminal: { title: "aarya-term", w: 760, h: 460, min: [420, 260] },
  files: { title: "Files", w: 800, h: 500, min: [480, 320] },
  reader: { title: "Reader", w: 660, h: 520, min: [380, 300] },
  project: { title: "Project", w: 860, h: 560, min: [480, 360] },
  image: { title: "Image Viewer", w: 720, h: 520, min: [360, 300] },
  mail: { title: "Compose", w: 620, h: 520, min: [400, 380] },
  monitor: { title: "System Monitor", w: 620, h: 420, min: [420, 320] },
};

const WORKSPACES = [1, 2, 3, 4];
const WALLPAPER_KEY = "aaryaos.wallpapers";
const DEFAULT_WALLPAPERS = { linux: "ridge", windows: "bliss" };
let seq = 0;

function storedWallpapers() {
  if (typeof localStorage === "undefined") return DEFAULT_WALLPAPERS;
  try {
    const raw = localStorage.getItem(WALLPAPER_KEY);
    return raw ? { ...DEFAULT_WALLPAPERS, ...JSON.parse(raw) } : DEFAULT_WALLPAPERS;
  } catch {
    return DEFAULT_WALLPAPERS;
  }
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function spawnPosition(count, w, h) {
  const vw = typeof window === "undefined" ? 1440 : window.innerWidth;
  const vh = typeof window === "undefined" ? 900 : window.innerHeight;
  const step = (count % 6) * 30;
  const x = clamp(Math.round(vw / 2 - w / 2) + step - 90, 24, Math.max(24, vw - w - 24));
  const y = clamp(96 + step, 56, Math.max(56, vh - h - 110));
  return { x, y };
}

export const useOS = create((set, get) => ({
  phase: "boot",
  platform: "windows",
  workspace: 1,
  workspaces: WORKSPACES,
  windows: [],
  focusId: null,
  topZ: 10,
  launcherOpen: false,
  menu: null,
  noteOpen: true,

  closeNote: () => set({ noteOpen: false }),
  wallpapers: storedWallpapers(),

  setWallpaper: (id) =>
    set((s) => {
      const wallpapers = { ...s.wallpapers, [s.platform]: id };
      if (typeof localStorage !== "undefined") {
        localStorage.setItem(WALLPAPER_KEY, JSON.stringify(wallpapers));
      }
      return { wallpapers };
    }),

  setPhase: (phase) => set({ phase }),
  setPlatform: (platform) => set({ platform }),

  boot: (platform) =>
    set({ platform, phase: "boot", windows: [], focusId: null, workspace: 1, noteOpen: true }),
  restart: () =>
    set({ phase: "chooser", windows: [], focusId: null, launcherOpen: false, menu: null }),

  setWorkspace: (workspace) =>
    set((s) => ({
      workspace,
      launcherOpen: false,
      menu: null,
      focusId:
        s.windows
          .filter((w) => w.workspace === workspace && !w.minimized)
          .sort((a, b) => b.z - a.z)[0]?.id ?? null,
    })),
  toggleLauncher: () => set((s) => ({ launcherOpen: !s.launcherOpen, menu: null })),
  closeLauncher: () => set({ launcherOpen: false }),
  openMenu: (menu) => set({ menu }),
  closeMenu: () => set({ menu: null }),

  openApp: (app, props = {}) => {
    const meta = APP_META[app];
    if (!meta) return null;
    const state = get();

    if (props.singleton) {
      const existing = state.windows.find((w) => w.app === app);
      if (existing) {
        get().focusWindow(existing.id);
        set((s) => ({
          windows: s.windows.map((w) =>
            w.id === existing.id
              ? { ...w, minimized: false, workspace: s.workspace, props: { ...w.props, ...props } }
              : w,
          ),
        }));
        return existing.id;
      }
    }

    const w = props.w ?? meta.w;
    const h = props.h ?? meta.h;
    const vw = typeof window === "undefined" ? 1440 : window.innerWidth;
    const width = Math.min(w, vw - 48);
    const { x, y } = spawnPosition(state.windows.length, width, h);
    const id = `win-${++seq}`;
    const z = state.topZ + 1;

    set((s) => ({
      windows: [
        ...s.windows,
        {
          id,
          app,
          title: props.title ?? appLabel(app, state.platform),
          props,
          x,
          y,
          w: width,
          h,
          z,
          minimized: false,
          maximized: false,
          workspace: s.workspace,
          prev: null,
        },
      ],
      focusId: id,
      topZ: z,
      launcherOpen: false,
      menu: null,
    }));
    return id;
  },

  closeWindow: (id) =>
    set((s) => {
      const windows = s.windows.filter((w) => w.id !== id);
      const focusId =
        s.focusId === id
          ? [...windows]
              .filter((w) => w.workspace === s.workspace && !w.minimized)
              .sort((a, b) => b.z - a.z)[0]?.id ?? null
          : s.focusId;
      return { windows, focusId };
    }),

  focusWindow: (id) =>
    set((s) => {
      if (!s.windows.some((w) => w.id === id)) return s;
      const z = s.topZ + 1;
      return {
        windows: s.windows.map((w) => (w.id === id ? { ...w, z, minimized: false } : w)),
        focusId: id,
        topZ: z,
        launcherOpen: false,
        menu: null,
      };
    }),

  minimizeWindow: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => (w.id === id ? { ...w, minimized: true } : w)),
      focusId: s.focusId === id ? null : s.focusId,
    })),

  toggleMaximize: (id) =>
    set((s) => ({
      windows: s.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.maximized && w.prev) {
          return { ...w, ...w.prev, maximized: false, prev: null };
        }
        return {
          ...w,
          maximized: true,
          prev: { x: w.x, y: w.y, w: w.w, h: w.h },
        };
      }),
    })),

  moveWindow: (id, x, y) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, x, y } : w)) })),

  resizeWindow: (id, w, h) =>
    set((s) => ({ windows: s.windows.map((win) => (win.id === id ? { ...win, w, h } : win)) })),

  setTitle: (id, title) =>
    set((s) => ({ windows: s.windows.map((w) => (w.id === id ? { ...w, title } : w)) })),

  cycleWindows: () => {
    const s = get();
    const visible = s.windows
      .filter((w) => w.workspace === s.workspace && !w.minimized)
      .sort((a, b) => a.z - b.z);
    if (visible.length < 2) return;
    get().focusWindow(visible[0].id);
  },
}));
