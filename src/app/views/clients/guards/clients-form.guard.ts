import {Injectable} from '@angular/core';
import {CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

import {Observable} from 'rxjs';

import {ClientsFormService} from '../services/clients-form.service';
import {ConfirmDialogData} from '../../../models/confirm-dialog-data.model';
import {ConfirmDialogComponent} from '../../../modules/question-dialog/confirm-dialog.component';

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
      const questionDialogData: ConfirmDialogData = {
        header: 'Nie zapisano wszystkich zmian',
        content: 'Czy na pewno chcesz przerwać dodawanie klientów?',
      };
      const dialogRef: MatDialogRef<ConfirmDialogComponent>
        = this.matDialog.open(ConfirmDialogComponent, {
          data: questionDialogData,
      });
      return dialogRef.afterClosed();
    }
  }

}
