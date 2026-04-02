<?php
/**
 * Discord Channel Implementation
 *
 * @package VibeBuy
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VibeBuy_Channel_Discord extends VibeBuy_Channel_Base {

	public function get_id(): string {
		return 'discord';
	}

	public function get_name(): string {
		return 'Discord';
	}

	public function is_pro(): bool {
		return false;
	}

	public function get_settings_schema(): array {
		return [
			'discord_webhookUrl'        => 'esc_url_raw',
			'discord_welcomeMessage'    => 'sanitize_textarea_field',
			'discord_buttonText'        => 'sanitize_text_field',
			'discord_iconUrl'           => 'esc_url_raw',
			'discord_bgColor'           => 'sanitize_hex_color',
			'discord_textColor'         => 'sanitize_hex_color',
			'discord_borderRadius'      => 'absint',
			'discord_categories'        => 'sanitize_text_field',
			'discord_layout'            => 'sanitize_text_field',
			'discord_wooAutoInject'          => 'sanitize_text_field',
			'discord_displayCondition'       => 'sanitize_text_field',
		];
	}

	public function validate( array $settings ): ?string {
		$url = $settings['discord_webhookUrl'] ?? '';

		if ( empty( $url ) ) {
			return __( 'Discord Webhook URL is required.', 'vibebuy-order-connect-lite' );
		}
		if ( ! filter_var( $url, FILTER_VALIDATE_URL ) || strpos( $url, 'discord.com/api/webhooks/' ) === false ) {
			return __( 'Invalid Discord Webhook URL.', 'vibebuy-order-connect-lite' );
		}
		return null;
	}

	public function build_url( array $settings, ?array $product = null ): string {
		// Discord doesn't have a direct "Click to Chat" link like WhatsApp.
		// For the Lite widget, we can point to Discord's homepage or a custom Invite link if they have one.
		// Usually, Discord is mostly for notifications (server-side).
		return 'https://discord.com/';
	}

	/**
	 * Send a message via Discord Webhook.
	 * @param array $settings
	 * @param string $text
	 * @return array|WP_Error
	 */
	public function send_message( array $settings, string $text ) {
		$webhook_url = $settings['discord_webhookUrl'] ?? '';

		if ( empty( $webhook_url ) ) {
			return new WP_Error( 'missing_config', 'Discord Webhook URL not configured.' );
		}

		return wp_remote_post( $webhook_url, [
			'timeout' => 10,
			'headers' => [ 'Content-Type' => 'application/json' ],
			'body'    => wp_json_encode( [
				'content' => $text,
			] ),
		] );
	}
}
