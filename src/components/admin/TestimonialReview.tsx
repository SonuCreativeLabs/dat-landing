import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Star, Loader2, Calendar, Archive } from "lucide-react";
import { toast } from "sonner";
import type { Database, TestimonialStatus, Testimonial } from "@/integrations/supabase/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const statusStyles = {
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300" },
  approved: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300" },
  rejected: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300" }
};

interface TestimonialReviewProps {
  archived?: boolean;
}

const TestimonialReview = ({ archived = false }: TestimonialReviewProps) => {
  const [activeTab, setActiveTab] = useState("active");
  const queryClient = useQueryClient();
  const [editingComment, setEditingComment] = useState<{ id: string; comment: string } | null>(null);

  const { data: testimonials = [], isLoading } = useQuery<Testimonial[]>({
    queryKey: ["testimonials", archived],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .eq("archived", archived)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateTestimonial = useMutation({
    mutationFn: async ({ id, status, comment }: { id: string; status?: TestimonialStatus; comment?: string }) => {
      const updateData: Partial<Testimonial> = {};
      if (status) updateData.status = status;
      if (comment !== undefined) updateData.admin_comment = comment;

      const { error } = await supabase
        .from("testimonials")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      setEditingComment(null);
    },
  });

  const archiveTestimonial = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("testimonials")
        .update({ 
          archived: true,
          status: 'rejected' 
        })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial moved to archive");
    },
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
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="active">Active Testimonials</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>

      <TabsContent value="active" className="space-y-4">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{testimonial.name}</span>
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
                <SelectTrigger 
                  className={cn(
                    "w-[140px] h-8 text-sm border-2",
                    statusStyles[testimonial.status].bg,
                    statusStyles[testimonial.status].text,
                    statusStyles[testimonial.status].border,
                    "relative"
                  )}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg border rounded-lg z-[100]">
                  <SelectItem value="pending" className="hover:bg-yellow-50">
                    <span className="flex items-center gap-2 text-gray-900 relative z-50">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 border-2 border-yellow-300" />
                      <span className="font-medium">Pending</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="approved" className="hover:bg-green-50">
                    <span className="flex items-center gap-2 text-gray-900 relative z-50">
                      <div className="w-2 h-2 rounded-full bg-green-400 border-2 border-green-300" />
                      <span className="font-medium">Approved</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="rejected" className="hover:bg-red-50">
                    <span className="flex items-center gap-2 text-gray-900 relative z-50">
                      <div className="w-2 h-2 rounded-full bg-red-400 border-2 border-red-300" />
                      <span className="font-medium">Rejected</span>
                    </span>
                  </SelectItem>
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
      </TabsContent>

      <TabsContent value="archived" className="space-y-4">
        <h2 className="text-lg font-semibold mb-4">Archived Testimonials</h2>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="bg-white rounded-lg shadow-sm p-4 flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="font-medium">{testimonial.name}</span>
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
                <SelectTrigger 
                  className={cn(
                    "w-[140px] h-8 text-sm border-2",
                    statusStyles[testimonial.status].bg,
                    statusStyles[testimonial.status].text,
                    statusStyles[testimonial.status].border,
                    "relative"
                  )}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white shadow-lg border rounded-lg z-[100]">
                  <SelectItem value="pending" className="hover:bg-yellow-50">
                    <span className="flex items-center gap-2 text-gray-900 relative z-50">
                      <div className="w-2 h-2 rounded-full bg-yellow-400 border-2 border-yellow-300" />
                      <span className="font-medium">Pending</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="approved" className="hover:bg-green-50">
                    <span className="flex items-center gap-2 text-gray-900 relative z-50">
                      <div className="w-2 h-2 rounded-full bg-green-400 border-2 border-green-300" />
                      <span className="font-medium">Approved</span>
                    </span>
                  </SelectItem>
                  <SelectItem value="rejected" className="hover:bg-red-50">
                    <span className="flex items-center gap-2 text-gray-900 relative z-50">
                      <div className="w-2 h-2 rounded-full bg-red-400 border-2 border-red-300" />
                      <span className="font-medium">Rejected</span>
                    </span>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
        {testimonials.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No archived testimonials found
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default TestimonialReview;