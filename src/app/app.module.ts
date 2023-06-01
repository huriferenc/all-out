import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HelpDialogComponent } from './help-dialog/help-dialog.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, HelpDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
