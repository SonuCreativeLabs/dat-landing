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
type EnquiryStatus = "new" | "in-progress" | "completed" | "cancelled";

const Admin = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("messages");
  const [activePage, setActivePage] = useState("dashboard");
  const [enquiries, setEnquiries] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [archivedTestimonials, setArchivedTestimonials] = useState([]);

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
      const [enquiriesCount, testimonialsCount, usersCount] = await Promise.all([
        supabase.from('enquiries').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' })
      ]);

      return {
        enquiries: enquiriesCount.count || 0,
        testimonials: testimonialsCount.count || 0,
        users: usersCount.count || 0
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
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">New</span>;
      case 'in-progress':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">Cancelled</span>;
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
      <aside className="w-64 bg-white border-r border-gray-200 fixed h-full">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center gap-2 px-6 border-b border-gray-200">
            <LayoutDashboard className="w-6 h-6 text-blue-600" />
            <span className="font-semibold text-gray-900">Admin Panel</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
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
                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                      activePage === item.href.replace('#', '')
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <item.icon className="w-5 h-5" />
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* User */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-3 py-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                {session.user.email?.[0].toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {session.user.email}
                </p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                className="text-gray-500 hover:text-red-600"
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
        <header className="bg-white border-b border-gray-200 h-16 flex items-center fixed right-0 left-64 top-0 z-30 px-6">
          <div className="flex items-center gap-6 ml-auto">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full" />
            </Button>
          </div>
        </header>

        {/* Page Content */}
        <main className="pt-16 p-6">
          {activePage === 'dashboard' && (
            <>
              {/* Stats Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-blue-100 rounded-lg">
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
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-yellow-100 rounded-lg">
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
                <Card>
                  <CardContent className="flex items-center gap-4 p-6">
                    <div className="p-3 bg-green-100 rounded-lg">
                      <User className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {isLoadingStats ? (
                          <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                          stats?.users || 0
                        )}
                      </h3>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Analytics and Activity Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                {/* Analytics Charts */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Reports and Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={analyticsData?.enquiriesTrend}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="date" 
                            tick={{ fontSize: 12 }}
                            tickFormatter={(value) => format(new Date(value), 'MMM d')}
                          />
                          <YAxis tick={{ fontSize: 12 }} />
                          <Tooltip 
                            labelFormatter={(value) => format(new Date(value), 'MMM d, yyyy')}
                          />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            name="Enquiries"
                            stroke="#2563eb" 
                            strokeWidth={2}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      Recent Activity
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity?.map((activity, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className={`p-2 rounded-full ${
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
                            <p className="text-xs text-gray-500">
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
              <div className="grid gap-6">
                {enquiries.map((enquiry) => (
                  <div key={enquiry.id} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg">{enquiry.name}</h3>
                        <p className="text-sm text-gray-500">{enquiry.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        {renderEnquiryStatus(enquiry.status as EnquiryStatus)}
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-500">Message</p>
                      <p className="text-gray-800">{enquiry.message}</p>
                    </div>
                    <div className="mt-2 text-sm text-gray-500">
                      {new Date(enquiry.created_at).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
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
                      <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-yellow-400">
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
                          <div className="flex items-center gap-2">
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
                      <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-400">
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
                          <div className="flex items-center gap-2">
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
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-800">Archived Testimonials</h2>
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
              </div>
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