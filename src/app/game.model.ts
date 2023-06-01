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

export const DEFAULT_MAP = 1;

export const MAP_NUMBER = 3;

export const MAPS: number[][] = [
  [
    //
    1, 1, 1, 1, 0,
    //
    0, 0, 0, 1, 1,
    //
    0, 1, 0, 0, 0,
    //
    0, 0, 0, 0, 1,
    //
    0, 1, 1, 0, 1
  ],
  [
    //
    1, 1, 0, 0, 0,
    //
    1, 1, 1, 0, 0,
    //
    0, 1, 1, 1, 0,
    //
    0, 0, 1, 1, 1,
    //
    0, 0, 0, 1, 1
  ],
  [
    //
    0, 0, 1, 0, 0,
    //
    0, 1, 0, 1, 0,
    //
    1, 0, 0, 0, 1,
    //
    0, 1, 0, 1, 0,
    //
    0, 0, 1, 0, 0
  ]
];
