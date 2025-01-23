import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Loader2 } from "lucide-react";
import { Toaster, toast } from "sonner";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import type { Database } from "@/integrations/supabase/types";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  service_type: z.string().min(1, "Please select a service type"),
  review: z.string().min(10, "Review must be at least 10 characters"),
  rating: z.string().min(1, "Please select a rating"),
});

const serviceTypes = [
  { value: "appliance_sales", label: "Appliance Sales" },
  { value: "appliance_service", label: "Appliance Service" },
  { value: "appliance_rentals", label: "Appliance Rentals" },
  { value: "others", label: "Others" },
];

const ratings = [
  { value: "5", label: "⭐⭐⭐⭐⭐ Excellent" },
  { value: "4", label: "⭐⭐⭐⭐ Very Good" },
  { value: "3", label: "⭐⭐⭐ Good" },
  { value: "2", label: "⭐⭐ Fair" },
  { value: "1", label: "⭐ Poor" },
];

export default function TestimonialForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      location: "",
      service_type: "",
      review: "",
      rating: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      // Format the data according to the database schema
      const testimonialData: Database['public']['Tables']['testimonials']['Insert'] = {
        name: values.name,
        location: values.location,
        service_type: values.service_type,
        message: values.review,
        rating: parseInt(values.rating),
        status: 'new',
        created_at: new Date().toISOString(),
        admin_comment: null,
        image: null
      };

      console.log('Submitting testimonial data:', testimonialData);

      const { data, error } = await supabase
        .from('testimonials')
        .insert([testimonialData])
        .select();

      if (error) {
        console.error('Supabase error:', error);
        if (error.code === '23505') {
          toast.error('You have already submitted a testimonial');
        } else if (error.code === '23503') {
          toast.error('Invalid service type selected');
        } else {
          toast.error(`Error: ${error.message}`);
        }
        throw error;
      }

      console.log('Testimonial saved successfully:', data);
      toast.success('Thank you for your review! It will be visible after moderation.');
      form.reset();
    } catch (error) {
      console.error('Error submitting testimonial:', error);
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`);
      } else {
        toast.error('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Share Your Experience</h3>
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
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="Your location" 
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

            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Rating</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-gray-50/50 border-gray-200 hover:border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                        <SelectValue placeholder="Select rating" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="bg-white shadow-md border-gray-200">
                      {ratings.map((rating) => (
                        <SelectItem 
                          key={rating.value} 
                          value={rating.value}
                          className="hover:bg-gray-50 cursor-pointer"
                        >
                          {rating.label}
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
            name="review"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-gray-700">Your Review</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience with our service..."
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
                <span>Submitting...</span>
              </div>
            ) : (
              "Submit Review"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}