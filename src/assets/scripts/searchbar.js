$(document).ready(function(){
  // fixed searchbar on scroll

  // Searchbar Calendar init
  // $(function() {
  //   $( "#going" ).datepicker({
  //     numberOfMonths: 3,
  //     showButtonPanel: false,
  //     dateFormat: "dd/mm/yy",
  //     dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
  //     onSelect: function() {
  //       var dateObject = $(this).datepicker('getDate');
  //       $(".js-searchbar-date-input-going").val($.datepicker.formatDate('dd/mm/yy', dateObject));

  //       if ( $('#roundTrip-going').is(':checked') ) {
  //         $('#js-origin-flight-datepiker-going').removeClass('show');
  //       }

  //       if ( $('#oneWay-going').is(':checked') ) {
  //         $('#js-origin-flight-datepiker-going').removeClass('show');
  //       }
  //     }
  //   });


  //   $('#roundTrip-going').on( 'change', function() {
  //     if ( $(this).is(':checked') ) {
  //       $('.js-add-date-range-to').toggleClass('activate');
  //       $('.js-date-range-to').toggleClass('activate');
  //     }
  //   });
  // });


  // $(function() {
  //   $( "#comeBack" ).datepicker({
  //     numberOfMonths: 3,
  //     showButtonPanel: false,
  //     dateFormat: "dd/mm/yy",
  //     dayNamesMin: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
  //     onSelect: function() {
  //       var dateObject = $(this).datepicker('getDate');
  //       $(".js-searchbar-date-input-comeBack").val($.datepicker.formatDate('dd/mm/yy', dateObject));
  //       if ( $('#roundTrip-comeBack').is(':checked') ) {
  //         $('#js-origin-flight-datepiker-comeBack').removeClass('show');
  //       }
  //     }
  //   });

  //   $('#oneWay-going').on( 'change', function() {
  //     if ( $(this).is(':checked') ) {
  //       $('.js-add-date-range-to').toggleClass('activate');
  //       $('.js-date-range-to').toggleClass('activate');
  //     }
  //   });

  //   /*a */
  //   $('#oneWay-comeBack').on( 'change', function() {
  //     if ( $(this).is(':checked') ) {
  //       $('.js-add-date-range-to').toggleClass('activate');
  //       $('.js-date-range-to').toggleClass('activate');
  //       $('#js-origin-flight-datepiker-comeBack').removeClass('show');
  //     }
  //   });

  // });

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
