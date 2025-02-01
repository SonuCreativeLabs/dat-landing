import { supabase } from '@/integrations/supabase/client';
import type { SupabaseClient } from '@supabase/supabase-js';
import type { ActivityType, EntityType, AdminActivityLog, Database } from '@/integrations/supabase/types';

type TypedSupabaseClient = SupabaseClient<Database>;

interface LogActivityProps {
  adminId: string;
  adminEmail: string;
  actionType: ActivityType;
  entityType: EntityType;
  entityId?: string;
  actionDetails?: Record<string, any>;
  previousValues?: Record<string, any>;
  newValues?: Record<string, any>;
  justification?: string;
}

export const logActivity = async ({
  adminId,
  adminEmail,
  actionType,
  entityType,
  entityId,
  actionDetails,
  previousValues,
  newValues,
  justification
}: LogActivityProps) => {
  try {
    const { data: clientInfo } = await fetch('https://api.ipify.org?format=json').then(res => res.json());
    
    const typedSupabase = supabase as TypedSupabaseClient;
    const { error } = await typedSupabase
      .from('admin_activity_logs')
      .insert({
        admin_id: adminId,
        admin_email: adminEmail,
        action_type: actionType,
        entity_type: entityType,
        entity_id: entityId,
        action_details: actionDetails,
        previous_values: previousValues,
        new_values: newValues,
        ip_address: clientInfo?.ip,
        user_agent: navigator.userAgent,
        justification
      });

    if (error) throw error;
  } catch (error) {
    console.error('Error logging activity:', error);
    // Don't throw error to prevent disrupting main functionality
  }
};

export const getActivityLogs = async (filters?: {
  adminId?: string;
  actionType?: ActivityType;
  entityType?: EntityType;
  startDate?: Date;
  endDate?: Date;
  limit?: number;
}): Promise<AdminActivityLog[]> => {
  try {
    const typedSupabase = supabase as TypedSupabaseClient;
    let query = typedSupabase
      .from('admin_activity_logs')
      .select('*')
      .order('created_at', { ascending: false });

    if (filters?.adminId) {
      query = query.eq('admin_id', filters.adminId);
    }
    if (filters?.actionType) {
      query = query.eq('action_type', filters.actionType);
    }
    if (filters?.entityType) {
      query = query.eq('entity_type', filters.entityType);
    }
    if (filters?.startDate) {
      query = query.gte('created_at', filters.startDate.toISOString());
    }
    if (filters?.endDate) {
      query = query.lte('created_at', filters.endDate.toISOString());
    }
    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return [];
  }
};

export const getActivityStats = async () => {
  try {
    const typedSupabase = supabase as TypedSupabaseClient;
    const [totalLogs, actionTypes, userActivity] = await Promise.all([
      typedSupabase
        .from('admin_activity_logs')
        .select('id', { count: 'exact' }),
      typedSupabase
        .from('admin_activity_logs')
        .select('action_type, created_at')
        .order('created_at', { ascending: false })
        .limit(1000),
      typedSupabase
        .from('admin_activity_logs')
        .select('admin_email, created_at')
        .order('created_at', { ascending: false })
        .limit(1000)
    ]);

    return {
      totalActivities: totalLogs.count || 0,
      recentActions: actionTypes.data || [],
      userActivityTrends: userActivity.data || []
    };
  } catch (error) {
    console.error('Error fetching activity stats:', error);
    return {
      totalActivities: 0,
      recentActions: [],
      userActivityTrends: []
    };
  }
}; 