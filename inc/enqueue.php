<?php
/**
 * Understrap enqueue scripts
 *
 * @package understrap
 */

// Exit if accessed directly.
defined( 'ABSPATH' ) || exit;

add_action( 'wp_enqueue_scripts', 'understrap_scripts' );

if ( ! function_exists( 'understrap_scripts' ) ) {
	/**
	 * Load theme's JavaScript sources.
	 */
	function understrap_scripts() {
		// Get the theme data.
		$the_theme     = wp_get_theme();
		$theme_version = $the_theme->get( 'Version' );

		$css_version = $theme_version . '.' . filemtime( get_template_directory() . '/css/theme.min.css' );
		wp_enqueue_style( 'understrap-styles', get_stylesheet_directory_uri() . '/css/theme.min.css', array(), $css_version );


		$filepath = WP_ENV === 'production' ? '/js/vendor.min.js' : '/js/vendor.js';

		if ( validate_file( $filepath ) < 1 && file_exists( get_template_directory() . $filepath ) ) {
			$filepath_version = $theme_version . '.' . filemtime( get_template_directory() . $filepath );
			wp_enqueue_script( 'vendor-scripts', get_template_directory_uri() . $filepath, array(), $filepath_version, true );
		}

		$filepath = WP_ENV === 'production' ? '/js/theme.min.js' : '/js/theme.js';

		$filepath_version = $theme_version . '.' . filemtime( get_template_directory() . $filepath );
		wp_enqueue_script( 'understrap-scripts', get_template_directory_uri() . $filepath, array(), $filepath_version, true );


	}
} // endif function_exists( 'understrap_scripts' ).
