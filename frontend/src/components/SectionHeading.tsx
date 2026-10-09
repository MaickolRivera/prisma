import type { ReactNode } from "react";

export function SectionHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="w-full text-center mb-10">
      {children ? <p className="mb-2 text-sm text-primary/50">{children}</p> : null}
      <h2 className="text-3xl font-semibold tracking-[-0.03em]">{title}</h2>
    </div>
  );
}
