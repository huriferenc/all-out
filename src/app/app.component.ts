import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { StoreService } from './store.service';
import { BehaviorSubject } from 'rxjs';
import { CELL_NUMBER } from './game.model';
import { DialogService } from '@ngneat/dialog';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

interface Cell {
  id: number;
  selected: boolean;
  // matched: boolean;
}

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
    // this.selectedCells = this.storeService.cells.filter((item) => item.selected);

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

  selectCell(cell: Cell): void {
    this.storeService.cells = this.storeService.cells.map((item) => {
      if (item.id === cell.id) {
        item.selected = !item.selected;
      }

      return item;
    });

    this.increaseMoves();
  }

  private increaseMoves(): void {
    ++this.storeService.moves;
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
    this.time = '00:00';
    if (!!this.timer) {
      clearInterval(this.timer);
    }
  }
}
