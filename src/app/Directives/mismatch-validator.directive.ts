import { Directive, Input } from '@angular/core';
import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms'


@Directive({
  selector: '[appMismatchValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: MismatchValidatorDirective,
    multi: true
  }]
})
export class MismatchValidatorDirective {

  @Input() appMismatchValidator: string;
  validate (control: AbstractControl): {[key:string]: any} | null {
    const controlToCompare = control.parent.get(this.appMismatchValidator);
    if (controlToCompare && controlToCompare.value !== control.value) {
      return {'mismatch': true}
    }
    return null;
  }

}
