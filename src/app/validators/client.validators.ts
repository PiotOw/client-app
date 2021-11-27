import {ValidatorFn, AbstractControl, ValidationErrors, FormControl} from '@angular/forms';

export class ClientValidators {
  private static clientNameRegEx: RegExp = new RegExp(
    `^[ĄąĆćĘęŁłŃńÓóŚśŹźŻża-zA-Z -]*$`
  );
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

        delete emailFormControl.errors?.contact;
        delete phoneNumberFormControl.errors?.contact;

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
      emailFormControl?.setErrors(null);
      phoneNumberFormControl?.setErrors(null);
      return null;
    };
}
