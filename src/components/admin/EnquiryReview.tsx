import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MessageSquare, Loader2, Calendar, Phone, Mail, X, Filter, Archive } from "lucide-react";
import { toast } from "sonner";
import type { Database, EnquiryStatus, Enquiry } from "@/integrations/supabase/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
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
import { useState, useMemo, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Status colors and labels
const statusColors = {
  new: { bg: "bg-blue-100", text: "text-blue-800", border: "border-blue-300", label: "New" },
  pending: { bg: "bg-yellow-100", text: "text-yellow-800", border: "border-yellow-300", label: "Pending" },
  in_progress: { bg: "bg-purple-100", text: "text-purple-800", border: "border-purple-300", label: "In Progress" },
  contacted: { bg: "bg-indigo-100", text: "text-indigo-800", border: "border-indigo-300", label: "Contacted" },
  scheduled: { bg: "bg-cyan-100", text: "text-cyan-800", border: "border-cyan-300", label: "Scheduled" },
  completed: { bg: "bg-green-100", text: "text-green-800", border: "border-green-300", label: "Completed" },
  cancelled: { bg: "bg-red-100", text: "text-red-800", border: "border-red-300", label: "Cancelled" },
  resolved: { bg: "bg-gray-100", text: "text-gray-800", border: "border-gray-300", label: "Resolved" }
} as const;

// Get valid status
const getValidStatus = (status: string | null | undefined): EnquiryStatus => {
  if (!status || !Object.keys(statusColors).includes(status)) {
    return 'new';
  }
  return status as EnquiryStatus;
};

// EnquiryCard Component
const EnquiryCard = ({ 
  enquiry, 
  onClick, 
  onStatusChange,
  onArchive,
  onUnarchive,
  archived
}: { 
  enquiry: Enquiry; 
  onClick: () => void; 
  onStatusChange: (status: EnquiryStatus) => void;
  onArchive: (id: string) => void;
  onUnarchive: (id: string) => void;
  archived: boolean;
}) => {
  const currentStatus = getValidStatus(enquiry.status);
  const statusColor = statusColors[currentStatus];

  return (
    <div
      className={cn(
        "bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer",
        "border-l-4",
        statusColor.border
      )}
      onClick={onClick}
    >
      <div className="flex justify-between items-start gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-medium text-sm truncate">{enquiry.name}</h3>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
            <Calendar className="w-3 h-3" />
            {new Date(enquiry.created_at).toLocaleDateString()}
          </div>
          <div className="mt-2 space-y-1">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Mail className="w-3 h-3" />
              <span className="truncate">{enquiry.email}</span>
            </div>
            {enquiry.phone && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Phone className="w-3 h-3" />
                <span>{enquiry.phone}</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          {archived ? (
            <Button
              variant="outline"
              size="sm"
              className="h-8"
              onClick={(e) => {
                e.stopPropagation();
                onUnarchive(enquiry.id);
              }}
              title="Restore"
            >
              Restore
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 hover:bg-gray-100"
              onClick={(e) => {
                e.stopPropagation();
                onArchive(enquiry.id);
              }}
              title="Archive"
            >
              <Archive className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </Button>
          )}
          <Select
            value={currentStatus}
            onValueChange={(status) => onStatusChange(status as EnquiryStatus)}
          >
            <SelectTrigger
              className={cn(
                "w-[110px] h-8 text-xs",
                statusColor.bg,
                statusColor.text,
                "border-2",
                statusColor.border
              )}
              onClick={(e) => e.stopPropagation()}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent 
              className="bg-white shadow-lg border rounded-lg z-50"
              onClick={(e) => e.stopPropagation()}
            >
              {Object.entries(statusColors).map(([statusKey, colors]) => (
                <SelectItem 
                  key={statusKey} 
                  value={statusKey}
                  className={cn(
                    "cursor-pointer hover:bg-gray-50 text-sm text-gray-900",
                    currentStatus === statusKey && colors.bg
                  )}
                >
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-2 h-2 rounded-full",
                      colors.bg.replace('bg-', 'bg-'),
                      "border-2",
                      colors.border
                    )} />
                    <span className="font-medium">{colors.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-xs text-gray-600 line-clamp-2">{enquiry.message}</p>
      </div>

      {enquiry.admin_comment && (
        <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
          <div className="flex items-center gap-1 mb-1">
            <MessageSquare className="w-3 h-3 text-gray-500" />
            <span className="font-medium">Admin Comment</span>
          </div>
          <p className="text-gray-600 line-clamp-2">{enquiry.admin_comment}</p>
        </div>
      )}
    </div>
  );
};

interface EnquiryReviewProps {
  archived?: boolean;
  selectedStatus?: EnquiryStatus | null;
}

const EnquiryReview = ({ archived = false, selectedStatus = null }: EnquiryReviewProps) => {
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const queryClient = useQueryClient();

  // Update enquiry mutation
  const updateEnquiry = useMutation({
    mutationFn: async ({ id, status, comment }: { id: string; status?: EnquiryStatus; comment?: string }) => {
      const updateData: Partial<Enquiry> = {};
      if (status) updateData.status = status;
      if (comment !== undefined) updateData.admin_comment = comment;

      const { error } = await supabase
        .from("enquiries")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      setIsSubmitting(false);
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      toast.error(error.message || "Failed to update status");
    },
  });

  // Archive enquiry mutation
  const archiveEnquiry = useMutation({
    mutationFn: async (id: string) => {
      console.log("Archiving enquiry:", id);
      const { error } = await supabase
        .from("enquiries")
        .update({ 
          archived: true,
          status: 'cancelled' 
        })
        .eq("id", id);

      if (error) {
        console.error("Archive error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate both active and archived queries
      queryClient.invalidateQueries({ queryKey: ["enquiries", false] });
      queryClient.invalidateQueries({ queryKey: ["enquiries", true] });
      toast.success("Enquiry moved to archive");
    },
    onError: (error) => {
      console.error("Archive failed:", error);
      toast.error("Failed to archive: " + error.message);
    }
  });

  // Unarchive enquiry mutation
  const unarchiveEnquiry = useMutation({
    mutationFn: async (id: string) => {
      console.log("Unarchiving enquiry:", id);
      const { error } = await supabase
        .from("enquiries")
        .update({ 
          archived: false,
          status: 'new' 
        })
        .eq("id", id);

      if (error) {
        console.error("Unarchive error:", error);
        throw error;
      }
    },
    onSuccess: () => {
      // Invalidate both active and archived queries
      queryClient.invalidateQueries({ queryKey: ["enquiries", false] });
      queryClient.invalidateQueries({ queryKey: ["enquiries", true] });
      toast.success("Enquiry restored from archive");
    },
    onError: (error) => {
      console.error("Unarchive failed:", error);
      toast.error("Failed to restore: " + error.message);
    }
  });

  // Fetch enquiries
  const { data: enquiries = [], isLoading } = useQuery<Enquiry[]>({
    queryKey: ["enquiries", archived, selectedStatus],
    queryFn: async () => {
      console.log("Fetching enquiries with archived =", archived, "status =", selectedStatus);
      let query = supabase
        .from("enquiries")
        .select("*")
        .eq("archived", archived)
        .order("created_at", { ascending: false });

      if (selectedStatus) {
        query = query.eq("status", selectedStatus);
      }

      const { data, error } = await query;

      if (error) throw error;
      console.log("Fetched enquiries:", data);
      return data;
    },
  });

  // Ensure UI reflects the latest status
  useEffect(() => {
    if (selectedEnquiry) {
      const updatedEnquiry = enquiries.find(e => e.id === selectedEnquiry.id);
      if (updatedEnquiry) {
        setSelectedEnquiry({
          ...updatedEnquiry,
          status: updatedEnquiry.status as EnquiryStatus,
        });
      } else {
        setSelectedEnquiry(null);
      }
    }
  }, [enquiries]);

  // Handle comment submit
  const handleCommentSubmit = async () => {
    if (!selectedEnquiry || !comment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      await updateEnquiry.mutateAsync({
        id: selectedEnquiry.id,
        status: selectedStatus,
        comment: comment.trim(),
      });
      
      // Update local state
      setComment("");
      toast.success("Comment saved successfully");
    } catch (error) {
      console.error("Failed to save comment:", error);
      toast.error("Failed to save comment");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Filter enquiries by status
  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(enquiry => 
      !selectedStatus || enquiry.status === selectedStatus
    );
  }, [enquiries, selectedStatus]);

  // Calculate status counts
  const statusCounts = useMemo(() => {
    const counts = enquiries.reduce((acc, enquiry) => {
      const status = getValidStatus(enquiry.status);
      acc[status] = (acc[status] || 0) + 1;
      return acc;
    }, {} as Record<EnquiryStatus, number>);

    return {
      all: enquiries.length,
      ...counts
    };
  }, [enquiries]);

  return (
    <div className="space-y-8">
      {/* Enquiry List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">
          {archived ? "Archived Enquiries" : "Active Enquiries"}
        </h2>
        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            <p className="text-sm text-gray-500 mt-2">
              Loading {archived ? "archived" : "active"} enquiries...
            </p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">
              No {archived ? "archived" : "active"} enquiries found
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEnquiries.map((enquiry) => (
              <EnquiryCard
                key={enquiry.id}
                enquiry={enquiry}
                onClick={() => setSelectedEnquiry(enquiry)}
                onStatusChange={(status) => updateEnquiry.mutate({ id: enquiry.id, status })}
                onArchive={(id) => archiveEnquiry.mutate(id)}
                onUnarchive={(id) => unarchiveEnquiry.mutate(id)}
                archived={archived}
              />
            ))}
          </div>
        )}
      </div>

      {/* Enquiry Dialog */}
      <Dialog 
        open={!!selectedEnquiry} 
        onOpenChange={(open) => {
          if (!open) {
            setSelectedEnquiry(null);
            setComment("");
          }
        }}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Enquiry Details</DialogTitle>
            <DialogDescription>
              View and manage enquiry details
            </DialogDescription>
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
                  value={getValidStatus(selectedEnquiry.status)}
                  onValueChange={(status: EnquiryStatus) => {
                    console.log("Dialog status change:", { 
                      oldStatus: selectedEnquiry.status,
                      newStatus: status,
                      enquiryId: selectedEnquiry.id 
                    });
                    updateEnquiry.mutate({ id: selectedEnquiry.id, status });
                  }}
                >
                  <SelectTrigger
                    className={cn(
                      "w-[140px]",
                      statusColors[selectedEnquiry.status].bg,
                      statusColors[selectedEnquiry.status].text
                    )}
                  >
                    <SelectValue>
                      {statusColors[selectedEnquiry.status].label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-lg border rounded-lg z-50">
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

              {/* Contact Information */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Mail className="w-4 h-4" />
                  <span>{selectedEnquiry.email}</span>
                </div>
                {selectedEnquiry.phone && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Phone className="w-4 h-4" />
                    <span>{selectedEnquiry.phone}</span>
                  </div>
                )}
              </div>

              {/* Message */}
              <div>
                <h4 className="text-sm font-medium mb-2">Message</h4>
                <p className="text-gray-600 whitespace-pre-wrap">{selectedEnquiry.message}</p>
              </div>

              {/* Comment Section */}
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
                  disabled={!comment.trim() || isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    'Save Comment'
                  )}
                </Button>
              </div>

              {/* Previous Comment */}
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

export default EnquiryReview;
