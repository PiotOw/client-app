import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators, ControlValueAccessor} from '@angular/forms';

import {BehaviorSubject} from 'rxjs';
import {skip} from 'rxjs/operators';

import {Client} from '../../../../../../models/client/client.model';
import {ClientValidators} from '../../../../../../validators/client.validators';

@Component({
  selector: 'app-client-form-row',
  templateUrl: './client-form-row.component.html',
  styleUrls: ['./client-form-row.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ClientFormRowComponent), multi: true},
  ],
})
export class ClientFormRowComponent implements ControlValueAccessor, OnInit {

  @Input() public formSubmit$: BehaviorSubject<void> | undefined;

  constructor() {
    this.clientForm.get('firstname')?.valueChanges
      .subscribe((firstname: string) => {
        this.firstnameIllegalCharacters =
          this.clientForm.get('firstname')?.hasError('illegalCharacters') ?
            this.getIllegalCharactersFromString(firstname, this.legalClientNameCharactersRegEx) :
            '';
      });
    this.clientForm.get('lastname')?.valueChanges
      .subscribe((lastname: string) => {
        this.lastnameIllegalCharacters =
          this.clientForm.get('lastname')?.hasError('illegalCharacters') ?
            this.getIllegalCharactersFromString(lastname, this.legalClientNameCharactersRegEx) :
            '';
      });
  }

  public disabled: boolean = false;
  public touched: boolean = false;
  public clientForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, ClientValidators.clientName]),
    lastname: new FormControl(null, [Validators.required, ClientValidators.clientName]),
    email: new FormControl(null, Validators.email),
    phoneNumber: new FormControl(null,
      [Validators.minLength(9), Validators.maxLength(11)]
    ),
  }, ClientValidators.contact);

  public firstnameIllegalCharacters: string = '';
  public lastnameIllegalCharacters: string = '';
  private legalClientNameCharactersRegEx: RegExp = new RegExp(
    /[ĄąĆćĘęŁłŃńÓóŚśŹźŻża-zA-Z -]/g
  );

  public ngOnInit(): void {
    this.formSubmit$?.pipe(skip(1))
      .subscribe(_ => {
        this.touched = true;
        this.clientForm.markAllAsTouched();
      });
  }

  public getIllegalCharactersFromString(value: string, regEx: RegExp): string {
    return Array.from(new Set(value.replace(regEx, '').split(''))).join(' ');
  }

  public onChange = (clientData: Client): void => {
  };

  public onTouched = () => {
  };

  public registerOnChange(
    fn: (clientData: Client) => void
  ): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public writeValue(clientData: Client): void {
    if (clientData) {
      this.clientForm.setValue(clientData);
    }
  }
}
