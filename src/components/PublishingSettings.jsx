import React, { useState } from 'react';
import { ShoppingCart, Code, Copy, CheckCircle2, PaintBucket } from 'lucide-react';

const PublishingSettings = ({ settings, updateSetting, editChannel }) => {
  const [copied, setCopied] = useState(false);

  const shortcodeStr = `[vibebuy_button channel="${editChannel}"]`;

  const copyShortcode = () => {
    navigator.clipboard.writeText(shortcodeStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 font-sans">
      
      {/* WooCommerce Integration Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-purple-500 rounded-l-2xl"></div>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-purple-50 p-3 rounded-xl">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Enable Product Sync</h2>
              <p className="text-sm text-gray-500 mt-1">Automatically bridge WooCommerce with VibeBuy chat widgets.</p>
            </div>
          </div>

          <label className="flex items-start md:items-center justify-between cursor-pointer group p-6 border-2 border-transparent bg-gray-50/50 hover:bg-purple-50/40 hover:border-purple-100 rounded-xl transition-all duration-300">
            <div className="flex flex-col pr-8 max-w-xl">
              <span className="text-base font-bold text-gray-800 group-hover:text-purple-700 transition-colors">
                Auto-inject below "Add to Cart"
              </span>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                When activated, beautiful conversational order buttons will be deeply integrated directly into your WooCommerce product pages. It automatically captures the exact <strong className="text-gray-700">Product Title</strong> and <strong className="text-gray-700">Price</strong> to send to your chat agents.
              </p>
            </div>
            
            {/* Custom SaaS Toggle Switch */}
            <div className={`relative inline-flex h-8 w-14 flex-shrink-0 items-center rounded-full transition-colors duration-300 ease-in-out shadow-inner ${(settings[`${editChannel}_wooAutoInject`] !== undefined ? settings[`${editChannel}_wooAutoInject`] : settings.wooAutoInject !== false) ? 'bg-purple-600' : 'bg-gray-200'}`}>
              <span className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md ring-0 transition duration-300 ease-in-out ${(settings[`${editChannel}_wooAutoInject`] !== undefined ? settings[`${editChannel}_wooAutoInject`] : settings.wooAutoInject !== false) ? 'translate-x-7' : 'translate-x-1'}`} />
            </div>
            
            {/* Absolute hide to bypass WordPress global admin stylesheets modifying checkboxes */}
            <input 
              type="checkbox" 
              className="sr-only" 
              style={{ position: 'absolute', opacity: 0, width: 0, height: 0, margin: 0 }}
              checked={(settings[`${editChannel}_wooAutoInject`] !== undefined ? settings[`${editChannel}_wooAutoInject`] : settings.wooAutoInject !== false)} 
              onChange={(e) => updateSetting(`${editChannel}_wooAutoInject`, e.target.checked)} 
            />
          </label>

          {/* Conditional Display Position Selector */}
          {(settings[`${editChannel}_wooAutoInject`] !== undefined ? settings[`${editChannel}_wooAutoInject`] : settings.wooAutoInject !== false) && (
            <div className="mt-6 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-4 duration-300">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Injection Position</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                
                {/* Free Hook 1 */}
                <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name={`${editChannel}_wooInjectPosition`} 
                    value="woocommerce_after_add_to_cart_button" 
                    checked={(!settings[`${editChannel}_wooInjectPosition`] && !settings.wooInjectPosition) || settings[`${editChannel}_wooInjectPosition`] === 'woocommerce_after_add_to_cart_button' || (!settings[`${editChannel}_wooInjectPosition`] && settings.wooInjectPosition === 'woocommerce_after_add_to_cart_button')}
                    onChange={(e) => updateSetting(`${editChannel}_wooInjectPosition`, e.target.value)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-sm font-semibold text-gray-800">Below "Add to Cart"</span>
                </label>

                {/* Free Hook 2 */}
                <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input 
                    type="radio" 
                    name={`${editChannel}_wooInjectPosition`} 
                    value="woocommerce_before_add_to_cart_button" 
                    checked={settings[`${editChannel}_wooInjectPosition`] === 'woocommerce_before_add_to_cart_button' || (!settings[`${editChannel}_wooInjectPosition`] && settings.wooInjectPosition === 'woocommerce_before_add_to_cart_button')}
                    onChange={(e) => updateSetting(`${editChannel}_wooInjectPosition`, e.target.value)}
                    className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                  />
                  <span className="ml-3 text-sm font-semibold text-gray-800">Above "Add to Cart"</span>
                </label>

                {/* PRO Hook 1 */}
                <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-not-allowed opacity-60 bg-gray-50 group">
                  <input type="radio" disabled className="w-4 h-4 text-gray-400 border-gray-300" />
                  <span className="ml-3 text-sm font-semibold text-gray-800">Under Product Title</span>
                  <span className="ml-auto text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded uppercase tracking-wide group-hover:bg-amber-500 group-hover:text-white transition-colors">Pro</span>
                </label>

                {/* PRO Hook 2 */}
                <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-not-allowed opacity-60 bg-gray-50 group">
                  <input type="radio" disabled className="w-4 h-4 text-gray-400 border-gray-300" />
                  <span className="ml-3 text-sm font-semibold text-gray-800">After Summary Desc</span>
                  <span className="ml-auto text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded uppercase tracking-wide group-hover:bg-amber-500 group-hover:text-white transition-colors">Pro</span>
                </label>

                {/* PRO Hook 3 */}
                <label className="flex items-center p-3 border border-gray-200 rounded-xl cursor-not-allowed opacity-60 bg-gray-50 group md:col-span-2">
                  <input type="radio" disabled className="w-4 h-4 text-gray-400 border-gray-300" />
                  <span className="ml-3 text-sm font-semibold text-gray-800">Sticky Bottom Bar (Mobile)</span>
                  <span className="ml-auto text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded uppercase tracking-wide group-hover:bg-amber-500 group-hover:text-white transition-colors">Pro</span>
                </label>
              </div>
            </div>
          )}

          {/* Group 1: Basic Context (Lite) */}
          <div className="mt-8 pt-6 border-t border-gray-100">
             <div className="flex items-center gap-2 mb-4">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Group 1: Basic Context (Lite)</h3>
             </div>
             <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm">
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Show on Categories</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Shoes, Watch" 
                      className="w-full px-4 py-2 border border-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none font-medium" 
                      value={settings[`${editChannel}_categories`] || ''} 
                      onChange={(e) => updateSetting(`${editChannel}_categories`, e.target.value)} 
                    />
                    <p className="text-[10px] text-gray-400 mt-2 italic font-medium">Leave empty for global product coverage.</p>
                  </div>
                  <div className="p-4 border border-gray-100 rounded-xl bg-gray-50/50 opacity-60 cursor-not-allowed group relative">
                    <div className="absolute top-2 right-2 bg-amber-400 text-amber-900 text-[8px] font-black px-1.5 py-0.5 rounded shadow-sm">PRO</div>
                    <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-2">Exclude Specific Products</label>
                    <input disabled type="text" placeholder="Locked in Lite" className="w-full px-4 py-2 border border-gray-100 rounded-lg bg-gray-100 text-sm italic" />
                  </div>
                </div>
             </div>
          </div>

          {/* Group 2: Advanced Targeting (Pro) */}
          <div className="mt-10 pt-8 border-t border-gray-100">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400"></div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Group 2: Advanced Targeting (Pro)</h3>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-60 pointer-events-none grayscale hover:grayscale-0 transition-all duration-500">
                {/* Price Range */}
                <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm relative">
                   <div className="absolute top-4 right-4 text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">Requires Pro</div>
                   <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Product Price Filter</label>
                   <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-50 p-2 rounded-lg border border-gray-100">
                         <span className="text-[10px] font-black text-gray-400 block uppercase mb-1">Min Price</span>
                         <input disabled type="number" placeholder="0" className="w-full bg-transparent font-black text-gray-900 outline-none" />
                      </div>
                      <div className="flex-1 bg-gray-50 p-2 rounded-lg border border-gray-100">
                         <span className="text-[10px] font-black text-gray-400 block uppercase mb-1">Max Price</span>
                         <input disabled type="number" placeholder="Infinity" className="w-full bg-transparent font-black text-gray-900 outline-none" />
                      </div>
                   </div>
                </div>

                {/* Stock Status */}
                <div className="p-5 border border-gray-100 rounded-2xl bg-white shadow-sm relative">
                   <div className="absolute top-4 right-4 text-[10px] font-black text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full uppercase tracking-tighter">Requires Pro</div>
                   <label className="block text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Inventory Condition</label>
                   <div className="flex flex-wrap gap-2">
                      {['In Stock only', 'Out of Stock only', 'All Status'].map((opt, i) => (
                         <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-xl border border-gray-100">
                            <div className="w-3 h-3 rounded-full border-2 border-gray-300"></div>
                            <span className="text-xs font-bold text-gray-600">{opt}</span>
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>

          {/* Group 3: Schedule & Global Reach (Pro) */}
          <div className="mt-10 pt-8 border-t border-gray-100">
             <div className="flex items-center gap-2 mb-6">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                <h3 className="text-sm font-black text-gray-900 uppercase tracking-widest">Group 3: Schedule & Global Presence (Pro)</h3>
             </div>

             <div className="space-y-6 opacity-60 pointer-events-none grayscale hover:grayscale-0 transition-all duration-500">
                {/* Global Pages */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                   {['Cart Page', 'Checkout Success', 'Search Results'].map(page => (
                      <div key={page} className="flex items-center justify-between p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
                         <span className="text-sm font-black text-gray-900 uppercase tracking-tight">{page}</span>
                         <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-300">
                            <CheckCircle2 className="w-5 h-5" />
                         </div>
                      </div>
                   ))}
                </div>

                {/* Scheduler Placeholder */}
                <div className="p-6 border border-gray-100 rounded-[2rem] bg-gradient-to-br from-gray-50 to-white">
                   <div className="flex items-center justify-between mb-4">
                      <div>
                         <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest underline decoration-blue-200 decoration-4">Business Hours Scheduler</h4>
                         <p className="text-xs text-gray-500 font-medium">Automatic show/hide toggle based on your team shift.</p>
                      </div>
                      <div className="text-[10px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-full uppercase tracking-tighter">Locked in Lite</div>
                   </div>
                   <div className="flex gap-2">
                      {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                         <div key={i} className="flex-1 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-xs font-black text-gray-300">
                            {day}
                         </div>
                      ))}
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Shortcode Generator Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-pink-500 rounded-l-2xl"></div>
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-pink-50 p-3 rounded-xl">
              <Code className="w-6 h-6 text-pink-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Global Shortcode Engine</h2>
              <p className="text-sm text-gray-500 mt-1">Deploy chat widgets anywhere using Gutenberg, Elementor, or Classic Editor.</p>
            </div>
          </div>

          <div className="bg-[#0D1117] rounded-xl p-5 flex justify-between items-center group shadow-inner border border-gray-800">
            <code className="text-pink-400 font-mono text-base tracking-wide flex-1 overflow-x-auto whitespace-nowrap">
              {shortcodeStr}
            </code>
            <button 
              onClick={copyShortcode}
              className="ml-4 flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white rounded-lg transition-all border border-gray-700 hover:border-gray-500"
              title="Copy to clipboard"
            >
              {copied ? (
                <><CheckCircle2 className="w-4 h-4 text-green-400" /> <span className="text-sm text-green-400 font-medium">Copied!</span></>
              ) : (
                <><Copy className="w-4 h-4" /> <span className="text-sm font-medium">Copy</span></>
              )}
            </button>
          </div>
          
          <div className="mt-8">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Available Attributes</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <code className="text-gray-900 font-bold font-mono bg-white px-2 py-1 rounded border border-gray-200 text-sm">name="..."</code>
                <p className="text-sm text-gray-500 mt-2">The product or service name you want pre-filled in the chat message.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
                <code className="text-gray-900 font-bold font-mono bg-white px-2 py-1 rounded border border-gray-200 text-sm">price="..."</code>
                <p className="text-sm text-gray-500 mt-2">The price tag for the item. Helps the agent identify intent.</p>
              </div>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 md:col-span-2">
                <code className="text-gray-900 font-bold font-mono bg-white px-2 py-1 rounded border border-gray-200 text-sm">channel="..."</code>
                <p className="text-sm text-gray-500 mt-2">Values: <span className="font-mono text-pink-600 bg-pink-50 px-1 rounded">"whatsapp"</span> or <span className="font-mono text-pink-600 bg-pink-50 px-1 rounded">"telegram"</span>. Use this to force the shortcode to ONLY display a specific button. Omit this to fallback to default active buttons.</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Visual Overlay Configs */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-1 h-full bg-blue-500 rounded-l-2xl"></div>
        <div className="p-8 flex items-center gap-8">
          <div className="bg-blue-50 p-3 rounded-xl shrink-0">
            <PaintBucket className="w-6 h-6 text-blue-600" />
          </div>
          <div className="flex-1">
             <h3 className="text-lg font-bold text-gray-900">Floating Theme Color</h3>
             <p className="text-gray-500 text-sm mt-1">Pick a matching primary background color for the sticky floating bubble.</p>
          </div>
          <div className="shrink-0 relative group">
            <input 
              type="color" 
              value={settings[`${editChannel}_buttonColor`] || settings.buttonColor || '#22c55e'} 
              onChange={(e) => updateSetting(`${editChannel}_buttonColor`, e.target.value)}
              className="w-16 h-16 p-0 border-4 border-white shadow-lg rounded-full cursor-pointer transition-transform group-hover:scale-110 group-hover:shadow-xl"
              style={{ WebkitAppearance: 'none' }}
            />
          </div>
        </div>
      </div>

    </div>
  );
};

export default PublishingSettings;
