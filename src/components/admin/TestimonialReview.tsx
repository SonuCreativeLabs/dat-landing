import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Star, Loader2, MapPin, Calendar, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  approved: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800"
} as const;

type Status = keyof typeof statusColors;

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
    mutationFn: async ({ id, status, comment }: { id: string, status?: Status, comment?: string }) => {
      const updates: Partial<Testimonial> = {};
      if (status) updates.status = status;
      if (comment !== undefined) updates.admin_comment = comment;

      const { error } = await supabase
        .from("testimonials")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update testimonial: " + error.message);
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No testimonials found
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="grid gap-6">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="font-semibold">{testimonial.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${statusColors[testimonial.status as Status]}`}>
                  {testimonial.status}
                </span>
              </CardTitle>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(testimonial.created_at)}
              </span>
            </div>
          </CardHeader>

          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{testimonial.location}</span>
              </div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < testimonial.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Service Type</div>
              <div className="bg-gray-50 p-3 rounded-md">
                {testimonial.service_type}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Testimonial</div>
              <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
                {testimonial.message}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Admin Comment</div>
              <Textarea
                placeholder="Add your comment here..."
                defaultValue={testimonial.admin_comment || ""}
                className="min-h-[100px]"
                onChange={(e) => {
                  const newComment = e.target.value;
                  updateTestimonial.mutate({ id: testimonial.id, comment: newComment });
                }}
              />
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 p-4">
            <div className="flex items-center justify-between w-full">
              <Select
                defaultValue={testimonial.status}
                onValueChange={(value) => {
                  updateTestimonial.mutate({
                    id: testimonial.id,
                    status: value as Status
                  });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TestimonialReview;