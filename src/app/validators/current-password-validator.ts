import {AbstractControl, Validator, ValidationErrors, ValidatorFn} from '@angular/forms';
import { PasswordCheckerService } from '../../providers/change-password/password-checker.service';

export function currentPasswordValidator(
    control: AbstractControl
): {[key: string]: any} | null {
    const valid =  /^\d+$/.test(control.value);
    return valid
        ? null
        : {invalidPassword: {valid: false, value: control.value}};
}
