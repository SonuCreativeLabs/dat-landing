import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { 
  Calendar as CalendarIcon, 
  Download, 
  Filter, 
  RefreshCw,
  Search,
  XCircle
} from 'lucide-react';
import { getActivityLogs } from '@/lib/activity-logger';
import type { ActivityType, EntityType } from '@/integrations/supabase/types';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const activityTypeColors: Record<ActivityType, { bg: string; text: string }> = {
  login: { bg: 'bg-blue-100', text: 'text-blue-800' },
  logout: { bg: 'bg-gray-100', text: 'text-gray-800' },
  testimonial_approval: { bg: 'bg-green-100', text: 'text-green-800' },
  testimonial_rejection: { bg: 'bg-red-100', text: 'text-red-800' },
  enquiry_status_change: { bg: 'bg-purple-100', text: 'text-purple-800' },
  content_modification: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  settings_change: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
  user_management: { bg: 'bg-pink-100', text: 'text-pink-800' },
  data_access: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
  bulk_operation: { bg: 'bg-orange-100', text: 'text-orange-800' }
};

const entityTypeIcons: Record<EntityType, string> = {
  testimonial: '⭐',
  enquiry: '📩',
  blog_post: '📝',
  settings: '⚙️',
  user: '👤',
  system: '🖥️'
};

interface ActivityLogsProps {
  className?: string;
}

export default function ActivityLogs({ className }: ActivityLogsProps) {
  const [filters, setFilters] = useState({
    actionType: undefined as ActivityType | undefined,
    entityType: undefined as EntityType | undefined,
    startDate: undefined as Date | undefined,
    endDate: undefined as Date | undefined,
    searchTerm: ''
  });

  const { data: logs = [], isLoading, refetch } = useQuery({
    queryKey: ['activity-logs', filters],
    queryFn: () => getActivityLogs({
      ...filters,
      actionType: filters.actionType,
      entityType: filters.entityType
    }),
    refetchInterval: 30000 // Refetch every 30 seconds
  });

  const handleExport = () => {
    const csvContent = [
      ['Timestamp', 'Admin', 'Action', 'Entity Type', 'Entity ID', 'Details', 'IP Address'],
      ...logs.map(log => [
        format(new Date(log.created_at), 'yyyy-MM-dd HH:mm:ss'),
        log.admin_email,
        log.action_type,
        log.entity_type,
        log.entity_id || '',
        JSON.stringify(log.action_details),
        log.ip_address
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `activity-logs-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setFilters({
      actionType: undefined,
      entityType: undefined,
      startDate: undefined,
      endDate: undefined,
      searchTerm: ''
    });
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{logs.length}</div>
            <p className="text-xs text-muted-foreground">
              {logs.length > 0 && `Last activity ${format(new Date(logs[0].created_at), 'MMM d, HH:mm')}`}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {new Set(logs.map(log => log.admin_email)).size}
            </div>
            <p className="text-xs text-muted-foreground">Active admins</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Most Active Entity</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            {logs.length > 0 && (
              <>
                <div className="text-2xl font-bold capitalize">
                  {Object.entries(
                    logs.reduce((acc, log) => {
                      acc[log.entity_type] = (acc[log.entity_type] || 0) + 1;
                      return acc;
                    }, {} as Record<string, number>)
                  ).sort((a, b) => b[1] - a[1])[0][0].replace('_', ' ')}
                </div>
                <p className="text-xs text-muted-foreground">Most frequently updated</p>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent Actions</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {logs.filter(log => {
                const actionTime = new Date(log.created_at);
                const now = new Date();
                const hoursDiff = (now.getTime() - actionTime.getTime()) / (1000 * 60 * 60);
                return hoursDiff <= 1;
              }).length}
            </div>
            <p className="text-xs text-muted-foreground">Activities in the last hour</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Filters</CardTitle>
          <CardDescription>Filter and search through activity logs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-[200px]">
              <Select
                value={filters.actionType || ''}
                onValueChange={(value: string) => 
                  setFilters(prev => ({
                    ...prev,
                    actionType: value as ActivityType || undefined
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Action Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>All Actions</SelectItem>
                  {Object.keys(activityTypeColors).map((type) => (
                    <SelectItem key={type} value={type}>
                      <span className="flex items-center gap-2">
                        <Badge variant="secondary" className={cn(
                          activityTypeColors[type as ActivityType].bg,
                          activityTypeColors[type as ActivityType].text
                        )}>
                          {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </Badge>
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-[200px]">
              <Select
                value={filters.entityType || ''}
                onValueChange={(value: string) =>
                  setFilters(prev => ({
                    ...prev,
                    entityType: value as EntityType || undefined
                  }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Entity Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={null}>All Entities</SelectItem>
                  {Object.entries(entityTypeIcons).map(([type, icon]) => (
                    <SelectItem key={type} value={type}>
                      <span className="flex items-center gap-2">
                        {icon} {type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                      </span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !filters.startDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.startDate ? format(filters.startDate, "PPP") : "Start Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.startDate}
                    onSelect={(date) => setFilters(prev => ({ ...prev, startDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !filters.endDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {filters.endDate ? format(filters.endDate, "PPP") : "End Date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={filters.endDate}
                    onSelect={(date) => setFilters(prev => ({ ...prev, endDate: date }))}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by admin or details..."
                  value={filters.searchTerm}
                  onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                  className="pl-8"
                />
              </div>
            </div>

            <Button 
              variant="outline" 
              onClick={clearFilters}
              className="gap-2"
              disabled={!filters.actionType && !filters.entityType && !filters.startDate && !filters.endDate && !filters.searchTerm}
            >
              <XCircle className="h-4 w-4" />
              Clear
            </Button>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => refetch()}
                    className="shrink-0"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Refresh logs</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <Button 
              variant="outline" 
              onClick={handleExport} 
              className="gap-2 ml-auto shrink-0"
            >
              <Download className="h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Logs Table */}
      <Card>
        <CardHeader>
          <CardTitle>Activity Logs</CardTitle>
          <CardDescription>
            Showing {logs.length} activities
            {(filters.actionType || filters.entityType || filters.startDate || filters.endDate || filters.searchTerm) && ' with current filters'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Timestamp</TableHead>
                  <TableHead>Admin</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Entity</TableHead>
                  <TableHead>Details</TableHead>
                  <TableHead className="w-[100px]">IP Address</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Loading activity logs...
                      </div>
                    </TableCell>
                  </TableRow>
                ) : logs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                      No activity logs found
                      {(filters.actionType || filters.entityType || filters.startDate || filters.endDate || filters.searchTerm) && (
                        <div className="mt-2">
                          <Button
                            variant="outline"
                            onClick={clearFilters}
                            className="gap-2"
                          >
                            <XCircle className="h-4 w-4" />
                            Clear Filters
                          </Button>
                        </div>
                      )}
                    </TableCell>
                  </TableRow>
                ) : (
                  logs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell className="whitespace-nowrap font-medium">
                        {format(new Date(log.created_at), 'MMM d, yyyy HH:mm')}
                      </TableCell>
                      <TableCell>{log.admin_email}</TableCell>
                      <TableCell>
                        <Badge
                          className={cn(
                            "font-medium",
                            activityTypeColors[log.action_type].bg,
                            activityTypeColors[log.action_type].text
                          )}
                        >
                          {log.action_type.split('_').map(word => 
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className="flex items-center gap-2">
                          {entityTypeIcons[log.entity_type]}
                          <span className="capitalize">{log.entity_type.replace('_', ' ')}</span>
                          {log.entity_id && (
                            <span className="text-xs text-muted-foreground">
                              ({log.entity_id})
                            </span>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[300px]">
                        <div className="truncate">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger className="cursor-help">
                                {JSON.stringify(log.action_details)}
                              </TooltipTrigger>
                              <TooltipContent>
                                <pre className="text-xs">
                                  {JSON.stringify(log.action_details, null, 2)}
                                </pre>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">
                        {log.ip_address}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 