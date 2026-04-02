import React from 'react';
import { Send } from 'lucide-react';
import ConfigStep from './ConfigStep.jsx';

const telegram = {
  id: 'telegram',
  name: 'Telegram',
  description: 'Privacy-focused messenger with 700M+ users.',
  icon: <Send className="w-5 h-5 flex-shrink-0" />,
  color: 'bg-[#0088cc]',
  colorHex: '#0088cc',
  pro: false,
  tutorialUrl: 'https://core.telegram.org/bots/tutorial#obtain-your-bot-token',

  defaults: {
    buttonText: 'Order via Telegram',
    bgColor: '#0088cc',
    textColor: '#ffffff',
    borderRadius: 50,
  },

  ConfigStep,
  AppearanceStep: null,
  DisplayStep: null,
};

export default telegram;
