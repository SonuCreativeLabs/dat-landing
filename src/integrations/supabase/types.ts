export type Database = {
  public: {
    Tables: {
      enquiries: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
          location: string;
          service_type: string;
          message: string;
          status: EnquiryStatus;
          admin_comment?: string;
          archived: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          email: string;
          phone: string;
          location: string;
          service_type: string;
          message: string;
          status?: EnquiryStatus;
          admin_comment?: string;
          archived?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          email?: string;
          phone?: string;
          location?: string;
          service_type?: string;
          message?: string;
          status?: EnquiryStatus;
          admin_comment?: string;
          archived?: boolean;
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          rating: number;
          message: string;
          status: TestimonialStatus;
          admin_comment?: string;
          archived: boolean;
          service_type?: string;
          location?: string;
          source?: 'justdial' | 'website';
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          rating: number;
          message: string;
          status?: TestimonialStatus;
          admin_comment?: string;
          archived?: boolean;
          service_type?: string;
          location?: string;
          source?: 'justdial' | 'website';
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          rating?: number;
          message?: string;
          status?: TestimonialStatus;
          admin_comment?: string;
          archived?: boolean;
          service_type?: string;
          location?: string;
          source?: 'justdial' | 'website';
        };
        Relationships: [];
      };
      blog_posts: {
        Row: {
          id: string;
          created_at: string;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          read_time: string;
          image_url: string;
          category: string;
          keywords: string[];
          slug: string;
          status: BlogPostStatus;
        };
        Insert: {
          id?: string;
          created_at?: string;
          title: string;
          excerpt: string;
          content: string;
          date: string;
          read_time: string;
          image_url: string;
          category: string;
          keywords: string[];
          slug: string;
          status?: BlogPostStatus;
        };
        Update: {
          id?: string;
          created_at?: string;
          title?: string;
          excerpt?: string;
          content?: string;
          date?: string;
          read_time?: string;
          image_url?: string;
          category?: string;
          keywords?: string[];
          slug?: string;
          status?: BlogPostStatus;
        };
        Relationships: [];
      };
      admin_activity_logs: {
        Row: AdminActivityLog;
        Insert: Omit<AdminActivityLog, 'id' | 'created_at'>;
        Update: Partial<Omit<AdminActivityLog, 'id' | 'created_at'>>;
        Relationships: [
          {
            foreignKeyName: "admin_activity_logs_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
};

export type TestimonialStatus = 'pending' | 'approved' | 'rejected';
export type BlogPostStatus = 'draft' | 'published';

export interface Enquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  service_type?: string;
  status: EnquiryStatus;
  admin_comment?: string;
  created_at: string;
  archived: boolean;
  first_response_at?: string;
}

export type EnquiryStatus = 
  | "new" 
  | "pending"
  | "in_progress"
  | "contacted"
  | "scheduled"
  | "completed"
  | "cancelled"
  | "resolved";

export type Testimonial = Database['public']['Tables']['testimonials']['Row'] & {
  service_type: ServiceType;
};

export type ServiceType = 'appliance_sales' | 'appliance_service' | 'appliance_rentals' | 'others';

export type ActivityType = 
  | 'login'
  | 'logout'
  | 'testimonial_approval'
  | 'testimonial_rejection'
  | 'enquiry_status_change'
  | 'content_modification'
  | 'settings_change'
  | 'user_management'
  | 'data_access'
  | 'bulk_operation';

export type EntityType = 
  | 'testimonial'
  | 'enquiry'
  | 'blog_post'
  | 'settings'
  | 'user'
  | 'system';

export interface AdminActivityLog {
  id: string;
  created_at: string;
  admin_id: string;
  admin_email: string;
  action_type: ActivityType;
  entity_type: EntityType;
  entity_id?: string;
  action_details?: Record<string, any>;
  previous_values?: Record<string, any>;
  new_values?: Record<string, any>;
  ip_address?: string;
  user_agent?: string;
  justification?: string;
}
