import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactMessages from "@/components/admin/ContactMessages";
import TestimonialReview from "@/components/admin/TestimonialReview";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, MessageSquare, Star, AlertCircle } from "lucide-react";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("enquiries");

  // Fetch statistics
  const { data: stats, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const [enquiriesStats, testimonialsStats] = await Promise.all([
        supabase
          .from("enquiries")
          .select("status", { count: "exact" })
          .in("status", ["new", "in-progress", "completed", "cancelled"]),
        supabase
          .from("testimonials")
          .select("status", { count: "exact" })
          .in("status", ["new", "approved", "rejected"]),
      ]);

      if (enquiriesStats.error) throw enquiriesStats.error;
      if (testimonialsStats.error) throw testimonialsStats.error;

      const enquiriesByStatus = enquiriesStats.data.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const testimonialsByStatus = testimonialsStats.data.reduce((acc, curr) => {
        acc[curr.status] = (acc[curr.status] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      return {
        enquiries: enquiriesByStatus,
        testimonials: testimonialsByStatus,
        totalEnquiries: enquiriesStats.count || 0,
        totalTestimonials: testimonialsStats.count || 0,
      };
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              New Enquiries
            </CardTitle>
            <MessageSquare className="w-4 h-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.enquiries.new || 0}</div>
            <p className="text-xs text-gray-500">
              Awaiting response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              In Progress
            </CardTitle>
            <Loader2 className="w-4 h-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.enquiries.in_progress || 0}
            </div>
            <p className="text-xs text-gray-500">
              Currently being handled
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              New Testimonials
            </CardTitle>
            <Star className="w-4 h-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats?.testimonials.new || 0}
            </div>
            <p className="text-xs text-gray-500">
              Pending review
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">
              Total Active
            </CardTitle>
            <AlertCircle className="w-4 h-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {(stats?.enquiries.in_progress || 0) + (stats?.enquiries.new || 0)}
            </div>
            <p className="text-xs text-gray-500">
              Active enquiries
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs for Enquiries and Testimonials */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="enquiries">
            Enquiries
          </TabsTrigger>
          <TabsTrigger value="testimonials">
            Testimonials
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enquiries" className="space-y-4">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Recent Enquiries</h2>
              <ContactMessages />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="testimonials" className="space-y-4">
          <div className="bg-white rounded-lg shadow">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-4">Testimonials Review</h2>
              <TestimonialReview />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
