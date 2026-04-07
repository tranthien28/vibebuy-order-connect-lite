import React from 'react';
import { X, Shield, ArrowRight, ExternalLink, Clock } from 'lucide-react';
import BenefitList from './BenefitList.jsx';
import PricingTable from './PricingTable.jsx';

const PromotionCountdown = () => {
  const [timeLeft, setTimeLeft] = React.useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  React.useEffect(() => {
    const targetDate = new Date('2026-07-31T23:59:59').getTime();
    
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mb-4 p-3 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center justify-center gap-4 shadow-sm animate-in fade-in zoom-in duration-700">
      <div className="flex items-center gap-2">
         <div className="w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-200">
            <Clock className="w-4 h-4 text-white animate-pulse" />
         </div>
         <div className="text-left">
            <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] leading-tight mb-0.5">Price Expansion Countdown</p>
            <p className="text-[9px] text-gray-400 font-bold leading-tight italic">Price jumps to $39 on August 1st</p>
         </div>
      </div>
      
      <div className="flex items-center gap-2">
         {[
           { val: timeLeft.days, label: 'd' },
           { val: timeLeft.hours, label: 'h' },
           { val: timeLeft.minutes, label: 'm' },
           { val: timeLeft.seconds, label: 's' }
         ].map((unit, idx) => (
           <React.Fragment key={unit.label}>
             <div className="flex flex-col items-center">
                <span className="text-base font-black text-slate-800 tabular-nums leading-none">{unit.val.toString().padStart(2, '0')}</span>
                <span className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">{unit.label}</span>
             </div>
             {idx < 3 && <span className="text-slate-300 font-bold -mt-2">:</span>}
           </React.Fragment>
         ))}
      </div>
    </div>
  );
};

const ProUpgradeModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="vb-modal-overlay" onClick={onClose}>
      <div 
        className="vb-modal-container bg-white rounded-2xl overflow-hidden shadow-2xl relative max-w-4xl w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-full hover:bg-gray-100 transition-colors z-50 text-gray-400"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* LEFT SIDE: BENEFITS */}
          <div className="md:w-[320px] bg-gray-50/80 p-6 border-r border-gray-100 flex flex-col justify-between">
            <BenefitList />
            
            <div className="mt-4 flex items-center justify-center gap-3 py-2 bg-white border border-gray-100 rounded-xl shadow-sm">
                <Shield className="w-4 h-4 text-green-500" />
                <p className="text-[9px] font-bold text-gray-700 uppercase tracking-widest text-center">
                  14-Day Money Back Guarantee
                </p>
            </div>
          </div>

          {/* RIGHT SIDE: PRICING & CTA */}
          <div className="flex-1 p-6 text-center flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 bg-purple-100 rounded-full mb-2">
                <p className="text-[10px] font-extrabold text-purple-600 uppercase tracking-widest">VibeBuy Pro</p>
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Modernize Your Store</h2>
              <p className="text-[11px] text-gray-500 mb-4 px-6">
                Upgrade to vibeBuy PRO and start converting your social traffic into loyal customers 
                with high-end messaging automation.
              </p>

              <PromotionCountdown />
              <PricingTable />
            </div>

            <div className="mt-6">
              <button 
                onClick={() => window.open(window.vibebuyData?.proLink || 'https://vibebuy.com', '_blank')}
                className="vb-upgrade-cta-btn group py-3 text-sm"
              >
                Get Pro Access Now <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              {/* SOCIAL PROOF */}
              <div className="mt-3 flex flex-col items-center gap-1.5">
                <p className="text-[10px] font-bold text-gray-400">
                  Joined by 500+ Top Sellers using VibeBuy
                </p>
                <div className="flex -space-x-1.5">
                  {[1,2,3,4,5].map(i => (
                    <img 
                      key={i} 
                      className="w-5 h-5 rounded-full border-2 border-white shadow-sm" 
                      src={`https://i.pravatar.cc/100?img=${i+10}`} 
                      alt="User avatar" 
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProUpgradeModal;
