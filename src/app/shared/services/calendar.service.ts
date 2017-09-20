import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CalendarService {
    private isGoing = false;
    private isComeBack = false;
    private isOneWay = true;
    private isRoundTrip = false;
    private isShowDatePicker = false;

    // Observable boolean sources
    private subjectIsOneWay = new BehaviorSubject<boolean>(this.isOneWay);
    private subjectIsRoundTrip = new BehaviorSubject<boolean>(this.isRoundTrip);

    private subjectIsGoing = new BehaviorSubject<boolean>(true);
    private subjectIscomeBack = new BehaviorSubject<boolean>(false);

    private subjectIsShowDatePicker = new BehaviorSubject<boolean>(this.isShowDatePicker);

    // Observable boolean streams
    isOneWay$ = this.subjectIsOneWay.asObservable();
    isRoundTrip$ = this.subjectIsRoundTrip.asObservable();

    isGoing$ = this.subjectIsGoing.asObservable();
    iscomeBack$ = this.subjectIscomeBack.asObservable();

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
      this.isComeBack = false;
      this.isGoing = true;
      this.subjectIsGoing.next(true);
      this.subjectIscomeBack.next(false);
      this.toggleShowDatePicker();
    }

    onComeBack() {
      this.isComeBack = true;
      this.isGoing = false;
      this.subjectIsGoing.next(false);
      this.subjectIscomeBack.next(true);
      this.toggleShowDatePicker();
    }

    toggleShowDatePicker() {
      this.isShowDatePicker = !this.isShowDatePicker;
      this.subjectIsShowDatePicker.next(this.isShowDatePicker);
    }

}
