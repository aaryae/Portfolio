import { useOS } from "../store/useOS";

function Bliss() {
  return (
    <img
      src="/images/bliss.png"
      alt=""
      draggable={false}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}

function Ridge() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0a1220" />
          <stop offset="52%" stopColor="#111c2e" />
          <stop offset="100%" stopColor="#16243a" />
        </linearGradient>
        <radialGradient id="halo" cx="0.72" cy="0.3" r="0.42">
          <stop offset="0%" stopColor="#8fb6ff" stopOpacity="0.34" />
          <stop offset="55%" stopColor="#5f86c8" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#5f86c8" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1600" height="900" fill="url(#sky)" />
      <rect width="1600" height="900" fill="url(#halo)" />
      <circle cx="1152" cy="248" r="46" fill="#dce8ff" opacity="0.16" />
      <circle cx="1152" cy="248" r="27" fill="#eef4ff" opacity="0.5" />

      <path
        d="M0 612 L232 470 L392 556 L560 428 L742 566 L900 486 L1076 600 L1256 496 L1432 588 L1600 500 L1600 900 L0 900 Z"
        fill="#16233a"
        opacity="0.85"
      />
      <path
        d="M0 700 L188 596 L360 672 L548 552 L722 668 L918 588 L1104 692 L1300 604 L1470 684 L1600 620 L1600 900 L0 900 Z"
        fill="#111c2e"
      />
      <path
        d="M0 790 L214 706 L418 776 L616 690 L830 782 L1040 704 L1250 790 L1440 726 L1600 784 L1600 900 L0 900 Z"
        fill="#0c1522"
      />
      <path
        d="M0 862 L260 812 L520 858 L800 806 L1080 856 L1340 812 L1600 854 L1600 900 L0 900 Z"
        fill="#080d16"
      />
    </svg>
  );
}

function Aurora() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <filter id="soft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="130" />
        </filter>
      </defs>
      <rect width="1600" height="900" fill="#070a10" />
      <g filter="url(#soft)">
        <ellipse cx="330" cy="180" rx="470" ry="300" fill="#2f4bb8" opacity="0.5" />
        <ellipse cx="1290" cy="760" rx="520" ry="330" fill="#12564f" opacity="0.45" />
        <ellipse cx="880" cy="360" rx="380" ry="240" fill="#5b3f9e" opacity="0.3" />
        <ellipse cx="1420" cy="140" rx="300" ry="210" fill="#8a6a2e" opacity="0.2" />
      </g>
      <rect width="1600" height="900" fill="#05070c" opacity="0.28" />
    </svg>
  );
}

function Carbon() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#0a0c10]" />
      <div
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(115deg, rgba(255,255,255,0.026) 0px, rgba(255,255,255,0.026) 1px, transparent 1px, transparent 9px)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(1100px 700px at 88% -8%, rgba(122,162,247,0.2), transparent 60%), radial-gradient(900px 620px at 8% 108%, rgba(127,209,185,0.14), transparent 62%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(118deg, transparent 34%, rgba(255,255,255,0.05) 47%, transparent 58%)",
        }}
      />
    </div>
  );
}

function Slate() {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[#0c0e12]" />
      <div
        className="absolute inset-0 opacity-70"
        style={{
          backgroundImage: "radial-gradient(rgba(255,255,255,0.055) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(130% 105% at 30% 20%, black 30%, transparent 76%)",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(760px 560px at 22% 8%, rgba(180,200,255,0.11), transparent 64%)",
        }}
      />
    </div>
  );
}

function petal(length, width) {
  const waist = width * 0.86;
  return `M0 0 C ${width} ${-length * 0.3}, ${waist} ${-length * 0.78}, 0 ${-length} C ${-waist} ${
    -length * 0.78
  }, ${-width} ${-length * 0.3}, 0 0 Z`;
}

const BLOOM_LAYERS = [
  { count: 6, length: 430, width: 132, offset: 0, opacity: 0.22, blur: "bloomFar" },
  { count: 6, length: 348, width: 116, offset: 30, opacity: 0.3, blur: "bloomSoft" },
  { count: 6, length: 262, width: 94, offset: 15, opacity: 0.36, blur: "bloomTight" },
  { count: 6, length: 172, width: 68, offset: 45, opacity: 0.34, blur: "bloomTight" },
];

function Bloom() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bloomBg" cx="0.53" cy="0.5" r="0.78">
          <stop offset="0%" stopColor="#0d2b52" />
          <stop offset="34%" stopColor="#081a35" />
          <stop offset="72%" stopColor="#040c1b" />
          <stop offset="100%" stopColor="#01040a" />
        </radialGradient>
        <linearGradient id="petalFill" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0b3f79" stopOpacity="0.1" />
          <stop offset="38%" stopColor="#2f86d8" stopOpacity="0.42" />
          <stop offset="78%" stopColor="#8ad4ff" stopOpacity="0.72" />
          <stop offset="100%" stopColor="#e8f8ff" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id="petalEdge" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#bfe9ff" stopOpacity="0" />
          <stop offset="70%" stopColor="#dff4ff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0.5" />
        </linearGradient>
        <radialGradient id="bloomCore" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.62" />
          <stop offset="26%" stopColor="#bfe6ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#5fb5ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="bloomHalo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0%" stopColor="#2e7fd0" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#1c4d86" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#0b2545" stopOpacity="0" />
        </radialGradient>
        <filter id="bloomFar" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
        <filter id="bloomSoft" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" />
        </filter>
        <filter id="bloomTight" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.4" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill="url(#bloomBg)" />
      <ellipse cx="840" cy="450" rx="620" ry="520" fill="url(#bloomHalo)" />

      <g transform="translate(848 448) rotate(-16) scale(0.82 0.68)">
        {BLOOM_LAYERS.map((layer) => (
          <g key={layer.length} filter={`url(#${layer.blur})`} style={{ mixBlendMode: "screen" }}>
            {Array.from({ length: layer.count }, (_, i) => {
              const angle = layer.offset + (360 / layer.count) * i;
              const shape = petal(layer.length, layer.width);
              return (
                <g key={angle} transform={`rotate(${angle})`} opacity={layer.opacity}>
                  <path d={shape} fill="url(#petalFill)" />
                  <path d={shape} fill="none" stroke="url(#petalEdge)" strokeWidth="1.6" />
                </g>
              );
            })}
          </g>
        ))}
        <circle r="210" fill="url(#bloomCore)" style={{ mixBlendMode: "screen" }} />
        <ellipse
          cx="-150"
          cy="150"
          rx="360"
          ry="250"
          fill="url(#bloomCore)"
          opacity="0.28"
          style={{ mixBlendMode: "screen" }}
        />
      </g>

      <rect width="1600" height="900" fill="#01050c" opacity="0.16" />
    </svg>
  );
}

function Wave() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="waveBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#040a14" />
          <stop offset="60%" stopColor="#08192e" />
          <stop offset="100%" stopColor="#0b2440" />
        </linearGradient>
        <linearGradient id="ribbon" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#4cc2ff" stopOpacity="0" />
          <stop offset="42%" stopColor="#4cc2ff" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#8f6bff" stopOpacity="0.1" />
        </linearGradient>
        <filter id="ribbonBlur" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="10" />
        </filter>
      </defs>

      <rect width="1600" height="900" fill="url(#waveBg)" />
      <g filter="url(#ribbonBlur)" fill="none" stroke="url(#ribbon)">
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <path
            key={i}
            d={`M-100 ${420 + i * 34} C 300 ${250 + i * 26}, 620 ${640 + i * 20}, 1000 ${
              420 + i * 30
            } C 1300 ${250 + i * 22}, 1520 ${520 + i * 18}, 1700 ${400 + i * 28}`}
            strokeWidth={2.4 + i * 0.9}
            opacity={0.8 - i * 0.1}
          />
        ))}
      </g>
      <rect width="1600" height="900" fill="#02060d" opacity="0.18" />
    </svg>
  );
}

const VARIANTS = {
  ridge: Ridge,
  aurora: Aurora,
  carbon: Carbon,
  slate: Slate,
  bloom: Bloom,
  wave: Wave,
  bliss: Bliss,
};

export default function Wallpaper() {
  const platform = useOS((s) => s.platform);
  const wallpaper = useOS((s) => s.wallpapers[s.platform]);
  const Variant = VARIANTS[wallpaper] ?? (platform === "windows" ? Bliss : Ridge);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <Variant />
      <div className="grain absolute inset-0" />
      <div className={`absolute inset-0 ${wallpaper === "bliss" ? "vignette-soft" : "vignette"}`} />
    </div>
  );
}
