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

  const news = NEWS.find((n) => n.id === newsId)!;

  function toggle(id: LayerId) {
    setActive((a) => ({ ...a, [id]: !a[id] }));
  }

  return (
    <section id="news" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        
        <SectionHeading title="NOTICIAS"></SectionHeading>

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
            <p className="text-sm text-primary/50">{news.summary}</p>
            <div className="relative mt-4 h-115 overflow-hidden rounded-xl border border-border bg-card sm:h-135">
              <Suspense fallback={<p className="grid size-full place-items-center text-sm text-muted-foreground">Cargando escena…</p>}>
                <LayerScene values={news.values} active={active} focus={focus} onFocus={setFocus} />
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
