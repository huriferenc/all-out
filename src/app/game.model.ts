import { Helper } from './helper';

export const CELL_NUMBER = 25;

export class Cell {
  id: number;
  selected: boolean;
  // target: boolean;

  constructor(id = Helper.randomNumber(), selected = false /*,target = false*/) {
    this.id = id;
    this.selected = selected;
    // this.target = target;
  }
}

// export interface Cell {
//   id: number;
//   selected: boolean;
//   // target: boolean;
// }
