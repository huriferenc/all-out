import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogRef } from '@ngneat/dialog';
import { Score } from '../game.model';

@Component({
  selector: 'app-toplist-dialog',
  templateUrl: './toplist-dialog.component.html',
  styleUrls: ['./toplist-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToplistDialogComponent implements OnInit {
  toplist: Score[] = [];

  private ref: DialogRef<Score[], boolean> = inject(DialogRef);

  ngOnInit(): void {
    if (Array.isArray(this.ref.data) && this.ref.data.length > 0) {
      this.toplist = this.ref.data;
    }
  }
}
