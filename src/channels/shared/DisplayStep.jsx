import React from 'react';
import { Lock, Copy, Check, Smartphone, Monitor, DollarSign, Package, Layout, ChevronDown } from 'lucide-react';

const DisplayStep = ({ channel, settings, updateSetting }) => {
  const prefix = `${channel.id}_`;
  const get = (field, fallback) => settings[prefix + field] ?? fallback;

  const position = get('wooAutoInject', 'before_cart');
  const [copied, setCopied] = React.useState(false);
  const shortcode = `[vibebuy channel="${channel.id}"]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shortcode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-6 pb-6 pt-2">
      
      {/* 🚀 1. PLACEMENT & POSITIONING */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="p-1.5 bg-blue-50 rounded-xl border border-blue-100 shadow-sm"><Layout className="w-4 h-4 text-blue-600" /></div>
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Button Positioning</h3>
        </div>
        
        <div className="grid grid-cols-1 gap-4">
          {/* Standard In-Page */}
          <div className="space-y-1.5">
             <label className="block text-sm font-semibold text-gray-700">Standard (In-Page)</label>
             <div className="flex gap-2">
                {[
                  { id: 'before_cart', label: 'Before Cart' },
                  { id: 'after_cart', label: 'After Cart' },
                ].map((opt) => (
                  <label key={opt.id} className={`flex-1 flex items-center gap-2.5 px-3 py-3 rounded-2xl border-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95 ${position === opt.id ? 'border-green-600 bg-green-50/30 ring-4 ring-green-50/20 shadow-sm' : 'border-slate-50 bg-slate-50/30 hover:border-slate-200'}`}>
                    <div className={`w-3.5 h-3.5 rounded-full border-2 flex items-center justify-center ${position === opt.id ? 'border-green-600 shadow-[0_0_8px_rgba(34,197,94,0.4)]' : 'border-slate-300'}`}>
                      {position === opt.id && <div className="w-1.5 h-1.5 rounded-full bg-green-500" />}
                    </div>
                    <input type="radio" value={opt.id} checked={position === opt.id} onChange={() => updateSetting(`${prefix}wooAutoInject`, opt.id)} className="sr-only" />
                    <span className={`text-[10px] font-black uppercase tracking-tight ${position === opt.id ? 'text-green-700' : 'text-slate-500'}`}>{opt.label}</span>
                  </label>
                ))}
             </div>
          </div>

          {/* Sticky & Corner (PRO Teaser) */}
          <div className="space-y-2 opacity-60">
             <label className="block text-sm font-semibold text-gray-700">Sticky & Corner (PRO)</label>
             <div className="bg-slate-50/50 border-2 border-dashed border-slate-200 rounded-2xl p-4 relative overflow-hidden h-full min-h-[120px] flex flex-col justify-center">
                <div className="absolute top-3 right-3 bg-amber-400 text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-sm">PRO</div>
                <div className="space-y-3">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center"><Smartphone className="w-5 h-5 text-slate-400" /></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Mobile Sticky Bar</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center"><Monitor className="w-5 h-5 text-slate-400" /></div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-tight">Desktop Corner Widget</span>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* 🚀 2. SMART TARGETING CONDITIONS (PRO) */}
      <div className="pt-6 border-t border-slate-100">
        <div className="flex items-center justify-between mb-5">
           <div className="flex items-center gap-2">
             <div className="p-1.5 bg-purple-50 rounded-xl border border-purple-100 shadow-sm"><Smartphone className="w-4 h-4 text-purple-600" /></div>
             <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Smart targeting</h3>
           </div>
           <span className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[9px] font-black px-2 py-0.5 rounded-full shadow-sm">PRO ONLY</span>
        </div>

        <div className="space-y-4 opacity-50">
           {/* Price Range */}
           <div className="space-y-3 p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
             <div className="flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Price Range Filtering</span>
             </div>
             <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">$</span>
                  <input disabled type="number" placeholder="Min" className="w-full h-11 bg-white border border-slate-200 rounded-xl text-xs px-7 font-bold" />
                </div>
                <span className="text-slate-300 font-bold px-1">/</span>
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">$</span>
                  <input disabled type="number" placeholder="Max" className="w-full h-11 bg-white border border-slate-200 rounded-xl text-xs px-7 font-bold" />
                </div>
             </div>
           </div>

           {/* Stock Status */}
           <div className="space-y-3 p-5 bg-slate-50/50 rounded-2xl border border-slate-100">
             <div className="flex items-center gap-2">
                <Package className="w-4 h-4 text-slate-400" />
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Stock status sensitivity</span>
             </div>
             <div className="relative">
                <select disabled className="w-full h-11 bg-white border border-slate-200 rounded-xl text-xs px-4 font-bold appearance-none">
                   <option>Show on All Products</option>
                   <option>Only Available Products</option>
                   <option>Out Of Stock Only</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 pointer-events-none" />
             </div>
           </div>
        </div>
      </div>

      {/* 🌍 3. GLOBAL PAGE PLACEMENT (PRO) */}
      <div className="pt-6 border-t border-slate-100 opacity-50">
        <label className="block text-sm font-semibold text-gray-700">Quick Site-Wide Placement (PRO)</label>
        <div className="grid grid-cols-1 gap-3">
           {[
             { id: 'cart', label: 'Display on Cart Page' },
             { id: 'success', label: 'Display on Thank You Page' },
             { id: 'all', label: 'Display on All Site Pages' },
           ].map(opt => (
             <div key={opt.id} className="flex items-center justify-between bg-slate-50 px-4 py-3.5 rounded-2xl border border-slate-100">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-tight">{opt.label}</span>
                <div className="w-5 h-5 bg-white border-2 border-slate-200 rounded-lg shadow-inner"></div>
             </div>
           ))}
        </div>
      </div>

      {/* 📋 4. SHORTCODE */}
      <div className="pt-6 border-t border-slate-100">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Shortcode (Manual)</label>
        <div className="flex items-center justify-between border-2 border-blue-100 rounded-2xl px-5 py-4 bg-blue-50/20 shadow-[0_4px_12px_rgba(59,130,246,0.08)] overflow-hidden ring-4 ring-white">
          <code className="text-sm text-blue-600 font-black font-mono tracking-tight">{shortcode}</code>
          <button onClick={handleCopy} className="text-blue-500 hover:text-blue-700 transition-all active:scale-90 p-2.5 bg-white rounded-xl shadow-sm border border-blue-50">
            {copied ? <Check className="w-5 h-5 text-green-500" strokeWidth={3} /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-tight mt-3 italic px-2 text-center opacity-60">Paste this code anywhere to render the button manually.</p>
      </div>

    </div>
  );
};

export default DisplayStep;
