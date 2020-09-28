// @flow

import type { Grid, Area } from "./types";

const matchingArea = (
  areas: { [key: string]: Area },
  row: number,
  column: number
) => (area: string) =>
  areas[area].row.start <= row + 1 &&
  areas[area].row.end > row + 1 &&
  areas[area].column.start <= column + 1 &&
  areas[area].column.end > column + 1;

const getColumns = (
  areas: string[],
  grid: Grid,
  row: number,
  current: number = 0,
  cols: string = ""
): string => {
  const area = (areas as any).find(
    matchingArea(grid.areas, row, current) as any
  );

  cols += typeof area === "string" ? area : ".";

  if (current < grid.width - 1) {
    return getColumns(areas, grid, row, current + 1, `${cols} `);
  }

  return cols;
};

const getRows = (
  areas: Array<string>,
  grid: Grid,
  current: number = 0,
  rows: string = ""
): string => {
  rows += `"${getColumns(areas, grid, current)}"`;

  if (current < grid.height - 1) {
    return getRows(areas, grid, current + 1, `${rows}\n`);
  }

  return rows;
};

export const template = (grid: Grid): string =>
  getRows(Object.keys(grid.areas), grid);
