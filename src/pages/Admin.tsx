import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { 
  Loader2, 
  LogOut, 
  MessageSquare, 
  Star, 
  User, 
  Bell,
  Settings,
  LayoutDashboard,
  Activity,
  BarChart3,
  Home,
  Users,
  Settings2,
  HelpCircle,
  Archive
} from "lucide-react";
import TestimonialReview from "@/components/admin/TestimonialReview";
import EnquiryReview from "@/components/admin/EnquiryReview";
import ContactMessages from "@/components/admin/ContactMessages";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { format, subDays } from 'date-fns';
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const SIDEBAR_ITEMS = [
  {
    title: "Dashboard",
    icon: Home,
    href: "#dashboard"
  },
  {
    title: "Enquiry",
    icon: MessageSquare,
    href: "#enquiry"
  },
  {
    title: "Testimonials",
    icon: Star,
    href: "#testimonials"
  },
  {
    title: "Users",
    icon: Users,
    href: "#users"
  },
  {
    title: "Reports",
    icon: BarChart3,
    href: "#reports"
  },
  {
    title: "Settings",
    icon: Settings2,
    href: "#settings"
  },
  {
    title: "Help",
    icon: HelpCircle,
    href: "#help"
  },
  {
    title: "Archive",
    icon: Archive,
    href: "#archive"
  }
];

type TestimonialStatus = "pending" | "approved" | "rejected";
type EnquiryStatus = 
  | "new" 
  | "in_progress"
  | "contacted"
  | "scheduled"
  | "completed"
  | "cancelled"
  | "resolved";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("messages");
  const [activePage, setActivePage] = useState("dashboard");
  const [enquiries, setEnquiries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [archivedTestimonials, setArchivedTestimonials] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState<EnquiryStatus | null>(null);

  // Fetch status counts
  const { data: statusCounts = {
    all: 0,
    new: 0,
    in_progress: 0,
    contacted: 0,
    scheduled: 0,
    completed: 0,
    cancelled: 0,
    resolved: 0
  }, isLoading: isLoadingCounts } = useQuery({
    queryKey: ["status-counts"],
    queryFn: async () => {
      const { data: enquiriesData, error } = await supabase
        .from("enquiries")
        .select("status")
        .eq("archived", false);

      if (error) throw error;

      const counts = (enquiriesData || []).reduce((acc, enquiry) => {
        const status = enquiry.status as EnquiryStatus;
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      }, {} as Record<EnquiryStatus, number>);

      return {
        all: enquiriesData?.length || 0,
        new: counts.new || 0,
        in_progress: counts.in_progress || 0,
        contacted: counts.contacted || 0,
        scheduled: counts.scheduled || 0,
        completed: counts.completed || 0,
        cancelled: counts.cancelled || 0,
        resolved: counts.resolved || 0
      };
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  // Check authentication
  const { data: session, isLoading: isCheckingAuth } = useQuery({
    queryKey: ["auth-session"],
    queryFn: async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error || !session) {
        console.error("Auth error:", error);
        navigate("/login");
        return null;
      }
      return session;
    },
  });

  // Fetch real-time stats
  const { data: stats, isLoading: isLoadingStats } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const [enquiriesCount, testimonialsCount] = await Promise.all([
        supabase.from('enquiries').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' })
      ]);

      return {
        enquiries: enquiriesCount.count || 0,
        testimonials: testimonialsCount.count || 0,
        activeUsers: 0 // Add a default value for activeUsers
      };
    },
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  // Fetch recent activity
  const { data: recentActivity } = useQuery({
    queryKey: ["recent-activity"],
    queryFn: async () => {
      const { data: messages } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      const { data: testimonials } = await supabase
        .from('testimonials')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);

      const activities = [
        ...(messages || []).map(msg => ({
          type: 'enquiry',
          title: 'New Enquiry',
          description: `From: ${msg.email}`,
          timestamp: msg.created_at
        })),
        ...(testimonials || []).map(test => ({
          type: 'testimonial',
          title: 'New Testimonial',
          description: `From: ${test.name}`,
          timestamp: test.created_at
        }))
      ].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        .slice(0, 5);

      return activities;
    },
    refetchInterval: 10000
  });

  // Fetch analytics data
  const { data: analyticsData } = useQuery({
    queryKey: ["analytics-data"],
    queryFn: async () => {
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = subDays(new Date(), i);
        return format(date, 'yyyy-MM-dd');
      }).reverse();

      const [enquiriesData, testimonialsData] = await Promise.all([
        Promise.all(
          last7Days.map(async date => {
            const { count } = await supabase
              .from('enquiries')
              .select('id', { count: 'exact' })
              .gte('created_at', `${date}T00:00:00`)
              .lt('created_at', `${date}T23:59:59`);
            return { date, count: count || 0 };
          })
        ),
        Promise.all(
          last7Days.map(async date => {
            const { count } = await supabase
              .from('testimonials')
              .select('id', { count: 'exact' })
              .gte('created_at', `${date}T00:00:00`)
              .lt('created_at', `${date}T23:59:59`);
            return { date, count: count || 0 };
          })
        )
      ]);

      return {
        enquiriesTrend: enquiriesData,
        testimonialsTrend: testimonialsData
      };
    },
    refetchInterval: 300000
  });

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const fetchEnquiries = async () => {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setEnquiries(data || []);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
      toast.error('Failed to fetch enquiries');
    }
  };

  const handleEnquiryStatusUpdate = async (id: string, status: EnquiryStatus) => {
    try {
      const { error } = await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', id);

      if (error) throw error;

      toast.success('Enquiry status updated successfully');
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      toast.error('Failed to update enquiry status');
    }
  };

  const handleTestimonialAction = async (id: string, action: 'approve' | 'archive' | 'restore') => {
    try {
      const newStatus: TestimonialStatus = action === 'approve' ? 'approved' : action === 'archive' ? 'rejected' : 'pending';
      
      const { error } = await supabase
        .from('testimonials')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;

      toast.success(`Testimonial ${action}d successfully`);
      fetchTestimonials();
    } catch (error) {
      console.error(`Error ${action}ing testimonial:`, error);
      toast.error(`Failed to ${action} testimonial`);
    }
  };

  const fetchTestimonials = async () => {
    try {
      // Fetch active testimonials
      const { data: activeData, error: activeError } = await supabase
        .from('testimonials')
        .select('*')
        .not('status', 'eq', 'rejected')
        .order('created_at', { ascending: false });

      if (activeError) throw activeError;

      // Fetch archived testimonials
      const { data: archivedData, error: archivedError } = await supabase
        .from('testimonials')
        .select('*')
        .eq('status', 'rejected')
        .order('created_at', { ascending: false });

      if (archivedError) throw archivedError;

      setTestimonials(activeData || []);
      setArchivedTestimonials(archivedData || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      toast.error('Failed to fetch testimonials');
    }
  };

  const renderEnquiryStatus = (status: EnquiryStatus) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">New</span>;
      case 'in_progress':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">In Progress</span>;
      case 'contacted':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">Contacted</span>;
      case 'scheduled':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-cyan-100 text-cyan-800">Scheduled</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>;
      case 'resolved':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Resolved</span>;
      default:
        return null;
    }
  };

  useEffect(() => {
    fetchEnquiries();
    fetchTestimonials();
  }, [activePage]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full shadow-lg">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <LayoutDashboard className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-gray-900">Admin Dashboard</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            <div className="mb-4 px-3">
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Main Menu</h2>
            </div>
            <ul className="space-y-1">
              {SIDEBAR_ITEMS.map((item) => (
                <li key={item.title}>
                  <a
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setActivePage(item.href.replace('#', ''));
                    }}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                      activePage === item.href.replace('#', '')
                        ? "bg-blue-50 text-blue-600 shadow-sm"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 transition-colors",
                      activePage === item.href.replace('#', '')
                        ? "text-blue-600"
                        : "text-gray-400 group-hover:text-gray-500"
                    )} />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-200 bg-gradient-to-r from-blue-50 to-white">
            <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white shadow-sm">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 flex items-center justify-center text-white shadow-inner">
                {session.user.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session.user.email}
                </p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center fixed right-0 left-64 top-0 z-30 px-6 shadow-sm">
          <div className="flex items-center gap-6 ml-auto">
            <Button variant="ghost" size="icon" className="relative hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-16 p-6 bg-gray-50 min-h-screen">
          {activePage === 'dashboard' && (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <MessageSquare className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Enquiries</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {isLoadingStats ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          stats?.enquiries || 0
                        )}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-yellow-100 rounded-xl">
                      <Star className="w-6 h-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Testimonials</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {isLoadingStats ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          stats?.testimonials || 0
                        )}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-green-100 rounded-xl">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {isLoadingStats ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          stats?.activeUsers || 0
                        )}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics and Activity Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Analytics Charts */}
                <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <BarChart3 className="w-5 h-5 text-blue-600" />
                      Reports and Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData?.enquiriesTrend}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => format(new Date(value), 'MMM d')}
                            stroke="#9ca3af"
                          />
                          <YAxis 
                            tick={{ fontSize: 12 }} 
                            stroke="#9ca3af"
                          />
                          <Tooltip 
                            labelFormatter={(value) => format(new Date(value), 'MMM d, yyyy')}
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '0.5rem',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                            }}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            name="Enquiries"
                            stroke="#2563eb" 
                            strokeWidth={2}
                            dot={{ fill: '#2563eb', strokeWidth: 2 }}
                            activeDot={{ r: 6, fill: '#2563eb', stroke: 'white', strokeWidth: 2 }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                    <CardTitle className="flex items-center gap-2 text-gray-800">
                      <Activity className="w-5 h-5 text-blue-600" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {recentActivity?.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                          <div className={`p-2 rounded-xl ${
                            activity.type === 'enquiry' ? 'bg-blue-100' : 'bg-yellow-100'
                          }`}>
                            {activity.type === 'enquiry' ? (
                              <MessageSquare className={`w-4 h-4 ${
                                activity.type === 'enquiry' ? 'text-blue-600' : 'text-yellow-600'
                              }`} />
                            ) : (
                              <Star className="w-4 h-4 text-yellow-600" />
                            )}
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                            <p className="text-sm text-gray-600">{activity.description}</p>
                            <p className="text-xs text-gray-500 mt-1">
                              {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}

          {activePage === 'enquiry' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Enquiries</h2>
              <div>
                <h2 className="text-lg font-semibold mb-4">Status Overview</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
                      <span className="text-sm font-medium text-gray-900">All Enquiries</span>
                      <Badge variant="secondary">{statusCounts.all}</Badge>
                    </div>
                    <p className="text-xs text-gray-500">View all enquiries regardless of status</p>
                  </div>

                  {/* New Status */}
                  <div
                    className={cn(
                      "p-4 rounded-lg flex flex-col gap-2 bg-blue-50 border border-blue-200",
                      "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
                      selectedStatus === 'new' && "ring-2 ring-offset-2 ring-blue-400"
                    )}
                    onClick={() => setSelectedStatus('new')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-sm font-medium text-blue-900">New</span>
                      </div>
                      <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                        {statusCounts.new || 0}
                      </Badge>
                    </div>
                    <p className="text-xs text-blue-700">Fresh enquiries awaiting initial response</p>
                  </div>

                  {/* In Progress Status */}
                  <div
                    className={cn(
                      "p-4 rounded-lg flex flex-col gap-2 bg-purple-50 border border-purple-200",
                      "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
                      selectedStatus === 'in_progress' && "ring-2 ring-offset-2 ring-purple-400"
                    )}
                    onClick={() => setSelectedStatus('in_progress')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-500" />
                        <span className="text-sm font-medium text-purple-900">In Progress</span>
                      </div>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                        {statusCounts.in_progress || 0}
                      </Badge>
                    </div>
                    <p className="text-xs text-purple-700">Currently being handled by the team</p>
                  </div>

                  {/* Contacted Status */}
                  <div
                    className={cn(
                      "p-4 rounded-lg flex flex-col gap-2 bg-indigo-50 border border-indigo-200",
                      "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
                      selectedStatus === 'contacted' && "ring-2 ring-offset-2 ring-indigo-400"
                    )}
                    onClick={() => setSelectedStatus('contacted')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-indigo-500" />
                        <span className="text-sm font-medium text-indigo-900">Contacted</span>
                      </div>
                      <Badge variant="secondary" className="bg-indigo-100 text-indigo-700">
                        {statusCounts.contacted || 0}
                      </Badge>
                    </div>
                    <p className="text-xs text-indigo-700">Initial contact made with customer</p>
                  </div>

                  {/* Scheduled Status */}
                  <div
                    className={cn(
                      "p-4 rounded-lg flex flex-col gap-2 bg-cyan-50 border border-cyan-200",
                      "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
                      selectedStatus === 'scheduled' && "ring-2 ring-offset-2 ring-cyan-400"
                    )}
                    onClick={() => setSelectedStatus('scheduled')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-500" />
                        <span className="text-sm font-medium text-cyan-900">Scheduled</span>
                      </div>
                      <Badge variant="secondary" className="bg-cyan-100 text-cyan-700">
                        {statusCounts.scheduled || 0}
                      </Badge>
                    </div>
                    <p className="text-xs text-cyan-700">Service appointment scheduled</p>
                  </div>

                  {/* Completed Status */}
                  <div
                    className={cn(
                      "p-4 rounded-lg flex flex-col gap-2 bg-green-50 border border-green-200",
                      "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
                      selectedStatus === 'completed' && "ring-2 ring-offset-2 ring-green-400"
                    )}
                    onClick={() => setSelectedStatus('completed')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        <span className="text-sm font-medium text-green-900">Completed</span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {statusCounts.completed || 0}
                      </Badge>
                    </div>
                    <p className="text-xs text-green-700">Service successfully delivered</p>
                  </div>

                  {/* Cancelled Status */}
                  <div
                    className={cn(
                      "p-4 rounded-lg flex flex-col gap-2 bg-red-50 border border-red-200",
                      "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
                      selectedStatus === 'cancelled' && "ring-2 ring-offset-2 ring-red-400"
                    )}
                    onClick={() => setSelectedStatus('cancelled')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-500" />
                        <span className="text-sm font-medium text-red-900">Cancelled</span>
                      </div>
                      <Badge variant="secondary" className="bg-red-100 text-red-700">
                        {statusCounts.cancelled || 0}
                      </Badge>
                    </div>
                    <p className="text-xs text-red-700">Enquiry cancelled or withdrawn</p>
                  </div>

                  {/* Resolved Status */}
                  <div
                    className={cn(
                      "p-4 rounded-lg flex flex-col gap-2 bg-emerald-50 border border-emerald-200",
                      "cursor-pointer hover:ring-2 hover:ring-offset-2 transition-all",
                      selectedStatus === 'resolved' && "ring-2 ring-offset-2 ring-emerald-400"
                    )}
                    onClick={() => setSelectedStatus('resolved')}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-sm font-medium text-emerald-900">Resolved</span>
                      </div>
                      <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
                        {statusCounts.resolved || 0}
                      </Badge>
                    </div>
                    <p className="text-xs text-emerald-700">Successfully resolved without service</p>
                  </div>
                </div>
              </div>
              <EnquiryReview selectedStatus={selectedStatus} />
            </div>
          )}

          {activePage === 'testimonials' && (
            <div className="space-y-8">
              {/* New Testimonials Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">New Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials
                    .filter(t => t.status === 'pending')
                    .map((testimonial) => (
                      <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-md border-l-4 border-yellow-400 hover:shadow-lg transition-shadow h-full flex flex-col">
                        <div className="flex justify-between items-start gap-8">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="w-12 h-12 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0">
                              <span className="text-xl font-semibold text-yellow-600">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg text-gray-900 mb-2">{testimonial.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{testimonial.service_type.split('_').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}</span>
                                {testimonial.location && (
                                  <>
                                    <span>•</span>
                                    <span>{testimonial.location}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 pt-1">
                            <Select
                              defaultValue={testimonial.status}
                              onValueChange={(value: TestimonialStatus) => {
                                const action = value === 'approved' ? 'approve' : 
                                             value === 'rejected' ? 'archive' : 'restore';
                                handleTestimonialAction(testimonial.id, action);
                              }}
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
                                <SelectItem value="approved" className="hover:bg-green-50">
                                  <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                    Approved
                                  </span>
                                </SelectItem>
                                <SelectItem value="rejected" className="hover:bg-red-50">
                                  <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    Rejected
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="mt-6 flex-1 flex flex-col">
                          <p className="text-gray-600 text-base leading-relaxed flex-1">{testimonial.message}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                            <div className="flex-1">
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-5 h-5 ${
                                      i < testimonial.rating
                                        ? "text-yellow-400 fill-current"
                                        : "text-gray-200"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {testimonials.filter(t => t.status === 'pending').length === 0 && (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    No new testimonials to review
                  </div>
                )}
              </div>

              {/* Approved Testimonials Section */}
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Approved Testimonials</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials
                    .filter(t => t.status === 'approved')
                    .map((testimonial) => (
                      <div key={testimonial.id} className="bg-white p-8 rounded-xl shadow-md border-l-4 border-green-400 hover:shadow-lg transition-shadow h-full flex flex-col">
                        <div className="flex justify-between items-start gap-8">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                              <span className="text-xl font-semibold text-green-600">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-lg text-gray-900 mb-2">{testimonial.name}</h3>
                              <div className="flex items-center gap-2 text-sm text-gray-500">
                                <span>{testimonial.service_type.split('_').map(word => 
                                  word.charAt(0).toUpperCase() + word.slice(1)
                                ).join(' ')}</span>
                                {testimonial.location && (
                                  <>
                                    <span>•</span>
                                    <span>{testimonial.location}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex-shrink-0 pt-1">
                            <Select
                              defaultValue={testimonial.status}
                              onValueChange={(value: TestimonialStatus) => {
                                const action = value === 'approved' ? 'approve' : 
                                             value === 'rejected' ? 'archive' : 'restore';
                                handleTestimonialAction(testimonial.id, action);
                              }}
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
                                <SelectItem value="approved" className="hover:bg-green-50">
                                  <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-green-400" />
                                    Approved
                                  </span>
                                </SelectItem>
                                <SelectItem value="rejected" className="hover:bg-red-50">
                                  <span className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-red-400" />
                                    Rejected
                                  </span>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="mt-6 flex-1 flex flex-col">
                          <p className="text-gray-600 text-base leading-relaxed flex-1">{testimonial.message}</p>
                          <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-4">
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-5 h-5 ${
                                    i < testimonial.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-200"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              {new Date(testimonial.created_at).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                {testimonials.filter(t => t.status === 'approved').length === 0 && (
                  <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                    No approved testimonials yet
                  </div>
                )}
              </div>
            </div>
          )}

          {activePage === 'archive' && (
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-gray-800">Archive</h2>
              
              {/* Archive Type Tabs */}
              <Tabs defaultValue="enquiries" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-gray-100 p-1 rounded-lg">
                  <TabsTrigger 
                    value="enquiries"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md px-8 py-2 transition-all"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Enquiries
                  </TabsTrigger>
                  <TabsTrigger 
                    value="testimonials"
                    className="data-[state=active]:bg-white data-[state=active]:text-blue-600 data-[state=active]:shadow-sm rounded-md px-8 py-2 transition-all"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Testimonials
                  </TabsTrigger>
                </TabsList>

                {/* Archived Enquiries */}
                <TabsContent value="enquiries">
                  <EnquiryReview archived={true} />
                </TabsContent>

                {/* Archived Testimonials */}
                <TabsContent value="testimonials">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {archivedTestimonials.map((testimonial) => (
                      <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm opacity-75">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold">{testimonial.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>{testimonial.service_type}</span>
                              {testimonial.location && (
                                <>
                                  <span>•</span>
                                  <span>{testimonial.location}</span>
                                </>
                              )}
                            </div>
                          </div>
                          <button
                            onClick={() => handleTestimonialAction(testimonial.id, 'restore')}
                            className="px-3 py-1 text-sm font-medium rounded-md text-blue-700 bg-blue-50 hover:bg-blue-100"
                          >
                            Restore
                          </button>
                        </div>
                        <p className="mt-4 text-gray-600">{testimonial.message}</p>
                        <div className="mt-4 flex items-center">
                          <div className="flex-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < testimonial.rating
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(testimonial.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                    {archivedTestimonials.length === 0 && (
                      <div className="col-span-full text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                        No archived testimonials found
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {(activePage === 'users' || activePage === 'reports' || activePage === 'settings' || activePage === 'help') && (
            <Card>
              <CardContent className="p-6">
                <div className="text-center text-gray-500">
                  <h3 className="text-lg font-medium">Coming Soon</h3>
                  <p>This feature is under development</p>
                </div>
              </CardContent>
            </Card>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;