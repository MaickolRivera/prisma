import { lazy, Suspense, useState } from "react";
import { AnalysisPanel } from "@/components/AnalysisPanel";
import { SectionHeading } from "@/components/SectionHeading";
import { LAYERS } from "@/data/layers";
import { NEWS } from "@/data/news";
import { cn } from "@/lib/utils";
import type { LayerId } from "@/types";

const LayerScene = lazy(() => import("@/components/LayerScene").then((m) => ({ default: m.LayerScene })));

const allOn = Object.fromEntries(LAYERS.map((l) => [l.id, true])) as Record<LayerId, boolean>;

export function NewsExplorer() {
  const [newsId, setNewsId] = useState(NEWS[0].id);
  const [active, setActive] = useState(allOn);
  const [focus, setFocus] = useState<LayerId>("politica");
  const [flat, setFlat] = useState(false);

  const news = NEWS.find((n) => n.id === newsId)!;

  function toggle(id: LayerId) {
    setActive((a) => ({ ...a, [id]: !a[id] }));
  }

  return (
    <section id="noticias" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <SectionHeading title="Noticias">
          Elige una noticia y mira cómo la descompone Laya. Compara la nota sobria con la alarmista y fíjate en cuánto cambian las flechas. Estos análisis son datos de ejemplo.
        </SectionHeading>

        <div className="mt-12 grid gap-8 lg:grid-cols-[300px_minmax(0,1fr)]">
          <ul className="grid content-start gap-1" aria-label="Noticias de ejemplo">
            {NEWS.map((n) => (
              <li key={n.id}>
                <button
                  type="button"
                  aria-pressed={n.id === newsId}
                  onClick={() => setNewsId(n.id)}
                  className={cn(
                    "w-full cursor-pointer rounded-lg border p-3.5 text-left transition-colors",
                    n.id === newsId ? "border-foreground bg-accent" : "border-transparent hover:bg-accent",
                  )}
                >
                  <span className="block text-[13px] text-muted-foreground">{n.outlet}</span>
                  <span className="mt-1 block text-[15px] font-medium leading-snug">{n.headline}</span>
                </button>
              </li>
            ))}
          </ul>

          <div className="min-w-0">
            <h3 className="text-xl font-semibold leading-snug tracking-tight">{news.headline}</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              {news.outlet} | {news.summary}
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-1.5" role="group" aria-label="Capas visibles">
                {LAYERS.map((l) => (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={active[l.id]}
                    onClick={() => toggle(l.id)}
                    className={cn(
                      "inline-flex cursor-pointer items-center gap-2 rounded-full border px-3 py-1 text-sm transition-colors",
                      active[l.id] ? "border-foreground" : "border-border text-muted-foreground line-through hover:bg-accent",
                    )}
                  >
                    <span className="size-2.5 rounded-full" style={{ background: active[l.id] ? l.color : "transparent", border: `1.5px solid ${l.color}` }} aria-hidden="true" />
                    {l.name}
                  </button>
                ))}
              </div>
              <div className="flex overflow-hidden rounded-md border border-border text-sm" role="group" aria-label="Modo de vista">
                {[
                  { label: "Capas apiladas", value: false },
                  { label: "Un solo plano", value: true },
                ].map((o) => (
                  <button
                    key={o.label}
                    type="button"
                    aria-pressed={flat === o.value}
                    onClick={() => setFlat(o.value)}
                    className={cn(
                      "cursor-pointer px-3 py-1.5 transition-colors first:border-r first:border-border",
                      flat === o.value ? "bg-primary font-medium text-primary-foreground" : "hover:bg-accent",
                    )}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="relative mt-4 h-[460px] overflow-hidden rounded-xl border border-border bg-card sm:h-[540px]">
              <Suspense fallback={<p className="grid size-full place-items-center text-sm text-muted-foreground">Cargando escena…</p>}>
                <LayerScene values={news.values} active={active} focus={focus} flat={flat} onFocus={setFocus} />
              </Suspense>
              <p className="pointer-events-none absolute bottom-3 left-4 text-xs text-muted-foreground">
                Arrastra para girar | rueda para acercar | toca una flecha para enfocar su capa
              </p>
              <p className="pointer-events-none absolute bottom-3 right-4 hidden text-right text-xs text-muted-foreground sm:block">
                Largo: intensidad | Opacidad: confianza de Laya
              </p>
            </div>

            <div className="mt-6">
              <AnalysisPanel news={news} focus={focus} onFocus={setFocus} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
