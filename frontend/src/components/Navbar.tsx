import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { cn } from "@/lib/utils";

function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="size-6" aria-hidden="true">
      <path d="M16 6 27 25H5Z" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="round" />
    </svg>
  );
}

const links = [
  { href: "#como-funciona", label: "Cómo funciona" },
  { href: "#categorias", label: "Categorías" },
  { href: "#noticias", label: "Noticias" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#" className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Logo />
          Prisma
        </a>
        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={cn(buttonVariants({ variant: "ghost", size: "sm" }), "text-muted-foreground hover:text-foreground")}>
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-1">
          <ThemeToggle />
          <a href="#noticias" className={buttonVariants({ size: "sm" })}>
            Ver noticias
          </a>
        </div>
      </div>
    </header>
  );
}
