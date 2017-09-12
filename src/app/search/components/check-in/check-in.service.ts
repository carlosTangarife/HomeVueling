import { Injectable } from "@angular/core";


Injectable()
export class CheckInService{
    codeBooking: string;

    constructor() { }

    getCodeBooking(code: string): string {       
        return this.codeBooking = code;
    }

    saveCheckIn(code: string, email: string){
        
    }
}