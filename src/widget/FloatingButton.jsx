import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { MessageCircle, Phone, Send, X } from 'lucide-react';
import OrderModal from './OrderModal';

const getChannelLink = (channelId, settings, product, manualData) => {
  const data = product || manualData || {};
  let text = settings.global_message_template || "Hello, I'm interested in {{product_name}}";
  
  // Basic template replacement - matching the {{tag}} format used in admin
  text = text.replace('{{product_name}}', data.name || 'this product')
             .replace('{{product_price}}', data.price || '')
             .replace('{{product_url}}', data.url || window.location.href)
             .replace('{{full_name}}', data.customer_name || '')
             .replace('{{phone}}', data.customer_phone || '')
             .replace('{{product_qty}}', data.qty || '1');

  if (channelId === 'whatsapp') {
    const phone = manualData?.phone || settings.whatsapp_number;
    return `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
  } else if (channelId === 'telegram') {
    const username = settings.telegram_botUsername;
    return username ? `https://t.me/${username}` : '#';
  } else if (channelId === 'zalo') {
    const number = manualData?.phone || settings.zalo_number;
    return `https://zalo.me/${number}`;
  } else if (channelId === 'messenger') {
    const id = settings.messenger_id;
    return `https://m.me/${id}`;
  }
  return '#';
};

const trackEvent = async (eventType, channelId, productId) => {
  const payload = window.vibebuyWidgetData || {};
  if (!payload.settings?.is_pro) return;

  try {
    await fetch(`${payload.apiUrl}track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-WP-Nonce': payload.nonce
      },
      body: JSON.stringify({
        event_type: eventType,
        channel: channelId,
        product_id: productId,
        referrer: document.referrer
      })
    });
  } catch (err) {
    // Silent fail for tracking
  }
};

const useOrderFlow = (settings, channelId, product, manualData) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const payload = window.vibebuyWidgetData || {};

  useEffect(() => {
    const productId = product?.id || 'manual';
    const submittedLocal = localStorage.getItem(`vibebuy_submitted_${channelId}_${productId}`) === 'true';
    const submittedRemote = payload.submittedInquiries?.includes(`${channelId}|${productId}`);
    setHasSubmitted(submittedLocal || submittedRemote);

    // Analytics: Widget View
    trackEvent('view', channelId, product?.id || 0);
  }, [channelId, product?.id, payload.submittedInquiries]);

  const triggerAction = (e) => {
    if (e) {
      if (e.stopPropagation) e.stopPropagation();
      if (e.preventDefault) e.preventDefault();
    }

    // Analytics: Click
    trackEvent('click', channelId, product?.id || 0);
    
    const modalEnabled = settings.orderModal_enabled !== false;
    const autoOff = settings.orderModal_autoOff === true; // Explicitly on, default to false in logic for better testing

    // Only WhatsApp Lite REQUIRES a redirect link to reach admin
    if (!modalEnabled || (autoOff && hasSubmitted)) {
      if (channelId === 'whatsapp') {
        const link = getChannelLink(channelId, settings, product, manualData);
        if (link !== '#') window.open(link, '_blank');
      } else {
        // For bypass, if modal is OFF, we still need to open the link so the button isn't "dead"
        // But for Telegram/Discord, the primary value is the bot/webhook notification
        const link = getChannelLink(channelId, settings, product, manualData);
        if (link !== '#') window.open(link, '_blank');
      }
      return;
    }

    setIsModalOpen(true);
  };

  const handleModalSubmit = async (formData) => {
    try {
      const response = await fetch(`${payload.apiUrl}connections`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': payload.nonce
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const productId = product?.id || 'manual';
        localStorage.setItem(`vibebuy_submitted_${channelId}_${productId}`, 'true');
        setHasSubmitted(true);
        return true;
      }
    } catch (error) {
      console.error('Failed to submit connection:', error);
    }
    return false;
  };

  const handleModalClose = (proceedToChat) => {
    setIsModalOpen(false);
    // User Instructions: Only WhatsApp Lite needs a redirect after modal submission
    if (proceedToChat && channelId === 'whatsapp') {
      const link = getChannelLink(channelId, settings, product, manualData);
      if (link !== '#') window.open(link, '_blank');
    }
  };

  return { isModalOpen, triggerAction, handleModalSubmit, handleModalClose, hasSubmitted };
};

const LeadButton = ({ settings, productData, manualData }) => {
  const { isModalOpen, triggerAction, handleModalSubmit, handleModalClose, hasSubmitted } = useOrderFlow(settings, 'global', productData, manualData);
  const strings = window.vibebuyWidgetData?.strings || {};

  const bgColor = settings.backgroundColor || '#22c55e';
  const textColor = settings.textColor || '#ffffff';
  const bRadius = settings.borderRadius !== undefined ? settings.borderRadius : 10;
  const layout = settings.buttonLayout || 'stacked';
  const bWidth = settings.width || (layout === 'inline' ? 'auto' : '100%');
  const bHeight = settings.height || 48;
  const fSize = settings.fontSize || 14;
  
  const isSubmitted = hasSubmitted;
  const bText = isSubmitted ? (strings.alreadyRequested || 'Đã gửi yêu cầu') : (settings.buttonText || 'Gửi yêu cầu tư vấn');
  const bIcon = settings.buttonIconUrl;

  const style = {
    backgroundColor: isSubmitted ? '#9ca3af' : bgColor,
    color: textColor,
    borderRadius: bRadius !== undefined ? `${bRadius}px` : '10px',
    cursor: isSubmitted ? 'not-allowed' : 'pointer',
    opacity: isSubmitted ? 0.8 : 1,
    width: bWidth === 'auto' ? 'auto' : (bWidth.toString().includes('%') ? bWidth : `${bWidth}px`),
    height: `${bHeight}px`,
    fontSize: `${fSize}px`,
  };

  return (
    <div style={{ width: style.width }} className="flex-shrink-0">
      <button 
        type="button"
        disabled={isSubmitted}
        onClick={(e) => triggerAction(e)}
        style={style}
        className="w-full font-semibold px-4 flex items-center justify-center gap-2 transition-all shadow-sm hover:opacity-90 hover:scale-[1.01]"
      >
        {bIcon ? (
           <img src={bIcon} alt="Icon" className="w-5 h-5 rounded-full object-cover" />
        ) : (
           <MessageCircle className="w-5 h-5 fill-current" />
        )}
        <span className="truncate">{bText}</span>
      </button>

      <OrderModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        channel={{ 
          id: 'global', 
          name: 'VibeBuy', 
          color: 'global', 
          icon: <MessageCircle /> 
        }}
        product={productData}
        userData={window.vibebuyWidgetData?.currentUser}
        settings={settings}
      />
    </div>
  );
};

const InlineChatButtons = ({ settings, productData, manualData }) => {
  return (
    <div className="vibebuy-inline-container font-sans mb-4">
      <LeadButton 
        settings={settings}
        productData={productData}
        manualData={manualData}
      />
    </div>
  );
};

const FloatingBubble = ({ settings, productData }) => {
  const { isModalOpen, triggerAction, handleModalSubmit, handleModalClose, hasSubmitted } = useOrderFlow(settings, 'global', productData, null);

  const customBgColor = settings.backgroundColor || '#22c55e';
  const customRadius = settings.borderRadius !== undefined ? `${settings.borderRadius}px` : '999px';
  const hasText = settings.buttonText && settings.buttonText.trim() !== '';

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end font-sans">
        <div 
          className={`flex items-center justify-center shadow-xl cursor-pointer transform hover:scale-105 transition-all text-white ${hasText ? 'px-5 py-3 gap-3' : 'w-14 h-14'}`}
          style={{ 
            backgroundColor: customBgColor,
            borderRadius: customRadius,
          }}
          onClick={(e) => triggerAction(e)}
        >
           {settings.buttonIconUrl ? (
              <img src={settings.buttonIconUrl} alt="Custom Agent Avatar" className="w-6 h-6 object-cover rounded-full shadow-sm" />
           ) : (
              <MessageCircle className="w-6 h-6 fill-current" />
           )}

           {hasText && (
              <span className="font-bold whitespace-nowrap">{settings.buttonText}</span>
           )}
        </div>
      </div>

      <OrderModal 
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSubmit={handleModalSubmit}
        channel={{ id: 'global', name: 'VibeBuy', color: 'global', icon: <MessageCircle /> }}
        product={productData}
        userData={window.vibebuyWidgetData?.currentUser}
        settings={settings}
      />
    </>
  );
};

// Global Bootstrapper
const bootstrapWidget = () => {
  const payload = window.vibebuyWidgetData || {};
  const settings = payload.settings || { activeChannels: [] };
  const product = payload.product || null;
  
  if (!settings.activeChannels || settings.activeChannels.length === 0) return;

  // 1. Single Re-bootstrapper for WooCommerce context
  const scrapeWooData = () => {
    const qtyInput = document.querySelector('input[name="quantity"], input.qty, .qty');
    const qty = qtyInput ? parseInt(qtyInput.value) : 1;

    // Image scraping (fallback for variations or other layouts)
    const imgElement = document.querySelector('.woocommerce-product-gallery__image img, .wp-post-image, .attachment-shop_single');
    const image = imgElement ? imgElement.src : (product?.image || '');

    // Variation scraping
    let variationName = '';
    const variationForm = document.querySelector('.variations_form');
    if (variationForm) {
      const selectedAttrs = [];
      variationForm.querySelectorAll('select').forEach(select => {
        const val = select.value;
        if (val) {
          const label = document.querySelector(`label[for="${select.id}"]`)?.textContent || '';
          selectedAttrs.push(`${label.replace(':', '').trim()}: ${val}`);
        }
      });
      variationName = selectedAttrs.join(', ');
    }

    return { 
      ...product,
      qty: qty > 0 ? qty : 1,
      variation: variationName,
      image: image
    };
  };

  const currentProduct = product ? scrapeWooData() : null;

  // 1. Single widget items
  const singleNodes = document.querySelectorAll('.vibebuy-inline-widget');
  singleNodes.forEach(node => {
    const isWoo = node.dataset.woo === 'true';
    const channelId = node.dataset.channel;
    const displayMode = node.dataset.display;

    const manualData = isWoo ? null : {
       name: node.dataset.name,
       price: node.dataset.price,
       phone: node.dataset.phone,
       channel: node.dataset.channel,
       qty: 1
    };

    const root = createRoot(node);
    root.render(
      <InlineChatButtons 
        settings={settings} 
        productData={isWoo ? currentProduct : null} 
        manualData={manualData} 
        channelId={channelId}
        displayMode={displayMode}
      />
    );
  });

  // 2. Grouped widget items (Simplified to one lead button)
  const groupNodes = document.querySelectorAll('.vibebuy-inline-widget-group');
  groupNodes.forEach(node => {
     const isWoo = node.dataset.woo === 'true';
     const root = createRoot(node);
     root.render(
        <div className="vibebuy-inline-container font-sans mb-4">
           <LeadButton 
              settings={settings}
              productData={isWoo ? currentProduct : null}
           />
        </div>
     );
  });

  // 3. Floating Bubble
  const floatingContainer = document.getElementById('vibebuy-widget-root');
  if (floatingContainer) {
    const root = createRoot(floatingContainer);
    
    const allInlineNodes = document.querySelectorAll('.vibebuy-inline-widget, .vibebuy-inline-widget-group');
    if (allInlineNodes.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        const isSomeInlineVisible = entries.some(entry => entry.isIntersecting);
        if (isSomeInlineVisible) {
          root.render(<div />);
        } else {
          root.render(<FloatingBubble settings={settings} productData={currentProduct} />);
        }
      });
      
      allInlineNodes.forEach(node => observer.observe(node));
    } else {
      root.render(<FloatingBubble settings={settings} />);
    }
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', bootstrapWidget);
} else {
  bootstrapWidget();
}
