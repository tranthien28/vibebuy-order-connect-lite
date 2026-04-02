import React from 'react';
import { Check, Crown, Zap, BarChart3, MousePointer2, Sparkles } from 'lucide-react';

const BENEFITS = [
  { 
    icon: <Crown className="w-4 h-4 text-amber-500" />, 
    title: 'All Channels Unlocked', 
    desc: 'WhatsApp, Telegram, Messenger, Zalo, and more.' 
  },
  { 
    icon: <BarChart3 className="w-4 h-4 text-blue-500" />, 
    title: 'Advanced Analytics', 
    desc: 'Track every click, conversion, and customer journey.' 
  },
  { 
    icon: <MousePointer2 className="w-4 h-4 text-purple-500" />, 
    title: 'Smart Agent Picker', 
    desc: 'Automatically route customers to available agents.' 
  },
  { 
    icon: <Sparkles className="w-4 h-4 text-pink-500" />, 
    title: 'Premium Animations', 
    desc: 'Luxury floating bubbles and high-end entry effects.' 
  },
  { 
    icon: <Zap className="w-4 h-4 text-green-500" />, 
    title: 'Priority Support', 
    desc: 'Get help via Priority WhatsApp ticket in < 2 hours.' 
  },
];

const BenefitList = () => {
  return (
    <div className="vb-benefit-list">
      <div className="flex items-center gap-2 mb-3">
        <Crown className="w-5 h-5 text-amber-500 fill-amber-500" />
        <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Premium Features</h3>
      </div>
      
      <div className="space-y-2">
        {BENEFITS.map((b, i) => (
          <div key={i} className="vb-benefit-item group">
            <div className="vb-benefit-icon-wrap">
              {b.icon}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-700 group-hover:text-purple-600 transition-colors">
                {b.title}
              </p>
              <p className="text-[10px] text-gray-400">
                {b.desc}
              </p>
            </div>
            <div className="vb-benefit-check">
              <Check className="w-3 h-3 text-green-500" strokeWidth={3} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 p-3 bg-purple-50 rounded-xl border border-purple-100">
        <p className="text-[10px] text-purple-600 font-medium leading-tight">
          Unlock the full potential of your store with VibeBuy Pro.
        </p>
      </div>
    </div>
  );
};

export default BenefitList;
