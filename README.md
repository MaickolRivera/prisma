# Prisma

> El conocimiento es poder.

Prisma descompone una noticia en capas para mostrar **cómo** te la están contando, no solo **qué** te cuentan. Cada texto se ubica en cuatro planos:

| Capa | Ejes | Qué mide |
| --- | --- | --- |
| **Política** | izquierda ↔ derecha · libertario ↔ autoritario | Hacia dónde empuja el texto en lo económico y lo social |
| **Propósito** | informar ↔ entretener · neutral ↔ polémico | Si busca informar o entretener, y qué tan polémico es |
| **Registro** | racional ↔ emocional · esperanza ↔ miedo | El tono del texto |
| **Contenido** | hechos ↔ opinión · local ↔ global | Si se apoya en hechos u opinión, y su alcance |

Además de la posición en cada plano, Prisma muestra la confianza de la lectura, los fragmentos del texto que la respaldan, los temas principales y la intención (informar, persuadir, alarmar, movilizar...).

## Estado del proyecto

🚧 En desarrollo. Por ahora solo existe el **frontend**, que funciona con noticias de ejemplo (`frontend/src/data/news.ts`). El backend encargado del análisis real todavía no está implementado.

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Three.js](https://threejs.org) para la visualización 3D de las capas
- [lucide-react](https://lucide.dev) para los íconos

## Estructura

```
prisma/
└── frontend/
    ├── public/          # Archivos estáticos
    └── src/
        ├── components/  # Secciones de la página y componentes de UI
        ├── data/        # Definición de capas y noticias de ejemplo
        ├── lib/         # Utilidades
        └── types.ts     # Tipos compartidos
```

## Cómo ejecutarlo

### Requisitos

- [Node.js](https://nodejs.org) 22 o superior
- [pnpm](https://pnpm.io) (`npm install -g pnpm`)

### Frontend

```bash
cd frontend
pnpm install
pnpm dev
```

La aplicación queda disponible en http://localhost:5173.

### Scripts disponibles

| Comando | Descripción |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo con recarga en caliente |
| `pnpm build` | Revisa los tipos y genera la versión de producción en `dist/` |
| `pnpm preview` | Sirve localmente la versión de producción |
