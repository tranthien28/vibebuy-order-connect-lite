import React from 'react';
import { Lock, Check } from 'lucide-react';
import MessageTemplateEditor from '../../components/MessageTemplateEditor.jsx';

const ConfigStep = ({ channel, settings, updateSetting, onNavigate }) => {
  const prefix = `${channel.id}_`;
  const get = (field, fallback = '') => settings[prefix + field] ?? fallback;

  return (
    <div className="space-y-6">
      {/* Bot Username */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bot Username
        </label>
        <div className="flex gap-2">
          <div className="flex items-center px-3 bg-gray-50 border border-gray-200 rounded-lg text-sm text-gray-500 font-medium shrink-0">
            @
          </div>
          <input
            type="text"
            value={get('botUsername')}
            onChange={e => updateSetting(`${prefix}botUsername`, e.target.value.replace('@', ''))}
            placeholder="mybotname"
            className="vibebuy-input flex-1"
          />
        </div>
        <p className="text-xs text-gray-400 mt-1.5">
          Username from <a href="https://t.me/BotFather" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@BotFather</a>
        </p>
      </div>

      {/* Bot Token */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Bot Token
          <span className="ml-1 text-gray-400 font-normal text-xs">(Optional)</span>
        </label>
        <input
          type="password"
          value={get('botToken')}
          onChange={e => updateSetting(`${prefix}botToken`, e.target.value)}
          placeholder="123456:ABC-DEF..."
          className="vibebuy-input font-mono text-xs"
        />
        <p className="text-xs text-gray-400 mt-1.5">Required for order notifications.</p>
      </div>

      {/* Chat ID */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Chat ID
          <span className="ml-1 text-gray-400 font-normal text-xs">(Required for Bot)</span>
        </label>
        <input
          type="text"
          value={get('chatId')}
          onChange={e => updateSetting(`${prefix}chatId`, e.target.value)}
          placeholder="123456789"
          className="vibebuy-input font-mono text-xs"
        />
        <p className="text-xs text-gray-400 mt-1.5">
          Get your ID from <a href="https://t.me/userinfobot" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">@userinfobot</a>
        </p>
      </div>

      {/* Message Template Selection */}
      <div className="pt-2 border-t border-gray-100">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Message Template
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-3 rounded-xl border-2 border-green-500 bg-green-50 cursor-pointer">
            <div className="w-4 h-4 rounded-full border-2 border-green-500 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-green-700">Use Global Template</p>
              <p className="text-[11px] text-green-600/70">Applies the template from the Message Templates menu</p>
            </div>
            <Check className="w-4 h-4 text-green-500" />
          </label>

          <div className="flex items-center gap-3 p-3 rounded-xl border border-dashed border-gray-200 bg-gray-50/50 grayscale opacity-60 cursor-not-allowed">
            <div className="w-4 h-4 rounded-full border-2 border-gray-300" />
            <div className="flex-1">
              <p className="text-sm font-bold text-gray-600">Custom for Telegram</p>
              <p className="text-[11px] text-gray-400">Override global template for this channel</p>
            </div>
            <span className="bg-amber-400 text-white text-[9px] font-bold px-2 py-0.5 rounded">PRO Only</span>
          </div>
        </div>
        <p className="text-[11px] text-gray-400 mt-3 italic">
          Go to <span className="font-bold">Message Templates</span> in the sidebar to edit the content.
        </p>
      </div>

      {/* Pro Features */}
      <div className="pt-2 border-t border-gray-100">
        <div className="grid grid-cols-2 gap-2 mt-4 opacity-60 pointer-events-none select-none">
          {['Auto-Reply', 'Group Routing', 'Analytics', 'Private Support'].map(f => (
            <div key={f} className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-gray-50">
              <Lock className="w-3.5 h-3.5 text-gray-300 shrink-0" />
              <span className="text-xs text-gray-400 font-medium">{f}</span>
              <span className="ml-auto bg-amber-400 text-white text-[8px] font-bold px-1 py-0.5 rounded">PRO</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ConfigStep;
