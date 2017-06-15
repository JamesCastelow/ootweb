$( document ).ready(function() {
	
	var owl = $('.owl-carousel');
		
	function startOwl(carousel, padding, centered, looped) {
		var args = {
			margin: 40,
			loop: looped,
			dots: true,
			autoWidth:true,
			center: centered,
			stagePadding: padding,
			navigation:true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 3
				},
				1000: {
					items: 5
				}				
			}
		};
		owl.owlCarousel(args);
	}
	
	startOwl(owl, 0, false, true);
	
	if ($(window).width() > 1230) {
		startOwl(owl, 0, false, false);
	} else if ($(window).width() < 1230 && $(window).width() > 450) {
		startOwl(owl, 0, true, true);
	} else {
		startOwl(owl, 0, true, false);
	}
	
	$(window).resize(function() {
		owl.trigger('destroy.owl.carousel');
		
		//startOwl(carousel, padding, centered, looped)
		if ($(window).width() > 1230) {
			startOwl(owl, 0, false, false);
		} else if ($(window).width() < 1230 && $(window).width() > 450) {
			startOwl(owl, 0, true, true);
		} else {
			startOwl(owl, 0, true, false);
		}
	});
	
});