$(document).ready(function(){

	// open mega menu
	$('.tabLink').click(function(event){
		event.preventDefault();
		var tab_id = $(this).find('a').attr('href');
		$('.tabLink').not(this).removeClass('active');
		$('.mega-menu').not(tab_id).removeClass('active');
		$(this).toggleClass('active');
		$(tab_id).toggleClass('active');
	})


	// fixed menu on scroll
	var nav = $('#menuMain');
	var headerHeight = $('#menuTop').outerHeight();
	$(window).scroll(function () {
			//$('.tabLink').removeClass('active');
			//$('.mega-menu').removeClass('active');
	    if ($(this).scrollTop() > headerHeight) {
	       nav.addClass("fixed");
	    } else {
	       nav.removeClass("fixed");
	    }
	});

})
