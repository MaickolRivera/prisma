import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains("dark"));

  function toggle() {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("prisma-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
      aria-label={dark ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
    >
      {dark ? <Sun /> : <Moon />}
    </button>
  );
}
