import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import TestimonialReview from "@/components/admin/TestimonialReview";
import ContactMessages from "@/components/admin/ContactMessages";

const Admin = () => {
  const navigate = useNavigate();

  // Check if user is admin
  const { data: profile, isLoading: isCheckingAdmin } = useQuery({
    queryKey: ["admin-profile"],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate("/login");
        return null;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (!profile?.is_admin) {
        navigate("/");
        return null;
      }

      return profile;
    },
  });

  if (isCheckingAdmin) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (!profile?.is_admin) {
    return null;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <Tabs defaultValue="testimonials" className="space-y-4">
        <TabsList>
          <TabsTrigger value="testimonials">Testimonials</TabsTrigger>
          <TabsTrigger value="messages">Contact Messages</TabsTrigger>
        </TabsList>
        
        <TabsContent value="testimonials">
          <TestimonialReview />
        </TabsContent>
        
        <TabsContent value="messages">
          <ContactMessages />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Admin;