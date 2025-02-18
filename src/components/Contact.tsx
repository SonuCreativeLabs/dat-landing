import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  MessageSquare,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { CONTACT_INFO } from '@/config/contact';
import { ASSETS } from '@/config/assets';

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  location: string;
  service_type: string;
  message: string;
};

type EnquiryInsert = Database['public']['Tables']['enquiries']['Insert'];

const Contact = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    location: '',
    service_type: 'appliance_rental',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const { error: supabaseError } = await supabase
        .from('enquiries')
        .insert([
          {
            ...formData,
            status: 'new'
          }
        ]);

      if (supabaseError) throw supabaseError;

      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        location: '',
        service_type: 'appliance_rental',
        message: ''
      });
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-12 sm:py-12 bg-gradient-to-b from-[#003366] via-[#003D7A] to-[#004b8f] relative overflow-hidden z-[8] -mt-1">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-1/3 space-y-8"
          >
            {/* Title */}
            <div>
              <h2 className="text-4xl font-bold text-white mb-4">📞 Get in Touch</h2>
              <p className="text-white/80 text-lg">
                We're here to assist you with all your appliance service and rental needs. Reach out to us anytime!
              </p>
            </div>

            <div className="space-y-6">
              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#003366] rounded-xl p-3">
                  <Phone className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Phone</h3>
                  <p className="text-white/90">{CONTACT_INFO.PHONE}</p>
                  <p className="text-sm text-white/60">24/7 Support Available</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#003366] rounded-xl p-3">
                  <Mail className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Email</h3>
                  <p className="text-white/90">{CONTACT_INFO.EMAIL}</p>
                  <p className="text-sm text-white/60">Online support 24/7</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#003366] rounded-xl p-3">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Location</h3>
                  <p className="text-white/90">
                    15, 1st Main Rd, Udayam Nagar, Velachery, Chennai, Tamil Nadu-600042
                  </p>
                  <a 
                    href={CONTACT_INFO.ADDRESS.MAPS_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-white/80 hover:text-white transition-colors flex items-center gap-1 mt-2"
                  >
                    <Navigation className="w-4 h-4" />
                    Get Directions
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start gap-4"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="bg-[#003366] rounded-xl p-3">
                  <Clock className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Business Hours</h3>
                  <p className="text-white/90">Monday - Sunday</p>
                  <p className="text-sm text-white/60">24/7 Service Available</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:w-2/3"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">💬 Send Us a Message</h3>
                <p className="text-white/80">
                  Fill out the form below to reach us. We will get back to you as soon as possible.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-white/90 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/60 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/20"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/60 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/20"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/60 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/20"
                      placeholder="Your phone number"
                    />
                  </div>

                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-white/90 mb-2">
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/60 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/20"
                      placeholder="Your location"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="service_type" className="block text-sm font-medium text-white/90 mb-2">
                    Service Type
                  </label>
                  <select
                    id="service_type"
                    name="service_type"
                    value={formData.service_type}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/60 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/20"
                  >
                    <option value="appliance_rental">Appliance Rental</option>
                    <option value="appliance_service">Appliance Service</option>
                    <option value="appliance_purchase">Appliance Purchase</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="mt-1 block w-full rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-white placeholder-white/60 focus:border-[#003366] focus:ring-2 focus:ring-[#003366]/20"
                    placeholder="Example: I need to rent an AC for my home office. Looking for a 1.5 ton split AC with installation within this week."
                  />
                </div>

                {error && (
                  <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-lg border border-red-400/20">{error}</div>
                )}

                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 text-green-400 bg-green-400/10 p-4 rounded-xl border border-green-400/20"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Message sent successfully! We'll get back to you soon.</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex items-center justify-center gap-2 px-8 py-4 
                            bg-gradient-to-r from-[#0EA5E9] to-[#38BDF8] 
                            text-white font-semibold rounded-xl 
                            hover:from-[#38BDF8] hover:to-[#0EA5E9]
                            transition-all duration-300 
                            shadow-[0_0_20px_rgba(14,165,233,0.3)] 
                            hover:shadow-[0_0_25px_rgba(14,165,233,0.5)]
                            disabled:opacity-50 disabled:cursor-not-allowed
                            ${isSubmitting ? 'animate-pulse' : ''}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
