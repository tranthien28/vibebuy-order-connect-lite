import React from 'react';
import { ClipboardType } from 'lucide-react';
import ConfigStep from './ConfigStep.jsx';

const contact = {
  id: 'contact',
  name: 'Contact Form',
  description: 'Collect customer info directly before starting a chat.',
  icon: <ClipboardType className="w-5 h-5 flex-shrink-0" />,
  color: 'bg-teal-600',
  colorHex: '#0d9488',
  pro: true,

  defaults: {
    buttonText: 'Send Inquiry',
    bgColor: '#0d9488',
    textColor: '#ffffff',
    borderRadius: 50,
  },

  ConfigStep,
};

export default contact;
