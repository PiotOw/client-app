import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

import {QuestionDialogComponent} from './question-dialog.component';


@NgModule({
  declarations: [QuestionDialogComponent],
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  exports: [
    QuestionDialogComponent,
  ],
})
export class QuestionDialogModule {
}
