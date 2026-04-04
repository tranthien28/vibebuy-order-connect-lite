import React from 'react';
import { Shield, Sparkles, TrendingUp, CheckCircle2, MinusCircle } from 'lucide-react';

const PricingTable = () => {
  return (
    <div className="vb-pricing-container">
      <div className="grid grid-cols-2 gap-4">
        {/* LITE COLUMN */}
        <div className="vb-pricing-col-lite">
          <div className="p-4 border-b border-gray-100 mb-2 h-[90px] flex flex-col justify-center">
            <h4 className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1">Lite</h4>
            <p className="text-xl font-black text-gray-400">$0</p>
            <p className="text-[9px] text-gray-400">Forever Free</p>
          </div>
          <div className="px-4 pb-4 space-y-2 text-left">
            <FeatureRow label="3 Lite Channels" active />
            <FeatureRow label="Standard Inquiries" active />
            <FeatureRow label="Global Template" active />
            <FeatureRow label="Analytics & Export" disabled />
          </div>
        </div>

        {/* PRO COLUMN */}
        <div className="vb-pricing-col-pro relative">
          <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full shadow-lg whitespace-nowrap">
            EARLY BIRD - 40% OFF
          </div>
          
          <div className="p-4 border-b border-purple-100 mb-2 h-[90px] flex flex-col justify-center bg-purple-50/50">
            <h4 className="text-[10px] font-bold text-purple-600 uppercase tracking-widest mb-1">Pro</h4>
            <div className="flex items-center gap-1.5">
              <span className="text-xs text-gray-400 line-through font-bold">$59</span>
              <p className="text-2xl font-black text-purple-600">$39</p>
            </div>
            <p className="text-[9px] text-purple-400">One-time Access</p>
          </div>
          
          <div className="px-4 pb-4 space-y-2 text-left">
            <FeatureRow label="11+ Premium Channels" active pro />
            <FeatureRow label="Advanced Analytics" active pro />
            <FeatureRow label="CSV Export & Orders" active pro />
            <FeatureRow label="Priority Support" active pro />
          </div>
        </div>
      </div>

      {/* TRUST ELEMENTS */}
      <div className="mt-4 flex items-center justify-center gap-6 py-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-green-500" />
          <div className="text-left">
            <p className="text-[10px] font-bold text-gray-800">Guarantee</p>
            <p className="text-[9px] text-gray-500">14-Day Money Back</p>
          </div>
        </div>
        <div className="w-px h-8 bg-gray-100" />
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-500" />
          <div className="text-left">
            <p className="text-[11px] font-bold text-gray-800">Support</p>
            <p className="text-[10px] text-gray-500">Priority Assistance</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureRow = ({ label, active, disabled, pro }) => (
  <div className={`flex items-center justify-between text-[13px] ${disabled ? 'opacity-30' : ''}`}>
    <span className={`font-medium ${active && pro ? 'text-purple-700' : 'text-gray-600'}`}>{label}</span>
    {active ? (
      <CheckCircle2 className={`w-4 h-4 ${pro ? 'text-purple-600' : 'text-green-500'}`} />
    ) : (
      <MinusCircle className="w-4 h-4 text-gray-300" />
    )}
  </div>
);

export default PricingTable;
