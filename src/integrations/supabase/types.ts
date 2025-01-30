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

export type EnquiryStatus = 
  | "new" 
  | "in_progress"
  | "contacted"
  | "scheduled"
  | "completed"
  | "cancelled"
  | "resolved";

export type Enquiry = Database['public']['Tables']['enquiries']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
