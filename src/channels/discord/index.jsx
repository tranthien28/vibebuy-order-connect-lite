import React from 'react';
import { Hash } from 'lucide-react';
import ConfigStep from './ConfigStep.jsx';

const discord = {
  id: 'discord',
  name: 'Discord',
  description: 'Receive instant order notifications via Discord Webhooks.',
  icon: <Hash className="w-5 h-5 flex-shrink-0" />,
  color: 'bg-[#5865F2]', // Discord Blurple
  colorHex: '#5865F2',
  ConfigStep: ConfigStep,
};

export default discord;
