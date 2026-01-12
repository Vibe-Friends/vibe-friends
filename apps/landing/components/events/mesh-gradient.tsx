"use client";

import { useMemo } from "react";

interface MeshGradientProps {
  seed: string;
  className?: string;
}

// 6 vibrant gradient themes inspired by Luma/modern event platforms
const gradientThemes = [
  {
    // Electric Purple - vibrant purple to pink
    name: "purple",
    colors: ["#8B5CF6", "#A855F7", "#EC4899", "#F472B6"],
    base: "#7C3AED",
  },
  {
    // Ocean Blue - deep blue to cyan
    name: "ocean",
    colors: ["#0EA5E9", "#06B6D4", "#22D3EE", "#38BDF8"],
    base: "#0284C7",
  },
  {
    // Sunset Orange - warm coral to gold
    name: "sunset",
    colors: ["#F97316", "#FB923C", "#FBBF24", "#F59E0B"],
    base: "#EA580C",
  },
  {
    // Emerald Green - rich teal to green
    name: "emerald",
    colors: ["#10B981", "#34D399", "#2DD4BF", "#14B8A6"],
    base: "#059669",
  },
  {
    // Hot Pink - magenta to rose
    name: "pink",
    colors: ["#EC4899", "#F472B6", "#E879F9", "#D946EF"],
    base: "#DB2777",
  },
  {
    // Indigo Night - deep indigo to violet
    name: "indigo",
    colors: ["#6366F1", "#818CF8", "#A78BFA", "#8B5CF6"],
    base: "#4F46E5",
  },
];

function hashSeed(seed: string): number {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function getTheme(seed: string) {
  const hash = hashSeed(seed);
  return gradientThemes[hash % gradientThemes.length]!;
}

export function MeshGradient({ seed, className = "" }: MeshGradientProps) {
  const theme = useMemo(() => getTheme(seed), [seed]);
  const hash = useMemo(() => hashSeed(seed), [seed]);

  // Generate deterministic gradient positions using bit shifts to extract
  // different parts of the hash. Each position varies within a quadrant:
  // pos1: top-left (15-40%), pos2: top-right (55-80%)
  // pos3: bottom-left (15-40%), pos4: bottom-right (55-80%)
  const pos1 = { x: (hash % 25) + 15, y: ((hash >> 4) % 25) + 15 };
  const pos2 = { x: ((hash >> 8) % 25) + 55, y: ((hash >> 12) % 25) + 15 };
  const pos3 = { x: ((hash >> 16) % 25) + 15, y: ((hash >> 20) % 25) + 55 };
  const pos4 = { x: ((hash >> 24) % 25) + 55, y: ((hash >> 28) % 20) + 55 };

  const [c1, c2, c3, c4] = theme.colors;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundColor: theme.base,
        backgroundImage: `
          radial-gradient(ellipse 100% 100% at ${pos1.x}% ${pos1.y}%, ${c1} 0%, transparent 55%),
          radial-gradient(ellipse 90% 90% at ${pos2.x}% ${pos2.y}%, ${c2} 0%, transparent 50%),
          radial-gradient(ellipse 85% 85% at ${pos3.x}% ${pos3.y}%, ${c3} 0%, transparent 55%),
          radial-gradient(ellipse 80% 80% at ${pos4.x}% ${pos4.y}%, ${c4} 0%, transparent 50%)
        `,
      }}
    >
      {/* Subtle animated overlay for gentle movement */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            radial-gradient(ellipse 70% 70% at 25% 25%, ${c2} 0%, transparent 60%),
            radial-gradient(ellipse 70% 70% at 75% 75%, ${c3} 0%, transparent 60%)
          `,
          animation: "mesh-flow 12s ease-in-out infinite",
        }}
      />
    </div>
  );
}
