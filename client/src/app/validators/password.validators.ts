import { AbstractControl } from '@angular/forms';


export class PasswordValidators {

    // access our formControl which we valdiate (it checks property in which it is added)
    static passwordStrength(control:AbstractControl){
        // 1 uppercase letter 1 number atleast  5 characters
        const regexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{5}.+$/;
        const valid = regexp.test(control.value);

        return valid ? null : { veakPassword: true};
    }

    static comparePassword(control:AbstractControl){
        if(! control.get('password') || ! control.get('password')) return null;

        const valid = control.get('password').value ===  control.get('confirm').value;

        return valid ? null : { passwordMissmatch: true}

         
    }



}