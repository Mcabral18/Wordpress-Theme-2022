<?php
/**
 * ccenergia_landings functions and definitions
 *
 * @package ccenergia_landings
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

$croft_includes = array(
	'/reset.php',
	'/register-post-type.php',              // Load post type register functions.
	'/register-taxonomy.php',               // Load taxonomy register functions.
	'/enqueue.php',
);

foreach ( $croft_includes as $file ) {
	$filepath = locate_template( 'inc' . $file );
	if ( ! $filepath ) {
		trigger_error( sprintf( 'Error locating /inc%s for inclusion', $file ), E_USER_ERROR );
	}
	require_once $filepath;
}
