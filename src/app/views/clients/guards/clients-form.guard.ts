import {Injectable} from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {Observable} from 'rxjs';

import {ClientsFormService} from '../services/clients-form.service';
import {QuestionDialogComponent} from '../../../modules/question-dialog/question-dialog.component';
import {QuestionDialogData} from '../../../models/question-dialog-data.model';

@Injectable()
export class ClientsFormGuard implements CanDeactivate<unknown> {

  constructor(private clientsFormService: ClientsFormService,
              private matDialog: MatDialog) {
  }

  public canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.clientsFormService.getIsClientsFormFilled()) {
      return true;
    } else {
      const questionDialogData: QuestionDialogData = {
        header: 'Nie zapisano wszystkich zmian',
        content: 'Czy na pewno chcesz przerwać dodawanie klientów?',
      };
      const dialogRef: MatDialogRef<QuestionDialogComponent>
        = this.matDialog.open(QuestionDialogComponent, {
          data: questionDialogData,
      });
      return dialogRef.afterClosed();
    }
  }

}
