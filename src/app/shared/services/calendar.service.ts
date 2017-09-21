import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CalendarService {
    private isGoing = true;
    private isComeBack = false;
    private isMulti = false;
    private isOneWay = true;
    private isRoundTrip = false;
    private isShowDatePicker = false;

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
      this.isComeBack = false;
      this.isGoing = false;
      this.isMulti = true;
      this.subjectIsGoing.next(this.isGoing);
      this.subjectIsComeBack.next(this.isComeBack);
      this.subjectIsMulti.next(this.isMulti);
      this.toggleShowDatePicker();
    }

    onComeBack() {
      this.isComeBack = true;
      this.isGoing = false;
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
