export const CELL_NUMBER = 25;

export const MAX_X = 5;

export class Cell {
  id: number;
  selected: boolean;
  x: number;
  y: number;

  constructor(id: number, selected = false) {
    this.id = id;
    this.selected = selected;

    this.x = id % MAX_X;
    this.y = Math.floor(id / MAX_X);
  }
}

// export interface Cell {
//   id: number;
//   selected: boolean;
//   // target: boolean;
// }
