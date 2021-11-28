import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup, FormArray, FormControl, Validators} from '@angular/forms';
import {Router, Event, ResolveStart} from '@angular/router';

import {BehaviorSubject} from 'rxjs';
import {debounceTime, filter} from 'rxjs/operators';

import {FormStatus} from '../../../../models/form-status.enum';
import {ClientsForm} from './models/clients-form.model';
import {ClientsFormService} from '../../services/clients-form.service';

@Component({
  selector: 'app-add-clients-form',
  templateUrl: './add-clients-form.component.html',
  styleUrls: ['./add-clients-form.component.scss'],
})
export class AddClientsFormComponent implements OnInit {

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
              private router: Router) {
  }

  public ngOnInit(): void {
    this.initiateFormFromSavedState();
    this.clientsForm.valueChanges.pipe(debounceTime(400))
      .subscribe((formData: ClientsForm) => {
        this.clientsFormService.saveClientsFormData(formData);
      });
    this.router.events
      .pipe(filter((event: Event) => event instanceof ResolveStart))
      .subscribe((resolveStart: Event) => {
        if (resolveStart instanceof ResolveStart && resolveStart.url !== '/clients/add') {
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
    this.router.navigate(['clients/dashboard']).then();
  }

}
