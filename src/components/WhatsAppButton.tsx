import { MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@/config/contact';

const WhatsAppButton = () => {
  return (
    <a
      href={`https://wa.me/${CONTACT_INFO.WHATSAPP}?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20your%20services.`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 p-4 
                 bg-[#25D366] hover:bg-[#22c55e]
                 text-white rounded-full 
                 transition-all duration-300 shadow-lg 
                 hover:shadow-[0_8px_30px_rgba(37,211,102,0.3)]
                 hover:-translate-y-0.5"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;