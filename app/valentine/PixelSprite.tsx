import { toRects } from "./pixel-data";

type PixelSpriteProps = {
  rows: string[];
  /** Accessible label; omit for purely decorative art. */
  label?: string;
  /** Overrides every colour in the sprite, for drawing it on a dark button. */
  tint?: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Renders a sprite map as crisp inline SVG. It scales with its container, so
 * sizing happens in CSS rather than in pixel units.
 */
export default function PixelSprite({
  rows,
  label,
  tint,
  className,
  style,
}: PixelSpriteProps) {
  const { rects, width, height } = toRects(rows);

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={className}
      style={style}
      shapeRendering="crispEdges"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      focusable="false"
    >
      {rects.map((rect, i) => (
        <rect
          key={i}
          x={rect.x}
          y={rect.y}
          width={rect.w}
          height={1}
          fill={tint ?? rect.fill}
        />
      ))}
    </svg>
  );
}
