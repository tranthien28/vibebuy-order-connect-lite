<?php
/**
 * VibeBuy License Manager - Lemon Squeezy Integration
 *
 * @package VibeBuy
 */

if (!defined('ABSPATH')) {
	exit;
}

class VibeBuy_License
{


	/**
	 * Check and validate the license key against Lemon Squeezy API.
	 *
	 * @param string $license_key The license key provided by the customer.
	 * @return array|WP_Error Status of the license check.
	 */
	public static function check_license($license_key)
	{
		$instance_name = get_bloginfo('name') . ' (' . home_url() . ')';

		// Endpoint for Lemon Squeezy License Activation/Validation
		$api_url = 'https://api.lemonsqueezy.com/v1/licenses/activate';

		$response = wp_remote_post($api_url, array(
			'timeout' => 15,
			'body' => array(
				'license_key' => sanitize_text_field($license_key),
				'instance_name' => $instance_name,
			),
		));

		if (is_wp_error($response)) {
			return $response;
		}

		$body = json_decode(wp_remote_retrieve_body($response), true);

		if (isset($body['activated']) && $body['activated'] === true) {
			// License is active
			$expires = isset($body['license_key']['expires_at']) ? $body['license_key']['expires_at'] : 'never';

			update_option('vibebuy_pro_status', 'active');
			update_option('vibebuy_pro_expires', $expires);
			update_option('vibebuy_license_key', $license_key);

			return array(
				'success' => true,
				'status' => 'active',
				'expires' => $expires,
			);
		}

		self::downgrade_to_lite();
		$error_msg = isset($body['error']) ? $body['error'] : __('Invalid license key.', 'vibebuy-order-via-chat-for-woocommerce');
		return new WP_Error('invalid_license', $error_msg);
	}

	/**
	 * Downgrade the plugin to Lite version.
	 */
	public static function downgrade_to_lite()
	{
		update_option('vibebuy_pro_status', 'lite');
		delete_option('vibebuy_pro_expires');
		// We don't delete the key yet so the user can see it in settings
	}

	/**
	 * Verify if the plugin currently has Pro status.
	 *
	 * @return bool
	 */
	public static function is_pro()
	{
		$status = get_option('vibebuy_pro_status', 'lite');
		$expires = get_option('vibebuy_pro_expires', '');

		if ($status !== 'active') {
			return false;
		}

		// Check expiration if applicable (never = no expiration)
		if (!empty($expires) && $expires !== 'never') {
			$expire_time = strtotime($expires);
			if ($expire_time < time()) {
				self::downgrade_to_lite();
				return false;
			}
		}

		return true;
	}
}

