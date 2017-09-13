import { Injectable } from "@angular/core";
import { ICheckIn } from "../../models/check-in.model";

Injectable()
export class CheckInService{
    codeBooking: string;

    constructor() { }

    getCodeBooking(code: string): string {       
        return this.codeBooking = code;
    }

    saveCheckIn(codeChekIn: string, email: string){
        let checkin : ICheckIn = {
          Code: codeChekIn,
          Email: email
        };
      }
}