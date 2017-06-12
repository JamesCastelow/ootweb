var owl = $('.owl-carousel');
owl.owlCarousel({
	loop: true,
	dots: true,
	pagination:false,
	navigation:true,
	responsive: {
		0: {
			items: 2
		},
		600: {
			items: 3
		},
		1000: {
			items: 5
		}
	}
})