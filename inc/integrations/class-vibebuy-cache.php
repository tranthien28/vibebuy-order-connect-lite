<?php
/**
 * VibeBuy Cache Integration
 * Handles Automated Cache Purging for popular cache plugins.
 *
 * @package VibeBuy
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

class VibeBuy_Cache {

	/**
	 * Initialize Cache Purge Hooks.
	 */
	public function init() {
		// Purge after settings update
		add_action( 'update_option_vibebuy_lite_settings', array( $this, 'purge_all_caches' ), 10, 2 );
	}

	/**
	 * Purge all known cache plugins.
	 */
	public function purge_all_caches() {
		// 1. WP Rocket
		if ( function_exists( 'rocket_clean_domain' ) ) {
			rocket_clean_domain();
		}

		// 2. LiteSpeed Cache
		if ( class_exists( 'LiteSpeed\Purge' ) ) {
			\LiteSpeed\Purge::purge_all();
		}

		// 3. W3 Total Cache
		if ( function_exists( 'w3tc_flush_all' ) ) {
			w3tc_flush_all();
		}

		// 4. WP Super Cache
		if ( function_exists( 'wp_cache_clear_cache' ) ) {
			wp_cache_clear_cache();
		}

		// 5. Autoptimize
		if ( class_exists( 'autoptimizeCache' ) ) {
			\autoptimizeCache::clearall();
		}
	}
}
