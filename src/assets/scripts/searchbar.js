$(document).ready(function(){
  // fixed searchbar on scroll

  // Searchbar Calendar init
  $(function() {
    $( "#going" ).datepicker({
      numberOfMonths: 3,
      showButtonPanel: false,
      dateFormat: "dd/mm/yy",
      dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      onSelect: function() {
        var dateObject = $(this).datepicker('getDate');
        $(".js-searchbar-date-input-going").val($.datepicker.formatDate('dd/mm/yy', dateObject));
      }
    });
  });

  $(function() {
    $( "#comeBack" ).datepicker({
      numberOfMonths: 3,
      showButtonPanel: false,
      dateFormat: "dd/mm/yy",
      dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
      onSelect: function() {
        var dateObject = $(this).datepicker('getDate');
        $(".js-searchbar-date-input-comeBack").val($.datepicker.formatDate('dd/mm/yy', dateObject));
      }
    });
  });

  var searchnav = $('#searchbar');

  $(window).scroll(function () {
      //$('.tabLink').removeClass('active');
      //$('.mega-menu').removeClass('active');
      if ($(this).scrollTop() > 180) {
         searchnav.addClass("fixed");
      } else {
         searchnav.removeClass("fixed");
      }
  });

});
