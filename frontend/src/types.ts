export type LayerId = "politica" | "proposito" | "registro" | "contenido";

export interface Layer {
  id: LayerId;
  name: string;
  color: string;
  x: [string, string];
  y: [string, string];
  description: string;
}

export interface LayerReading {
  x: number;
  y: number;
  c: number;
  ev: [string, string];
}

export interface News {
  id: string;
  outlet: string;
  headline: string;
  summary: string;
  values: Record<LayerId, LayerReading>;
  temas: [string, number][];
  intencion: [string, number][];
}
