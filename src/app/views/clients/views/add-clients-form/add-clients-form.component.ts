import {Component, OnInit} from '@angular/core';
import {FormGroup, FormArray, FormControl, Validators} from '@angular/forms';

import {BehaviorSubject} from 'rxjs';

import {ClientValidators} from '../../../../validators/client.validators';

@Component({
  selector: 'app-add-clients-form',
  templateUrl: './add-clients-form.component.html',
  styleUrls: ['./add-clients-form.component.scss'],
})
export class AddClientsFormComponent implements OnInit {

  public formSubmitSubject$: BehaviorSubject<void> = new BehaviorSubject<void>(undefined);

  public clientsForm: FormGroup = new FormGroup({
    clients: new FormArray([
      new FormControl(null, [Validators.required, ClientValidators.contact]),
    ]),
  });

  get clientsFormArray(): FormArray {
    return this.clientsForm.get('clients') as FormArray;
  }

  constructor() {
  }

  public ngOnInit(): void {
  }

  public onClientsFormSubmit(): void {
    this.formSubmitSubject$.next();
    this.clientsFormArray.markAllAsTouched();
  }

  public addNextClient(): void {
    this.clientsFormArray.push(
      new FormControl(null, Validators.required)
    );
  }

}
