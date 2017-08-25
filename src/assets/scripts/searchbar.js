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

  $(".js-searchbar-input").focus(function(){
      $("#searchbar-overlay").css("display", "block");
  });
  $(".js-searchbar-input").focusout(function(){
      $("#searchbar-overlay").css("display", "none");
  });

  // Searchbar Popups

  // $("#origin-input").focus(function(){
  //     $("#form-group--origin").addClass("focused");
  //     $("#origin-sugestion-popup").css("display", "block");
  // });
  // $("#origin-input").focusout(function(){
  //     $("#form-group--origin").removeClass("focused");
  //     $("#origin-sugestion-popup").css("display", "none");
  // });

  $("#destination-input").focus(function(){
      $("#form-group--destination").addClass("focused");
      $("#destination-sugestion-popup").css("display", "block");
  });
  $("#destination-input").focusout(function(){
      $("#form-group--destination").removeClass("focused");
      $("#destination-sugestion-popup").css("display", "none");
  });

  $("#passengers-input").focus(function(){
      $("#form-group--passengers").addClass("focused");
      $("#passengers-popup").css("display", "block");
  });
  $("#passengers-input").focusout(function(){
      $("#form-group--passengers").removeClass("focused");
      $("#passengers-popup").css("display", "none");
  });

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
