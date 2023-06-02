export const CELL_NUMBER = 25;

export const MAX_X = 5;

export const MAX_TIME_SCORE = 3600;
export const MAX_MOVE_SCORE = 36000;
export const MIN_SCORE = 100000;

export const TOP_LIST_LENGTH = 10;

export const DEFAULT_MAP = 1;
export const MAP_NUMBER = 3;

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

export class Score {
  name: string;
  score: number;

  constructor(name: string, score = 0) {
    this.name = name;
    this.score = score;
  }
}

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
