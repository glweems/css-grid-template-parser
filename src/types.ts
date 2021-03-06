export interface Track {
  start: number;
  end: number;
  span: number;
}

export interface Area {
  row: Track;
  column: Track;
}

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Grid {
  width: number;
  height: number;
  areas: Record<string, Area>;
}

export type Unit = 'fr' | '%' | 'px' | 'vw' | 'vh' | 'em' | 'rem' | 'auto';
export interface Entry {
  amount: number;
  unit: Unit;
}
