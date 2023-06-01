export const CELL_NUMBER = 25;

export const MAX_X = 5;

export class Cell {
  id: number;
  turnedOut: boolean;
  x: number;
  y: number;

  constructor(id: number, turnedOut = false) {
    this.id = id;
    this.turnedOut = turnedOut;

    this.x = id % MAX_X;
    this.y = Math.floor(id / MAX_X);
  }
}

// export interface Cell {
//   id: number;
//   turnedOut: boolean;
//   // target: boolean;
// }
