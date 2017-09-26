$(document).ready(function() {
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

  (function ($) {
    $(document).unbind('mousedown', $.datepicker._checkExternalClick);
  }(jQuery));  
});
