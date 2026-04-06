import React, { useState } from 'react';
import { Shield, Key, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

const LicenseView = ({ settings, onUpdateSettings, onToast }) => {
  const [key, setKey] = useState(settings.license_key || '');
  const [activating, setActivating] = useState(false);
  const isPro = settings.is_pro || false;

  const handleActivate = async () => {
    if (!key) return;
    setActivating(true);

    try {
      const response = await fetch(`${window.vibebuyData.apiUrl}activate-license`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': window.vibebuyData.nonce
        },
        body: JSON.stringify({ license_key: key })
      });

      const data = await response.json();

      if (data.success) {
        onUpdateSettings({ ...settings, is_pro: true, license_key: key });
        onToast('Success!', 'Your VibeBuy PRO license is now active.', 'success');
      } else {
        onToast('Activation Failed', data.message || 'Invalid license key.', 'error');
      }
    } catch (err) {
      onToast('Error', 'Connection failed. Please try again.', 'error');
    } finally {
      setActivating(false);
    }
  };

  return (
    <div className="vb-content px-0 py-0">
      <div className="vb-page-header">
        <h1 className="vb-page-title">License & Activation</h1>
        <div className="flex items-center gap-1.5">
           {/* Header clean - status moved to sidebar logo */}
        </div>
      </div>

      <div className="p-8">
        <div className="max-w-2xl">
          {isPro ? (
            <div className="bg-green-50 border border-green-100 rounded-[20px] p-8 text-center relative overflow-hidden">
               <div className="relative z-10">
                 <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-green-200">
                    <CheckCircle2 className="w-7 h-7 text-white" />
                 </div>
                 <h2 className="text-xl font-black text-gray-900 mb-2">License is Active!</h2>
                 <p className="text-sm text-gray-500 mb-6 px-6">
                   You have successfully unlocked all VibeBuy PRO features. Enjoy unlimited channels, premium FX, and advanced analytics.
                 </p>
                 <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-green-100 rounded-xl shadow-sm">
                    <Key className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-mono font-bold text-gray-700">•••• •••• •••• {key.slice(-4)}</span>
                 </div>
               </div>
            </div>
          ) : (
            <div className="bg-white border border-[#eef0f5] rounded-[20px] p-8 relative overflow-hidden">
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600">
                      <Shield className="w-5 h-5" />
                   </div>
                   <div>
                      <h3 className="text-lg font-bold text-gray-900">Activate VibeBuy PRO</h3>
                      <p className="text-sm text-gray-500">Enter your license key from Lemon Squeezy</p>
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="space-y-2">
                      <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">License Key</label>
                      <div className="relative">
                        <input 
                          type="text"
                          value={key}
                          onChange={(e) => setKey(e.target.value)}
                          placeholder="XXXX-XXXX-XXXX-XXXX"
                          className="vb-license-input w-full px-5 py-4 bg-gray-50 border border-gray-100 rounded-xl text-lg font-mono focus:ring-4 focus:ring-purple-50 focus:border-purple-300 outline-none transition-all"
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                           <Key className="w-5 h-5 text-gray-300" />
                        </div>
                      </div>
                   </div>

                   <button 
                     disabled={activating || !key}
                     onClick={handleActivate}
                     className="w-full py-3.5 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-200 text-white font-black rounded-xl shadow-lg shadow-purple-100 hover:shadow-purple-200 transition-all flex items-center justify-center gap-3"
                   >
                     {activating ? (
                       <Loader2 className="w-5 h-5 animate-spin" />
                     ) : (
                       <Sparkles className="w-5 h-5" />
                     )}
                     {activating ? 'Validating...' : 'Activate Pro Now'}
                   </button>
                </div>

                <div className="mt-6 flex items-center gap-3 justify-center">
                   <AlertCircle className="w-4 h-4 text-gray-400" />
                   <p className="text-[11px] text-gray-400 font-medium">
                     Don't have a key? <a href="https://vibebuy.io/pro" target="_blank" className="text-purple-600 font-bold hover:underline">Get Pro Access</a>
                   </p>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LicenseView;
