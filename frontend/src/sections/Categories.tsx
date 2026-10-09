import { SectionHeading } from "@/components/SectionHeading";
import { MiniPlane } from "@/components/MiniPlane";
import { LAYERS } from "@/data/layers";
import { NEWS } from "@/data/news";

const sample = NEWS[0];

export function Categories() {
  return (
    <section 
    id="categories" 
    className="border-b border-border">

      <div className="
      mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24 
      flex flex-col gap-10">
        <SectionHeading title="CATEGORÍAS">
          No todo se mide igual
        </SectionHeading>

        <div className="gap-10 flex flex-col">
          <div className="flex flex-col gap-2">
            <h3 className="text-xl font-semibold">Capas: ejes que se contrarrestan</h3>
            <p className="text-muted-foreground text-md">
              Cada capa es un plano con dos ejes y un extremo opuesto en cada uno. Laya da un valor entre -100% y +100% por eje, y la noticia queda como una flecha que sale del centro. Una flecha larga significa una inclinación fuerte. Una flecha corta, una noticia casi neutral en esa capa.
            </p>
          </div>

          <ul className="flex flex-row gap-5">
            {LAYERS.map((l) => {
              const v = sample.values[l.id];
              return (
                <li key={l.id} className="flex flex-col gap-4 rounded-xl border border-border bg-card py-6 px-7 w-full">
                  <div className="text-center">
                    <h4 className="flex flex-row items-center justify-center gap-2 font-semibold tracking-tight">
                      <span className="size-2 rounded-sm" style={{ background: l.color }} aria-hidden="true" />
                      {l.name}
                    </h4>
                    <p className="mt-1 text-xs leading-snug text-muted-foreground">{l.description}</p>
                  </div>

                  <div className="min-w-0 flex flex-col items-center">
                    <div className="size-24 shrink-0">
                      <MiniPlane x={v.x} y={v.y} color={l.color} />
                    </div>
                    
                    <p className="mt-2 text-[13px] leading-snug text-center">
                      {l.x[0]} ↔ {l.x[1]}
                      <br />
                      {l.y[0]} ↔ {l.y[1]}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="grid gap-10 lg:grid-cols-[2fr_3fr]">
          <div className="flex flex-col justify-center gap-2">
            <h3 className="text-xl font-semibold">Porcentajes que suman 100</h3>
            <p className="text-muted-foreground text-md">
              El tema y la intención no se oponen: se reparten. Una misma nota puede ser 55% economía, 30% política y 15% sociedad. Por eso no van como flechas sino como barras que siempre completan el total.
            </p>
          </div>

          <div className="grid gap-10 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
            <CompositionGroup title="Temas" items={sample.temas} />
            <CompositionGroup title="Intención" items={sample.intencion} />
          </div>
        </div>

      </div>
    </section>
  );
}

export function CompositionGroup({ title, items }: { title: string; items: [string, number][] }) {
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
