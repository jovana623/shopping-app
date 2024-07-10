import { Injectable } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomvalidationService {
  constructor() {}

  static nameValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[a-zA-Z]+$/.test(control.value);
      return valid ? null : { invalidName: { value: control.value } };
    };
  }

  static telephoneValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valid = /^[+]?[0-9]+$/.test(control.value);
      return valid ? null : { invalidTelephone: { value: control.value } };
    };
  }
}
