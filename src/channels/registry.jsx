/**
 * VibeBuy Channel Registry (JS)
 *
 * Lite registers WhatsApp + Telegram.
 * Pro plugin handles activation via the is_pro flag.
 */
import React from 'react';
import { Phone, Send, MessageCircle, Camera, Music, MessageSquare, Link2, ClipboardType } from 'lucide-react';

// Lite Channels
import whatsapp from './whatsapp/index.jsx';
import telegram from './telegram/index.jsx';
import discord from './discord/index.jsx';

// Pro Channels (UI is in Lite for upselling)
import zalo from './zalo/index.jsx';
import messenger from './messenger/index.jsx';
import instagram from './instagram/index.jsx';
import tiktok from './tiktok/index.jsx';
import line from './line/index.jsx';
import viber from './viber/index.jsx';
import custom from './custom/index.jsx';
import contact from './contact/index.jsx';

export const CHANNELS = [
  whatsapp,
  telegram,
  discord,
  zalo,
  messenger,
  instagram,
  tiktok,
  line,
  viber,
  custom,
  contact,
];

export const getChannel = (id) => CHANNELS.find(ch => ch.id === id) || whatsapp;
