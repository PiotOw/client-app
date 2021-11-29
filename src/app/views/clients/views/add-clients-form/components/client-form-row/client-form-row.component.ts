import {Component, forwardRef, Input, OnInit, Output, EventEmitter, OnDestroy} from '@angular/core';
import {NG_VALUE_ACCESSOR, FormGroup, FormControl, Validators, ControlValueAccessor} from '@angular/forms';
import {trigger, transition} from '@angular/animations';

import {BehaviorSubject, Subject} from 'rxjs';
import {skip, takeUntil} from 'rxjs/operators';

import {Client} from '../../../../../../models/client/client.model';
import {ClientValidators} from '../../../../../../validators/client.validators';
import {slideVertically} from '../../../../../../animations/slide-animations';
import {Direction} from '../../../../../../models/direction.enum';
import {FormStatus} from '../../../../../../models/form-status.enum';

@Component({
  selector: 'app-client-form-row',
  templateUrl: './client-form-row.component.html',
  styleUrls: ['./client-form-row.component.scss'],
  providers: [
    {provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => ClientFormRowComponent), multi: true},
  ],
  animations: [
    trigger('contactErrorAnimation', [
      transition('* => *', slideVertically(Direction.DOWN)),
    ]),
  ],
})
export class ClientFormRowComponent implements ControlValueAccessor, OnInit, OnDestroy {

  @Output() public remove: EventEmitter<void> = new EventEmitter<void>();
  @Output() public statusChanges: EventEmitter<FormStatus> = new EventEmitter<FormStatus>();

  @Input() public formSubmit$: BehaviorSubject<void> | undefined;
  @Input() public showRemoveButton: boolean = true;

  constructor() {
    this.clientForm.get('firstname')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((firstname: string) => {
        this.firstnameIllegalCharacters =
          this.clientForm.get('firstname')?.hasError('illegalCharacters') ?
            this.getIllegalCharactersFromString(firstname, this.legalClientNameCharactersRegEx) :
            '';
      });
    this.clientForm.get('lastname')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((lastname: string) => {
        this.lastnameIllegalCharacters =
          this.clientForm.get('lastname')?.hasError('illegalCharacters') ?
            this.getIllegalCharactersFromString(lastname, this.legalClientNameCharactersRegEx) :
            '';
      });
    this.clientForm.statusChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe((status: FormStatus) => {
      this.statusChanges.emit(status);
    });
  }

  public disabled: boolean = false;
  public touched: boolean = false;
  public clientForm: FormGroup = new FormGroup({
    firstname: new FormControl(null, [Validators.required, ClientValidators.clientName]),
    lastname: new FormControl(null, [Validators.required, ClientValidators.clientName]),
    email: new FormControl(null, Validators.email),
    phoneNumber: new FormControl(null,
      [
        Validators.minLength(9),
        Validators.maxLength(11),
        Validators.pattern(/^[0-9]*$/),
      ]
    ),
  }, ClientValidators.contact);

  public firstnameIllegalCharacters: string = '';
  public lastnameIllegalCharacters: string = '';
  private legalClientNameCharactersRegEx: RegExp = new RegExp(
    /[ĄąĆćĘęŁłŃńÓóŚśŹźŻża-zA-Z -]/g
  );

  private destroy$: Subject<void> = new Subject<void>();

  public ngOnInit(): void {
    this.formSubmit$?.pipe(skip(1),
      takeUntil(this.destroy$))
      .subscribe(_ => {
        this.touched = true;
        this.clientForm.markAllAsTouched();
      });

    this.clientForm.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
      this.onChange(this.clientForm.getRawValue());
    });
  }

  public getIllegalCharactersFromString(value: string, regEx: RegExp): string {
    return Array.from(new Set(value.replace(regEx, '').split(''))).join(' ');
  }

  public removeRowClick(): void {
    this.remove.emit();
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

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
