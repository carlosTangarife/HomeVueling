import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MinusPlusService {
  public value: number;
  private subjectValue = new Subject<number>();
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
