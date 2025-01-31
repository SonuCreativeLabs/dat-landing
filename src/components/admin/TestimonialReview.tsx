import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star, Loader2, RotateCcw, MessageSquare } from "lucide-react";
import { toast } from "sonner";
import type { Database, TestimonialStatus, Testimonial, ServiceType } from "@/integrations/supabase/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

const statusStyles = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
  approved: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
  rejected: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" }
};

interface TestimonialReviewProps {
  archived?: boolean;
}

const TestimonialReview = ({ archived = false }: TestimonialReviewProps) => {
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials", archived],
    queryFn: async () => {
      let query = supabase
        .from("testimonials")
        .select("*")
        .order("created_at", { ascending: false });

      if (archived) {
        query = query.eq("status", "rejected");
      } else {
        query = query.in("status", ["pending", "approved"]);
      }

      const { data, error } = await query;

      if (error) throw error;

      return (data || []).map((testimonial) => ({
        ...testimonial,
        service_type: testimonial.service_type as ServiceType,
      }));
    },
  });

  const updateTestimonial = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: TestimonialStatus }) => {
      const { error } = await supabase
        .from("testimonials")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial updated successfully");
    },
    onError: (error) => {
      console.error('Error updating testimonial:', error);
      toast.error("Failed to update testimonial");
    }
  });

  const handleStatusChange = (id: string, status: TestimonialStatus) => {
    updateTestimonial.mutate({
      id,
      status
    });
  };

  const handleRestore = (id: string) => {
    updateTestimonial.mutate({
      id,
      status: 'pending'
    });
  };

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

  const pendingTestimonials = testimonials.filter(t => t.status === 'pending');
  const approvedTestimonials = testimonials.filter(t => t.status === 'approved');

  const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="p-4 flex flex-col gap-4">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="font-medium text-gray-900">{testimonial.name}</h3>
              {testimonial.status === 'approved' && (
                <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100">
                  Approved
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>{testimonial.service_type.split('_').map(word => 
                word.charAt(0).toUpperCase() + word.slice(1)
              ).join(' ')}</span>
              {testimonial.location && (
                <>
                  <span>•</span>
                  <span>{testimonial.location}</span>
                </>
              )}
            </div>
          </div>
          {archived ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleRestore(testimonial.id)}
              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Restore
            </Button>
          ) : (
            <Select
              defaultValue={testimonial.status}
              onValueChange={(value: TestimonialStatus) => handleStatusChange(testimonial.id, value)}
            >
              <SelectTrigger 
                className={cn(
                  "w-[120px] h-8 text-sm border-2",
                  statusStyles[testimonial.status].bg,
                  statusStyles[testimonial.status].text,
                  statusStyles[testimonial.status].border
                )}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    Pending
                  </span>
                </SelectItem>
                <SelectItem value="approved">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                    Approve
                  </span>
                </SelectItem>
                <SelectItem value="rejected">
                  <span className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    Reject
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          )}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500">
          <MessageSquare className="w-4 h-4" />
          <p className="text-gray-600">{testimonial.message}</p>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < testimonial.rating
                    ? "text-yellow-400 fill-current"
                    : "text-gray-200"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-500">{formatDate(testimonial.created_at)}</span>
        </div>
      </div>
    </div>
  );

  if (!archived) {
    return (
      <div className="space-y-8">
        {pendingTestimonials.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Pending Review</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pendingTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {approvedTestimonials.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Approved Testimonials</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {approvedTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          </div>
        )}

        {testimonials.length === 0 && (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            No testimonials to review
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {testimonials.map((testimonial) => (
        <TestimonialCard key={testimonial.id} testimonial={testimonial} />
      ))}
      {testimonials.length === 0 && (
        <div className="col-span-full text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          No archived testimonials
        </div>
      )}
    </div>
  );
};

export default TestimonialReview;