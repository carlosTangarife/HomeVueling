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
    // $.fn.datepicker = function( options ) {

    //     /* Verify an empty collection wasn't passed - Fixes #6976 */
    //     if ( !this.length ) {
    //       return this;
    //     }

    //     /* Initialise the date picker. */
    //     if ( !$.datepicker.initialized ) {
    //       $( document ).on( "mousedown", $.datepicker._checkExternalClick );
    //       $.datepicker.initialized = true;
    //     }

    //     /* Append datepicker main container to body if not exist. */
    //     // if ( $( "#" + $.datepicker._mainDivId ).length === 0 ) {
    //       $( "#vyCalendarGoing" ).append( $.datepicker.dpDiv );
    //     // }

    //     var otherArgs = Array.prototype.slice.call( arguments, 1 );
    //     if ( typeof options === "string" && ( options === "isDisabled" || options === "getDate" || options === "widget" ) ) {
    //       return $.datepicker[ "_" + options + "Datepicker" ].
    //         apply( $.datepicker, [ this[ 0 ] ].concat( otherArgs ) );
    //     }
    //     if ( options === "option" && arguments.length === 2 && typeof arguments[ 1 ] === "string" ) {
    //       return $.datepicker[ "_" + options + "Datepicker" ].
    //         apply( $.datepicker, [ this[ 0 ] ].concat( otherArgs ) );
    //     }
    //     return this.each( function() {
    //       typeof options === "string" ?
    //         $.datepicker[ "_" + options + "Datepicker" ].
    //           apply( $.datepicker, [ this ].concat( otherArgs ) ) :
    //         $.datepicker._attachDatepicker( this, options );
    //     } );
    //   };
  }
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
