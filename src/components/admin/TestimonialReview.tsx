import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, Loader2, Archive, Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Testimonial = Database['public']['Tables']['testimonials']['Row'];

const TestimonialReview = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch pending testimonials
  const { data: pendingTestimonials = [], isLoading: isPendingLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials", "pending"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "pending")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Fetch archived testimonials
  const { data: archivedTestimonials = [], isLoading: isArchivedLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials", "archived"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("status", "archived")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Update testimonial status mutation
  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "active" | "archived";
    }) => {
      const { error } = await supabase
        .from("testimonials")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, variables) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      
      // Show success message
      toast({
        title: "Success",
        description: variables.status === "active" 
          ? "Testimonial approved and published" 
          : "Testimonial archived",
      });
    },
    onError: (error) => {
      console.error("Error updating testimonial:", error);
      toast({
        title: "Error",
        description: "Failed to update testimonial status",
        variant: "destructive",
      });
    },
  });

  const handleApprove = (id: string) => {
    updateStatus.mutate({ id, status: "active" });
  };

  const handleArchive = (id: string) => {
    updateStatus.mutate({ id, status: "archived" });
  };

  if (isPendingLoading || isArchivedLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Pending Testimonials */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Pending Reviews</h2>
        {pendingTestimonials.length === 0 ? (
          <p className="text-gray-500">No pending testimonials to review</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingTestimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{testimonial.name}</span>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Service: {testimonial.service_type}
                  </p>
                  <p className="text-gray-700">{testimonial.message}</p>
                </CardContent>
                <CardFooter className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleArchive(testimonial.id)}
                    disabled={updateStatus.isLoading}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Reject
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => handleApprove(testimonial.id)}
                    disabled={updateStatus.isLoading}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    Approve
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Archived Testimonials */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Archived Reviews</h2>
        {archivedTestimonials.length === 0 ? (
          <p className="text-gray-500">No archived testimonials</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {archivedTestimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{testimonial.name}</span>
                    <div className="flex items-center">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-4 h-4 text-yellow-400 fill-current"
                        />
                      ))}
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-2">
                    Service: {testimonial.service_type}
                  </p>
                  <p className="text-gray-700">{testimonial.message}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleApprove(testimonial.id)}
                    disabled={updateStatus.isLoading}
                  >
                    <Archive className="w-4 h-4 mr-2" />
                    Restore
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialReview;