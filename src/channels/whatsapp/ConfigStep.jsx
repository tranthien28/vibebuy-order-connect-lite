import React from 'react';
import { Lock, Check, Info } from 'lucide-react';
import MessageTemplateEditor from '../../components/MessageTemplateEditor.jsx';

const ConfigStep = ({ channel, settings, updateSetting, onNavigate }) => {
  const prefix = `${channel.id}_`;
  const get = (field, fallback = '') => settings[prefix + field] ?? fallback;

  return (
    <div className="space-y-6">
      {/* Phone Number */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-gray-700">
            Phone Number
          </label>
          <button onClick={() => onNavigate('help')} className="text-[10px] font-bold text-blue-500 hover:underline">Refer to tutorial</button>
        </div>
        <input
          type="tel"
          value={get('number')}
          onChange={e => updateSetting(`${prefix}number`, e.target.value)}
          placeholder="+84 xxx xxx xxx"
          className="vibebuy-input"
        />
        <p className="text-xs text-gray-400 mt-1.5 flex items-center gap-1.5">
            <Info className="w-3 h-3 text-blue-400" />
            Lite version uses direct <b>wa.me</b> links. No API keys required.
        </p>
      </div>

      {/* Message Template Selection */}
      <div className="pt-4 border-t border-slate-100">
        <label className="block text-sm font-semibold text-gray-700">
          Message Template
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-4 p-4 rounded-2xl border-2 border-green-600 bg-green-50/30 ring-4 ring-green-50/20 shadow-sm cursor-pointer transition-all active:scale-[0.98]">
            <div className={`w-4 h-4 rounded-full border-2 border-green-600 flex items-center justify-center shadow-[0_0_8px_rgba(34,197,94,0.4)]`}>
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-[11px] font-black text-green-700 uppercase tracking-tight">Use Global Template</p>
              <p className="text-[10px] text-green-600/70 font-bold uppercase mt-0.5">Sync with main settings</p>
            </div>
            <Check className="w-5 h-5 text-green-600" strokeWidth={3} />
          </label>

          <div className="flex items-center gap-4 p-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 opacity-60 grayscale cursor-not-allowed">
            <div className="w-4 h-4 rounded-full border-2 border-slate-300" />
            <div className="flex-1">
              <p className="text-[11px] font-black text-slate-500 uppercase tracking-tight">Channel Override</p>
              <p className="text-[10px] text-slate-400 font-black uppercase mt-0.5">Custom template for {channel.name}</p>
            </div>
            <span className="bg-amber-400 text-white text-[9px] font-black px-2 py-1 rounded-lg shadow-sm">PRO</span>
          </div>
        </div>
      </div>

      {/* Pro Features */}
      <div className="pt-6 border-t border-slate-100">
        <label className="block text-sm font-semibold text-gray-700">Channel Power-ups (PRO)</label>
        <div className="grid grid-cols-2 gap-3 opacity-60">
          {['Multi-Agent', 'Hours Control', 'AI Assistant', 'Analytics'].map(f => (
            <div key={f} className="flex items-center gap-3 border border-slate-200 rounded-2xl px-4 py-3 bg-slate-50/50">
              <Lock className="w-3.5 h-3.5 text-slate-300 shrink-0" />
              <span className="text-[10px] text-slate-400 font-black uppercase tracking-tight">{f}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigStep;
