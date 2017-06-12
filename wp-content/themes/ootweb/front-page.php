<?php get_header(); ?>
<?php if( have_rows('features_section') ) { ?>
	<section class="row collapse key-features">
	<?php while ( have_rows('features_section') ) { the_row(); ?>
		<div class="small-6 medium-3 columns feature">
			<img src="<?php echo get_sub_field('feature_image'); ?>" />
			<h4><?php echo get_sub_field('feature_name'); ?></h4>
			<p><?php echo get_sub_field('feature_description'); ?></p>
		</div>
	<?php } ?>
	</section>
<?php } ?>

<section class="live-oots">
	<img src="<?php echo get_template_directory_uri(); ?>/images/live-oots-overlay.png" />
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
<section class="why-oot">
<?php } ?>

</section>
<section class="the-team">

</section>
<?php get_footer(); ?>