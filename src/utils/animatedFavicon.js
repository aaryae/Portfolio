const RENDER_SIZE = 64;
const FRAME_MS = 400;
const NAVY = "#0a0a3b";
const GOLD = "#FBAC18";
const TEAL = "#127E9B";

const PHOTO_SRC = new URL("../assets/aarya1.jpg", import.meta.url).href;

const RING_COLORS = [GOLD, TEAL, GOLD, "#ffffff"];

let started = false;

function takeOverFavicon() {
  return [...document.querySelectorAll('link[rel="icon"], link[rel="shortcut icon"]')]
    .filter((el) => !el.dataset.animated)
    .map((el) => {
      el.remove();
      return el;
    });
}

function drawFrame(ctx, photo, ringColor) {
  const size = RENDER_SIZE;
  const cx = size / 2;
  const photoR = cx - 4;
  const ringR = cx - 2;

  ctx.clearRect(0, 0, size, size);
  ctx.fillStyle = NAVY;
  ctx.fillRect(0, 0, size, size);

  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cx, photoR, 0, Math.PI * 2);
  ctx.clip();

  const full = Math.min(photo.naturalWidth, photo.naturalHeight);
  const crop = full * 0.72;
  const sx = (photo.naturalWidth - crop) / 2;
  const sy = photo.naturalHeight * 0.06;
  ctx.drawImage(
    photo,
    sx,
    sy,
    crop,
    crop,
    cx - photoR,
    cx - photoR,
    photoR * 2,
    photoR * 2,
  );
  ctx.restore();

  ctx.strokeStyle = ringColor;
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cx, cx, ringR, 0, Math.PI * 2);
  ctx.stroke();
}

function swapFavicon(url) {
  let link = document.querySelector('link[rel="icon"][data-animated="true"]');
  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    link.type = "image/png";
    link.dataset.animated = "true";
  }
  link.href = `${url}?t=${Date.now()}`;
  link.remove();
  document.head.prepend(link);
}

export function startAnimatedFavicon() {
  if (typeof window === "undefined" || started) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  started = true;
  takeOverFavicon();

  const canvas = document.createElement("canvas");
  canvas.width = RENDER_SIZE;
  canvas.height = RENDER_SIZE;
  const ctx = canvas.getContext("2d");
  const photo = new Image();
  photo.src = PHOTO_SRC;

  let frameIndex = 0;
  let intervalId = 0;
  const frames = [];

  const begin = () => {
    RING_COLORS.forEach((color) => {
      drawFrame(ctx, photo, color);
      frames.push(canvas.toDataURL("image/png"));
    });

    frameIndex = 0;
    swapFavicon(frames[0]);

    intervalId = window.setInterval(() => {
      frameIndex = (frameIndex + 1) % frames.length;
      swapFavicon(frames[frameIndex]);
    }, FRAME_MS);
  };

  photo.onload = begin;
  if (photo.complete) begin();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      clearInterval(intervalId);
    } else if (frames.length) {
      intervalId = window.setInterval(() => {
        frameIndex = (frameIndex + 1) % frames.length;
        swapFavicon(frames[frameIndex]);
      }, FRAME_MS);
    }
  });
}
