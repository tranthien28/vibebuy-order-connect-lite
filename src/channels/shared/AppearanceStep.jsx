import React from 'react';
import { Lock, Smartphone, ChevronDown } from 'lucide-react';

const PRESET_COLORS = [
  '#00c851', '#206bc4', '#e53935', '#fb8c00', '#8e24aa', '#e91e8c', '#00acc1', '#212121'
];

const AppearanceStep = ({ channel, settings, updateSetting }) => {
  const prefix = `${channel.id}_`;
  const get = (field, fallback) => settings[prefix + field] ?? fallback;

  const bgColor = get('bgColor', '#00c851');
  const borderRadius = parseInt(get('borderRadius', 8), 10);
  const buttonText = get('buttonText', 'Chat with us');

  return (
    <div className="space-y-5 pb-4">
      
      {/* 🚀 MASTER STYLING BAR */}
      <div className="bg-blue-50/40 p-4 rounded-2xl border-2 border-blue-100/50 relative mb-2">
        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
          {/* Row 1: Text Color & Font Size */}
          <div className="space-y-1">
             <label className="block text-sm font-semibold text-gray-700">Text Color</label>
             <div className="flex items-center gap-2 bg-white p-1.5 rounded-xl border border-blue-50 shadow-sm">
                <input 
                  type="color" 
                  value={get('textColor', '#ffffff')} 
                  onChange={e => updateSetting(`${prefix}textColor`, e.target.value)}
                  className="w-8 h-8 p-0 border-none rounded-lg cursor-pointer bg-transparent"
                />
                <span className="text-[10px] font-black font-mono text-slate-500 uppercase">{get('textColor', '#ffffff')}</span>
             </div>
          </div>
          <div className="space-y-1">
             <label className="block text-sm font-semibold text-gray-700">Font Size (px)</label>
             <input 
                type="number" 
                min="10" max="40"
                value={get('fontSize', 14)} 
                onChange={e => updateSetting(`${prefix}fontSize`, parseInt(e.target.value, 10))}
                className="w-full h-11 px-4 bg-white border border-blue-50 rounded-xl text-sm font-black text-blue-600 outline-none shadow-sm focus:ring-2 ring-blue-100"
             />
          </div>

          {/* Row 2: Width & Height */}
          <div className="space-y-1">
             <label className="block text-sm font-semibold text-gray-700">Width</label>
             <input 
                type="text" 
                placeholder="100%"
                value={get('width', '100%')} 
                onChange={e => updateSetting(`${prefix}width`, e.target.value)}
                className="w-full h-11 px-4 bg-white border border-blue-50 rounded-xl text-sm font-bold text-slate-700 outline-none shadow-sm focus:ring-2 ring-blue-100"
             />
          </div>
          <div className="space-y-1">
             <label className="block text-sm font-semibold text-gray-700">Height (px)</label>
             <input 
                type="number" 
                min="20" max="250"
                value={get('height', 48)} 
                onChange={e => updateSetting(`${prefix}height`, parseInt(e.target.value, 10))}
                className="w-full h-11 px-4 bg-white border border-blue-50 rounded-xl text-sm font-bold text-slate-700 outline-none shadow-sm focus:ring-2 ring-blue-100"
             />
          </div>
        </div>
      </div>

      {/* Basic Button Color */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Theme Color</label>
        <div className="flex gap-2.5 flex-wrap mb-4">
          {PRESET_COLORS.map(c => (
            <button
              key={c}
              onClick={() => updateSetting(`${prefix}bgColor`, c)}
              className="w-9 h-9 rounded-full transition-all hover:scale-110 active:scale-95 border-2 border-white shadow-md ring-1 ring-slate-100"
              style={{ 
                backgroundColor: c,
                outline: bgColor === c ? `2px solid ${c}` : 'none',
                outlineOffset: '2px'
              }}
            />
          ))}
        </div>

        {/* Custom Color row */}
        <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-slate-100 shadow-sm">
           <div className="relative w-9 h-9 rounded-xl overflow-hidden border-2 border-white shadow-sm ring-1 ring-slate-100">
             <input 
               type="color"
               value={bgColor}
               onChange={e => updateSetting(`${prefix}bgColor`, e.target.value)}
               className="absolute inset-0 cursor-pointer w-[200%] h-[200%] -translate-x-1/4 -translate-y-1/4"
             />
           </div>
           <div className="flex-1">
             <input 
               type="text" 
               value={bgColor} 
               onChange={e => updateSetting(`${prefix}bgColor`, e.target.value)}
               className="w-full bg-transparent border-none p-0 text-xs font-black font-mono uppercase text-slate-600 outline-none"
             />
           </div>
           <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg uppercase tracking-tight">Custom HEX</span>
        </div>
      </div>

      {/* Border Radius */}
      <div className="bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
        <div className="flex justify-between items-center mb-3">
          <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rounding</label>
          <span className="text-xs font-black text-blue-600 bg-white px-2.5 py-1 rounded-lg shadow-sm border border-slate-100">{borderRadius}px</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={borderRadius}
          onChange={e => updateSetting(`${prefix}borderRadius`, parseInt(e.target.value, 10))}
          className="w-full accent-blue-600 h-1.5 cursor-pointer"
        />
      </div>

      {/* Button Text */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">Button Label</label>
        <input
          type="text"
          value={buttonText}
          placeholder="Chat with us"
          onChange={e => updateSetting(`${prefix}buttonText`, e.target.value)}
          className="w-full h-12 px-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 focus:border-green-500 focus:ring-4 ring-green-50 outline-none transition-all shadow-sm"
        />
      </div>

      {/* Button Layout */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">Display Mode</label>
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => updateSetting(`${prefix}layout`, 'stacked')}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
              get('layout', 'stacked') === 'stacked' ? 'border-blue-600 bg-blue-50/30 ring-4 ring-blue-50/20 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
            }`}
          >
            <div className="w-full h-10 flex flex-col gap-1.5 items-center justify-center mb-2">
              <div className="w-12 h-2 bg-slate-200 rounded-full" />
              <div className="w-12 h-2 bg-slate-200 rounded-full" />
            </div>
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">Stacked</span>
          </button>

          <button
            onClick={() => updateSetting(`${prefix}layout`, 'inline')}
            className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 transition-all ${
              get('layout', 'inline') === 'inline' ? 'border-blue-600 bg-blue-50/30 ring-4 ring-blue-50/20 shadow-sm' : 'border-slate-100 bg-white hover:border-slate-200'
            }`}
          >
            <div className="w-full h-10 flex gap-1.5 items-center justify-center mb-2">
              <div className="w-6 h-2 bg-slate-200 rounded-full" />
              <div className="w-6 h-2 bg-slate-200 rounded-full" />
            </div>
            <span className="text-[11px] font-black text-slate-700 uppercase tracking-tight">Inline</span>
          </button>
        </div>

        {/* PRO Dynamic Layout */}
        <div className="mt-4 flex items-center justify-between p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50 opacity-60">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center shadow-sm">
                <Smartphone className="w-5 h-5 text-slate-400" />
             </div>
             <div>
                <p className="text-[11px] font-black text-slate-600 uppercase tracking-tight">Smart Responsive</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">Desktop Inline / Mobile Stacked</p>
             </div>
          </div>
          <span className="bg-amber-400 text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-sm">PRO</span>
        </div>
      </div>

      {/* Effects & Gradient - Modern Locked Rows */}
      <div className="space-y-3 pt-6 border-t border-slate-100">
        <label className="block text-sm font-semibold text-gray-700">Advanced Styling</label>
        
        {/* Effect Row */}
        <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl opacity-60">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-slate-300" />
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-tight">Button Effect</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[11px] font-black text-slate-400 uppercase">None <ChevronDown className="w-3 h-3 inline" /></div>
            <span className="bg-amber-400 text-white text-[9px] font-black px-2 py-1 rounded-lg">PRO</span>
          </div>
        </div>

        {/* Gradient Row */}
        <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-2xl opacity-60">
          <div className="flex items-center gap-3">
            <Lock className="w-4 h-4 text-slate-300" />
            <span className="text-[11px] font-black text-slate-500 uppercase tracking-tight">Color Gradient</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[11px] font-black text-slate-400 uppercase">Solid <ChevronDown className="w-3 h-3 inline" /></div>
            <span className="bg-amber-400 text-white text-[9px] font-black px-2 py-1 rounded-lg">PRO</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppearanceStep;
