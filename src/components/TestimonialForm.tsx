import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { useToast } from "./ui/use-toast";
import { Star, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type TestimonialFormData = {
  name: string;
  location: string;
  rating: number;
  review: string;
  service: string;
};

const TestimonialForm = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rating, setRating] = useState(5);
  const [open, setOpen] = useState(false);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TestimonialFormData>();

  const onSubmit = async (data: TestimonialFormData) => {
    setIsSubmitting(true);
    try {
      const { error } = await supabase.from("testimonials").insert([
        {
          ...data,
          rating,
          image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.name}`,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Thank you for your feedback!",
        description: "Your testimonial will be reviewed and published soon.",
      });
      
      reset();
      setOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="bg-white hover:bg-blue-50 border-blue-200 text-blue-600 hover:text-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 group"
        >
          Share Your Experience
          <MessageSquare className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Your Experience</DialogTitle>
          <DialogDescription>
            Tell us about your experience with our services. Your feedback helps us improve!
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              placeholder="Your Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-sm text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>
          
          <div>
            <Input
              placeholder="Your Location (e.g., T. Nagar, Chennai)"
              {...register("location", { required: "Location is required" })}
            />
            {errors.location && (
              <p className="text-sm text-red-500 mt-1">{errors.location.message}</p>
            )}
          </div>

          <div>
            <Input
              placeholder="Service Used (e.g., AC Installation)"
              {...register("service", { required: "Service is required" })}
            />
            {errors.service && (
              <p className="text-sm text-red-500 mt-1">{errors.service.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-2">Rating</label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-6 h-6 ${
                      star <= rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <Textarea
              placeholder="Share your experience..."
              {...register("review", { required: "Review is required" })}
              className="min-h-[100px]"
            />
            {errors.review && (
              <p className="text-sm text-red-500 mt-1">{errors.review.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit Testimonial"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialForm;