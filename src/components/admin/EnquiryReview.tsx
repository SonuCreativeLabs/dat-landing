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

// Types
export type EnquiryStatus = 'new' | 'in_progress' | 'contacted' | 'scheduled' | 'completed' | 'cancelled' | 'resolved';

export interface Enquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: EnquiryStatus;
  admin_comment?: string;
}

// Status colors and labels
export const statusColors = {
  new: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500', label: 'New' },
  in_progress: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500', label: 'In Progress' },
  contacted: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500', label: 'Contacted' },
  scheduled: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-500', label: 'Scheduled' },
  completed: { bg: 'bg-emerald-100', text: 'text-emerald-700', border: 'border-emerald-500', label: 'Completed' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500', label: 'Cancelled' },
  resolved: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-500', label: 'Resolved' }
};

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
  onStatusChange 
}: { 
  enquiry: Enquiry; 
  onClick: () => void; 
  onStatusChange: (status: EnquiryStatus) => void;
}) => {
  const currentStatus = getValidStatus(enquiry.status);
  const statusColor = statusColors[currentStatus];

  const handleStatusSelect = (newStatus: string) => {
    console.log("Status selected in card:", { 
      oldStatus: currentStatus, 
      newStatus,
      enquiryId: enquiry.id 
    });
    // Stop the click event from bubbling up to prevent dialog from opening
    onStatusChange(newStatus as EnquiryStatus);
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
          value={currentStatus}
          onValueChange={handleStatusSelect}
        >
          <SelectTrigger
            className={cn(
              "w-[120px]",
              statusColor.bg,
              statusColor.text
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <SelectValue>
              {statusColor.label}
            </SelectValue>
          </SelectTrigger>
          <SelectContent 
            className="bg-white shadow-lg border rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {Object.entries(statusColors).map(([statusKey, colors]) => (
              <SelectItem 
                key={statusKey} 
                value={statusKey}
                className={cn(
                  "cursor-pointer hover:bg-gray-50",
                  currentStatus === statusKey && colors.bg
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

const EnquiryReview = () => {
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | null>(null);
  
  const queryClient = useQueryClient();

  // Update enquiry mutation
  const updateEnquiry = useMutation({
    mutationFn: async ({ id, status, admin_comment }: { id: string; status?: EnquiryStatus; admin_comment?: string }) => {
      console.log("Starting update for enquiry:", { id, status, admin_comment });

      // Prepare minimal update data
      const updateData = {
        ...(status !== undefined ? { status } : {}),
        ...(admin_comment !== undefined ? { admin_comment } : {})
      };

      console.log("Sending update:", updateData);

      // Perform the update
      const { data: updated, error: updateError } = await supabase
        .from('enquiries')
        .update(updateData)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error("Update error:", updateError);
        throw new Error(updateError.message);
      }

      if (!updated) {
        throw new Error('Failed to update record');
      }

      console.log("Successfully updated enquiry:", updated);
      return updated as Enquiry;
    },
    onSuccess: (updatedEnquiry) => {
      console.log("Update successful:", updatedEnquiry);
      
      // Invalidate and refetch the enquiries query
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });

      // Show success message
      toast.success(`Status updated to ${statusColors[updatedEnquiry.status].label}`);
    },
    onError: (error: any) => {
      console.error("Mutation error:", error);
      toast.error(error.message || "Failed to update status");
    },
  });

  // Handle status change
  const handleStatusChange = async (enquiryId: string, newStatus: EnquiryStatus) => {
    console.log("Status change requested:", { enquiryId, newStatus });
    try {
      await updateEnquiry.mutateAsync({
        id: enquiryId,
        status: newStatus,
      });
    } catch (error) {
      console.error("Status update failed:", error);
    }
  };

  // Fetch enquiries
  const { data: enquiries = [], isLoading } = useQuery({
    queryKey: ['enquiries'],
    queryFn: async () => {
      console.log("Fetching enquiries...");
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error("Error fetching enquiries:", error);
        throw error;
      }

      console.log("Fetched enquiries:", data);
      return data as Enquiry[];
    },
    // Enable refetching on window focus and interval
    refetchOnWindowFocus: true,
    refetchInterval: 30000, // Refetch every 30 seconds
  });

  // Ensure UI reflects the latest status
  useEffect(() => {
    if (selectedEnquiry) {
      setSelectedEnquiry(enquiries.find(e => e.id === selectedEnquiry.id) || null);
    }
  }, [enquiries]);

  // Handle comment submit
  const handleCommentSubmit = async () => {
    if (!selectedEnquiry || !comment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const updatedEnquiry = await updateEnquiry.mutateAsync({
        id: selectedEnquiry.id,
        admin_comment: comment.trim(),
      });
      
      // Update local state
      setSelectedEnquiry(updatedEnquiry);
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
      {/* Status Overview */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Status Overview</h2>
        <div className="grid grid-cols-4 gap-4">
          {/* All Status */}
          <div
            className={cn(
              "p-4 rounded-lg flex flex-col gap-2 bg-white border border-gray-200",
              "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
              selectedStatus === null && "ring-2 ring-offset-2 ring-gray-400"
            )}
            onClick={() => setSelectedStatus(null)}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">All</span>
              <Badge variant="secondary">{statusCounts.all}</Badge>
            </div>
          </div>

          {/* Status Filters */}
          {Object.entries(statusColors).map(([status, colors]) => (
            <div
              key={status}
              className={cn(
                "p-4 rounded-lg flex flex-col gap-2",
                "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
                colors.bg,
                selectedStatus === status && "ring-2 ring-offset-2",
                selectedStatus === status && colors.border
              )}
              onClick={() => setSelectedStatus(status as EnquiryStatus)}
            >
              <div className="flex items-center justify-between">
                <span className={cn("text-sm font-medium", colors.text)}>
                  {colors.label}
                </span>
                <Badge
                  variant="secondary"
                  className={cn(
                    "bg-white",
                    selectedStatus === status ? colors.text : "text-gray-600"
                  )}
                >
                  {statusCounts[status as EnquiryStatus] || 0}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enquiry List */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Enquiries</h2>
        {isLoading ? (
          <div className="text-center py-8">
            <Loader2 className="w-6 h-6 animate-spin mx-auto" />
            <p className="text-sm text-gray-500 mt-2">Loading enquiries...</p>
          </div>
        ) : filteredEnquiries.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">No enquiries found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {filteredEnquiries.map((enquiry) => (
              <EnquiryCard
                key={enquiry.id}
                enquiry={enquiry}
                onClick={() => setSelectedEnquiry(enquiry)}
                onStatusChange={(status) => handleStatusChange(enquiry.id, status)}
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
                    handleStatusChange(selectedEnquiry.id, status);
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
