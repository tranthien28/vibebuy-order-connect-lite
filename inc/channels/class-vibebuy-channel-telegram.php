<?php
/**
 * Telegram Channel Implementation
 *
 * @package VibeBuy
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VibeBuy_Channel_Telegram extends VibeBuy_Channel_Base {

	public function get_id(): string {
		return 'telegram';
	}

	public function get_name(): string {
		return 'Telegram';
	}

	public function get_settings_schema(): array {
		return [
			'telegram_botToken'         => 'sanitize_text_field', // 123456:ABC-DEF1234...
			'telegram_botUsername'      => 'sanitize_text_field', // @mybotname (for t.me link)
			'telegram_chatId'           => 'sanitize_text_field', // Optional: for send_message API
			'telegram_welcomeMessage'   => 'sanitize_textarea_field',
			'telegram_buttonText'       => 'sanitize_text_field',
			'telegram_iconUrl'          => 'esc_url_raw',
			'telegram_bgColor'          => 'sanitize_hex_color',
			'telegram_textColor'        => 'sanitize_hex_color',
			'telegram_borderRadius'     => 'absint',
			'telegram_categories'       => 'sanitize_text_field',
			'telegram_layout'           => 'sanitize_text_field',
			'telegram_wooAutoInject'         => 'sanitize_text_field',
			'telegram_displayCondition'      => 'sanitize_text_field',
		];
	}

	public function validate( array $settings ): ?string {
		$token    = $settings['telegram_botToken'] ?? '';
		$username = $settings['telegram_botUsername'] ?? '';

		if ( empty( $token ) && empty( $username ) ) {
			return __( 'Telegram Bot Token or Bot Username is required.', 'vibebuy-order-connect-lite' );
		}
		if ( ! empty( $token ) && ! preg_match( '/^\d+:[A-Za-z0-9_-]{35,}$/', $token ) ) {
			return __( 'Invalid Telegram Bot Token format.', 'vibebuy-order-connect-lite' );
		}
		return null;
	}

	public function build_url( array $settings, ?array $product = null ): string {
		$username = ltrim( $settings['telegram_botUsername'] ?? '', '@' );

		// Prefer t.me/username link (no message pre-fill needed, bot handles it)
		if ( $username ) {
			$message = $this->get_default_message( $product );
			return 'https://t.me/' . $username . '?text=' . rawurlencode( $message );
		}

		// Fallback: link to Telegram app with no specific target
		return 'https://telegram.me/';
	}

	/**
	 * Send a message via Telegram Bot API (for order notifications).
	 * This is called server-side, not from the widget JS.
	 * To change the API URL or add features: edit here only, no rebuild needed.
	 * @param array $settings
	 * @param string $text
	 * @return array|WP_Error
	 */
	public function send_message( array $settings, string $text ) {
		$token   = $settings['telegram_botToken'] ?? '';
		$chat_id = $settings['telegram_chatId'] ?? '';

		if ( empty( $token ) || empty( $chat_id ) ) {
			return new WP_Error( 'missing_config', 'Telegram bot token or chat ID not configured.' );
		}

		$api_url = sprintf( 'https://api.telegram.org/bot%s/sendMessage', $token );

		return wp_remote_post( $api_url, [
			'timeout' => 10,
			'body'    => [
				'chat_id'    => $chat_id,
				'text'       => $text,
				'parse_mode' => 'HTML',
			],
		] );
	}
}
