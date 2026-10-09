export default function CompositionGroup({ title, items }: { title: string; items: [string, number][] }) {
  return (
    <div>
      <h4 className="text-sm font-semibold text-muted-foreground">{title}</h4>
      <ul className="mt-5 grid gap-2">
        {items.map(([name, value]) => {
          const pct = Math.round(value * 100);
          return (
            <li key={name} className="grid grid-cols-[80px_1fr_40px] items-center gap-0 lg:gap-2 text-sm">
              <span>{name}</span>
              <span className="h-1.5 overflow-hidden rounded-full bg-border">
                <span className="block h-full rounded-full bg-foreground" style={{ width: `${pct}%` }} />
              </span>
              <span className="text-right font-medium">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
