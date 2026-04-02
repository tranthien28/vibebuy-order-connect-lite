<?php
/**
 * VibeBuy Order Modal Template
 * 
 * This template can be overridden by copying it to your-theme/vibebuy/order-modal.php
 * 
 * IMPORTANT: Do not remove the ID attributes starting with "vibe-slot-".
 * These are used by React to inject dynamic content and form fields.
 *
 * @package VibeBuy
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
?>
<div class="vibebuy-modal-overlay p-4 md:p-6" id="vibe-modal-overlay">
	<div class="vibebuy-modal-content animate-in zoom-in-95 duration-200 overflow-hidden" 
		 style="max-width: 780px; width: 100%; max-height: min(90vh, 580px); display: flex; flex-direction: column; padding: 0; border-radius: 16px;">
		
		<!-- Close Button Slot -->
		<div id="vibe-slot-close"></div>

		<div class="flex flex-col md:flex-row h-full overflow-hidden">
			<!-- Left Column: Product Image -->
			<div class="w-full md:w-[35%] bg-gray-50 border-r border-gray-100 flex items-center justify-center overflow-hidden relative">
				<div id="vibe-slot-image" class="w-full h-full"></div>
			</div>

			<!-- Right Column: Form & Info -->
			<div class="w-full md:w-[65%] flex flex-col h-full bg-white relative">
				<div class="flex-1 overflow-y-auto p-5 md:p-6 custom-scrollbar">
					
					<!-- Product Header -->
					<div class="mb-5">
						<div class="mb-1" id="vibe-slot-product-sku"></div>
						<h3 id="vibe-slot-product-name" class="mb-0.5"></h3>
						<div id="vibe-slot-product-price"></div>
					</div>

					<!-- Quantity Section -->
					<div class="mb-5">
						<label class="text-[9px] font-black uppercase text-gray-400 mb-1.5 flex items-center gap-1.5">
							<svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
							Quantity
						</label>
						<div id="vibe-slot-quantity" class="flex items-center"></div>
					</div>

					<!-- Form Section -->
					<div class="space-y-4">
						<div class="vibebuy-grid-force" style="display: grid !important; grid-template-columns: repeat(2, 1fr) !important; gap: 12px !important;">
							<div id="vibe-slot-field-name"></div>
							<div id="vibe-slot-field-email"></div>
						</div>
						<div id="vibe-slot-field-phone"></div>
						<div id="vibe-slot-field-message" class="opacity-100"></div>
						
						<div class="pt-2">
							<div id="vibe-slot-submit"></div>
						</div>
					</div>

					<!-- Success Message (Initially Hidden/Managed by React) -->
					<div id="vibe-slot-success"></div>

					<!-- Branding -->
					<div class="mt-8 flex items-center justify-center gap-1.5 border-t border-gray-50 pt-4">
						<span class="text-[7.5px] uppercase tracking-[0.3em] font-bold text-gray-300">Powered by VibeBuy Lite</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
