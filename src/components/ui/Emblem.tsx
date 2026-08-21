import { cn } from "@/lib/cn";

type EmblemProps = {
  size?: number;
  className?: string;
  /** 1 = minimal cell, 2 = cell + core, 3 = full mark with outer ring */
  complexity?: 1 | 2 | 3;
  accent?: boolean;
  title?: string;
};

const CX = 12;
const CY = 12;
const R = 9;

const vertex = (i: number) => {
  const a = (Math.PI / 180) * (60 * i - 90);
  return `${(CX + R * Math.cos(a)).toFixed(2)},${(CY + R * Math.sin(a)).toFixed(2)}`;
};

const HEX_POINTS = Array.from({ length: 6 }, (_, i) => vertex(i)).join(" ");

const CORE_EDGES: [number, number][] = [
  [6, 0], // center -> top
  [6, 2], // center -> bottom-right
  [6, 4], // center -> bottom-left
];

/**
 * Hive Foundry emblem — an abstract hexagonal cell (distributed nodes forming
 * a larger system). Deliberately not a cartoon hive: a single geometric cell
 * whose internal edges suggest an isometric core.
 */
export function Emblem({ size = 24, className, complexity = 2, accent = false, title }: EmblemProps) {
  const stroke = accent ? "var(--hf-ember)" : "var(--hf-fg)";
  const ember = "var(--hf-ember)";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      role="img"
      aria-label={title ?? "Hive Foundry emblem"}
    >
      {complexity === 3 && (
        <circle cx={CX} cy={CY} r={11.4} stroke="var(--hf-edge-2)" strokeWidth="1" strokeDasharray="1.5 2.5" />
      )}
      <polygon
        points={HEX_POINTS}
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {complexity >= 2 &&
        CORE_EDGES.map(([a, b]) => (
          <line
            key={`${a}-${b}`}
            x1={a === 6 ? CX : parseFloat(vertex(a).split(",")[0])}
            y1={a === 6 ? CY : parseFloat(vertex(a).split(",")[1])}
            x2={b === 6 ? CX : parseFloat(vertex(b).split(",")[0])}
            y2={b === 6 ? CY : parseFloat(vertex(b).split(",")[1])}
            stroke={stroke}
            strokeWidth="0.8"
            opacity="0.55"
          />
        ))}
      {complexity >= 2 && (
        <circle cx={CX} cy={CY} r={1.2} fill={accent ? ember : stroke} />
      )}
      {Array.from({ length: 6 }, (_, i) => {
        const [px, py] = vertex(i).split(",");
        const highlighted = accent && i === 0;
        return (
          <circle
            key={i}
            cx={parseFloat(px)}
            cy={parseFloat(py)}
            r={highlighted ? 1.5 : 1.1}
            fill={highlighted ? ember : stroke}
          />
        );
      })}
    </svg>
  );
}
