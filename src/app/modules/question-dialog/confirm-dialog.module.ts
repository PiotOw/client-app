import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {ConfirmDialogComponent} from './confirm-dialog.component';


@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    ConfirmDialogComponent,
  ],
})
export class ConfirmDialogModule {
}
