import { Component, OnInit } from '@angular/core';
import { StoreService } from './store.service';
import { BehaviorSubject } from 'rxjs';

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
export class AppComponent implements OnInit {
  moves$: BehaviorSubject<number>;
  cells$: BehaviorSubject<Cell[]>;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.moves$ = this.storeService.moves$;
    this.cells$ = this.storeService.cells$;

    this.storeService.checkStoreData();
    // this.selectedCells = this.storeService.cells.filter((item) => item.selected);
  }

  openHelpDialog() {
    console.log('Dialog');
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
}
