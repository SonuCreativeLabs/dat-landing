import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MessageSquare, Loader2, Calendar, Phone, Mail, X, Filter } from "lucide-react";
import { toast } from "sonner";
import type { Database } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

type Enquiry = Database['public']['Tables']['enquiries']['Row'];
type EnquiryStatus = "new" | "in_progress" | "contacted" | "scheduled" | "completed" | "cancelled" | "resolved";

type StatusColor = {
  bg: string;
  text: string;
  border: string;
  label: string;
};

const statusColors: Record<EnquiryStatus, StatusColor> = {
  new: { bg: "bg-blue-50", text: "text-blue-500", border: "border-blue-500", label: "New" },
  in_progress: { bg: "bg-yellow-50", text: "text-yellow-500", border: "border-yellow-500", label: "In Progress" },
  contacted: { bg: "bg-green-50", text: "text-green-500", border: "border-green-500", label: "Contacted" },
  scheduled: { bg: "bg-indigo-50", text: "text-indigo-500", border: "border-indigo-500", label: "Scheduled" },
  completed: { bg: "bg-emerald-50", text: "text-emerald-500", border: "border-emerald-500", label: "Completed" },
  cancelled: { bg: "bg-red-50", text: "text-red-500", border: "border-red-500", label: "Cancelled" },
  resolved: { bg: "bg-gray-50", text: "text-gray-500", border: "border-gray-500", label: "Resolved" }
};

const EnquiryReview = () => {
  const queryClient = useQueryClient();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [comment, setComment] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | "all">("all");

  // Fetch enquiries
  const { data: enquiries = [], isLoading } = useQuery<Enquiry[]>({
    queryKey: ["enquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  // Update enquiry mutation
  const updateEnquiry = useMutation({
    mutationFn: async ({ id, status, admin_comment }: { id: string; status?: EnquiryStatus; admin_comment?: string }) => {
      const updateData: Partial<Enquiry> = {};
      if (status !== undefined) updateData.status = status;
      if (admin_comment !== undefined) updateData.admin_comment = admin_comment;

      const { error } = await supabase
        .from("enquiries")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update: " + error.message);
    },
  });

  // Count enquiries by status
  const statusCounts = enquiries.reduce((acc, enquiry) => {
    const status = enquiry.status || "new";
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Filter enquiries based on selected status
  const filteredEnquiries = selectedStatus === "all" 
    ? enquiries 
    : enquiries.filter(e => e.status === selectedStatus);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    try {
      await updateEnquiry.mutateAsync({
        id: enquiryId,
        status: newStatus,
      });
      
      // Update selected enquiry if it's the one being modified
      if (selectedEnquiry && selectedEnquiry.id === enquiryId) {
        setSelectedEnquiry({
          ...selectedEnquiry,
          status: newStatus,
        });
      }
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleCommentSubmit = async () => {
    if (!selectedEnquiry || !comment.trim()) return;
    
    try {
      await updateEnquiry.mutateAsync({
        id: selectedEnquiry.id,
        admin_comment: comment.trim(),
      });
      
      // Update local state
      setSelectedEnquiry({
        ...selectedEnquiry,
        admin_comment: comment.trim(),
      });
      
      // Clear comment input
      setComment("");
      
      // Show success message
      toast.success("Comment saved successfully");
    } catch (error) {
      console.error("Failed to save comment:", error);
      toast.error("Failed to save comment");
    }
  };

  return (
    <div className="space-y-8">
      {/* Status Overview */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Status Overview</h3>
          <p className="text-sm text-gray-500 mt-1">Click on a status to filter enquiries</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div
            key="all"
            className={cn(
              "p-4 rounded-lg flex flex-col gap-2 bg-white border border-gray-200",
              "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
              selectedStatus === "all" && "ring-2 ring-offset-2 ring-gray-400",
            )}
            onClick={() => setSelectedStatus("all")}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">All</span>
              <Badge variant="secondary" className="bg-gray-100 text-gray-900">
                {enquiries.length}
              </Badge>
            </div>
          </div>
          {Object.entries(statusColors).map(([status, colors]) => (
            <div
              key={status}
              className={cn(
                "p-4 rounded-lg flex flex-col gap-2",
                colors.bg,
                "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
                selectedStatus === status && "ring-2 ring-offset-2",
              )}
              onClick={() => setSelectedStatus(status as EnquiryStatus)}
            >
              <div className="flex items-center justify-between">
                <span className={cn("text-sm font-medium", colors.text)}>
                  {colors.label}
                </span>
                <Badge variant="secondary" className={cn(colors.bg, colors.text)}>
                  {statusCounts[status] || 0}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEnquiries.map((enquiry) => (
          <EnquiryCard
            key={enquiry.id}
            enquiry={enquiry}
            onClick={() => setSelectedEnquiry(enquiry)}
            onStatusChange={(status) => handleStatusChange(enquiry.id, status)}
          />
        ))}
        {filteredEnquiries.length === 0 && (
          <div className="col-span-full text-center py-8 text-gray-500">
            No enquiries found
          </div>
        )}
      </div>

      {/* Enquiry Dialog */}
      <Dialog open={!!selectedEnquiry} onOpenChange={() => {
        setSelectedEnquiry(null);
        setComment(""); // Clear comment when closing dialog
      }}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
          </DialogHeader>
          {selectedEnquiry && (
            <div className="space-y-4">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h3 className="font-semibold">{selectedEnquiry.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="w-4 h-4" />
                    {new Date(selectedEnquiry.created_at).toLocaleDateString()}
                  </div>
                </div>
                <Select
                  value={selectedEnquiry.status || "new"}
                  onValueChange={(status: EnquiryStatus) => handleStatusChange(selectedEnquiry.id, status)}
                >
                  <SelectTrigger
                    className={cn(
                      "w-[140px]",
                      statusColors[selectedEnquiry.status as EnquiryStatus || "new"].bg,
                      statusColors[selectedEnquiry.status as EnquiryStatus || "new"].text
                    )}
                  >
                    <SelectValue placeholder="Set status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg border rounded-lg">
                    {Object.entries(statusColors).map(([statusKey, colors]) => (
                      <SelectItem 
                        key={statusKey} 
                        value={statusKey}
                        className={cn(
                          "cursor-pointer hover:bg-gray-50",
                          selectedEnquiry.status === statusKey && colors.bg
                        )}
                      >
                        <div className="flex items-center gap-2">
                          <div className={cn("w-2 h-2 rounded-full", colors.bg)} />
                          {colors.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedEnquiry.message}</p>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Add Comment</label>
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add your comment here..."
                  className="min-h-[100px]"
                />
                <Button 
                  onClick={handleCommentSubmit} 
                  disabled={!comment.trim()}
                  className="w-full"
                >
                  Save Comment
                </Button>
              </div>
              {selectedEnquiry.admin_comment && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <MessageSquare className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium">Previous Comment</span>
                  </div>
                  <p className="text-sm text-gray-600 whitespace-pre-wrap">
                    {selectedEnquiry.admin_comment}
                  </p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Enquiry Card Component
const EnquiryCard = ({ 
  enquiry, 
  onClick, 
  onStatusChange 
}: { 
  enquiry: Enquiry; 
  onClick: () => void; 
  onStatusChange: (status: EnquiryStatus) => void;
}) => {
  const status = enquiry.status as EnquiryStatus || "new";
  const statusColor = statusColors[status] || statusColors.new;

  const handleStatusClick = (e: React.MouseEvent, newStatus: EnquiryStatus) => {
    e.stopPropagation();
    onStatusChange(newStatus);
  };

  return (
    <div
      className={cn(
        "bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer",
        "border-l-4",
        statusColor.border
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start gap-4">
        <div className="min-w-0">
          <h3 className="font-semibold text-base truncate">{enquiry.name}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <Calendar className="w-3 h-3" />
            {new Date(enquiry.created_at).toLocaleDateString()}
          </div>
        </div>
        <Select
          value={status}
          onValueChange={(newStatus: EnquiryStatus) => handleStatusClick(event as any, newStatus)}
          onClick={(e) => e.stopPropagation()}
        >
          <SelectTrigger
            className={cn(
              "w-[120px]",
              statusColor.bg,
              statusColor.text
            )}
          >
            <SelectValue placeholder="Set status" />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg border rounded-lg">
            {Object.entries(statusColors).map(([statusKey, colors]) => (
              <SelectItem 
                key={statusKey} 
                value={statusKey}
                className={cn(
                  "cursor-pointer hover:bg-gray-50",
                  status === statusKey && colors.bg
                )}
              >
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", colors.bg)} />
                  {colors.label}
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2 mt-3">
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <Mail className="w-3 h-3" />
          <span className="truncate">{enquiry.email}</span>
        </div>
        {enquiry.phone && (
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Phone className="w-3 h-3" />
            <span className="truncate">{enquiry.phone}</span>
          </div>
        )}
        <div className="mt-2">
          <p className="text-sm text-gray-600 line-clamp-2">{enquiry.message}</p>
        </div>
        {enquiry.admin_comment && (
          <div className="mt-2 p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-1 mb-1">
              <MessageSquare className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-medium">Admin Comment</span>
            </div>
            <p className="text-xs text-gray-600 line-clamp-2">{enquiry.admin_comment}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EnquiryReview;
