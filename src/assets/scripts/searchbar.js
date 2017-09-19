// $(document).ready(function(){
//   /*scroll */
//   var searchnav = $("#searchbar");

//     $(window).scroll(function() {
//       //$('.tabLink').removeClass('active');
//       //$('.mega-menu').removeClass('active');
//       if ($(this).scrollTop() > 180) {
//         searchnav.addClass("fixed");
//       } else {
//         searchnav.removeClass("fixed");
//       }
//     });
// })


(function ($) {
  $.extend($.datepicker, {

      // Reference the orignal function so we can override it and call it later
      _inlineDatepicker2: $.datepicker._inlineDatepicker,

      // Override the _inlineDatepicker method
      _inlineDatepicker: function (target, inst) {

          // Call the original
          this._inlineDatepicker2(target, inst);

          var beforeShow = $.datepicker._get(inst, 'beforeShow');

          if (beforeShow) {
              beforeShow.apply(target, [target, inst]);
          }
      }
  });
}(jQuery));
