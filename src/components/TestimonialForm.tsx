import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const testimonialSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  service_type: z.string().min(2, "Service type must be at least 2 characters"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  rating: z.number().min(1).max(5),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type TestimonialFormValues = z.infer<typeof testimonialSchema>;

const TestimonialForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TestimonialFormValues>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: "",
      service_type: "",
      location: "",
      rating: 5,
      message: "",
    },
  });

  const onSubmit = async (data: TestimonialFormValues) => {
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase
        .from("testimonials")
        .insert([
          {
            ...data,
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ]);

      if (error) throw error;

      toast.success("Thank you for your testimonial! It will be reviewed shortly.");
      form.reset();
    } catch (error) {
      console.error("Error submitting testimonial:", error);
      toast.error("Failed to submit testimonial. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Share Your Experience
      </h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your name" {...field} />
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
                <FormLabel>Service Type</FormLabel>
                <FormControl>
                  <Input placeholder="Type of service received" {...field} />
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
                <FormLabel>Location</FormLabel>
                <FormControl>
                  <Input placeholder="Your location" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rating (1-5)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={1}
                    max={5}
                    {...field}
                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Your Message</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Share your experience..."
                    className="h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Testimonial"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default TestimonialForm;