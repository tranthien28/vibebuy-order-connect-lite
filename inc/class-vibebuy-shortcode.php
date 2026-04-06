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
		if ( vibebuy_is_pro() ) {
			add_shortcode( 'vibebuy_button', array( $this, 'render_shortcode' ) );
		}
	}

	/**
	 * Render the [vibebuy_button] shortcode.
	 */
	public function render_shortcode( $atts ) {
		if ( ! vibebuy_is_pro() ) {
			if ( is_user_logged_in() && current_user_can( 'manage_options' ) ) {
				return '<p style="color:#d97706; font-size:12px; border:1px solid #d97706; padding:8px; border-radius:4px;">VibeBuy Config Error: Use of [vibebuy_button] shortcode requires VibeBuy Pro.</p>';
			}
			return '';
		}

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
