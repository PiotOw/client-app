import {Component, OnInit, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {Router, Event, ResolveStart} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

import {BehaviorSubject, Subject} from 'rxjs';
import {debounceTime, filter, takeUntil} from 'rxjs/operators';

import {FormStatus} from '../../../../models/form-status.enum';
import {ClientsForm} from './models/clients-form.model';
import {ClientsFormService} from '../../services/clients-form.service';
import {ClientsApiService} from '../../services/clients-api/clients-api.service';

@Component({
  selector: 'app-add-clients-form',
  templateUrl: './add-clients-form.component.html',
  styleUrls: ['./add-clients-form.component.scss'],
})
export class AddClientsFormComponent implements OnInit, OnDestroy {
  private ADD_CLIENTS_FORM_URL: string = '/clients/add';
  private CLIENTS_DASHBOARD_URL: string = '/clients/dashboard';

  private destroy$: Subject<void> = new Subject();

  public formSubmitSubject$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  public clientsForm: FormGroup = new FormGroup({
    clients: new FormArray([
      new FormControl(null, [Validators.required]),
    ]),
  });

  get clientsFormArray(): FormArray {
    return this.clientsForm.get('clients') as FormArray;
  }

  constructor(private changeDetectorRef: ChangeDetectorRef,
              private clientsFormService: ClientsFormService,
              private router: Router,
              private clientsApiService: ClientsApiService,
              private snackBar: MatSnackBar) {
  }

  public ngOnInit(): void {
    this.initiateFormFromSavedState();
    this.clientsForm.valueChanges.pipe(
      debounceTime(400),
      takeUntil(this.destroy$))
      .subscribe((formData: ClientsForm) => {
        this.clientsFormService.saveClientsFormData(formData);
      });
    this.router.events
      .pipe(filter((event: Event) => event instanceof ResolveStart),
        takeUntil(this.destroy$))
      .subscribe((resolveStart: Event) => {
        if (resolveStart instanceof ResolveStart && resolveStart.url !== this.ADD_CLIENTS_FORM_URL) {
          this.clientsFormService.resetClientsForm();
        }
      });
  }

  private initiateFormFromSavedState(): void {
    const clientsFormData: ClientsForm | null = this.clientsFormService.getClientsFormData();
    if (clientsFormData) {
      for (let i: number = 0; i < clientsFormData.clients.length - 1; i++) {
        this.addNextClientFormRow();
      }
      this.clientsFormService.saveClientsFormData(clientsFormData);
      this.clientsForm.patchValue(clientsFormData);
      this.changeDetectorRef.detectChanges();
    }
  }

  public removeClientFormRow(index: number): void {
    this.clientsFormArray.removeAt(index);
  }

  public setClientRowStatus(index: number, status: FormStatus): void {
    this.clientsFormArray.controls[index].setErrors(
      status === FormStatus.VALID ? null : {clientInformation: true}
    );
  }

  public onClientsFormSubmit(): void {
    this.formSubmitSubject$.next();
    if (this.clientsForm.valid) {
      this.clientsApiService.addClients(this.clientsForm.getRawValue().clients)
        .pipe(takeUntil(this.destroy$))
        .subscribe(_ => {
        this.snackBar.open('Pomy??lnie dodano u??ytkownik??w', 'ZAMKNIJ');
        this.clientsFormService.resetClientsForm();
        this.router.navigate([this.CLIENTS_DASHBOARD_URL]).then();
      }, _ => {
        this.snackBar.open('Wyst??pi?? b????d, prosz?? spr??bowa?? ponownie', 'ZAMKNIJ');
      });
    }
  }

  public addNextClientFormRow(): void {
    this.clientsFormArray.push(
      new FormControl(null, Validators.required)
    );
  }

  public cancelForm(): void {
    const emptyFormData: ClientsForm = {
      clients: [],
    };
    this.clientsForm.reset(emptyFormData, {emitEvent: false});
    this.clientsFormService.resetClientsForm();
    this.router.navigate([this.CLIENTS_DASHBOARD_URL]).then();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
