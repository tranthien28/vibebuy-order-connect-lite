<?php
/**
 * WhatsApp Channel Implementation
 *
 * @package VibeBuy
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VibeBuy_Channel_WhatsApp extends VibeBuy_Channel_Base {

	public function get_id(): string {
		return 'whatsapp';
	}

	public function get_name(): string {
		return 'WhatsApp';
	}

	public function get_settings_schema(): array {
		return [
			'whatsapp_number'      => 'sanitize_text_field',  // e.g. +84987654321
			'whatsapp_buttonText'  => 'sanitize_text_field',
			'whatsapp_iconUrl'     => 'esc_url_raw',
			'whatsapp_bgColor'     => 'sanitize_hex_color',
			'whatsapp_textColor'   => 'sanitize_hex_color',
			'whatsapp_borderRadius'=> 'absint',
			'whatsapp_categories'  => 'sanitize_text_field',
			'whatsapp_layout'      => 'sanitize_text_field',
			'whatsapp_wooAutoInject'     => 'sanitize_text_field',
			'whatsapp_displayCondition' => 'sanitize_text_field',
		];
	}

	public function validate( array $settings ): ?string {
		$number = $settings['whatsapp_number'] ?? '';
		if ( empty( $number ) ) {
			return __( 'WhatsApp number is required.', 'vibebuy-order-via-chat-for-woocommerce' );
		}
		// Strip spaces and check basic format
		$cleaned = preg_replace( '/\s+/', '', $number );
		if ( ! preg_match( '/^\+?[0-9]{9,15}$/', $cleaned ) ) {
			return __( 'Invalid WhatsApp number format. Include country code (e.g. +84987654321).', 'vibebuy-order-via-chat-for-woocommerce' );
		}
		return null;
	}

	public function build_url( array $settings, ?array $product = null ): string {
		$number  = preg_replace( '/[^0-9]/', '', $settings['whatsapp_number'] ?? '' );
		$message = $this->get_default_message( $product );

		// Custom button text overrides the message prefix
		$custom_text = $settings['whatsapp_buttonText'] ?? '';
		if ( $custom_text ) {
			$message = $custom_text . ( $product ? "\n" . $message : '' );
		}

		return 'https://wa.me/' . $number . '?text=' . rawurlencode( $message );
	}

	/**
	 * Send a message via WhatsApp Business API.
	 * In VibeBuy Lite, this returns an error or just true because Lite uses direct wa.me links.
	 * @param array $settings
	 * @param string $text
	 * @return array|WP_Error
	 */
	public function send_message( array $settings, string $text ) {
		// Lite version doesn't support server-to-server whatsapp.
		return new WP_Error( 'not_supported', 'WhatsApp server-to-server sending requires VibeBuy Pro.' );
	}
}

