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
  selectedMap$: BehaviorSubject<number>;

  seconds = 0;
  time = '00:00';
  timer: any;
  backgroundSoundTimer: any;

  isStarted = false;

  private selectSound = new Audio('../assets/audio/select.mp3');
  private backgroundSound = new Audio('../assets/audio/background.mp3');

  private dialog = inject(DialogService);

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.moves$ = this.storeService.moves$;
    this.cells$ = this.storeService.cells$;
    this.selectedMap$ = this.storeService.selectedMap$;

    this.storeService.checkStoreData();
  }

  ngOnDestroy(): void {
    this.stopTimer();

    this.stopSelectSound();
    this.stopBackgroundSound();

    this.stopBackgroundSoundTimer();
  }

  getRowAndColumnNumber() {
    return Math.ceil(Math.sqrt(CELL_NUMBER));
  }

  start() {
    this.isStarted = true;

    this.startTimer();

    this.playBackgroundSound();
  }

  selectMap(val: -99 | -1 | 1 | 99): void {
    if (!Number.isSafeInteger(val)) {
      return;
    }

    const oldMap = this.storeService.selectedMap;

    this.storeService.selectedMap += val;

    if (oldMap !== this.storeService.selectedMap) {
      this.storeService.newGame();

      this.restartTimer();
    }
  }

  solve() {
    console.log('This function is not working now!');
  }

  resetGame() {
    this.storeService.restartCurrentGame();
    this.restartTimer();
  }

  randomMap() {
    this.storeService.loadMapRandomly();
    this.restartTimer();
  }

  openHelpDialog() {
    this.dialog.open(HelpDialogComponent);
  }

  openWinnerDialog() {
    this.dialog.open(YouWinDialogComponent);
  }

  selectCell(cell: Cell): void {
    this.playSelectSound();

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

  private stopBackgroundSoundTimer() {
    if (!!this.backgroundSoundTimer) {
      clearInterval(this.backgroundSoundTimer);
    }
  }

  private playBackgroundSound() {
    this.backgroundSound.pause();
    this.backgroundSound.currentTime = 0;
    this.backgroundSound.play();

    this.backgroundSoundTimer = setInterval(() => {
      this.backgroundSound.pause();
      this.backgroundSound.currentTime = 0;
      this.backgroundSound.play();
    }, this.backgroundSound.duration * 1000);
  }

  private playSelectSound() {
    this.selectSound.pause();
    this.selectSound.currentTime = 0;
    this.selectSound.play();
  }

  private stopSelectSound() {
    this.selectSound.pause();
    this.selectSound.currentTime = 0;
    this.selectSound = null;
  }

  private stopBackgroundSound() {
    this.backgroundSound.pause();
    this.backgroundSound.currentTime = 0;
    this.backgroundSound = null;
  }
}
