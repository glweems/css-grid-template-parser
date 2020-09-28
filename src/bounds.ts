import { Grid } from './types'

const find = (
  fn: (...args: number[]) => number,
  direction: 'row' | 'column',
  extremum: 'start' | 'end',
  { areas }: Grid
): number => fn(...Object.keys(areas).map(cell => areas[cell][direction][extremum]))

export const minColumnStart = (grid: Grid): number => find(Math.min, 'column', 'start', grid)

export const maxColumnStart = (grid: Grid): number => find(Math.max, 'column', 'start', grid)

export const minRowStart = (grid: Grid): number => find(Math.min, 'row', 'start', grid)

export const maxRowStart = (grid: Grid): number => find(Math.max, 'row', 'start', grid)

export const minColumnEnd = (grid: Grid): number => find(Math.min, 'column', 'end', grid)

export const maxColumnEnd = (grid: Grid): number => find(Math.max, 'column', 'end', grid)

export const minRowEnd = (grid: Grid): number => find(Math.min, 'row', 'end', grid)

export const maxRowEnd = (grid: Grid): number => find(Math.max, 'row', 'end', grid)
