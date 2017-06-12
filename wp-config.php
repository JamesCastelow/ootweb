<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the
 * installation. You don't have to use the web site, you can
 * copy this file to "wp-config.php" and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * MySQL settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://codex.wordpress.org/Editing_wp-config.php
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'ootweb');

/** MySQL database username */
define('DB_USER', 'root');

/** MySQL database password */
define('DB_PASSWORD', '');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8mb4');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '|x](V*viI9x`B.H/^{e^X*GT}I_(mZtn>lx)}78g,CsY}y4]u(+;ol5d/Hv<U>?x');
define('SECURE_AUTH_KEY',  '=.Tp9)M#QE9$J?rCm$WRcY+s0}Y|/A5[x2KyDOwc<w`!O8.3( Ny=T><O2L >#Mg');
define('LOGGED_IN_KEY',    'U+rtS!@&;p<dEXb}_y~*fZhC0LSIDdGM_nvTL2stz9j3LyG}i%lf&De<-]t2Svp|');
define('NONCE_KEY',        'jvQ.!J[2Fc3]M0y=HNeW159||`!5!N>9_,zw$h9W}t.vKF[[ZN]|m!13jjP^JQ.A');
define('AUTH_SALT',        'v#YHKG[Y=&q *I)r;#kKp!4EHOqtTqo.C6C}#Qh;cR9@|-hWz)*]Y8~@C/_+.JH$');
define('SECURE_AUTH_SALT', 'ISIx,!]~g]{J+0|$Y@+]Yj9&*U%<eikvVNe`)&T.<aS^guzP$CT[37Q(WqxMWC<(');
define('LOGGED_IN_SALT',   '`|!41yw7D!Ls@1yuC$<W:2Y-Eg6DX*=NeVmRK2J5GRTp5YZg7t:lw1iU8US<uX7M');
define('NONCE_SALT',       '+vkDT*YCRm*@Q=`^03V&@+0h 2E.+K2-QJo{0}4O=MVqft.d:C}rOisD.<KoONN#');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the Codex.
 *
 * @link https://codex.wordpress.org/Debugging_in_WordPress
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
