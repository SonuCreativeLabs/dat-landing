import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2, Send, X, Star } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useCallback } from "react";
import type { Database } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";
import { JustDialLogo } from "@/components/icons/JustDialLogo";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  service_type: z.enum(["appliance_sales", "appliance_service", "appliance_rentals", "others"], {
    required_error: "Please select a service type",
  }),
  message: z.string().min(10, "Message must be at least 10 characters"),
  rating: z.string().min(1, "Please select a rating"),
});

type FormValues = z.infer<typeof formSchema>;

const serviceTypes = [
  { value: "appliance_sales", label: "Appliance Sales" },
  { value: "appliance_service", label: "Appliance Service" },
  { value: "appliance_rentals", label: "Appliance Rentals" },
  { value: "others", label: "Others" }
] as const;

const ratings = [
  { value: "5", label: (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <span>Excellent</span>
      <div className={cn(
        "flex items-center gap-1 px-2 py-0.5 rounded-full ml-2",
        "bg-orange-50 border border-orange-100"
      )}>
        <JustDialLogo />
        <span className="text-xs font-medium text-orange-600">Verified</span>
      </div>
    </div>
  ) },
  { value: "4", label: (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <span>Very Good</span>
    </div>
  ) },
  { value: "3", label: (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <span>Good</span>
    </div>
  ) },
  { value: "2", label: (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 2 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <span>Fair</span>
    </div>
  ) },
  { value: "1", label: (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 1 }).map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
        ))}
      </div>
      <span>Poor</span>
    </div>
  ) },
] as const;

function useScrollLock() {
  const lockScroll = useCallback(() => {
    // Save current scroll position
    const scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';
  }, []);

  const unlockScroll = useCallback(() => {
    // Restore scroll position
    const scrollPosition = document.body.style.top;
    document.body.style.removeProperty('overflow');
    document.body.style.removeProperty('position');
    document.body.style.removeProperty('top');
    document.body.style.removeProperty('width');
    window.scrollTo(0, parseInt(scrollPosition || '0') * -1);
  }, []);

  return { lockScroll, unlockScroll };
}

export default function TestimonialForm({ onClose }: { onClose: () => void }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [supabaseInitialized, setSupabaseInitialized] = useState(false);

  // Lock scroll when component mounts
  useEffect(() => {
    // Save current scroll position
    const scrollPosition = window.pageYOffset;
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollPosition}px`;
    document.body.style.width = '100%';

    // Cleanup function to restore scroll when component unmounts
    return () => {
      const scrollPosition = document.body.style.top;
      document.body.style.removeProperty('overflow');
      document.body.style.removeProperty('position');
      document.body.style.removeProperty('top');
      document.body.style.removeProperty('width');
      window.scrollTo(0, parseInt(scrollPosition || '0') * -1);
    };
  }, []);

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  // Handle click outside to close modal
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      service_type: undefined,
      message: "",
      rating: "",
    },
  });

  // Test Supabase connection on mount
  useEffect(() => {
    async function initSupabase() {
      try {
        const { data, error } = await supabase.from('testimonials').select('count');
        if (error) throw error;
        setSupabaseInitialized(true);
        console.log('Supabase connection successful');
      } catch (error) {
        console.error('Failed to initialize Supabase:', error);
        toast.error('Failed to connect to the database');
      }
    }

    initSupabase();
  }, []);

  async function onSubmit(values: FormValues) {
    if (!supabaseInitialized) {
      toast.error('Database connection not ready. Please try again.');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const { data, error } = await supabase
        .from('testimonials')
        .insert([
          {
            name: values.name.trim(),
            location: values.location.trim(),
            service_type: values.service_type,
            message: values.message.trim(),
            rating: parseInt(values.rating),
            status: 'pending',
            source: 'website',
            archived: false
          }
        ]);

      if (error) throw error;

      // Show success toast with custom styling
      toast.custom((t) => (
        <div className="bg-white rounded-lg shadow-lg border border-green-100 p-6 max-w-md w-full mx-auto">
          <div className="flex items-start gap-4">
            <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">Thank you for your feedback!</h3>
              <div className="mt-2 space-y-2">
                <p className="text-sm text-gray-600">
                  Your testimonial has been submitted successfully and is pending review.
                </p>
                <p className="text-sm text-gray-500">
                  Once approved by our team, your review will appear on our website.
                </p>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <span>•</span>
                  <span>Review Status: Pending Approval</span>
                </div>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => toast.dismiss(t)}
                  className="px-4 py-2 bg-green-50 text-green-600 text-sm font-medium rounded-md hover:bg-green-100 transition-colors"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        </div>
      ), {
        duration: 8000,
        position: "top-center",
      });

      // Reset form and close modal
      form.reset();

    } catch (error) {
      console.error('Error submitting testimonial:', error);
      toast.error(
        error instanceof Error 
          ? error.message 
          : 'Failed to submit testimonial. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={handleBackdropClick}
      style={{ 
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 999999,
        isolation: 'isolate'
      }}
    >
      <div 
        className="w-full max-w-lg mx-auto bg-white rounded-xl shadow-2xl p-3 overflow-y-auto relative m-3"
        style={{
          maxHeight: 'min(calc(100vh - 24px), 520px)',
          position: 'relative',
          transform: 'translateZ(0)',
          zIndex: 999999,
          isolation: 'isolate'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div className="sticky top-0 z-10 bg-white pb-2">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-semibold text-gray-900">Share Your Experience</h3>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="hover:bg-gray-100 rounded-full -mr-1 h-8 w-8"
            >
              <X className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>

        <Toaster richColors />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-gray-700 text-xs font-medium">Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your name" 
                        className="bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-gray-700 text-xs font-medium">Location</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Your location" 
                        className="bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <FormField
                control={form.control}
                name="service_type"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-gray-700 text-xs font-medium">Service Type</FormLabel>
                    <Select 
                      onValueChange={field.onChange}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="bg-gray-50/50 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent 
                        className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-[9999999] w-[var(--radix-select-trigger-width)] max-h-[200px]"
                        position="popper"
                        side="top"
                        sideOffset={4}
                        align="center"
                      >
                        {serviceTypes.map((type) => (
                          <SelectItem 
                            key={type.value} 
                            value={type.value}
                            className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 py-1.5 px-3 text-sm"
                          >
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel className="text-gray-700 text-xs font-medium">Rating</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-gray-50/50 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500 h-8 text-sm">
                          <SelectValue placeholder="Select rating" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent 
                        className="bg-white border border-gray-200 shadow-lg rounded-lg overflow-hidden z-[9999999] w-[var(--radix-select-trigger-width)] max-h-[200px]"
                        position="popper"
                        side="top"
                        sideOffset={4}
                        align="center"
                      >
                        {ratings.map((rating) => (
                          <SelectItem 
                            key={rating.value} 
                            value={rating.value}
                            className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50 py-1.5 px-3 text-sm"
                          >
                            {rating.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="text-gray-700 text-xs font-medium">Your Message</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your experience with our service..."
                      className="min-h-[50px] sm:min-h-[60px] resize-none bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500 text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className={cn(
                "w-full h-8 text-sm font-medium rounded-lg transition-all duration-200",
                isSubmitting 
                  ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white hover:shadow-md"
              )}
              disabled={isSubmitting || !supabaseInitialized}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
                  <span>Submitting...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Send className="mr-1.5 h-3.5 w-3.5" />
                  <span>Submit Review</span>
                </div>
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}