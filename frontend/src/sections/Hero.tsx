import { ArrowDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { EyeFollower } from "@/components/EyeFollower";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="bg-grid absolute inset-0" aria-hidden="true" />
      <div className="
      relative flex flex-col w-full justify-center 
      items-center gap-4 px-4 py-20 sm:px-6 md:py-40
      ">
        <div className="flex flex-col items-center gap-1">
          <h2 className="text-sm text-primary/80">
            El conocimiento es poder
          </h2>
          <h1 className="text-7xl font-bold">
            PRISMA
          </h1>
        </div>

        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md">
            <EyeFollower className="w-full" />
          </div>
        </div>

        <p className="max-w-lg text-sm leading-[1.4] text-muted-foreground text-center">
          Prisma descompone en capas cada noticia para revelar sus matices, desde la postura política hasta su tono. Muestra la evidencia y su nivel de certeza sin imponer una verdad: te enseña exactamente cómo te la están contando.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="#how-it-works" className={cn(buttonVariants({ variant: "outline", size: "lg" }))}>
            Cómo funciona
            <ArrowDown />
          </a>
          <a href="#news" className={buttonVariants({ size: "lg" })}>
            Analizar noticias
          </a>
        </div>
        
      </div>
    </section>
  );
}
