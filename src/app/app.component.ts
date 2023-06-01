import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { StoreService } from './store.service';
import { BehaviorSubject } from 'rxjs';
import { CELL_NUMBER, Cell } from './game.model';
import { DialogService } from '@ngneat/dialog';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { YouWinDialogComponent } from './you-win-dialog/you-win-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  moves$: BehaviorSubject<number>;
  cells$: BehaviorSubject<Cell[]>;

  seconds = 0;
  time = '00:00';
  timer: any;

  private dialog = inject(DialogService);

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.moves$ = this.storeService.moves$;
    this.cells$ = this.storeService.cells$;

    this.storeService.checkStoreData();
    // this.selectedCells = this.storeService.cells.filter((item) => item.turnedOut);

    this.startTimer();
  }

  ngOnDestroy(): void {
    this.stopTimer();
  }

  getRowAndColumnNumber() {
    return Math.ceil(Math.sqrt(CELL_NUMBER));
  }

  openHelpDialog() {
    this.dialog.open(HelpDialogComponent);
  }

  openWinnerDialog() {
    this.dialog.open(YouWinDialogComponent);
  }

  selectCell(cell: Cell): void {
    this.storeService.cells = this.storeService.cells.map((item) => {
      if (
        item.id === cell.id ||
        (item.x === cell.x - 1 && item.y === cell.y) ||
        (item.x === cell.x + 1 && item.y === cell.y) ||
        (item.x === cell.x && item.y === cell.y - 1) ||
        (item.x === cell.x && item.y === cell.y + 1)
      ) {
        item.turnedOut = !item.turnedOut;
      }

      return item;
    });

    this.increaseMoves();

    this.checkTurnedOutCells();
  }

  private increaseMoves(): void {
    ++this.storeService.moves;
  }

  private checkTurnedOutCells(): void {
    const isAllOut = this.storeService.cells.every((item) => item.turnedOut);

    if (isAllOut) {
      this.openWinnerDialog();
      this.restartTimer();
      this.storeService.newGame();
    }
  }

  private restartTimer(): void {
    this.stopTimer();
    this.startTimer();
  }

  private startTimer() {
    this.timer = setInterval(() => {
      if (this.seconds == 60 * 60 - 1) {
        this.stopTimer();
        return;
      }

      this.seconds++;

      const sec = this.seconds % 60;
      const min = Math.floor(this.seconds / 60);

      this.time = (min < 10 ? '0' + min : min) + ':' + (sec < 10 ? '0' + sec : sec);
    }, 1000);
  }

  private stopTimer() {
    this.seconds = 0;
    this.time = '00:00';
    if (!!this.timer) {
      clearInterval(this.timer);
    }
  }
}
