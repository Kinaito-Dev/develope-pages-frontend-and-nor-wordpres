export type AttractionCategory = 
  | 'slides'      // Toboganes de alta velocidad
  | 'pools'       // Piscinas y relax
  | 'river'       // Río lento
  | 'kids'        // Zonas infantiles
  | 'theme'       // Parque temático
  | 'food'        // Zona de comida
  | 'service';    // Servicios (baños, taquillas, enfermería, etc.)

export type ThrillLevel = 'relax' | 'familiar' | 'moderado' | 'extremo';

export interface Attraction {
  id: string;
  name: string;
  category: AttractionCategory;
  thrillLevel: ThrillLevel;
  minHeight?: string; // e.g. "1.20m" or "Sin mínimo"
  waitTimeMinutes?: number;
  description: string;
  highlights: string[];
  x: number; // SVG coordinate percentage (0 - 1000)
  y: number; // SVG coordinate percentage (0 - 800)
  iconType: string;
  color?: string;
  photoDescription?: string;
}

export interface ParkZone {
  id: string;
  name: string;
  color: string;
  bounds: { x: number; y: number; zoom: number };
}
