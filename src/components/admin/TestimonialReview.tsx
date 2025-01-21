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
import { Star, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

type Testimonial = {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  review: string;
  service: string;
  status: string;
  created_at: string;
};

const TestimonialReview = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["pending-testimonials"],
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

  const updateStatus = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: "approved" | "archived";
    }) => {
      const { error } = await supabase
        .from("testimonials")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: (_, { status }) => {
      queryClient.invalidateQueries(["pending-testimonials"]);
      toast({
        title: `Testimonial ${status === 'approved' ? 'approved' : 'archived'}`,
        description: `The testimonial has been ${status === 'approved' ? 'approved' : 'archived'} successfully.`,
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update testimonial status",
      });
      console.error("Error updating testimonial:", error);
    },
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
        No pending testimonials to review
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-lg">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex mb-2">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 text-yellow-400 fill-current"
                />
              ))}
            </div>
            <p className="text-gray-600 mb-2">{testimonial.review}</p>
            <p className="text-sm font-medium text-blue-600">
              {testimonial.service}
            </p>
          </CardContent>
          <CardFooter className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() =>
                updateStatus.mutate({ id: testimonial.id, status: "archived" })
              }
              disabled={updateStatus.isPending}
            >
              Archive
            </Button>
            <Button
              onClick={() =>
                updateStatus.mutate({ id: testimonial.id, status: "approved" })
              }
              disabled={updateStatus.isPending}
            >
              Approve
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default TestimonialReview;