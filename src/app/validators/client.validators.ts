import {ValidatorFn, AbstractControl, ValidationErrors, FormControl} from '@angular/forms';

export class ClientValidators {
  private static clientNameRegEx: RegExp = new RegExp(
    `^[ĄąĆćĘęŁłŃńÓóŚśŹźŻża-zA-Z -]*$`
  );

  private static removeErrorFromFormControl(
    formControl: FormControl, errorKey: string
  ): void {
    delete formControl.errors?.[errorKey];
    if (formControl.errors && Object.keys(formControl.errors).length === 0) {
      formControl?.setErrors(null);
    }
  }

  public static clientName: ValidatorFn =
    (control: AbstractControl): ValidationErrors | null => {
      return ClientValidators.clientNameRegEx.test(control.value) ?
        null : {illegalCharacters: true};
    };

  public static contact: ValidatorFn =
    (control: AbstractControl): ValidationErrors | null => {
      const emailFormControl: FormControl = control.get('email') as FormControl;
      const phoneNumberFormControl: FormControl = control.get('phoneNumber') as FormControl;
      if (emailFormControl && phoneNumberFormControl) {

        ClientValidators.removeErrorFromFormControl(emailFormControl, 'contact');
        ClientValidators.removeErrorFromFormControl(phoneNumberFormControl, 'contact');

        if ((!emailFormControl.valid || !emailFormControl.value) &&
          (!phoneNumberFormControl.valid || !phoneNumberFormControl.value)) {
          emailFormControl.setErrors({
            ...emailFormControl.errors,
            contact: true,
          });
          phoneNumberFormControl.setErrors({
            ...phoneNumberFormControl.errors,
            contact: true,
          });
          return {contact: true};
        }
      }
      return null;
    };
}
