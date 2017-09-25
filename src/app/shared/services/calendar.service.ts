import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { URLSearchParams, Headers, RequestOptions } from '@angular/http';
import { ResourcesService } from '../../shared/services/resources.service';

declare var jQuery: any;
declare var $: any;

@Injectable()
export class CalendarService {
    private isShowDatePicker = false;
    private idDatePicker: string;
    private id: string;

    // Observable boolean sources
    private subjectIsShowDatePicker = new BehaviorSubject<boolean>(this.isShowDatePicker);

    // Observable boolean streams
    isShowDatePicker$ = this.subjectIsShowDatePicker.asObservable();

    constructor() {
    }

    onInit(id: string, contentDatePicker: string) {
      console.log($('div#ui-datepicker-div').length);
      let self = this;
      this.id = '#' + id;
      $(this.id).datepicker({
        minDate: 0,
        numberOfMonths: 3,
        onSelect: function() {
          self.toggleShowDatePicker();
        },
        onClose: function() {
          self.toggleShowDatePicker();
        },
        afterShow: function(){
          setTimeout(function() {
            $('#ui-datepicker-div').css({'position': ''});
          }, 0);
          self.toggleShowDatePicker();
        }
      });
      $('#vyCalendarGoing').append( $('#ui-datepicker-div'));
    }

    afterInit(id: string, contentDatePicker: string) {
      let self = this;
      this.id = '#' + id;
      $(this.id).datepicker({
        minDate: 0,
        numberOfMonths: 3,
        onSelect: function() {
          self.toggleShowDatePicker();
        },
        // onClose: function() {
        //   if (self.isShowDatePicker) {
        //     self.toggleShowDatePicker()
        //   };
        // },
        // afterShow: function(){
        //   setTimeout(function() {
        //     // $('#ui-datepicker-div').css({'position': ''});
        //   }, 0);
        //   self.toggleShowDatePicker();
        // },
        beforeShow: function(uno, dos) {
          setTimeout(function() {
            $('#vyCalendarGoing').append( $('#ui-datepicker-div'));
            $('#ui-datepicker-div').css(
              {'position': 'relative', 'top': '0px', 'left': '0px'}
            );
            self.toggleShowDatePicker();
          }, 0);
        }
      });
    }

    toggleShowDatePicker() {
      this.isShowDatePicker = !this.isShowDatePicker;
      this.subjectIsShowDatePicker.next(this.isShowDatePicker);
    }


    eventClick(id: any) {
      $('#' + id).click();
    }
}
