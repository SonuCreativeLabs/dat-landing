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
        };
        Relationships: [];
      };
      testimonials: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          rating: number;
          comment: string;
          status: TestimonialStatus;
          admin_comment?: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          rating: number;
          comment: string;
          status?: TestimonialStatus;
          admin_comment?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          rating?: number;
          comment?: string;
          status?: TestimonialStatus;
          admin_comment?: string;
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
  | "new"           // Just received
  | "pending"       // Waiting for review
  | "in_progress"   // Currently working on it
  | "contacted"     // Customer has been contacted
  | "scheduled"     // Service has been scheduled
  | "completed"     // Service completed
  | "cancelled"     // Customer cancelled or unreachable
  | "resolved"      // Issue resolved without service

export type Enquiry = Database['public']['Tables']['enquiries']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
