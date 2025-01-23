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
import { Loader2, Phone, Mail, MapPin, MessageSquare, Calendar } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type Enquiry = Tables["enquiries"]["Row"];

const statusColors = {
  new: "bg-blue-100 text-blue-800",
  "in-progress": "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800"
} as const;

type Status = keyof typeof statusColors;

const ContactMessages = () => {
  const queryClient = useQueryClient();
  const [expandedMessage, setExpandedMessage] = useState<string | null>(null);

  const { data: messages = [], isLoading } = useQuery<Enquiry[]>({
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

  const updateEnquiry = useMutation({
    mutationFn: async ({ id, status, comment }: { id: string, status?: Status, comment?: string }) => {
      const updates: Partial<Enquiry> = {};
      if (status) updates.status = status;
      if (comment !== undefined) updates.admin_comment = comment;

      const { error } = await supabase
        .from("enquiries")
        .update(updates)
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
      toast.success("Enquiry updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update enquiry: " + error.message);
    }
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No contact messages found
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
      {messages.map((message) => (
        <Card key={message.id} className="overflow-hidden">
          <CardHeader className="bg-gray-50">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <span className="font-semibold">{message.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${statusColors[message.status as Status]}`}>
                  {message.status}
                </span>
              </CardTitle>
              <span className="text-sm text-gray-500 flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(message.created_at)}
              </span>
            </div>
          </CardHeader>
          
          <CardContent className="p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
                  {message.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <a href={`tel:${message.phone}`} className="text-blue-600 hover:underline">
                  {message.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-500" />
              <span>{message.location}</span>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Service Required</div>
              <div className="bg-gray-50 p-3 rounded-md">{message.service_type}</div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Message</div>
              <div className="bg-gray-50 p-3 rounded-md whitespace-pre-wrap">
                {message.message}
              </div>
            </div>

            <div className="space-y-2">
              <div className="font-medium">Admin Comment</div>
              <Textarea
                placeholder="Add your comment here..."
                defaultValue={message.admin_comment || ""}
                className="min-h-[100px]"
                onChange={(e) => {
                  const newComment = e.target.value;
                  updateEnquiry.mutate({ id: message.id, comment: newComment });
                }}
              />
            </div>
          </CardContent>

          <CardFooter className="bg-gray-50 p-4">
            <div className="flex items-center justify-between w-full">
              <Select
                defaultValue={message.status}
                onValueChange={(value) => {
                  updateEnquiry.mutate({ 
                    id: message.id, 
                    status: value as Status 
                  });
                }}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Update status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select
                defaultValue={message.status || 'pending'}
                onValueChange={(value: 'pending' | 'contacted' | 'resolved') => updateEnquiry.mutate({ id: message.id, status: value })}
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
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default ContactMessages;