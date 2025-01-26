import { useEffect, useRef } from 'react';

interface Announcement {
  id: number;
  text: string;
  type: 'welcome' | 'promo' | 'info';
}

const announcements: Announcement[] = [
  { id: 1, type: 'welcome', text: '👋 Welcome to DAT Services - Your Trusted Home Appliance Service Partner!' },
  { id: 2, type: 'promo', text: '🎉 Special Offer: Use code NEWUSER20 for 20% off on your first service!' },
  { id: 3, type: 'info', text: '⚡ Fast & Reliable Service - Same Day Response Guaranteed' },
  { id: 4, type: 'promo', text: '🛠️ AC Service Special: Book now and get free gas topup - Use code ACSPECIAL' },
];

export default function AnnouncementBanner() {
  return (
    <section className="bg-gradient-to-r from-rose-600 via-pink-600 to-rose-600">
      <div className="max-w-7xl mx-auto">
        <div className="overflow-hidden py-1.5">
          <div className="flex whitespace-nowrap">
            <div className="flex marquee-content">
              {announcements.map((announcement) => (
                <div key={announcement.id} className="inline-flex items-center shrink-0 px-4">
                  {announcement.type === 'promo' && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-300 text-rose-700 mr-2">
                      PROMO
                    </span>
                  )}
                  <span className="text-sm text-white font-medium">
                    {announcement.text}
                  </span>
                  <span className="text-rose-300 mx-4">•</span>
                </div>
              ))}
              {/* Duplicate for seamless loop */}
              {announcements.map((announcement) => (
                <div key={`${announcement.id}-duplicate`} className="inline-flex items-center shrink-0 px-4">
                  {announcement.type === 'promo' && (
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium bg-yellow-300 text-rose-700 mr-2">
                      PROMO
                    </span>
                  )}
                  <span className="text-sm text-white font-medium">
                    {announcement.text}
                  </span>
                  <span className="text-rose-300 mx-4">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
