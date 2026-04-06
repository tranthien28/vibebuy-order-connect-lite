<?php
/**
 * Plugin Name: VibeBuy Lite - Order via Messaging for WooCommerce
 * Plugin URI:  https://github.com/tranthien28
 * Description: VibeBuy Lite - Sales Conversion Tool (Chat-to-Buy). Allows customers to quickly order via Messaging platforms.
 * Version:     1.0.3
 * Author:      Thien Tran
 * Author URI:  https://github.com/tranthien28
 * License:     GPL-2.0+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: vibebuy-order-connect-lite
 *
 * @package VibeBuy
 */

// Prevent direct access.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define Constants.
define( 'VIBEBUY_VERSION', '1.0.3' );
define( 'VIBEBUY_PLUGIN_DIR', plugin_dir_path( __FILE__ ) );
define( 'VIBEBUY_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

/**
 * Initialize the Plugin via the Loader.
 */
// Load Registry & Channels first (as they are dependencies for others)
require_once VIBEBUY_PLUGIN_DIR . 'inc/channels/class-vibebuy-channel-base.php';
require_once VIBEBUY_PLUGIN_DIR . 'inc/channels/class-vibebuy-channel-registry.php';
require_once VIBEBUY_PLUGIN_DIR . 'inc/channels/class-vibebuy-channel-whatsapp.php';
require_once VIBEBUY_PLUGIN_DIR . 'inc/channels/class-vibebuy-channel-telegram.php';
require_once VIBEBUY_PLUGIN_DIR . 'inc/channels/class-vibebuy-channel-discord.php';

// Data & Database (Required for activation hook)
require_once VIBEBUY_PLUGIN_DIR . 'inc/database/class-vibebuy-db.php';
require_once VIBEBUY_PLUGIN_DIR . 'inc/class-vibebuy-license.php';

/**
 * Initialize the Plugin via the Loader.
 */
function vibebuy_init() {
	// Register built-in channels

	// Register built-in channels
	VibeBuy_Channel_Registry::register( new VibeBuy_Channel_WhatsApp() );
	VibeBuy_Channel_Registry::register( new VibeBuy_Channel_Telegram() );
	VibeBuy_Channel_Registry::register( new VibeBuy_Channel_Discord() );
	VibeBuy_Channel_Registry::init(); // Fire 'vibebuy_register_channels' hook

	// 1.5 Init License (Unlock Pro filters)
	( new VibeBuy_License() )->init();

	// 2. Load and Init Central Loader
	require_once VIBEBUY_PLUGIN_DIR . 'inc/class-vibebuy-loader.php';
	$loader = new VibeBuy_Loader();
	$loader->init();
}
/**
 * Add "Get Pro" link to the plugin action links.
 */
function vibebuy_plugin_action_links( $links ) {
	if ( ! vibebuy_is_pro() ) {
		$get_pro_link = '<a href="https://vibebuy.com" target="_blank" style="color: #2271b1; font-weight: bold;">' . __( 'Get Pro', 'vibebuy-order-connect-lite' ) . '</a>';
		array_unshift( $links, $get_pro_link );
	}
	return $links;
}
add_filter( 'plugin_action_links_' . plugin_basename( __FILE__ ), 'vibebuy_plugin_action_links' );

add_action( 'plugins_loaded', 'vibebuy_init' );

/**
 * Register Activation Hook for Table Creation.
 */
register_activation_hook( __FILE__, array( 'VibeBuy_DB', 'create_table' ) );

// --- Global Helpers ---
if ( ! function_exists( 'vibebuy_is_pro' ) ) {
	/**
	 * Centralized check for Pro status.
	 * Allows Lite to remain clean while Pro hooks in to unlock features.
	 */
	function vibebuy_is_pro() {
		return apply_filters( 'vibebuy_is_pro', false );
	}
}

if ( ! function_exists( 'vibebuy_is_pro_installed' ) ) {
	/**
	 * Check if Pro plugin is present (regardless of license status).
	 */
	function vibebuy_is_pro_installed() {
		return apply_filters( 'vibebuy_is_pro_installed', false );
	}
}
