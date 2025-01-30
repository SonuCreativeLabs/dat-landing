import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Enquiry, EnquiryStatus } from "@/integrations/supabase/types";
import { cn } from "@/lib/utils";
import { toast } from "react-hot-toast";

interface ContactMessagesProps {
  archived?: boolean;
}

const ContactMessages = ({ archived = false }: ContactMessagesProps) => {
  const queryClient = useQueryClient();
  const [editingComment, setEditingComment] = useState<{ id: string; comment: string } | null>(null);

  const { data: messages = [], isLoading } = useQuery<Enquiry[]>({
    queryKey: ["contact-messages", archived],
    queryFn: async () => {
      console.log("Fetching messages with archived:", archived);
      const { data, error } = await supabase
        .from("enquiries")
        .select("*")
        .eq("archived", archived)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching messages:", error);
        throw error;
      }
      console.log("Fetched messages:", data);
      return data;
    },
  });

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
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      setEditingComment(null);
    },
  });

  const archiveEnquiry = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("enquiries")
        .update({ archived: true })
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      toast.success("Enquiry archived successfully");
    },
  });

  const handleCommentSave = (id: string) => {
    if (!editingComment) return;
    updateEnquiry.mutate({ id, comment: editingComment.comment });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {messages.map((message) => (
          <div
            key={message.id}
            className={cn(
              "bg-white p-8 rounded-xl shadow-md border-l-4 hover:shadow-lg transition-shadow h-full flex flex-col",
              message.status === "new" && "border-blue-400",
              message.status === "pending" && "border-yellow-400",
              message.status === "in_progress" && "border-purple-400",
              message.status === "contacted" && "border-indigo-400",
              message.status === "scheduled" && "border-cyan-400",
              message.status === "completed" && "border-green-400",
              message.status === "cancelled" && "border-red-400",
              message.status === "resolved" && "border-emerald-400"
            )}
          >
            <div className="flex justify-between items-start gap-8">
              <div className="flex items-start gap-4 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-semibold text-blue-600">
                    {message.name.charAt(0)}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900 mb-2">
                    {message.name}
                  </h3>
                  <div className="flex flex-col gap-1 text-sm text-gray-500">
                    <span>{message.phone}</span>
                    <span>{message.email}</span>
                    <span className="mt-1">{message.service_type.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}</span>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 pt-1">
                <Select
                  defaultValue={message.status || "new"}
                  onValueChange={(value: EnquiryStatus) => updateEnquiry.mutate({ id: message.id, status: value })}
                >
                  <SelectTrigger className={cn(
                    "w-[130px] shadow-lg border-gray-200 hover:bg-gray-50 transition-all duration-200",
                    message.status === "new" && "bg-blue-50 border-blue-200",
                    message.status === "pending" && "bg-yellow-50 border-yellow-200",
                    message.status === "in_progress" && "bg-purple-50 border-purple-200",
                    message.status === "contacted" && "bg-indigo-50 border-indigo-200",
                    message.status === "scheduled" && "bg-cyan-50 border-cyan-200",
                    message.status === "completed" && "bg-green-50 border-green-200",
                    message.status === "cancelled" && "bg-red-50 border-red-200",
                    message.status === "resolved" && "bg-emerald-50 border-emerald-200",
                  )}>
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-xl border border-gray-100">
                    <SelectItem value="new" className="hover:bg-blue-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        New
                      </span>
                    </SelectItem>
                    <SelectItem value="pending" className="hover:bg-yellow-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        Pending
                      </span>
                    </SelectItem>
                    <SelectItem value="in_progress" className="hover:bg-purple-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                        In Progress
                      </span>
                    </SelectItem>
                    <SelectItem value="contacted" className="hover:bg-indigo-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-400" />
                        Contacted
                      </span>
                    </SelectItem>
                    <SelectItem value="scheduled" className="hover:bg-cyan-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        Scheduled
                      </span>
                    </SelectItem>
                    <SelectItem value="completed" className="hover:bg-green-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
                        Completed
                      </span>
                    </SelectItem>
                    <SelectItem value="cancelled" className="hover:bg-red-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />
                        Cancelled
                      </span>
                    </SelectItem>
                    <SelectItem value="resolved" className="hover:bg-emerald-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        Resolved
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="mt-6 flex-1 flex flex-col">
              <p className="text-gray-600 text-base leading-relaxed flex-1">
                {message.message}
              </p>
              <div className="flex flex-col gap-4 pt-4 border-t border-gray-100 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-500">
                    {new Date(message.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <div className="space-y-3">
                  {editingComment?.id === message.id ? (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Add your comment here..."
                        value={editingComment.comment}
                        onChange={(e) => setEditingComment({ id: message.id, comment: e.target.value })}
                        className="min-h-[80px] text-sm"
                      />
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingComment(null)}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleCommentSave(message.id)}
                        >
                          Save
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      {message.admin_comment ? (
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <p className="text-sm text-gray-600">{message.admin_comment}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2"
                            onClick={() => setEditingComment({ id: message.id, comment: message.admin_comment || '' })}
                          >
                            Edit Comment
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingComment({ id: message.id, comment: '' })}
                        >
                          Add Comment
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {messages.length === 0 && (
        <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
          No enquiries yet
        </div>
      )}
    </div>
  );
};

export default ContactMessages;