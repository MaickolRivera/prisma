import { SectionHeading } from "@/components/SectionHeading";
import { MiniPlane } from "@/components/MiniPlane";
import { LAYERS } from "@/data/layers";
import { NEWS } from "@/data/news";

const sample = NEWS[0];

export function Categories() {
  return (
    <section id="categories" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <SectionHeading title="Dos tipos de categorías">
          No todo se mide igual. Algunas dimensiones se contrarrestan entre sí y otras se reparten un total. Prisma las muestra de forma distinta.
        </SectionHeading>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Capas: ejes que se contrarrestan</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Cada capa es un plano con dos ejes y un extremo opuesto en cada uno, como izquierda contra derecha o informar contra entretener. Laya da un valor entre -100% y +100% por eje, y la noticia queda como una flecha que sale del centro.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              Una flecha larga significa una inclinación fuerte. Una flecha corta, una noticia casi neutral en esa capa. Cuanto más transparente se dibuja, menos segura está Laya.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {LAYERS.map((l) => {
              const v = sample.values[l.id];
              return (
                <li key={l.id} className="flex gap-4 rounded-xl border border-border bg-card p-4">
                  <div className="size-24 shrink-0">
                    <MiniPlane x={v.x} y={v.y} color={l.color} />
                  </div>
                  <div className="min-w-0">
                    <h4 className="flex items-center gap-2 font-semibold tracking-tight">
                      <span className="size-2.5 rounded-sm" style={{ background: l.color }} aria-hidden="true" />
                      {l.name}
                    </h4>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">{l.description}</p>
                    <p className="mt-2 text-[13px] leading-snug">
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

        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">Composición: porcentajes que suman 100</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
              El tema y la intención no se oponen: se reparten. Una misma nota puede ser 55% economía, 30% política y 15% sociedad. Por eso no van como flechas sino como barras que siempre completan el total.
            </p>
          </div>

          <div className="grid gap-6 rounded-xl border border-border bg-card p-6 sm:grid-cols-2">
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
      <ul className="mt-3 grid gap-2.5">
        {items.map(([name, value]) => {
          const pct = Math.round(value * 100);
          return (
            <li key={name} className="grid grid-cols-[88px_1fr_40px] items-center gap-3 text-sm">
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
