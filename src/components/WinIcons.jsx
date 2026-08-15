const Folder = () => (
  <>
    <path
      d="M4 8.6A1.6 1.6 0 0 1 5.6 7h5.6c.5 0 1 .24 1.3.65L14.3 10h11.1A1.6 1.6 0 0 1 27 11.6V15H4z"
      fill="#c9862a"
    />
    <rect x="3" y="12.4" width="26" height="14.6" rx="2.4" fill="#ffc247" />
    <rect x="3" y="12.4" width="26" height="2.1" rx="1" fill="#ffdc8d" />
  </>
);

const Doc = () => (
  <>
    <path d="M7 4.5h12.6L25 10v17.5H7z" fill="#f2f6fb" />
    <path d="M19.6 4.5L25 10h-5.4z" fill="#c3d3e3" />
    <rect x="10" y="12.4" width="12" height="1.9" rx="0.95" fill="#2f7fd8" />
    <rect x="10" y="17" width="12" height="1.7" rx="0.85" fill="#a9bccf" />
    <rect x="10" y="21" width="8" height="1.7" rx="0.85" fill="#a9bccf" />
  </>
);

const Picture = () => (
  <>
    <rect x="3.5" y="6" width="25" height="20" rx="3" fill="#2f6fd0" />
    <circle cx="11" cy="12.6" r="2.5" fill="#ffd75e" />
    <path d="M5.5 23.5l6-6.6 4.2 4.4 3.4-3 6.4 7.2z" fill="#eaf3ff" />
  </>
);

const Terminal = () => (
  <>
    <rect x="3" y="5" width="26" height="22" rx="3.4" fill="#0b1622" />
    <rect
      x="3"
      y="5"
      width="26"
      height="22"
      rx="3.4"
      fill="none"
      stroke="#2c4d6d"
      strokeWidth="1.1"
    />
    <path
      d="M9 12.4l3.6 3.2L9 18.8"
      fill="none"
      stroke="#4cc2ff"
      strokeWidth="2.1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M15.6 19.4h6.4" stroke="#e8eaed" strokeWidth="2.1" strokeLinecap="round" />
  </>
);

const Star = () => (
  <>
    <rect x="3.5" y="3.5" width="25" height="25" rx="5.5" fill="#1e2a3b" />
    <rect
      x="3.5"
      y="3.5"
      width="25"
      height="25"
      rx="5.5"
      fill="none"
      stroke="#f5c542"
      strokeOpacity="0.45"
      strokeWidth="1.1"
    />
    <path
      d="M16 8.2l2.55 5.3 5.8.78-4.24 4.02 1.04 5.78L16 21.35l-5.15 2.73 1.04-5.78L7.65 14.28l5.8-.78z"
      fill="#f5c542"
    />
  </>
);

const Code = () => (
  <>
    <rect x="3" y="6" width="26" height="17.4" rx="2.6" fill="#12283f" />
    <path d="M3 8.6A2.6 2.6 0 0 1 5.6 6h20.8A2.6 2.6 0 0 1 29 8.6v1.5H3z" fill="#1d3c5c" />
    <circle cx="6.6" cy="8" r="0.95" fill="#f7768e" />
    <circle cx="9.4" cy="8" r="0.95" fill="#e0af68" />
    <circle cx="12.2" cy="8" r="0.95" fill="#7fd1b9" />
    <path
      d="M9 14.6l3 2.6-3 2.6"
      fill="none"
      stroke="#4cc2ff"
      strokeWidth="1.9"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M14.6 19.8h7" stroke="#8fa6bd" strokeWidth="1.9" strokeLinecap="round" />
    <path d="M11.5 26.5h9" stroke="#5d6f83" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M16 23.4v3.1" stroke="#5d6f83" strokeWidth="2.2" />
  </>
);

const Mail = () => (
  <>
    <rect x="3" y="7.5" width="26" height="17" rx="2.6" fill="#eef4fb" />
    <path d="M3 10.6L16 18.7l13-8.1v-.5A2.6 2.6 0 0 0 26.4 7.5H5.6A2.6 2.6 0 0 0 3 10.1z" fill="#2f7fd8" />
    <path d="M3.6 23.9l9.2-6.6M28.4 23.9l-9.2-6.6" stroke="#c3d6ea" strokeWidth="1.5" />
  </>
);

const Chart = () => (
  <>
    <rect x="3" y="5.5" width="26" height="21" rx="2.8" fill="#132437" />
    <path d="M3 8.3A2.8 2.8 0 0 1 5.8 5.5h20.4A2.8 2.8 0 0 1 29 8.3v1.3H3z" fill="#1d3a58" />
    <rect x="8" y="17.5" width="3.4" height="5.8" rx="1" fill="#4cc2ff" />
    <rect x="14.3" y="13.2" width="3.4" height="10.1" rx="1" fill="#7fd1b9" />
    <rect x="20.6" y="15.4" width="3.4" height="7.9" rx="1" fill="#f5c542" />
  </>
);

const ART = {
  quickview: Star,
  terminal: Terminal,
  files: Folder,
  folder: Folder,
  reader: Doc,
  doc: Doc,
  project: Code,
  image: Picture,
  picture: Picture,
  mail: Mail,
  monitor: Chart,
};

export default function WinIcon({ name, className = "h-6 w-6" }) {
  const Art = ART[name] ?? Doc;
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <Art />
    </svg>
  );
}
