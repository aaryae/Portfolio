# Aarya Dangol — portfolio

A portfolio disguised as an operating system. Everything about me is a file you can read, and
every project is a directory you can enter — from a shell, or from the GUI.

Built with React, Vite, Tailwind CSS v4, Zustand and Framer Motion. The previous single-page
version of this site lives in the git history, up to commit `f5bea9e`.

It ships as two machines running the same portfolio:

| Machine | Feel |
| --- | --- |
| **aaryaWin 11** (the default boot) | taskbar, Start menu, File Explorer, click-first |
| **aaryaOS** (Arch Linux) | top bar, dock, workspaces, terminal-first |

Windows boots by default, with a sticky note on the desktop pointing at the Linux build.
Restarting drops you into the boot picker, where you choose the machine. Both run the same
apps, filesystem and content — only the shell around them changes. Switch any time: the sticky
note's Restart button, the Start menu's Restart, `switch to windows` in the Linux top bar,
`reboot` in the terminal, or the desktop right-click menu.

Direct links: `?os=windows`, `?os=linux`, `?os=choose` for the boot picker.

## On a phone

Windows and dock and shell all need room, so below 880px the desktop is never mounted. Phones and
small tablets get `src/mobile/MobileSite.jsx` instead: one scrollable page with the intro, stats,
stack, every project linked to its live site or repo, and the contact links. `?view=desktop` forces
the operating system onto a small screen anyway.

## Run it

```bash
pnpm install
pnpm dev
```

Build for production with `pnpm build`, preview with `pnpm preview`.

## The desktop

| Piece | What it does |
| --- | --- |
| Quick View | the glowing `QUICK-VIEW.md` — the whole portfolio on one scrollable page |
| Top bar (Linux) | user@host launcher, workspaces 1–4, focused window, clock |
| Dock (Linux) | Quick View, Terminal, Files, About, Projects, Mail, System Monitor |
| Taskbar (Windows) | Start menu with pinned apps, search and recommended files, system tray |
| Sticky note (Windows) | tells visitors the Linux build exists, and restarts into the picker |
| Windows | drag by the title bar, resize from the bottom-right, double-click to maximize |
| Desktop icons | double-click `QUICK-VIEW.md`, `README.md`, `about.md`, `projects`, `Terminal` |
| Wallpaper | right-click the desktop — Ridge, Aurora, Carbon, Slate on Linux; Bliss (`public/images/bliss.png`, default), Bloom and Wave on Windows |
| Icons | Windows uses the colour app icons in `components/WinIcons.jsx`; Linux keeps the line set |

Quick View is the shortcut for visitors who do not want to click through files: profile,
stats, full stack, all six projects with screenshots and links, and contact — one page.
Wallpaper choice is remembered per machine in `localStorage`.

### Keyboard

- `Ctrl` + `Alt` + `T` — new terminal
- `Ctrl` + `Space` — launcher (Linux) or Start menu (Windows)
- `Win` — Start menu, on the Windows build
- `Alt` + `1…4` — switch workspace, on the Linux build
- `Esc` — dismiss launcher or context menu

Right-click the desktop for a context menu. In the boot picker, `←` `→` choose and `Enter` boots.

## The shell

Inside the terminal, `help` lists everything. Tab completes commands and paths, the arrow
keys walk history, `Ctrl` + `L` clears the screen.

| Command | What it does |
| --- | --- |
| `quickview` | everything about me on one page |
| `about`, `skills`, `contact` | open the written pages |
| `whoami`, `neofetch` | the short version, with a system summary |
| `projects` | list every project, with a clickable slug |
| `open <name>` | open a project, file, folder, or URL |
| `ls [-l]`, `cd`, `pwd`, `cat`, `tree` | move around `/home/aarya` |
| `mail` | compose a message (hands off to your mail client) |
| `files`, `monitor` | launch the GUI apps |
| `git log` | commit history, portfolio edition |
| `man <cmd>`, `history`, `date`, `uname`, `echo` | the usual suspects |
| `reboot` | back to the boot picker, to try the other machine |
| `clear`, `exit` | tidy up |

Clicking anywhere in the terminal body puts the cursor back on the prompt; selecting text with
the mouse still works.

## Content

All copy, projects, skills and links live in `src/data/content.js`. The virtual filesystem in
`src/os/fs.js` is generated from it, so adding a project adds a directory, a README, and a
`projects` entry at once.

## Structure

```
src/
  apps/         Terminal, Files, Reader, ProjectView, ImageViewer, Mail, Monitor, QuickView
  components/   BootSelect, Boot, Desktop, Window, Wallpaper,
                TopBar + Dock + Launcher (Linux), Taskbar + StartMenu + StickyNote (Windows)
  os/           virtual filesystem, command registry, per-platform app names
  store/        window manager + platform state (zustand)
  data/         all portfolio content
```
