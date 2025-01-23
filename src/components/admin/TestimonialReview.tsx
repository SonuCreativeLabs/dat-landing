import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star, Loader2, Calendar } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Testimonial = Database['public']['Tables']['testimonials']['Row'];
type TestimonialStatus = "pending" | "approved" | "rejected";

const TestimonialReview = () => {
  const queryClient = useQueryClient();

  // Fetch testimonials
  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateTestimonial = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: TestimonialStatus }) => {
      const { error } = await supabase
        .from("testimonials")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Status updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update status: " + error.message);
    }
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {testimonials.map((testimonial) => (
        <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-4 flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-medium">{testimonial.name}</span>
              <span className="text-sm text-gray-500">({testimonial.service_type})</span>
            </div>
            <p className="text-gray-700 mb-2">{testimonial.message}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">{formatDate(testimonial.created_at)}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select
              defaultValue={testimonial.status}
              onValueChange={(value: TestimonialStatus) => {
                updateTestimonial.mutate({
                  id: testimonial.id,
                  status: value
                });
              }}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approve</SelectItem>
                <SelectItem value="rejected">Reject</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ))}
      {testimonials.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No testimonials found
        </div>
      )}
    </div>
  );
};

export default TestimonialReview;