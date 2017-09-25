$(document).ready(function(){
  /*scroll */
  var searchnav = $("#searchbar");

  $(window).scroll(function() {
    //$('.tabLink').removeClass('active');
    //$('.mega-menu').removeClass('active');
    if ($(this).scrollTop() > 180) {
      searchnav.addClass("fixed");
    } else {
      searchnav.removeClass("fixed");
    }
  });

  $(function () {
  //   $.fn.datepicker = function( options ) {


  //   /* Append datepicker main container to body if not exist. */
  //   if ( $( "#" + $.datepicker._mainDivId ).length === 0 ) {
  //     $( "#vyCalendarGoing" ).append( $.datepicker.dpDiv );
  //   }
  // }
    // $.extend($.datepicker, {
    //   // Reference the orignal function so we can override it and call it later
    //   _inlineDatepicker2: $.datepicker._inlineDatepicker,

    //   // Override the _inlineDatepicker method
    //   _inlineDatepicker: function (target, inst) {
    //     // Call the original
    //     this._inlineDatepicker2(target, inst);

    //     var beforeShow = $.datepicker._get(inst, 'beforeShow');

    //     if (beforeShow) {
    //       beforeShow.apply(target, [target, inst]);
    //     }

    //     var afterShow = this._get(inst, 'afterShow');
    //     if (afterShow){
    //       afterShow.apply(target, [target, inst]);
    //     }
    //   }
    // });

    $.datepicker._updateDatepicker_original = $.datepicker._updateDatepicker;
    $.datepicker._updateDatepicker = function(inst) {
        $.datepicker._updateDatepicker_original(inst);
        var afterShow = this._get(inst, 'afterShow');
        if (afterShow){
            afterShow.apply((inst.input ? inst.input[0] : null));  // trigger custom callback
        }
    }
  });
});
