import React from 'react';
import { Link2 } from 'lucide-react';
import ConfigStep from './ConfigStep.jsx';

const custom = {
  id: 'custom',
  name: 'Custom Link',
  description: 'Add any custom URL for your customers to follow.',
  icon: <Link2 className="w-5 h-5 flex-shrink-0" />,
  color: 'bg-gray-800',
  colorHex: '#374151',
  pro: true,

  defaults: {
    buttonText: 'Follow Link',
    bgColor: '#374151',
    textColor: '#ffffff',
    borderRadius: 50,
  },

  ConfigStep,
};

export default custom;
