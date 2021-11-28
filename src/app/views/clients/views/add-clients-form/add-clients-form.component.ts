import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

import {BehaviorSubject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {FormStatus} from '../../../../models/form-status.enum';
import {ClientsForm} from './models/clients-form.model';
import {ClientsFormService} from './services/clients-form.service';

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
              private clientsFormService: ClientsFormService) {
  }

  public ngOnInit(): void {
    this.initiateFormFromSavedState();
    this.clientsForm.valueChanges.pipe(debounceTime(400))
      .subscribe((formData: ClientsForm) => {
        this.clientsFormService.saveClientsFormData(formData);
      });
  }

  private initiateFormFromSavedState(): void {
    const clientsFormData: ClientsForm | null = this.clientsFormService.getClientsFormData();
    if (clientsFormData) {
      clientsFormData.clients.forEach(_ => {
        this.addNextClientFormRow();
      });
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

}
