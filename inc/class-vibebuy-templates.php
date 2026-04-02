<?php
/**
 * VibeBuy Template Loader
 * Handles finding and loading templates with theme override support.
 *
 * @package VibeBuy
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VibeBuy_Templates {

	/**
	 * Locate a template file.
	 * Checks in theme/vibebuy/ first, then plugin.
	 *
	 * @param string $template_name Template name (e.g. 'order-modal.php').
	 * @return string Path to the template file.
	 */
	public static function locate_template( $template_name ) {
		$template_path = 'vibebuy/' . $template_name;
		
		// 1. Check in child theme/theme
		$located = locate_template( $template_path );
		
		if ( ! $located ) {
			// 2. Fallback to plugin template
			$located = VIBEBUY_PLUGIN_DIR . 'templates/' . $template_name;
		}
		
		return apply_filters( 'vibebuy_locate_template', $located, $template_name );
	}

	/**
	 * Get template content as a string.
	 *
	 * @param string $template_name
	 * @param array  $args
	 * @return string
	 */
	public static function get_template_html( $template_name, $args = array() ) {
		$located = self::locate_template( $template_name );
		
		if ( ! file_exists( $located ) ) {
			return '';
		}
		
		ob_start();
		// Extract args if needed for the template
		if ( ! empty( $args ) ) {
			extract( $args );
		}
		include $located;
		$html = ob_get_clean();
		
		return apply_filters( 'vibebuy_get_template_html', $html, $template_name, $args );
	}
}
