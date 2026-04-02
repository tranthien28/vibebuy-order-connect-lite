<?php
/**
 * VibeBuy Shortcode Class
 * Handles [vibebuy_button] shortcode rendering.
 *
 * @package VibeBuy
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VibeBuy_Shortcode {

	/**
	 * Initialize Shortcode Hooks.
	 */
	public function init() {
		add_shortcode( 'vibebuy_button', array( $this, 'render_shortcode' ) );
	}

	/**
	 * Render the [vibebuy_button] shortcode.
	 */
	public function render_shortcode( $atts ) {
		// Enqueue frontend scripts (defined in VibeBuy_Frontend)
		// This ensures we only load widget JS if the shortcode is actually used.
		if ( class_exists( 'VibeBuy_Frontend' ) ) {
			VibeBuy_Frontend::enqueue_frontend_assets();
		}

		$atts = shortcode_atts( array(
			'channel' => 'whatsapp', // Default to WhatsApp
		), $atts, 'vibebuy_button' );

		$channel_id = esc_attr( $atts['channel'] );

		// Return the root div where React will mount a specific button
		// for this channel if defined in the widget logic.
		return sprintf( 
			'<div class="vibebuy-shortcode-root" data-channel="%s" id="vibebuy-shortcode-%s"></div>',
			$channel_id,
			uniqid()
		);
	}
}
