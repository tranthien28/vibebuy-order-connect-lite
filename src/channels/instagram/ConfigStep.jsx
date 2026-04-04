import React from 'react';
import { Lock } from 'lucide-react';

const ConfigStep = ({ channel, settings, updateSetting, onNavigate }) => {
  const prefix = `${channel.id}_`;
  const get = (field, fallback = '') => settings[prefix + field] ?? fallback;

  const activeChannels = settings.activeChannels || [];
  const isActive = activeChannels.includes(channel.id);

  const toggleChannel = () => {
    let newActive;
    if (isActive) {
      newActive = activeChannels.filter(id => id !== channel.id);
    } else {
      newActive = settings.is_pro ? [...activeChannels, channel.id] : [channel.id];
    }
    updateSetting('activeChannels', newActive);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className={`flex items-center justify-between p-4 rounded-3xl border transition-all ${isActive ? 'bg-pink-50/50 border-pink-100 shadow-sm' : 'bg-gray-50 border-gray-100 opacity-60'}`}>
        <div>
          <h3 className="text-sm font-black text-gray-900 flex items-center gap-2">
            Instagram Connection
            {isActive && <div className="w-1.5 h-1.5 rounded-full bg-[#E1306C] animate-pulse" />}
          </h3>
          <p className="text-[10px] text-gray-500 font-bold uppercase mt-0.5">{isActive ? 'Ready to receive leads' : 'Channel offline'}</p>
        </div>
        <button onClick={toggleChannel} className={`vb-toggle ${isActive ? 'vb-toggle--on' : 'vb-toggle--off'}`}>
          <div className={`vb-toggle-thumb ${isActive ? 'vb-toggle-thumb--on' : 'vb-toggle-thumb--off'}`} />
        </button>
      </div>

      <div className="p-6 bg-white rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <label className="text-[11px] font-black uppercase text-gray-400 tracking-widest block">
          Instagram Username
        </label>
        <div className="relative group">
           <input
             type="text"
             value={get('username')}
             onChange={e => updateSetting(`${prefix}username`, e.target.value)}
             placeholder="your.username"
             className="w-full h-14 px-5 bg-gray-50 border-2 border-transparent rounded-2xl text-lg font-bold group-hover:bg-gray-100 focus:bg-white focus:border-pink-500 transition-all outline-none"
           />
        </div>
        <p className="text-[10px] text-gray-400 font-medium italic">* Enter your Instagram username without @.</p>
      </div>

      {!settings.is_pro && (
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-center gap-3">
          <Lock className="w-4 h-4 text-amber-500" />
          <p className="text-[10px] font-bold text-amber-700">This is a PRO channel. Upgrade to enable redirection on frontend.</p>
        </div>
      )}

      <div className="pt-6 border-t border-gray-100 text-center">
         <code className="px-4 py-2 bg-slate-50 rounded-xl border border-slate-200 text-xs font-black text-blue-600 inline-block shadow-sm">
            {`[vibebuy channel="${channel.id}"]`}
         </code>
      </div>
    </div>
  );
};

export default ConfigStep;
