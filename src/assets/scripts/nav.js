$(document).ready(function () {


	// open mega menu
	$('.tabLink').click(function (event) {
		event.preventDefault();

		var tab_id = $(this).find('a').attr('href');
		var tab_tab = $(this).find('a').attr('tab');
		$('.tabLink').not(this).removeClass('active');
		$('.mega-menu').not(tab_id).removeClass('active');
		$(this).toggleClass('active');

		$('.nav-tabs a[href="#' + tab_tab + '"]').tab('show');

		if ($(this).hasClass('active')) {
			$(tab_id).addClass('active');
		}
		else {
			$(tab_id).removeClass('active');
		}
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


	// login form validation
	$('.js-input-pass').click(function (event) {
		$($(this)).addClass('error');
	})

})