import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS } from "@angular/forms";

function checkSpaces(control: AbstractControl){
    if (control.value == null) return null;
    if (control.value.indexOf(' ') >=0){
        return {noSpaces: true}
    }
    return null;
}

@Directive({
    selector: '[no-spaces]',
    providers: [
        {provide: NG_VALIDATORS, multi: true, useValue: checkSpaces}
    ]
})

export class NoSpaces { }
    
