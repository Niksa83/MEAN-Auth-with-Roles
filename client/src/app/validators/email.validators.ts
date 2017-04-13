import { AbstractControl } from '@angular/forms';


export class EmailValidators {

    // access our formControl which we valdiate (it checks property in which it is added)
    static checkEmail(control:AbstractControl){
        // A123 string pattern (letter + numbers)
        const regexp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        const valid = regexp.test(control.value);

        return valid ? null : { invalidEmail: true};
    }




}