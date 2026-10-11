# Prisma

> El conocimiento es poder.

Prisma descompone una noticia en capas para mostrar **cómo** te la están contando, no solo **qué** te cuentan. Cada texto se ubica en cuatro planos:

| Capa | Ejes | Qué mide |
| --- | --- | --- |
| **Política** | izquierda ↔ derecha · libertario ↔ autoritario | Hacia dónde empuja el texto en lo económico y lo social |
| **Intención** | informar ↔ persuadir · equilibrado ↔ de un solo lado | Si busca informar o convencer, y si da voz a varias partes |
| **Tono** | sobrio ↔ sensacionalista · esperanza ↔ miedo/indignación | Cómo te quiere hacer sentir |
| **Sustento** | hechos ↔ opinión · fuentes verificables ↔ sin fuentes | Qué tan respaldado está lo que dice |

Además de la posición en cada plano, Prisma muestra la confianza de la lectura, los **temas** principales y **alertas** de manipulación (clickbait, lenguaje cargado, apelación al miedo, "nosotros contra ellos", ataque personal, generalización).

## Estado del proyecto

🚧 En desarrollo.

- **Frontend:** funciona con noticias de ejemplo (`frontend/src/data/news.ts`) y todavía muestra las capas anteriores (Propósito, Registro, Contenido). Aún no está conectado al backend.
- **Backend:** la API ya analiza noticias con [Laya](https://github.com/NandhaKishorM/laya) y devuelve las respuestas crudas del modelo. Falta convertirlas al formato que usa el frontend.

## Stack

- [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org)
- [Vite](https://vite.dev)
- [Tailwind CSS 4](https://tailwindcss.com)
- [Three.js](https://threejs.org) para la visualización 3D de las capas
- [lucide-react](https://lucide.dev) para los íconos

### Backend

- [Python](https://www.python.org) + [FastAPI](https://fastapi.tiangolo.com)
- [Laya](https://github.com/NandhaKishorM/laya) (checkpoint multilingüe) para clasificar las noticias

## Estructura

```
prisma/
├── frontend/
│   ├── public/            # Archivos estáticos
│   └── src/
│       ├── components/    # Secciones de la página y componentes de UI
│       ├── data/          # Definición de capas y noticias de ejemplo
│       ├── lib/           # Utilidades
│       └── types.ts       # Tipos compartidos
└── backend/
    ├── app/
    │   ├── main.py        # App de FastAPI, CORS y carga del modelo
    │   ├── api/routes/    # Endpoints (/health, /analysis)
    │   └── questions/     # Preguntas que se le hacen a Laya
    ├── prueba_laya.py     # Script para probar las preguntas sin levantar la API
    └── requirements.txt
```

## Cómo ejecutarlo

### Requisitos

- [Node.js](https://nodejs.org) 22 o superior
- [pnpm](https://pnpm.io) (`npm install -g pnpm`)
- [Python](https://www.python.org) 3.10 o superior (probado con 3.13)
- Unos 2 GB libres en disco: la primera vez que arranca, el backend descarga el modelo de Laya (queda en la caché de Hugging Face, `~/.cache/huggingface`)

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

### Backend

```bash
cd backend
python -m venv venv
```

Activa el entorno virtual:

```bash
# Windows (PowerShell)
venv\Scripts\Activate.ps1

# macOS / Linux
source venv/bin/activate
```

> Si PowerShell bloquea el script de activación, ejecuta una vez `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.

Instala las dependencias y arranca la API:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload
```

La API queda en http://localhost:8000. El modelo se carga una sola vez al arrancar, así que el servidor tarda unos segundos en estar listo (más la primera vez, por la descarga).

> Con `--reload` el modelo se vuelve a cargar cada vez que guardas un archivo. Si ves un `KeyboardInterrupt` en la terminal es por eso y no es un error.

#### Endpoints

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/health` | Indica si la API está viva y si el modelo ya cargó (`model_loaded`) |
| `POST` | `/analysis` | Analiza una noticia y devuelve las respuestas de Laya |

Ejemplo de cuerpo para `/analysis` (`body` debe tener al menos 300 caracteres, si no la API responde `422`):

```json
{
  "new": "Titular de la noticia",
  "body": "Texto completo de la noticia..."
}
```

La forma más fácil de probarla es la documentación interactiva en http://localhost:8000/docs. Recuerda reemplazar el texto de ejemplo (`"string"`) por una noticia real.

#### Probar las preguntas sin la API

Para ajustar las preguntas de `app/questions/laya.py` sin levantar el servidor:

```bash
cd backend
python prueba_laya.py
```
