import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Send, User, Mail, MessageSquare, CheckCircle2, ShoppingCart } from 'lucide-react';

const OrderModal = ({ isOpen, onClose, onSubmit, channel, product, userData, settings }) => {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_message: ''
  });
  const [quantity, setQuantity] = useState(product?.qty || 1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen && settings.orderModal_autoFill !== false && userData?.isLoggedIn) {
      setFormData(prev => ({
        ...prev,
        customer_name: `${userData.firstName} ${userData.lastName}`.trim(),
        customer_email: userData.email || ''
      }));
    }
  }, [isOpen, userData, settings.orderModal_autoFill]);

  // Sync quantity when modal opens or product changes
  useEffect(() => {
    if (isOpen && product?.qty) {
      setQuantity(product.qty);
    }
  }, [isOpen, product?.qty]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const success = await onSubmit({
      customer_name: formData.customer_name,
      customer_email: formData.customer_email,
      customer_phone: formData.customer_phone,
      customer_message: formData.customer_message,
      channel_id: channel.id,
      product_id: product?.id || 0,
      product_qty: quantity,
      product_url: product?.url || window.location.href
    });

    if (success) {
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose(true); 
      }, 2000);
    } else {
      setIsSubmitting(false);
    }
  };

  const widgetData = window.vibebuyWidgetData || {};
  const strings = widgetData.strings || {};
  const templateHtml = widgetData.orderModalTemplate || '';

  // Return Portals into the Template Slots
  const renderSlots = () => {
    const slots = [];
    
    // Close Button Slot
    const closeEl = document.getElementById('vibe-slot-close');
    if (closeEl) {
      slots.push(createPortal(
        <button 
          className="absolute top-3 right-3 z-50 p-1.5 bg-white/80 hover:bg-white rounded-full shadow-sm transition-all text-gray-400 hover:text-gray-900 border border-gray-100" 
          onClick={(e) => { e.stopPropagation(); onClose(false); }}
        >
          <X className="w-4 h-4" />
        </button>,
        closeEl
      ));
    }

    // Image Slot
    const imgEl = document.getElementById('vibe-slot-image');
    if (imgEl) {
      slots.push(createPortal(
        <div className="w-full h-full relative group">
          {product?.image ? (
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center p-4 text-gray-300">
               <ShoppingCart className="w-10 h-10 mb-2" />
               <span className="text-[10px] font-bold uppercase">No Photo</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none"></div>
          <div className="absolute bottom-3 left-3">
             <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg border border-white/20 shadow-sm">
                <div className={`vibebuy-modal-icon-xs ${channel.id}`}>{channel.icon}</div>
                <span className="text-[9px] font-black uppercase text-gray-700 tracking-tighter">{channel.name}</span>
             </div>
          </div>
        </div>,
        imgEl
      ));
    }

    // Product Header Slots
    const nameEl = document.getElementById('vibe-slot-product-name');
    if (nameEl) {
      slots.push(createPortal(
        <h3 className="text-base font-black text-gray-900 leading-tight truncate">{product?.name || 'Inquiry'}</h3>,
        nameEl
      ));
    }

    const priceEl = document.getElementById('vibe-slot-product-price');
    if (priceEl) {
      slots.push(createPortal(
        <span className="text-sm font-black text-blue-600">
          {product?.currency && <span dangerouslySetInnerHTML={{ __html: product.currency }} />}
          {product?.price || ''}
        </span>,
        priceEl
      ));
    }

    const skuEl = document.getElementById('vibe-slot-product-sku');
    if (skuEl) {
      slots.push(createPortal(
        <div className="flex flex-wrap gap-1.5 mt-1">
          {product?.sku && (
            <span className="text-[9px] bg-gray-50 text-gray-400 px-1.5 py-0.5 rounded border border-gray-100 font-bold uppercase tracking-wider">SKU: {product.sku}</span>
          )}
          {product?.variation && (
            <span className="text-[9px] bg-blue-50 text-blue-500 px-1.5 py-0.5 rounded border border-blue-100 font-bold uppercase tracking-wider">{product.variation}</span>
          )}
        </div>,
        skuEl
      ));
    }

    // Quantity Selector Slot
    const qtyEl = document.getElementById('vibe-slot-quantity');
    if (qtyEl) {
      slots.push(createPortal(
        <div className="flex items-center gap-2.5 bg-white px-2 py-1 rounded-lg border border-gray-200">
          <button 
            type="button" 
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="w-6 h-6 flex items-center justify-center bg-gray-50 rounded hover:bg-gray-100 text-gray-500 font-black text-xs transition-colors"
          >-</button>
          <span className="w-5 text-center text-xs font-black text-gray-900">{quantity}</span>
          <button 
            type="button" 
            onClick={() => setQuantity(quantity + 1)}
            className="w-6 h-6 flex items-center justify-center bg-gray-50 rounded hover:bg-gray-100 text-gray-500 font-black text-xs transition-colors"
          >+</button>
        </div>,
        qtyEl
      ));
    }

    // Field Slots
    const nameFieldEl = document.getElementById('vibe-slot-field-name');
    if (nameFieldEl) {
      slots.push(createPortal(
        <div className="vibebuy-form-group">
          <label className="text-[9px] font-black uppercase text-gray-400 mb-1 flex items-center gap-1.5"><User className="w-2.5 h-2.5" /> Full Name</label>
          <input
            type="text"
            className="h-9 px-3 w-full bg-gray-50 border border-gray-200 rounded-[10px] text-[13px] text-gray-700 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            required
            placeholder="Your name"
            value={formData.customer_name}
            onChange={e => setFormData({ ...formData, customer_name: e.target.value })}
          />
        </div>,
        nameFieldEl
      ));
    }

    const emailFieldEl = document.getElementById('vibe-slot-field-email');
    if (emailFieldEl) {
      slots.push(createPortal(
        <div className="vibebuy-form-group">
          <label className="text-[9px] font-black uppercase text-gray-400 mb-1 flex items-center gap-1.5"><Mail className="w-2.5 h-2.5" /> Email</label>
          <input
            type="email"
            className="h-9 px-3 w-full bg-gray-50 border border-gray-200 rounded-[10px] text-[13px] text-gray-700 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            required
            placeholder="email@example.com"
            value={formData.customer_email}
            onChange={e => setFormData({ ...formData, customer_email: e.target.value })}
          />
        </div>,
        emailFieldEl
      ));
    }

    const phoneFieldEl = document.getElementById('vibe-slot-field-phone');
    if (phoneFieldEl) {
      slots.push(createPortal(
        <div className="vibebuy-form-group">
          <label className="text-[9px] font-black uppercase text-gray-400 mb-1 flex items-center gap-1.5"><MessageSquare className="w-2.5 h-2.5" /> Phone Number</label>
          <input
            type="tel"
            className="h-9 px-3 w-full bg-gray-50 border border-gray-200 rounded-[10px] text-[13px] text-gray-700 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none"
            placeholder="e.g., 090xxxxxxx"
            value={formData.customer_phone}
            onChange={e => setFormData({ ...formData, customer_phone: e.target.value })}
          />
        </div>,
        phoneFieldEl
      ));
    }

    const msgFieldEl = document.getElementById('vibe-slot-field-message');
    if (msgFieldEl) {
      slots.push(createPortal(
        <div className="vibebuy-form-group">
          <label className="text-[9px] font-black uppercase text-gray-400 mb-1 flex items-center gap-1.5"><MessageSquare className="w-2.5 h-2.5" /> Note</label>
          <textarea
            className="p-3 w-full bg-gray-50 border border-gray-200 rounded-[10px] text-[13px] text-gray-700 focus:bg-white focus:ring-1 focus:ring-blue-500 transition-all outline-none min-h-[50px] resize-none"
            placeholder="I'm interested..."
            rows={2}
            value={formData.customer_message}
            onChange={e => setFormData({ ...formData, customer_message: e.target.value })}
          />
        </div>,
        msgFieldEl
      ));
    }

    const submitEl = document.getElementById('vibe-slot-submit');
    if (submitEl) {
      slots.push(createPortal(
        <button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`h-11 w-full rounded-[10px] text-white text-[13px] font-black tracking-wide shadow-md flex items-center justify-center gap-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 vibebuy-bg-${channel.id}`}
        >
          {isSubmitting ? (
            <div className="vibebuy-spinner-sm" />
          ) : (
            <>Send <Send className="w-3.5 h-3.5" /></>
          )}
        </button>,
        submitEl
      ));
    }

    const successEl = document.getElementById('vibe-slot-success');
    if (successEl && isSuccess) {
      slots.push(createPortal(
        <div className="absolute inset-0 bg-white z-[60] flex flex-col items-center justify-center text-center p-6 animate-in fade-in duration-300">
           <div className="w-14 h-14 bg-green-50 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
           </div>
           <p className="text-base font-black text-gray-900">{strings.requestSent || 'Inquiry Sent!'}</p>
           {channel.id === 'whatsapp' && (
              <p className="text-[11px] text-gray-400 font-bold mt-1">{strings.redirectingToChat || 'Redirecting...'}</p>
           )}
        </div>,
        successEl
      ));
    }

    return slots;
  };

  const modalContainer = (
    <div 
      className="vibebuy-modal-system font-sans"
      dangerouslySetInnerHTML={{ __html: templateHtml }}
    />
  );

  return (
    <>
      {createPortal(modalContainer, document.body)}
      {renderSlots()}
    </>
  );
};

export default OrderModal;
