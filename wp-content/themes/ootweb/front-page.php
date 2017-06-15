<?php get_header(); ?>
<?php if( have_rows('features_section') ) { ?>
	<section class="row collapse key-features">
	<?php while ( have_rows('features_section') ) { the_row(); ?>
		<div class="small-12 medium-6 large-3 columns feature">
			<img src="<?php echo get_sub_field('feature_image'); ?>" />
			<h4><?php echo get_sub_field('feature_name'); ?></h4>
			<p><?php echo get_sub_field('feature_description'); ?></p>
		</div>
	<?php } ?>
	</section>
<?php } ?>

<script>
	window.unstack = function() {
		$(this).addClass('unstacked');
	};

	//window.revealed1 = function() { $(this).addClass('revealed1'); };
	//window.revealed2 = function() { $(this).addClass('revealed2'); };
	//window.revealed3 = function() { $(this).addClass('revealed3'); };

	function reveal(class_num){
		var thisElem = $(this);
		var timeout = (class_num*1000)-1000;
		window.setTimeout( function() { thisElem.addClass('revealed'+class_num); }, timeout);
	};

	document.addEventListener('DOMContentLoaded', function(){
		console.log($(window).outerWidth());
		if ($(window).width() < 1900) {
			$('.gif-holder1 img').attr('src', templateUrl + '/images/group-location-chat-no-line.png');
			$('.gif-holder2 img').attr('src', templateUrl + '/images/live-offer-redemption-no-line.png');
		} else {
			$('.gif-holder1 img').attr('src', templateUrl + '/images/group-location-chat.png');
			$('.gif-holder2 img').attr('src', templateUrl + '/images/live-offer-redemption.png');
		}

		var trigger = new ScrollTrigger({
		toggle: {
			visible: 'elemVisible',
			hidden: 'elemInvisible'
		  },
		  once: true
		});
	});
	
	var templateUrl = '<?= get_bloginfo("template_url"); ?>';
	$(window).resize(function() {
		if ($(window).width() < 1900) {
			$('.gif-holder1 img').attr('src', templateUrl + '/images/group-location-chat-no-line.png');
			$('.gif-holder2 img').attr('src', templateUrl + '/images/live-offer-redemption-no-line.png');
		} else {
			$('.gif-holder1 img').attr('src', templateUrl + '/images/group-location-chat.png');
			$('.gif-holder2 img').attr('src', templateUrl + '/images/live-offer-redemption.png');
		}
	});
</script>
<section class="live-oots">
	<h3>Live Oots</h3>
	<div class="block block1">
		<div class="gif-holder1" data-scroll><img src="<?php echo get_template_directory_uri(); ?>/images/group-location-chat.png" /></div>
		<div class="elem" data-scroll><img src="<?php echo get_template_directory_uri(); ?>/images/tester.png" /></div>
		<div class="elem" data-scroll data-scroll-showCallback="unstack"><img src="<?php echo get_template_directory_uri(); ?>/images/tester.png" /></div>
	</div>
	<div class="block block2">
		<div class="gif-holder2" data-scroll><img src="<?php echo get_template_directory_uri(); ?>/images/live-offer-redemption.png" /></div>
		<div class="elem" data-scroll><img src="<?php echo get_template_directory_uri(); ?>/images/tester.png" /></div>
		<div class="elem" data-scroll data-scroll-showCallback="unstack"><img src="<?php echo get_template_directory_uri(); ?>/images/half-price-offer.png" /></div>
	</div>
	<div class="block block3">
		<div class="elem" data-scroll data-scroll-showCallback="reveal(1)"><img src="<?php echo get_template_directory_uri(); ?>/images/live-alerts.png" /></div>
		<div class="elem" data-scroll data-scroll-showCallback="reveal(2)"><img src="<?php echo get_template_directory_uri(); ?>/images/private-secure.png" /></div>
		<div class="elem" data-scroll data-scroll-showCallback="reveal(3)"><img src="<?php echo get_template_directory_uri(); ?>/images/discover.png" /></div>
	</div>
</section>

<section class="row collapse live-oots-responsive">
	<h3 class="mid-title">Live Oots</h3>
	<div class="top small-12 medium-6 columns">
		<img src="<?php echo get_template_directory_uri(); ?>/images/live-oot-resp-top.png" />
	</div>
	<div class="middle"></div>
	<div class="bottom small-12 medium-6 columns">
		<img src="<?php echo get_template_directory_uri(); ?>/images/live-oot-resp-bottom.png" />
	</div>
	<div class="small-12 columns more-features">
		<div class="row collapse">
			<div class="small-12 medium-4 columns">
				<div class="elem"><img src="<?php echo get_template_directory_uri(); ?>/images/live-alerts-resp.png" /></div>
			</div>	
			<div class="small-12 medium-4 columns">
				<div class="elem"><img src="<?php echo get_template_directory_uri(); ?>/images/private-secure-resp.png" /></div>
			</div>
			<div class="small-12 medium-4 columns">
				<div class="elem"><img src="<?php echo get_template_directory_uri(); ?>/images/discover-resp.png" /></div>
			</div>
		</div>	
	</div>
</section>

<?php if( have_rows('features_section') ) { ?>
	<section class="user-journey">
		<h3>GEOTN User Journey</h3>
		<div class="row collapse owl-carousel owl-theme">
			<?php while ( have_rows('geotn_user_journey') ) { the_row(); ?>
				<div class="item">
					<img src="<?php echo get_sub_field('image'); ?>" />
				</div>
			<?php } ?>
		</div>
	</section>
<?php } ?>
<section class="why-oot">
	<div class="row collapse" data-equalizer ><!-- data-options="equalizeOnStack:true" -->
		<div class="small-12 medium-8 columns left" data-equalizer-watch>
			<img class="left-img" src="<?php echo get_field('why_oot_image'); ?>" />
		</div>
		<div class="small-12 medium-4 columns" data-equalizer-watch>
			<div class="inner">
				<h3>Why Oot?</h3>
				<?php echo get_field('why_oot_text'); ?>
			</div>
			<img class="left-img why-oot-responsive" src="<?php echo get_field('why_oot_image'); ?>" />
		</div>
	</div>
	<div class="banner-curve-overlay">
		<img src="<?php echo get_template_directory_uri(); ?>/images/curve-purple.png" />
	</div>
</section>
<?php if( have_rows('team_members') ) { ?>
<section class="the-team row collapse fullWidth" data-equalizer>
	<div class="medium-12 large-6 columns left" data-equalizer-watch>
		<div class="inner">
		<h3>The Team</h3>
		<?php while ( have_rows('team_members') ) { the_row(); ?>
			<div class="small-12 columns team-member">
				<img src="<?php echo get_sub_field('icon'); ?>" />
				<p><span><?php echo get_sub_field('name'); ?></span> - <?php echo get_sub_field('about'); ?></p>
			</div>
		<?php } ?>
		</div>
	</div>
	<div class="medium-12 large-6 columns right" data-equalizer-watch>
		<img src="<?php echo get_template_directory_uri(); ?>/images/team-curve-border.png" />
	</div>
</section>
<?php } ?>
<?php get_footer(); ?>