import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CalendarService {
    public isGoing = true;
    public isComeBack = false;
    public isMulti = false;
    public isOneWay = true;
    public isRoundTrip = false;
    public isShowDatePicker = false;

    // Observable boolean sources
    private subjectIsOneWay = new BehaviorSubject<boolean>(this.isOneWay);
    private subjectIsRoundTrip = new BehaviorSubject<boolean>(this.isRoundTrip);
    private subjectIsGoing = new BehaviorSubject<boolean>(this.isGoing);
    private subjectIsComeBack = new BehaviorSubject<boolean>(this.isComeBack);
    private subjectIsMulti = new BehaviorSubject<boolean>(this.isMulti);
    private subjectIsShowDatePicker = new BehaviorSubject<boolean>(this.isShowDatePicker);

    // Observable boolean streams
    isOneWay$ = this.subjectIsOneWay.asObservable();
    isRoundTrip$ = this.subjectIsRoundTrip.asObservable();
    isGoing$ = this.subjectIsGoing.asObservable();
    isComeBack$ = this.subjectIsComeBack.asObservable();
    isMulti$ = this.subjectIsMulti.asObservable();
    isShowDatePicker$ = this.subjectIsShowDatePicker.asObservable();

    constructor() { }

    // Service message states
    oneWay() {
      if (this.isComeBack) {
        this.toggleShowDatePicker();
      }
      this.toggleModel();
    }

    roundTrip() {
      this.toggleModel();
    }

    private toggleModel() {
      this.isOneWay = !this.isOneWay;
      this.isRoundTrip = !this.isRoundTrip;

      this.subjectIsOneWay.next(this.isOneWay);
      this.subjectIsRoundTrip.next(this.isRoundTrip);
    }

    onGoing() {
      this.isGoing = true;
      this.isComeBack = false;
      this.isMulti = false;
      this.subjectIsGoing.next(this.isGoing);
      this.subjectIsComeBack.next(this.isComeBack);
      this.subjectIsMulti.next(this.isMulti);
      this.toggleShowDatePicker();
    }

    onMulti() {
      this.isGoing = false;
      this.isComeBack = false;
      this.isMulti = true;
      this.subjectIsGoing.next(this.isGoing);
      this.subjectIsComeBack.next(this.isComeBack);
      this.subjectIsMulti.next(this.isMulti);
      this.toggleShowDatePicker();
    }

    onComeBack() {
      this.isGoing = false;
      this.isComeBack = true;
      this.isMulti = false;
      this.subjectIsGoing.next(this.isGoing);
      this.subjectIsComeBack.next(this.isComeBack);
      this.subjectIsMulti.next(this.isMulti);
      this.toggleShowDatePicker();
    }

    toggleShowDatePicker() {
      this.isShowDatePicker = !this.isShowDatePicker;
      this.subjectIsShowDatePicker.next(this.isShowDatePicker);
    }
}
