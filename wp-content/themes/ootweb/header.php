<!DOCTYPE html>
<html <?php language_attributes(); ?>>
	<head>
		<meta charset="<?php bloginfo( 'charset' ); ?>" />
		<meta name="viewport" content="width=device-width" />
		<link href="https://fonts.googleapis.com/css?family=Poppins:300,500" rel="stylesheet">
		<link rel="stylesheet" type="text/css" href="<?php echo get_stylesheet_uri(); ?>" />
		<?php wp_head(); ?>
	</head>
<body <?php body_class(); ?>>
	<div id="wrapper" class="hfeed">
		<header id="header" role="banner">
			<div class="banner-inner">
				<div class="nav-wrapper row">
					<div class="title-bar" data-responsive-toggle="main-menu" data-hide-for="large">
						<div class="top-bar-left">
							<a href="<?php echo site_url(); ?>"><img class="header-logo" src="<?php echo get_template_directory_uri(); ?>/images/oot-logo.png" /></a>
						</div>
						<div class="top-bar-right">
							<button class="menu-icon" type="button" data-toggle></button>
							<div class="title-bar-title">Menu</div>
						</div>
					</div>

					<div class="top-bar" id="main-menu">
						<div class="top-bar-left">
							<a href="<?php echo site_url(); ?>"><img class="header-logo" src="<?php echo get_template_directory_uri(); ?>/images/oot-logo.png" /></a> 
						</div>
						<div class="top-bar-right">
							<?php
								wp_nav_menu(array(
									'container' => false,
									'menu' => __( 'Top Bar Menu', 'textdomain' ),
									'menu_class' => 'dropdown menu',
									'theme_location' => 'topbar-menu',
									'items_wrap'      => '<ul id="%1$s" class="%2$s" data-dropdown-menu>%3$s</ul>',
									//Recommend setting this to false, but if you need a fallback...
									'fallback_cb' => 'f6_topbar_menu_fallback',
									'walker' => new F6_TOPBAR_MENU_WALKER(),
								));
							?>
						</div>
					</div>
				</div>
				<div class="row collapse banner-overlay" data-equalizer>
					<div class="small-12 medium-6 columns" data-equalizer-watch>
						<div class="inner">
							<h2 class="banner-title">Great Exhibition of The North 2018</h2>
							<p class="banner-sub">Discovery and route finding app</p>
						</div>
					</div>
					<div class="small-12 medium-6 columns" data-equalizer-watch>
						<img class="header-logo" src="<?php echo get_template_directory_uri(); ?>/images/banner-hand.png" />
					</div>
				</div>
			</div>
			<div class="banner-curve-overlay"></div>
		</header>
		<div id="container">