import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, Phone, Mail } from "lucide-react";

type ContactSubmission = {
  id: string;
  name: string;
  phone: string;
  message: string;
  created_at: string;
};

const ContactMessages = () => {
  const { data: messages = [], isLoading } = useQuery<ContactSubmission[]>({
    queryKey: ["contact-submissions"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
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

  return (
    <div className="grid gap-6">
      {messages.map((message) => (
        <Card key={message.id}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>{message.name}</span>
              <span className="text-sm text-gray-500">
                {new Date(message.created_at).toLocaleDateString()}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>{message.phone}</span>
              </div>
              <p className="text-gray-700 whitespace-pre-wrap">
                {message.message}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ContactMessages;