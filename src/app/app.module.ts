import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';
import { YouWinDialogComponent } from './you-win-dialog/you-win-dialog.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HelpDialogComponent, YouWinDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
