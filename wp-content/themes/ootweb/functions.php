<?php
add_action( 'after_setup_theme', 'ootweb_setup' );
function ootweb_setup() {
	load_theme_textdomain( 'ootweb', get_template_directory() . '/languages' );
	register_nav_menus( array( 'main-menu' => __( 'Main Menu', 'ootweb' ) ) );
}

add_action( 'wp_enqueue_scripts', 'ootweb_load_scripts' );
function ootweb_load_scripts() {
	wp_enqueue_style('appcss', get_template_directory_uri() . '/css/app.css');
	wp_enqueue_style('foundationcss', get_template_directory_uri() . '/css/foundation.min.css');
	
	wp_enqueue_script('cdnjquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
	wp_deregister_script('jquery');
	wp_enqueue_script('jquery', get_template_directory_uri() . '/js/vendor/jquery.js', array(), '1.0.0', false);
	wp_enqueue_script('whatinput', get_template_directory_uri() . '/js/vendor/what-input.js', array('jquery'), '1.0.0', true);
	wp_enqueue_script('foundation', get_template_directory_uri() . '/js/vendor/foundation.js', array('jquery'), '1.0.0', true);
	wp_enqueue_script('appjs', get_template_directory_uri() . '/js/app.js', array('jquery'), '1.0.0', true);
	
	wp_enqueue_script('ootjs', get_template_directory_uri() . '/js/oot.js', array('jquery'), '1.0.0', true);
	wp_enqueue_script( 'wp-util' );
	
}