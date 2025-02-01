import { useEffect, useState } from "react";
import { useNavigate, Outlet, Link } from "react-router-dom";
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
  Archive,
  FileText,
  Filter
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
import Dashboard from "@/pages/admin/Dashboard";
import { useLocation } from 'react-router-dom';
import BlogEditor from '@/components/admin/BlogEditor';
import ImageUpload from '@/components/admin/ImageUpload';
import { logActivity } from '@/lib/activity-logger';
import ActivityLogs from '@/components/admin/ActivityLogs';

type ActivePage = 'dashboard' | 'enquiry' | 'testimonials' | 'archive' | 'users' | 'settings' | 'help' | 'blog' | 'activity';

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
    title: "Blog",
    icon: FileText,
    href: "#blog"
  },
  {
    title: "Users",
    icon: Users,
    href: "#users"
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
  },
  {
    title: "Activity",
    icon: Activity,
    href: "#activity"
  }
] as const;

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
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("messages");
  const [activePage, setActivePage] = useState<ActivePage>("dashboard");
  const [enquiries, setEnquiries] = useState([]);
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
      // Log the logout activity before signing out
      await logActivity({
        adminId: session?.user?.id || '',
        adminEmail: session?.user?.email || '',
        actionType: 'logout',
        entityType: 'system',
        actionDetails: {
          timestamp: new Date().toISOString()
        }
      });

      await supabase.auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Add login activity logging
  useEffect(() => {
    const logLoginActivity = async () => {
      if (session?.user) {
        // Get the last login activity for this user
        const { data: lastLogin } = await supabase
          .from('admin_activity_logs')
          .select('created_at')
          .eq('admin_id', session.user.id)
          .eq('action_type', 'login')
          .order('created_at', { ascending: false })
          .limit(1);

        // Only log if there's no previous login or if the last login was more than 1 hour ago
        const shouldLogLogin = !lastLogin?.length || 
          (new Date().getTime() - new Date(lastLogin[0].created_at).getTime() > 60 * 60 * 1000);

        if (shouldLogLogin) {
          try {
            await logActivity({
              adminId: session.user.id,
              adminEmail: session.user.email || '',
              actionType: 'login',
              entityType: 'system',
              actionDetails: {
                timestamp: new Date().toISOString()
              }
            });
          } catch (error) {
            console.error('Error logging login activity:', error);
          }
        }
      }
    };

    logLoginActivity();
  }, [session?.user?.id]); // Only depend on the user ID, not the entire session

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
      // Get the current status before updating
      const { data: currentEnquiry, error: fetchError } = await supabase
        .from('enquiries')
        .select('status')
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;

      const { error: updateError } = await supabase
        .from('enquiries')
        .update({ status })
        .eq('id', id);

      if (updateError) throw updateError;

      // Log the activity
      await logActivity({
        adminId: session?.user?.id || '',
        adminEmail: session?.user?.email || '',
        actionType: 'enquiry_status_change',
        entityType: 'enquiry',
        entityId: id,
        previousValues: { status: currentEnquiry.status },
        newValues: { status },
        actionDetails: {
          from_status: currentEnquiry.status,
          to_status: status,
          timestamp: new Date().toISOString()
        }
      });

      toast.success('Enquiry status updated successfully');
      fetchEnquiries();
    } catch (error) {
      console.error('Error updating enquiry status:', error);
      toast.error('Failed to update enquiry status');
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [activePage]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  const currentTab = location.pathname.split('/')[2] || 'dashboard';

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
                      setActivePage(item.href.replace('#', '') as ActivePage);
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
          {/* Show route-based content if we're on a specific route */}
          {currentTab !== 'dashboard' ? (
            <Outlet />
          ) : (
            <>
              {/* Show page content based on sidebar navigation */}
              {activePage === 'dashboard' && (
                <Dashboard session={session} />
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
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Testimonials</h2>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setActivePage('archive')}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <Archive className="w-4 h-4 mr-2" />
                      View Archive
                    </Button>
                  </div>
                  <TestimonialReview archived={false} />
                </div>
              )}

              {activePage === 'archive' && (
                <div className="space-y-8">
                  <h2 className="text-2xl font-bold text-gray-800">Archive</h2>
                  <Tabs defaultValue="enquiries" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-gray-100 p-1 rounded-lg">
                      <TabsTrigger value="enquiries">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Enquiries
                      </TabsTrigger>
                      <TabsTrigger value="testimonials">
                        <Star className="w-4 h-4 mr-2" />
                        Testimonials
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="enquiries">
                      <EnquiryReview archived={true} />
                    </TabsContent>

                    <TabsContent value="testimonials">
                      <TestimonialReview archived={true} />
                    </TabsContent>
                  </Tabs>
                </div>
              )}

              {activePage === 'blog' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Blog Management</h2>
                    <Button
                      onClick={() => {
                        // Handle new post creation
                        toast.success('Creating new blog post...');
                      }}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <FileText className="w-4 h-4 mr-2" />
                      New Post
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Content Editor</h3>
                      <BlogEditor
                        content=""
                        onChange={(content) => {
                          console.log('Content updated:', content);
                        }}
                      />
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Featured Image</h3>
                      <ImageUpload
                        onUpload={(url) => {
                          console.log('Image uploaded:', url);
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              {activePage === 'activity' && (
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-gray-800">Activity Logs</h2>
                    <div className="flex items-center gap-4">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                    </div>
                  </div>
                  <ActivityLogs />
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Admin;