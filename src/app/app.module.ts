import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { YouWinDialogComponent } from './you-win-dialog/you-win-dialog.component';
import { ToplistDialogComponent } from './toplist-dialog/toplist-dialog.component';
import { NewScoreDialogComponent } from './new-score-dialog/new-score-dialog.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HelpDialogComponent,
    YouWinDialogComponent,
    ToplistDialogComponent,
    NewScoreDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
