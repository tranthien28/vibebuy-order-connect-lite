/**
 * VibeBuy Channel Registry (JS)
 *
 * Lite registers WhatsApp + Telegram.
 * Pro plugin injects channels via window.vibebuyProChannels BEFORE this module loads.
 *
 * Pro plugin PHP example:
 *   add_action('admin_footer', function() {
 *     echo '<script>window.vibebuyProChannels = window.vibebuyProChannels || [];
 *       window.vibebuyProChannels.push({
 *         id: "zalo", name: "Zalo", pro: true, colorHex: "#0068FF", ...
 *       });
 *     </script>';
 *   }, 1); // priority 1 = before Lite's admin.js
 */
import React from 'react';
import { MessageCircle, Camera, Music, MessageSquare, Phone, Link2, ClipboardType } from 'lucide-react';
import whatsapp from './whatsapp/index.jsx';
import telegram from './telegram/index.jsx';
import discord from './discord/index.jsx';

// ── Lite Channels ──────────────────────────────────────────────
const LITE_CHANNELS = [
  whatsapp,
  telegram,
  discord,
];

// ── Pro Channel Placeholders (UI teasers in Lite) ──────────────
// These show in the dashboard as locked/PRO items.
// When Pro is installed, window.vibebuyProChannels replaces these.
const PRO_TEASERS = [
  { id: 'zalo',      name: 'Zalo',         icon: <MessageCircle className="w-5 h-5 flex-shrink-0" />, color: 'bg-[#0068FF]',   colorHex: '#0068FF',  pro: true, teaser: true },
  { id: 'messenger', name: 'Messenger',    icon: <MessageCircle className="w-5 h-5 flex-shrink-0" />, color: 'bg-gradient-to-r from-[#0084FF] to-[#A033FF]', colorHex: '#0084FF', pro: true, teaser: true },
  { id: 'instagram', name: 'Instagram',    icon: <Camera className="w-5 h-5 flex-shrink-0" />,        color: 'bg-gradient-to-tr from-[#FFDC80] via-[#E1306C] to-[#833AB4]', colorHex: '#E1306C', pro: true, teaser: true },
  { id: 'tiktok',    name: 'TikTok',       icon: <Music className="w-5 h-5 flex-shrink-0" />,         color: 'bg-[#000000]',   colorHex: '#000000',  pro: true, teaser: true },
  { id: 'line',      name: 'Line',         icon: <MessageSquare className="w-5 h-5 flex-shrink-0" />, color: 'bg-[#00C300]',   colorHex: '#00C300',  pro: true, teaser: true },
  { id: 'viber',     name: 'Viber',        icon: <Phone className="w-5 h-5 flex-shrink-0" />,         color: 'bg-[#7360F2]',   colorHex: '#7360F2',  pro: true, teaser: true },
  { id: 'custom',    name: 'Custom Link',  icon: <Link2 className="w-5 h-5 flex-shrink-0" />,         color: 'bg-gray-800',    colorHex: '#374151',  pro: true, teaser: true },
  { id: 'contact',   name: 'Contact Form', icon: <ClipboardType className="w-5 h-5 flex-shrink-0" />, color: 'bg-teal-600',   colorHex: '#0d9488',  pro: true, teaser: true },
];

// ── Merge: Pro channels override teasers if Pro is installed ──
const proInjected = (typeof window !== 'undefined' && window.vibebuyProChannels) || [];
const mergedPro = PRO_TEASERS.map(teaser => {
  const real = proInjected.find(p => p.id === teaser.id);
  return real ? { ...teaser, ...real, teaser: false } : teaser;
});
// Add any completely new Pro channels not in the teaser list
const newProChannels = proInjected.filter(p => !PRO_TEASERS.find(t => t.id === p.id));

export const CHANNELS = [...LITE_CHANNELS, ...mergedPro, ...newProChannels];

export const getChannel = (id) => CHANNELS.find(ch => ch.id === id) || whatsapp;
