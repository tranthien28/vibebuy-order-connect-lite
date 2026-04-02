import React from 'react';
import { PaintBucket, MousePointer2, Sparkles, Shapes } from 'lucide-react';

const AppearanceSettings = ({ settings, updateSetting, editChannel }) => {
  return (
    <div className="space-y-6 font-sans">
      
      {/* 🚀 ULTIMATE STYLING BAR (PRO-LEVEL) */}
      <div className="bg-white p-6 rounded-3xl shadow-xl border-2 border-blue-500 relative overflow-visible z-[10]">
        <div className="absolute -top-3 left-6 bg-blue-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg">
          Master Button Controls
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Colors */}
          <div className="md:col-span-1 space-y-4 border-r border-gray-100 pr-4">
             <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={settings[`${editChannel}_backgroundColor`] || settings.backgroundColor || '#22c55e'} 
                  onChange={(e) => updateSetting(`${editChannel}_backgroundColor`, e.target.value)}
                  className="w-12 h-12 p-0 border-2 border-white shadow-md rounded-xl cursor-pointer"
                />
                <div>
                   <label className="block text-[10px] font-black text-gray-400 uppercase">Bg Color</label>
                   <span className="text-xs font-bold text-gray-700">{settings[`${editChannel}_backgroundColor`] || settings.backgroundColor || '#22c55e'}</span>
                </div>
             </div>
             <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={settings[`${editChannel}_textColor`] || settings.textColor || '#ffffff'} 
                  onChange={(e) => updateSetting(`${editChannel}_textColor`, e.target.value)}
                  className="w-12 h-12 p-0 border-2 border-white shadow-md rounded-xl cursor-pointer"
                />
                <div>
                   <label className="block text-[10px] font-black text-gray-400 uppercase">Text Color</label>
                   <span className="text-xs font-bold text-gray-700">{settings[`${editChannel}_textColor`] || settings.textColor || '#ffffff'}</span>
                </div>
             </div>
          </div>

          {/* Typography */}
          <div className="md:col-span-1 border-r border-gray-100 pr-4">
             <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Font Size (px)</label>
             <input 
                type="number" 
                min="10" max="40"
                value={settings[`${editChannel}_fontSize`] || settings.fontSize || 14} 
                onChange={(e) => updateSetting(`${editChannel}_fontSize`, e.target.value)}
                className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-lg font-black text-blue-600 outline-none focus:border-blue-500"
             />
          </div>

          {/* Dimensions */}
          <div className="md:col-span-2 grid grid-cols-2 gap-4">
             <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Width (px/%)</label>
                <input 
                  type="text" 
                  placeholder="e.g. 100%"
                  value={settings[`${editChannel}_width`] || settings.width || '100%'} 
                  onChange={(e) => updateSetting(`${editChannel}_width`, e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-base font-bold text-gray-800 outline-none focus:border-purple-500"
                />
             </div>
             <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase mb-2">Height (px)</label>
                <input 
                  type="number" 
                  min="20" max="250"
                  value={settings[`${editChannel}_height`] || settings.height || 48} 
                  onChange={(e) => updateSetting(`${editChannel}_height`, e.target.value)}
                  className="w-full h-12 px-4 bg-gray-50 border-2 border-gray-100 rounded-2xl text-base font-bold text-gray-800 outline-none focus:border-purple-500"
                />
             </div>
          </div>
        </div>
      </div>

      {/* Shapes & Layout Card */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-500 rounded-l-3xl"></div>
        
        <div className="flex items-center gap-4 mb-8">
          <div className="bg-blue-50 p-3 rounded-2xl">
            <PaintBucket className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Shapes & Layout</h2>
            <p className="text-sm text-gray-500">Fine-tune the rounding and display behavior.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-50/50 p-6 rounded-[2rem] border border-gray-100 space-y-5">
            <div className="flex justify-between items-end">
              <div>
                <label className="block text-xs font-black text-gray-700 uppercase tracking-tight mb-0.5">Border Rounding</label>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter italic">Drag to curve edges</p>
              </div>
              <span className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-xl shadow-sm">{(settings[`${editChannel}_borderRadius`] !== undefined ? settings[`${editChannel}_borderRadius`] : (settings.borderRadius !== undefined ? settings.borderRadius : 40))}px</span>
            </div>
            <input 
              type="range" 
              min="0" max="100" step="1"
              value={settings[`${editChannel}_borderRadius`] !== undefined ? settings[`${editChannel}_borderRadius`] : (settings.borderRadius !== undefined ? settings.borderRadius : 40)}
              onChange={(e) => updateSetting(`${editChannel}_borderRadius`, e.target.value)}
              className="w-full h-2 bg-gray-200 rounded-full appearance-none cursor-pointer accent-blue-600"
            />
          </div>
        </div>

        {/* Global Floating & Mobile Sticky (Pro) */}
        <div className="mt-12 pt-8 border-t border-gray-100 grid grid-cols-1 md:grid-cols-2 gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
           {/* Floating Bubble Position */}
           <div className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3">
                 <div className="bg-amber-400 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">PRO</div>
              </div>
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Floating Widget Logic</h4>
              <div className="space-y-4">
                 <div>
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Desktop Position</label>
                    <div className="grid grid-cols-2 gap-2">
                       {['Bottom Right', 'Bottom Left'].map(pos => (
                          <div key={pos} className="px-3 py-2 border border-gray-100 rounded-xl bg-gray-50 text-[11px] font-bold text-gray-500 text-center">{pos}</div>
                       ))}
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-xl border border-blue-100/50">
                    <span className="text-xs font-bold text-blue-700">Show on all site pages</span>
                    <div className="w-8 h-4 bg-gray-300 rounded-full relative">
                       <div className="absolute left-1 top-1 w-2 h-2 bg-white rounded-full"></div>
                    </div>
                 </div>
              </div>
           </div>

           {/* Mobile Sticky Bar */}
           <div className="p-6 bg-white border border-gray-200 rounded-3xl shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-3">
                 <div className="bg-amber-400 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">PRO</div>
              </div>
              <h4 className="text-sm font-black text-gray-900 uppercase tracking-widest mb-4">Mobile Experience</h4>
              <div className="space-y-4">
                 <div className="p-4 bg-pink-50/50 rounded-2xl border border-pink-100/50 flex items-center gap-4">
                    <div className="w-12 h-20 bg-white border-2 border-gray-200 rounded-lg relative overflow-hidden">
                       <div className="absolute bottom-0 left-0 right-0 h-4 bg-pink-500"></div>
                       <div className="p-1 space-y-1">
                          <div className="w-full h-1 bg-gray-100"></div>
                          <div className="w-2/3 h-1 bg-gray-100"></div>
                       </div>
                    </div>
                    <div>
                       <span className="text-xs font-black text-gray-900 block uppercase tracking-tight">Sticky Bottom Bar</span>
                       <p className="text-[10px] text-gray-500 font-medium mt-1">High conversion bar dính chặt dưới màn hình mobile.</p>
                       <div className="mt-2 w-10 h-5 bg-gray-300 rounded-full relative">
                          <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Pro Features Grid */}
      <h3 className="text-lg font-bold text-gray-900 mt-2 mb-4 pt-4 border-t border-gray-200">💎 Advanced Styling (Pro)</h3>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pro 1: Hover & Animation */}
        <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group shadow-sm">
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-sm">🔒 Pro</div>
          <MousePointer2 className="w-8 h-8 text-gray-400 mb-4 group-hover:text-amber-500 transition-colors group-hover:scale-110 duration-300" />
          <h3 className="font-bold text-gray-800 mb-2">Hover Effects</h3>
          <p className="text-xs text-gray-500 mb-4 h-8">Engage users when they highlight the button.</p>
          <select disabled className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 opacity-70 cursor-not-allowed">
            <option>Scale Up (Pulse)</option>
            <option>Brightness Glow</option>
            <option>3D Lift Shadow</option>
          </select>
        </div>

        {/* Pro 2: Entrance */}
        <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group shadow-sm">
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-sm">🔒 Pro</div>
          <Sparkles className="w-8 h-8 text-gray-400 mb-4 group-hover:text-amber-500 transition-colors group-hover:scale-110 duration-300" />
          <h3 className="font-bold text-gray-800 mb-2">Dynamic Entrance</h3>
          <p className="text-xs text-gray-500 mb-4 h-8">How does the widget appear when scrolling?</p>
          <select disabled className="w-full bg-gray-100 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 opacity-70 cursor-not-allowed">
            <option>Bounce In Up</option>
            <option>Fade Slide Right</option>
            <option>Elastic Zoom</option>
          </select>
        </div>

        {/* Pro 3: Background Gradient */}
        <div className="bg-gradient-to-b from-gray-50 to-white rounded-2xl p-6 border border-gray-200 relative overflow-hidden group shadow-sm">
          <div className="absolute top-4 right-4 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] uppercase tracking-wider font-bold px-2.5 py-1 rounded-full shadow-sm">🔒 Pro</div>
          <Shapes className="w-8 h-8 text-gray-400 mb-4 group-hover:text-amber-500 transition-colors group-hover:scale-110 duration-300" />
          <h3 className="font-bold text-gray-800 mb-2">CSS Gradient Meshes</h3>
          <p className="text-xs text-gray-500 mb-4 h-8">Replace flat colors with deep premium gradients.</p>
          <div className="flex gap-2 cursor-not-allowed opacity-50 grayscale group-hover:grayscale-0 transition-all duration-300">
             <div className="h-9 flex-1 bg-gradient-to-r from-pink-500 to-orange-400 rounded-md shadow-sm"></div>
             <div className="h-9 flex-1 bg-gradient-to-r from-blue-500 to-teal-400 rounded-md shadow-sm"></div>
          </div>
        </div>

      </div>

    </div>
  );
};

export default AppearanceSettings;
