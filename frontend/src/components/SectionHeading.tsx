import type { ReactNode } from "react";

export function SectionHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      <h2 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">{title}</h2>
      {children ? <p className="mt-4 text-base leading-relaxed text-muted-foreground">{children}</p> : null}
    </div>
  );
}
