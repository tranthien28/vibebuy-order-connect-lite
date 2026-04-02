import React from 'react';
import { BarChart3, Clock, Settings2, LayoutTemplate, Lock } from 'lucide-react';

const ProFeatures = () => {
  const features = [
    {
      icon: <BarChart3 className="w-5 h-5 text-purple-500" />,
      title: "Analytics Dashboard",
      desc: "Track clicks & conversion rates per channel."
    },
    {
      icon: <Clock className="w-5 h-5 text-indigo-500" />,
      title: "Business Hours",
      desc: "Auto-hide widget or show 'Away' message outside working hours."
    },
    {
      icon: <Settings2 className="w-5 h-5 text-pink-500" />,
      title: "Variation Picker",
      desc: "Let customers select Size/Color before jumping to chat."
    },
    {
      icon: <LayoutTemplate className="w-5 h-5 text-orange-500" />,
      title: "Custom Templates",
      desc: "Multiple preset messages based on product category."
    }
  ];

  return (
    <div className="bg-gradient-to-br from-[#161b1e] to-[#0a0c0e] p-8 rounded-[32px] border border-white/5 mt-12 relative overflow-hidden group">
      <div className="absolute top-0 right-0 bg-[#00ea8b] text-[#0d0f11] text-[10px] font-black px-5 py-2 rounded-bl-2xl shadow-xl z-10 animate-pulse">
        PRO ONLY
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
        <div className="max-w-md">
          <h2 className="text-3xl font-black mb-3 flex items-center gap-3 text-white">
            <Lock className="w-8 h-8 text-[#00ea8b]" />
            Power Up Your Sales
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">Upgrade to VibeBuy Pro and unlock advanced automation, deep analytics, and multi-channel support.</p>
        </div>
        <button 
          className="vibebuy-btn-primary px-10 py-4 text-sm tracking-widest whitespace-nowrap"
          onClick={() => alert("Upgrade to Pro Redirect")}
        >
           Upgrade to Pro
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {features.map((item, idx) => (
          <div key={idx} className="bg-white/[0.03] p-6 rounded-2xl border border-white/5 flex flex-col gap-4 hover:border-[#00ea8b]/20 transition-all hover:translate-y-[-4px]">
            <div className="w-10 h-10 rounded-xl bg-black/40 flex items-center justify-center border border-white/5">
              {item.icon}
            </div>
            <div>
              <h3 className="font-bold text-white text-sm mb-1">{item.title}</h3>
              <p className="text-xs text-slate-500 font-medium leading-normal">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

export default ProFeatures;
