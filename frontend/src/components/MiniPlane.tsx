export function MiniPlane({ x, y, color }: { x: number; y: number; color: string }) {
  const c = 60, r = 42;
  const ex = c + x * r;
  const ey = c - y * r;
  const len = Math.hypot(ex - c, ey - c);
  const ux = len ? (ex - c) / len : 0;
  const uy = len ? (ey - c) / len : 0;
  const head = 9;
  const bx = ex - ux * head;
  const by = ey - uy * head;
  const px = -uy * 4.5;
  const py = ux * 4.5;
  return (
    <svg viewBox="0 0 120 120" className="size-full" aria-hidden="true" focusable="false">
      <rect x="8" y="8" width="104" height="104" rx="4" fill={color} fillOpacity="0.08" stroke={color} strokeOpacity="0.8" />
      <path d="M8 60H112M60 8V112" stroke={color} strokeOpacity="0.45" />
      <path d="M34 8V112M86 8V112M8 34H112M8 86H112" stroke={color} strokeOpacity="0.14" />
      {len > 3 && (
        <>
          <line x1={c} y1={c} x2={bx} y2={by} stroke={color} strokeWidth="2.5" strokeLinecap="round" />
          <polygon points={`${ex},${ey} ${bx + px},${by + py} ${bx - px},${by - py}`} fill={color} />
        </>
      )}
      <circle cx={c} cy={c} r="2" fill="var(--foreground)" />
    </svg>
  );
}
