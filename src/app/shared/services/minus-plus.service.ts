import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class MinusPlusService {
  public value: number;
  private subjectValue = new BehaviorSubject<number>(this.value);
  public value$ = this.subjectValue.asObservable();

  constructor() {}

  initService(value: number) {
    this.value = value;
    this.setSubjectValue();
  }

  increase() {
    this.value += 1;
    this.setSubjectValue();
  }

  decrease() {
    this.value -= 1;
    this.setSubjectValue();
  }

  private setSubjectValue() {
    this.subjectValue.next(this.value);
  }
}
