import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { ContactMessage, EnquiryStatus } from "@/integrations/supabase/types";

export default function ContactMessages() {
  const queryClient = useQueryClient();
  const [editingComment, setEditingComment] = useState<{ id: string; comment: string } | null>(null);

  const { data: messages = [], isLoading } = useQuery<ContactMessage[]>({
    queryKey: ["contact-messages"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_messages")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const updateEnquiry = useMutation({
    mutationFn: async ({ id, status, comment }: { id: string; status?: EnquiryStatus; comment?: string }) => {
      const updateData: Partial<ContactMessage> = {};
      if (status) updateData.status = status;
      if (comment !== undefined) updateData.admin_comment = comment;

      const { error } = await supabase
        .from("contact_messages")
        .update(updateData)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact-messages"] });
      setEditingComment(null);
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
            className="bg-white p-8 rounded-xl shadow-md border-l-4 border-blue-400 hover:shadow-lg transition-shadow h-full flex flex-col"
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
                  defaultValue={message.status}
                  onValueChange={(value: EnquiryStatus) => updateEnquiry.mutate({ id: message.id, status: value })}
                >
                  <SelectTrigger className="w-[130px] bg-white shadow-lg border-gray-200 hover:bg-gray-50 transition-all duration-200">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-white shadow-xl border border-gray-100">
                    <SelectItem value="pending" className="hover:bg-yellow-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-yellow-400" />
                        Pending
                      </span>
                    </SelectItem>
                    <SelectItem value="contacted" className="hover:bg-blue-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        Contacted
                      </span>
                    </SelectItem>
                    <SelectItem value="resolved" className="hover:bg-green-50">
                      <span className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-400" />
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
}