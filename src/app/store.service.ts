import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cell, DEFAULT_MAP, MAP_NUMBER, MAPS, Score, TOP_LIST_LENGTH } from './game.model';
import { LocalStorage } from './local-storage';
import { Helper } from './helper';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  moves$ = new BehaviorSubject(0);
  movesChanged = this.moves$.asObservable();

  cells$: BehaviorSubject<Cell[]> = new BehaviorSubject([]);
  cellsChanged = this.cells$.asObservable();

  selectedMap$ = new BehaviorSubject(DEFAULT_MAP);
  selectedMapChanged = this.selectedMap$.asObservable();

  topList$: BehaviorSubject<Score[]> = new BehaviorSubject([]);
  topListChanged = this.topList$.asObservable();

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
    if (Array.isArray(val) && val.length > 0) {
      this.cells$.next(val);
    }
  }

  get selectedMap() {
    return this.selectedMap$.getValue();
  }
  set selectedMap(val: number) {
    this.selectedMap$.next(val < 0 ? 0 : val >= MAP_NUMBER ? MAP_NUMBER - 1 : val);
  }

  get topList() {
    return this.topList$.getValue();
  }
  set topList(val: Score[]) {
    if (Array.isArray(val)) {
      this.topList$.next(val);
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
    this.selectedMapChanged.subscribe((value: number) => {
      if (!this.isFirstLoad && Number.isSafeInteger(value)) {
        LocalStorage.setItem('selectedMap', value);
      }
    });
    this.topListChanged.subscribe((value: Score[]) => {
      if (!this.isFirstLoad && Array.isArray(value)) {
        LocalStorage.setItem('topList', value);
      }
    });
  }

  checkStoreData() {
    const moves: number = LocalStorage.getItem('moves');
    const cells: Cell[] = LocalStorage.getItem('cells');
    const selectedMap: number = LocalStorage.getItem('selectedMap');
    const topList: Score[] = LocalStorage.getItem('topList');

    this.isFirstLoad = false;

    if (Number.isSafeInteger(moves)) {
      this.moves = moves;
    }

    if (Number.isSafeInteger(selectedMap)) {
      this.selectedMap = selectedMap;
    }

    if (Array.isArray(cells) && cells.length > 0) {
      this.cells = cells;
    } else {
      this.newGame();
    }

    if (Array.isArray(topList) && topList.length > 0) {
      this.topList = topList;
    } else {
      this.topList = [];
    }
  }

  newGame(): void {
    this.resetMoves();
    this.generateCells();
  }

  restartCurrentGame(): void {
    this.newGame();
  }

  loadMapRandomly(): void {
    this.selectedMap = Helper.randomNumber(0, MAP_NUMBER - 1);
    this.newGame();
  }

  addScore(name: string, score = 0) {
    let topList = [...this.topList];

    topList.push(new Score(name, score));

    topList = topList.sort((a, b) => b.score - a.score);
    if (topList.length > TOP_LIST_LENGTH) {
      topList = topList.slice(0, TOP_LIST_LENGTH);
    }

    this.topList = topList;
  }

  private resetMoves(): void {
    this.moves = 0;
  }

  private generateCells(): void {
    this.cells = MAPS[this.selectedMap].map((val, index) => new Cell(index, !!val));
  }
}
