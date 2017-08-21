import { Component, OnInit } from "@angular/core";

@Component({
    selector: 'app-calculator',
    templateUrl: './calculator.component.html'
})

export class Calculator {
      

    constructor(){
    }

    multiply(number1: number, number2: number): number {
        return number1 * number2;
    }
}





