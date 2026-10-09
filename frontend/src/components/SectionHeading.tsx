import type { ReactNode } from "react";

export function SectionHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="max-w-lg">
      <h2 className="text-3xl font-semibold tracking-[-0.03em]">{title}</h2>
      {children ? <p className="mt-2 text-base leading-relaxed text-muted-foreground">{children}</p> : null}
    </div>
  );
}
