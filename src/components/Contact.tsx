import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast, Toaster } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, MapPin, MessageSquare } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { motion } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  service_type: z.string().min(1, "Please select a service type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      service_type: "",
      message: "",
    },
  });

  const serviceTypes = [
    { value: "appliance_sales", label: "Appliance Sales" },
    { value: "appliance_service", label: "Appliance Service" },
    { value: "appliance_rentals", label: "Appliance Rentals" },
    { value: "others", label: "Others" },
  ];

  // Initialize Supabase client
  useEffect(() => {
    const initializeSupabase = async () => {
      try {
        const { data, error } = await supabase.from('enquiries').select('count');
        if (error) {
          console.error('Error initializing Supabase:', error);
        }
      } catch (error) {
        console.error('Failed to initialize Supabase:', error);
      }
    };

    initializeSupabase();
  }, []);

  async function onSubmit(values: z.infer<typeof contactSchema>) {
    try {
      // Add a small delay to ensure Supabase client is ready
      await new Promise(resolve => setTimeout(resolve, 100));

      setIsSubmitting(true);

      const { data, error } = await supabase
        .from('enquiries')
        .insert([
          {
            name: values.name,
            email: values.email,
            phone: values.phone,
            service_type: values.service_type,
            message: values.message,
            location: "Website Form",
            status: 'new' as const,
            created_at: new Date().toISOString() // Add timestamp
          }
        ]);

      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }

      // Verify the data was inserted
      const { data: verifyData, error: verifyError } = await supabase
        .from('enquiries')
        .select()
        .eq('email', values.email)
        .order('created_at', { ascending: false })
        .limit(1);

      if (verifyError || !verifyData?.length) {
        console.error('Verification error:', verifyError);
        throw new Error('Failed to verify data insertion');
      }

      toast.success('Thank you for your enquiry! We will get back to you soon.');
      form.reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <Toaster richColors />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Name</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your name" 
                      className="bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input 
                      type="email" 
                      placeholder="Your email" 
                      className="bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Phone</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your phone number" 
                      className="bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="service_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Service Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select service type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white shadow-md border-gray-200">
                      {serviceTypes.map((type) => (
                        <SelectItem 
                          key={type.value} 
                          value={type.value}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="How can we help you?"
                    className="min-h-[120px] resize-none bg-gray-50/50 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full md:w-auto px-8 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                <span>Sending...</span>
              </div>
            ) : (
              "Submit Enquiry"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default Contact;
