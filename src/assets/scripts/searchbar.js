$(document).ready(function(){
  // fixed searchbar on scroll

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

  // Overlay

  // $("#searchbar-overlay").click(function(){
  //     $("#searchbar-overlay").toggleClass("show");
  //     $(".searchbar-popup").toggleClass("hide");
  //     $(".form-input").removeClass("focused");
  // });

  // Searchbar Popups

  $("#origin-input").click(function(){
      // $("#form-group--origin").toggleClass("focused");
      // $("#origin-sugestion-popup").toggleClass("show");
      $("#searchbar-overlay").toggleClass("show");
  });

  $("#destination-input").click(function(){
      $("#form-group--destination").toggleClass("focused");
      $("#destination-sugestion-popup").toggleClass("show");
      $("#searchbar-overlay").toggleClass("show");
  });

  $("#passengers-input").click(function(){
      $("#form-group--passengers").toggleClass("focused");
      $("#passengers-popup").toggleClass("show-table");
      $("#searchbar-overlay").toggleClass("show");
  });

  // $(".js-searchbar-date-input").focus(function(){
  //     $("#form-group--dates").addClass("focused");
  //     //$("#passengers-popup")toggleClass("show");
  //     //$("#searchbar-overlay").toggleClass("show");
  // });

  // Searchbar Passenger popup

  $("#discount-list-active").click(function(){
      $(".discount-list").toggleClass("active");
  });
  $(".discount-item").click(function(){
      $("#discount-list").toggleClass("active");
  });
  $("#discount-item").click(function(){
      $("#discount-item").addClass("selected");
  });
  $(".js-discount").click(function(){
      $(".js-discount-item-selected").slideDown();
  });

});
