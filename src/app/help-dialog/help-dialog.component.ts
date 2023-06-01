import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-help-dialog',
  templateUrl: './help-dialog.component.html',
  styleUrls: ['./help-dialog.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HelpDialogComponent {
  ref: DialogRef<any> = inject(DialogRef);
}
