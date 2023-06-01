import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-you-win-dialog',
  templateUrl: './you-win-dialog.component.html',
  styleUrls: ['./you-win-dialog.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YouWinDialogComponent {
  ref: DialogRef<any> = inject(DialogRef);
}
