import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cell } from './game.model';
import { LocalStorage } from './local-storage';

export const CELL_NUMBER = 25;

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  moves$ = new BehaviorSubject(0);
  movesChanged = this.moves$.asObservable();

  cells$: BehaviorSubject<Cell[]> = new BehaviorSubject([]);
  cellsChanged = this.cells$.asObservable();

  get moves() {
    return this.moves$.getValue();
  }
  set moves(val: number) {
    this.moves$.next(val >= 0 ? val : 0);
  }

  get cells() {
    return this.cells$.getValue();
  }
  set cells(val: Cell[]) {
    if (Array.isArray(val)) {
      this.cells$.next(val);
    }
  }

  isFirstLoad = true;

  constructor() {
    this.movesChanged.subscribe((value: number) => {
      if (!this.isFirstLoad && Number.isSafeInteger(value)) {
        LocalStorage.setItem('moves', value);
      }
    });
    this.cellsChanged.subscribe((value: Cell[]) => {
      if (!this.isFirstLoad && Array.isArray(value)) {
        LocalStorage.setItem('cells', value);
      }
    });
  }

  checkStoreData() {
    const moves: number = LocalStorage.getItem('moves');
    const cells: Cell[] = LocalStorage.getItem('cells');

    this.isFirstLoad = false;

    if (Number.isSafeInteger(moves) && moves >= 0) {
      this.moves = moves;
    }

    if (Array.isArray(cells) && cells.length > 0) {
      this.cells = cells;
    } else {
      this.newGame();
    }
  }

  newGame(): void {
    this.resetMoves();
    this.generateCells();
  }

  // restartCurrentGame(): void {
  //   this.resetMoves();
  //   this.resetSelectedCells();
  // }

  private resetMoves(): void {
    this.moves = 0;
  }

  private resetSelectedCells(): void {
    this.cells = this.cells.map((item) => ({ ...item, selected: false }));
  }

  generateCells(): void {
    this.cells = [...new Array(CELL_NUMBER)].map((_, index) => new Cell(index, false));
  }
}
