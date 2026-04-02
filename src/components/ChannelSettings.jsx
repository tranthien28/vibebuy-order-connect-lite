import React from 'react';
import { MessageCircle, Phone, Bot, Mail, Send, Image as ImageIcon, Type, Camera, Music, PhoneCall, MessageSquare, Link2, ClipboardType } from 'lucide-react';

const ChannelSettings = ({ settings, updateSetting, editChannel, setCurrentStep, onHelp }) => {
  const channelLibrary = [
    // LITE CHANNELS (FREE)
    { id: 'whatsapp', name: 'WhatsApp', icon: <Phone className="w-5 h-5 flex-shrink-0" />, color: 'bg-[#25D366]', pro: false },
    { id: 'telegram', name: 'Telegram', icon: <Send className="w-5 h-5 flex-shrink-0" />, color: 'bg-[#0088cc]', pro: false },
  
    // PRO CHANNELS (BUSINESS)
    { id: 'messenger', name: 'Messenger', icon: <MessageCircle className="w-5 h-5 flex-shrink-0" />, color: 'bg-gradient-to-r from-[#0084FF] to-[#A033FF]', pro: true },
    { id: 'zalo', name: 'Zalo', icon: <MessageCircle className="w-5 h-5 flex-shrink-0" />, color: 'bg-[#0068FF]', pro: true },
    { id: 'instagram', name: 'Instagram', icon: <Camera className="w-5 h-5 flex-shrink-0" />, color: 'bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#833AB4]', pro: true },
    { id: 'tiktok', name: 'TikTok', icon: <Music className="w-5 h-5 flex-shrink-0" />, color: 'bg-[#000000]', pro: true },
    { id: 'line', name: 'Line', icon: <MessageSquare className="w-5 h-5 flex-shrink-0" />, color: 'bg-[#00C300]', pro: true },
    { id: 'viber', name: 'Viber', icon: <Phone className="w-5 h-5 flex-shrink-0" />, color: 'bg-[#7360F2]', pro: true },
    
    // VIRTUAL CHANNELS
    { id: 'custom', name: 'Custom Link', icon: <Link2 className="w-5 h-5 flex-shrink-0" />, color: 'bg-gray-800', pro: true },
    { id: 'contact', name: 'Contact Form', icon: <ClipboardType className="w-5 h-5 flex-shrink-0" />, color: 'bg-teal-600', pro: true }
  ];

  const channel = channelLibrary.find(c => c.id === editChannel) || channelLibrary[0];
  const isActive = (settings.activeChannels || []).includes(channel.id);

  const toggleCurrentChannel = () => {
      const active = settings.activeChannels || [];
      const newActive = isActive ? active.filter(item => item !== channel.id) : [...active, channel.id];
      updateSetting('activeChannels', newActive);
  };

  return (
    <div className="space-y-6 font-sans">
       <button onClick={() => setCurrentStep(0)} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#0073aa] transition-colors mb-2">
          ← Back to Channels List
       </button>
       
       {/* Channel Header Info */}
       <div className="bg-white p-6 border border-gray-200 rounded-2xl shadow-sm flex items-center justify-between">
          <div className="flex items-center gap-5">
             <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-inner ${channel.color}`}>
                {channel.icon}
             </div>
             <div>
                <h2 className="text-2xl font-black text-gray-900">{channel.name} Configuration</h2>
                <p className="text-sm text-gray-500 font-medium">Instance ID: vibebuy_{channel.id}_global</p>
             </div>
          </div>
          <div className="flex flex-col items-end gap-1.5">
             <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-blue-600' : 'text-gray-400'}`}>
                {isActive ? 'ENABLED' : 'DISABLED'}
             </span>
             <button 
               onClick={toggleCurrentChannel}
               className={`relative inline-flex h-7 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none shadow-inner ${isActive ? 'bg-[#0073aa]' : 'bg-gray-200'}`}
             >
                <span className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${isActive ? 'translate-x-5' : 'translate-x-0'}`} />
             </button>
          </div>
       </div>

       {/* Form Configuration */}
       <div className="bg-white p-8 border border-gray-200 rounded-2xl shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-6">
               {channel.id === 'whatsapp' ? (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number *</label>
                    <input 
                      type="text" 
                      value={settings.whatsappNumber || ''} 
                      onChange={(e) => updateSetting('whatsappNumber', e.target.value)}
                      placeholder="e.g. 84987654321"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0073aa] focus:border-[#0073aa] outline-none transition-all shadow-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">Include country code without special characters.</p>
                    <button onClick={() => onHelp('whatsapp')} className="text-xs font-bold text-blue-500 hover:underline mt-1 inline-block">→ How to format WhatsApp number?</button>
                  </div>
               ) : (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Bot Username / Token *</label>
                    <input 
                      type="text" 
                      value={settings.telegramBotToken || ''} 
                      onChange={(e) => updateSetting('telegramBotToken', e.target.value)}
                      placeholder="e.g. 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#0073aa] focus:border-[#0073aa] outline-none transition-all shadow-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">Enter the standard Telegram Bot Token.</p>
                    <button onClick={() => onHelp('telegram')} className="text-xs font-bold text-[#0088cc] hover:underline mt-1 inline-block">→ How to get Bot Token?</button>
                  </div>
               )}
             </div>

             <div className="bg-gray-50 rounded-xl p-6 flex flex-col justify-center text-sm text-gray-400 border border-dashed border-gray-200">
                <div className="text-center">
                   <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm border border-gray-100">
                      <Bot className="w-5 h-5 text-gray-400" />
                   </div>
                   <p className="font-bold text-gray-600 mb-1">Advanced Settings</p>
                   <p className="text-xs">Custom pre-filled messages and routing rules are locked in Lite version.</p>
                </div>
             </div>
          </div>
       </div>

       {/* Global Button Content overrides */}
       <div className="bg-white p-8 rounded-2xl border-2 border-dashed border-blue-100 hover:border-blue-200 transition-colors">
          <h4 className="font-bold text-gray-900 mb-6 flex items-center gap-2 text-lg">
             <ImageIcon className="w-5 h-5 text-[#0073aa]" /> Button Content Overrides
          </h4>
          <div className="grid md:grid-cols-2 gap-6">
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Button Text</label>
                <input 
                  type="text" 
                  value={settings[`${editChannel}_buttonText`] || settings.buttonText || ''} 
                  onChange={(e) => updateSetting(`${editChannel}_buttonText`, e.target.value)}
                  placeholder="Chat with us"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0073aa] focus:border-[#0073aa] outline-none shadow-sm"
                />
             </div>
             <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Icon URL (Optional)</label>
                <input 
                  type="text" 
                  value={settings[`${editChannel}_buttonIconUrl`] || settings.buttonIconUrl || ''} 
                  onChange={(e) => updateSetting(`${editChannel}_buttonIconUrl`, e.target.value)}
                  placeholder="https://your-site.com/icon.png"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0073aa] focus:border-[#0073aa] outline-none shadow-sm"
                />
             </div>
          </div>
       </div>
    </div>
  );
};

export default ChannelSettings;
