import PixelSprite from "./PixelSprite";
import { CLOUD, HEART, SPARKLE } from "./pixel-data";

/** Deterministic PRNG so server and client render identical decorations. */
function seeded(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Builds a blocky, stepped hill silhouette from a sine wave. The crest sits at
 * `top` and dips `2 * amplitude` below it; everything under the wave is filled
 * down to `base`.
 */
function hillPath(
  steps: number,
  top: number,
  amplitude: number,
  phase: number,
  base: number
) {
  const points: string[] = [`0,${base}`];
  for (let i = 0; i <= steps; i += 1) {
    const y = Math.round(
      top + amplitude - amplitude * Math.sin((i / steps) * Math.PI * 2 + phase)
    );
    points.push(`${i},${y}`, `${i + 1},${y}`);
  }
  points.push(`${steps + 1},${base}`);
  return points.join(" ");
}

const CLOUDS = [
  { top: "6%", scale: 1, duration: 46, delay: -6 },
  { top: "15%", scale: 0.62, duration: 62, delay: -28 },
  { top: "26%", scale: 0.82, duration: 54, delay: -40 },
  { top: "36%", scale: 0.5, duration: 72, delay: -14 },
];

const rand = seeded(1402);
const STARS = Array.from({ length: 16 }, () => ({
  left: `${Math.round(rand() * 92) + 3}%`,
  top: `${Math.round(rand() * 78) + 4}%`,
  duration: `${(2.4 + rand() * 3).toFixed(2)}s`,
  delay: `${(rand() * 4).toFixed(2)}s`,
  size: `${Math.round(9 + rand() * 12)}px`,
}));

const FLOATERS = Array.from({ length: 10 }, () => ({
  left: `${Math.round(rand() * 94) + 2}%`,
  duration: `${(11 + rand() * 12).toFixed(2)}s`,
  delay: `${(rand() * 14).toFixed(2)}s`,
  size: `${Math.round(12 + rand() * 14)}px`,
}));

/** Static parallax backdrop: sky, clouds, hills, sparkles, floating hearts. */
export default function Scenery() {
  return (
    <div className="vday__scene" aria-hidden="true">
      <div className="vday__sky" />
      <div className="vday__checks" />

      <div className="vday__clouds">
        {CLOUDS.map((cloud, i) => (
          <div
            key={i}
            className="vday__cloud"
            style={{
              top: cloud.top,
              width: `${42 * cloud.scale}vw`,
              animationDuration: `${cloud.duration}s`,
              animationDelay: `${cloud.delay}s`,
            }}
          >
            <PixelSprite rows={CLOUD} style={{ width: "100%", display: "block" }} />
          </div>
        ))}

        {STARS.map((star, i) => (
          <PixelSprite
            key={i}
            rows={SPARKLE}
            className="vday__star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              animationDuration: star.duration,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>

      <div className="vday__hills">
        <svg
          viewBox="0 0 64 22"
          preserveAspectRatio="none"
          shapeRendering="crispEdges"
          aria-hidden="true"
        >
          <polygon points={hillPath(64, 3, 2.4, 0.4, 22)} fill="#fbb0e8" />
          <polygon points={hillPath(64, 8, 2, 2.9, 22)} fill="#ff6ec2" />
          <polygon points={hillPath(64, 13, 1.6, 5.1, 22)} fill="#ee2b90" />
          <rect x="0" y="17" width="65" height="5" fill="#d40f70" />
        </svg>
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: "16%",
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.16) 0 3px, transparent 3px 10px)",
          }}
        />
      </div>

      {FLOATERS.map((floater, i) => (
        <PixelSprite
          key={i}
          rows={HEART}
          className="vday__floater"
          style={{
            left: floater.left,
            width: floater.size,
            animationDuration: floater.duration,
            animationDelay: floater.delay,
          }}
        />
      ))}
    </div>
  );
}
