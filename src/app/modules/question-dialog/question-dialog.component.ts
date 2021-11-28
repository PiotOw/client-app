import {Component, OnInit, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

import {QuestionDialogData} from '../../models/question-dialog-data.model';

@Component({
  selector: 'app-question-dialog',
  templateUrl: './question-dialog.component.html',
  styleUrls: ['./question-dialog.component.scss'],
})
export class QuestionDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<QuestionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuestionDialogData
  ) {
  }

  public ngOnInit(): void {
  }

  public onNegativeClick(): void {
    this.dialogRef.close(false);
  }

  public onPositiveClick(): void {
    this.dialogRef.close(true);
  }

}
