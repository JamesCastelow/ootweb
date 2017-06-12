<?php
add_action( 'after_setup_theme', 'ootweb_setup' );
function ootweb_setup() {
	load_theme_textdomain( 'ootweb', get_template_directory() . '/languages' );
}

add_action( 'wp_enqueue_scripts', 'ootweb_load_scripts' );
function ootweb_load_scripts() {
	wp_enqueue_style('foundationcss', get_template_directory_uri() . '/css/foundation.min.css');
	wp_enqueue_style('ootcss', get_template_directory_uri() . '/scss/style.css');
	
	wp_enqueue_script('cdnjquery', 'https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js');
	wp_deregister_script('jquery');
	wp_enqueue_script('jquery', get_template_directory_uri() . '/js/vendor/jquery.js', array(), '1.0.0', false);
	wp_enqueue_script('whatinput', get_template_directory_uri() . '/js/vendor/what-input.js', array('jquery'), '1.0.0', true);
	wp_enqueue_script('foundation', get_template_directory_uri() . '/js/vendor/foundation.js', array('jquery'), '1.0.0', true);
	wp_enqueue_script('appjs', get_template_directory_uri() . '/js/app.js', array('jquery'), '1.0.0', true);
	
	wp_enqueue_script('ootjs', get_template_directory_uri() . '/js/oot.js', array('jquery'), '1.0.0', true);
	wp_enqueue_script( 'wp-util' );
	
}

class F6_TOPBAR_MENU_WALKER extends Walker_Nav_Menu
{   
    /*
     * Add vertical menu class and submenu data attribute to sub menus
     */
     
    function start_lvl( &$output, $depth = 0, $args = array() ) {
        $indent = str_repeat("\t", $depth);
        $output .= "\n$indent<ul class=\"vertical menu\" data-submenu>\n";
    }
}

//Optional fallback
function f6_topbar_menu_fallback($args)
{
    /*
     * Instantiate new Page Walker class instead of applying a filter to the
     * "wp_page_menu" function in the event there are multiple active menus in theme.
     */
     
    $walker_page = new Walker_Page();
    $fallback = $walker_page->walk(get_pages(), 0);
    $fallback = str_replace("<ul class='children'>", '<ul class="children submenu menu vertical" data-submenu>', $fallback);
    
    echo '<ul class="dropdown menu" data-dropdown-menu>'.$fallback.'</ul>';
}

function _register_menu() {
    register_nav_menu( 'topbar-menu', __( 'Top Bar Menu','textdomain' ) );
}
 
//Add Menu to theme setup hook
add_action( 'after_setup_theme', '_theme_setup' );
 
function _theme_setup()
{
    add_action( 'init', '_register_menu' );
        
    //Theme Support
    add_theme_support( 'menus' );
}