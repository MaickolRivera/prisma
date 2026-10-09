import { ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { EyeFollower } from "@/components/EyeFollower";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 md:py-28 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.045em] sm:text-6xl lg:text-7xl">
            El conocimiento es poder.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Saber qué está pasando es el primer paso. Saber cómo te lo cuentan es el segundo. Prisma separa cada noticia en capas para que veas su postura política, su intención y su tono antes de formarte una opinión.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#noticias" className={buttonVariants({ size: "lg" })}>
              Analizar noticias
            </a>
            <a href="#como-funciona" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
              Cómo funciona
              <ArrowDown />
            </a>
          </div>
          <p className="mt-6 max-w-md text-sm text-muted-foreground">
            Laya, la IA de Prisma, muestra siempre la evidencia y qué tan segura está. No decide qué es verdad: te enseña cómo está contado.
          </p>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-xl border border-border bg-card p-8 sm:p-0">
            <EyeFollower className="w-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
