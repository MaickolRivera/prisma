import { ClipboardPaste, Layers, ScanSearch } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";

const steps = [
  {
    icon: ClipboardPaste,
    title: "Pega una noticia",
    text: "Copia el texto o el enlace de algo que viste. No importa si es de un diario, un portal o una cadena de WhatsApp.",
  },
  {
    icon: ScanSearch,
    title: "Laya clasifica",
    text: "Analiza el texto en varias dimensiones y, por cada una, devuelve un puntaje, qué tan segura está y la frase exacta en la que se apoyó.",
  },
  {
    icon: Layers,
    title: "Ves las capas",
    text: "El resultado se dibuja como flechas sobre planos apilados. Cada flecha indica hacia dónde se inclina la noticia en una dimensión.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 md:py-24">
        <SectionHeading title="¿COMÓ FUNCIONA?">
          Descubre como se cuentan las noticias</SectionHeading>

        <ol className="mt-12 grid overflow-hidden rounded-xl border border-border md:grid-cols-3 md:divide-x divide-y md:divide-y-0 divide-border">
          {steps.map((s, i) => (
            <li key={s.title} className="bg-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background">
                  <s.icon className="size-4" aria-hidden="true" />
                </span>
                <span className="font-mono text-sm text-muted-foreground">{i + 1}</span>
              </div>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Qué es Prisma</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              Una herramienta para leer las noticias con más contexto. Como un prisma que separa la luz blanca en colores, descompone una noticia en sus partes para que puedas compararlas y notar patrones: qué medios empujan siempre hacia el mismo lado y qué temas llegan con miedo.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold tracking-tight">Qué no es</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-muted-foreground">
              No es un verificador de datos ni un árbitro de la verdad. Una IA puede equivocarse o inclinarse sin querer, y las personas tampoco siempre coinciden al juzgar un sesgo. Por eso cada resultado trae su evidencia y su nivel de confianza, para que lo discutas en vez de aceptarlo sin más.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
