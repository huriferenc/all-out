import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogRef } from '@ngneat/dialog';

@Component({
  selector: 'app-new-score-dialog',
  templateUrl: './new-score-dialog.component.html',
  styleUrls: ['./new-score-dialog.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewScoreDialogComponent implements OnInit {
  name: string;

  private ref: DialogRef<null, string> = inject(DialogRef);

  ngOnInit(): void {}

  submit(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.ref.close(this.name);
  }
}
