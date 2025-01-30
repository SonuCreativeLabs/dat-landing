import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ContactMessages from "@/components/admin/ContactMessages";
import TestimonialReview from "@/components/admin/TestimonialReview";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, MessageSquare, Star, AlertCircle, Archive, 
  Filter, TrendingUp, Users, Calendar, ArrowUp, ArrowDown,
  Clock, Activity, UserCheck, Target, Plus, DollarSign, ChevronLeft, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar 
} from 'recharts';
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { LucideIcon } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// Add session to props
interface DashboardProps {
  session?: any;
}

interface Stats {
  enquiries: Record<string, number>;
  testimonials: Record<string, number>;
  totalEnquiries: number;
  totalTestimonials: number;
  timeline: TimelineData[];
  activeEnquiries: number;
  conversionRate: number;
  weeklyGrowth: number;
  averageResponse: number;
}

interface TimelineData {
  name: string;
  enquiries: number;
  testimonials: number;
}

const Dashboard = ({ session }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("enquiries");
  const [archiveTab, setArchiveTab] = useState("enquiries");
  const [activePage, setActivePage] = useState('dashboard');

  const queryClient = useQueryClient();

  // Enhanced statistics query
  const { data: stats, isLoading, error } = useQuery<Stats>({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      try {
        const [enquiriesStats, testimonialsStats] = await Promise.all([
          supabase
            .from("enquiries")
            .select("*") // Select all fields to get full data
            .order("created_at", { ascending: false }),
          supabase
            .from("testimonials")
            .select("*")
            .order("created_at", { ascending: false }),
        ]);

        if (enquiriesStats.error) throw enquiriesStats.error;
        if (testimonialsStats.error) throw testimonialsStats.error;

        // Process enquiries data
        const enquiriesByStatus = enquiriesStats.data.reduce((acc, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Process testimonials data
        const testimonialsByStatus = testimonialsStats.data.reduce((acc, curr) => {
          acc[curr.status] = (acc[curr.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        // Generate timeline data for the last 7 days
        const timelineData = generateTimelineData(enquiriesStats.data, testimonialsStats.data);

        // Calculate total counts
        const totalEnquiries = enquiriesStats.data.length;
        const totalTestimonials = testimonialsStats.data.length;

        // Calculate other metrics
        const activeEnquiries = enquiriesStats.data.filter(
          e => e.status === 'new' || e.status === 'in_progress'
        ).length;

        const completedEnquiries = enquiriesStats.data.filter(
          e => e.status === 'completed'
        ).length;

        const conversionRate = totalEnquiries > 0 
          ? Math.round((completedEnquiries / totalEnquiries) * 100) 
          : 0;

        return {
          enquiries: enquiriesByStatus,
          testimonials: testimonialsByStatus,
          totalEnquiries,
          totalTestimonials,
          timeline: timelineData,
          activeEnquiries,
          conversionRate,
          weeklyGrowth: calculateWeeklyGrowth(enquiriesStats.data),
          averageResponse: calculateAverageResponseTime(enquiriesStats.data),
        };
      } catch (error) {
        console.error("Error fetching stats:", error);
        throw error;
      }
    },
  });

  // Helper function to generate timeline data
  const generateTimelineData = (enquiries: any[], testimonials: any[]) => {
    const last7Days = Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - i);
      return date.toISOString().split('T')[0];
    }).reverse();

    return last7Days.map(date => {
      const dayEnquiries = enquiries.filter(e => 
        e.created_at.startsWith(date)
      ).length;

      const dayTestimonials = testimonials.filter(t => 
        t.created_at.startsWith(date)
      ).length;

      return {
        name: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
        enquiries: dayEnquiries,
        testimonials: dayTestimonials,
      };
    });
  };

  // Helper function to calculate weekly growth
  const calculateWeeklyGrowth = (enquiries: any[]) => {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const thisWeek = enquiries.filter(e => 
      new Date(e.created_at) > oneWeekAgo
    ).length;

    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);

    const lastWeek = enquiries.filter(e => 
      new Date(e.created_at) > twoWeeksAgo && 
      new Date(e.created_at) <= oneWeekAgo
    ).length;

    if (lastWeek === 0) return 100;
    return Math.round(((thisWeek - lastWeek) / lastWeek) * 100);
  };

  // Helper function to calculate average response time
  const calculateAverageResponseTime = (enquiries: any[]) => {
    const respondedEnquiries = enquiries.filter(e => 
      e.status !== 'new' && e.first_response_at
    );

    if (respondedEnquiries.length === 0) return 0;

    const totalResponseTime = respondedEnquiries.reduce((acc, curr) => {
      const responseTime = new Date(curr.first_response_at).getTime() - 
                          new Date(curr.created_at).getTime();
      return acc + (responseTime / (1000 * 60 * 60)); // Convert to hours
    }, 0);

    return Math.round((totalResponseTime / respondedEnquiries.length) * 10) / 10;
  };

  const hasData = stats && stats.timeline && stats.timeline.length > 0;

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <p className="mt-4 text-gray-600">Error loading dashboard data</p>
          <Button 
            variant="outline" 
            className="mt-4"
            onClick={() => queryClient.invalidateQueries({ queryKey: ["admin-stats"] })}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
          <p className="mt-4 text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-10">
        {/* Header Section */}
        <div className="bg-white shadow-sm rounded-lg mb-8">
          <div className="px-8 py-6">
            <div className="flex justify-between items-center">
              <div className="space-y-1">
                <h2 className="text-3xl font-bold text-gray-900">Dashboard Overview</h2>
                <p className="text-base text-gray-500">
                  Welcome back, {session?.user?.email}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date().toLocaleDateString()}
                </Button>
                <Button variant="default" className="flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  New Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <Card className="transform transition-all duration-200 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 border-none p-6 rounded-xl">
            <CardHeader className="flex flex-row items-center justify-between pb-4 space-y-0">
              <CardTitle className="text-base font-semibold text-blue-900">
                New Enquiries
              </CardTitle>
              <div className="p-3 bg-blue-500/10 rounded-full">
                <MessageSquare className="w-5 h-5 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="text-4xl font-bold text-blue-900">{stats?.enquiries.new || 0}</div>
              <div className="flex items-center">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm font-medium text-green-500">+12%</span>
                <span className="text-sm text-blue-700/70 ml-2">vs last week</span>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">
                In Progress
              </CardTitle>
              <div className="p-2 bg-yellow-50 rounded-full">
                <Loader2 className="w-4 h-4 text-yellow-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.enquiries.in_progress || 0}
              </div>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-600">
                  Currently being handled
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">
                New Testimonials
              </CardTitle>
              <div className="p-2 bg-yellow-50 rounded-full">
                <Star className="w-4 h-4 text-yellow-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stats?.testimonials.pending || 0}
              </div>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-600">
                  Pending review
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">
                Total Active
              </CardTitle>
              <div className="p-2 bg-green-50 rounded-full">
                <AlertCircle className="w-4 h-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {(stats?.enquiries.in_progress || 0) + (stats?.enquiries.new || 0)}
              </div>
              <div className="flex items-center mt-1">
                <p className="text-sm text-gray-600">
                  Active enquiries
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">
                Performance Goal
              </CardTitle>
              <div className="p-2 bg-indigo-50 rounded-full">
                <Target className="w-4 h-4 text-indigo-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">87%</div>
              <div className="flex items-center mt-1">
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '87%' }}></div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">Monthly target: 90%</p>
            </CardContent>
          </Card>

          {/* New Performance Cards */}
          <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-gray-600">
                Conversion Rate
              </CardTitle>
              <div className="p-2 bg-purple-50 rounded-full">
                <TrendingUp className="w-4 h-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats?.conversionRate}%</div>
              <div className="flex items-center mt-1">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">+2.5%</span>
                <span className="text-sm text-gray-600 ml-2">vs last week</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Timeline Chart */}
          <Card className="p-8 rounded-xl">
            <CardHeader className="pb-6">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-semibold text-gray-900">Weekly Activity</CardTitle>
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-600">Enquiries</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium text-gray-600">Testimonials</span>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ResponsiveContainer>
                  <AreaChart data={stats?.timeline}>
                    <defs>
                      <linearGradient id="enquiryGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="testimonialGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fill: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <YAxis 
                      tick={{ fill: '#6B7280' }}
                      axisLine={{ stroke: '#E5E7EB' }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        padding: '12px'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="enquiries" 
                      stroke="#3B82F6" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#enquiryGradient)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="testimonials" 
                      stroke="#10B981" 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill="url(#testimonialGradient)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card className="p-6">
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                {isLoading ? (
                  <div className="h-[300px] flex items-center justify-center">
                    <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
                  </div>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'New', value: stats?.enquiries.new || 0 },
                          { name: 'In Progress', value: stats?.enquiries.in_progress || 0 },
                          { name: 'Completed', value: stats?.enquiries.completed || 0 },
                          { name: 'Cancelled', value: stats?.enquiries.cancelled || 0 },
                        ]}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {COLORS.map((color, index) => (
                          <Cell key={`cell-${index}`} fill={color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        content={({ payload, label }) => {
                          if (payload && payload.length > 0) {
                            return (
                              <div className="bg-white p-2 shadow-lg rounded border">
                                <p className="font-medium">{payload[0].name}</p>
                                <p className="text-sm text-gray-600">Count: {payload[0].value}</p>
                              </div>
                            );
                          }
                          return null;
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                )}
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {['New', 'In Progress', 'Completed', 'Cancelled'].map((status, index) => (
                    <div key={status} className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: COLORS[index] }} 
                      />
                      <span className="text-sm text-gray-600">{status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100">Average Response Time</p>
                  <h3 className="text-3xl font-bold mt-2">{stats?.averageResponse}h</h3>
                  <p className="text-sm text-blue-100 mt-1">-12% from last week</p>
                </div>
                <Clock className="w-8 h-8 text-blue-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100">Weekly Growth</p>
                  <h3 className="text-3xl font-bold mt-2">{stats?.weeklyGrowth}%</h3>
                  <p className="text-sm text-purple-100 mt-1">+5% from last week</p>
                </div>
                <Activity className="w-8 h-8 text-purple-100" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white transition-transform duration-200 hover:scale-105 hover:shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100">Customer Satisfaction</p>
                  <h3 className="text-3xl font-bold mt-2">95%</h3>
                  <p className="text-sm text-green-100 mt-1">Based on feedback</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-100" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs Section */}
        <div className="bg-white rounded-xl shadow-sm">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
            <TabsList className="grid w-full grid-cols-3 gap-6 p-1 bg-gray-50/80 rounded-lg mb-8">
              <TabsTrigger 
                value="enquiries"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm py-3"
              >
                <MessageSquare className="w-4 h-4 mr-3" />
                <span className="font-medium">Enquiries</span>
              </TabsTrigger>
              <TabsTrigger 
                value="testimonials"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm py-3"
              >
                <Star className="w-4 h-4 mr-3" />
                <span className="font-medium">Testimonials</span>
              </TabsTrigger>
              <TabsTrigger 
                value="archived"
                className="data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm py-3"
              >
                <Archive className="w-4 h-4 mr-3" />
                <span className="font-medium">Archive</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="enquiries" className="mt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Recent Enquiries</h2>
                  <Button variant="outline" size="sm" className="px-4">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <ContactMessages archived={false} />
              </div>
            </TabsContent>

            <TabsContent value="testimonials" className="mt-6">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold text-gray-900">Testimonials Review</h2>
                  <Button variant="outline" size="sm" className="px-4">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <TestimonialReview archived={false} />
              </div>
            </TabsContent>

            <TabsContent value="archived">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-900">Archive</h2>
                </div>
                
                <Tabs value={archiveTab} onValueChange={setArchiveTab} className="space-y-6">
                  <TabsList className="inline-flex bg-gray-50 p-1 rounded-lg">
                    <TabsTrigger 
                      value="enquiries"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4"
                    >
                      Enquiries
                    </TabsTrigger>
                    <TabsTrigger 
                      value="testimonials"
                      className="data-[state=active]:bg-white data-[state=active]:shadow-sm px-4"
                    >
                      Testimonials
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="enquiries" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-700">Archived Enquiries</h3>
                      <ContactMessages archived={true} />
                    </div>
                  </TabsContent>

                  <TabsContent value="testimonials" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium text-gray-700">Archived Testimonials</h3>
                      <TestimonialReview archived={true} />
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Revenue</p>
                <p className="text-2xl font-semibold text-gray-900">$24,567</p>
              </div>
              <div className="p-3 bg-blue-50 rounded-full">
                <DollarSign className="w-6 h-6 text-blue-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-center">
                <ArrowUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-sm text-green-500">12%</span>
                <span className="text-sm text-gray-500 ml-2">vs last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
