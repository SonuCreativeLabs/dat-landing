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
