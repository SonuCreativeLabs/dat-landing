export interface Database {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          email: string;
          phone: string;
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
          service_type: string;
          message: string;
          rating: number;
          status: TestimonialStatus;
          location?: string;
          admin_comment?: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          service_type: string;
          message: string;
          rating: number;
          status?: TestimonialStatus;
          location?: string;
          admin_comment?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          service_type?: string;
          message?: string;
          rating?: number;
          status?: TestimonialStatus;
          location?: string;
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
}

export type TestimonialStatus = 'pending' | 'approved' | 'rejected';
export type EnquiryStatus = 'pending' | 'contacted' | 'resolved';

export type ContactMessage = Database['public']['Tables']['contact_messages']['Row'];
export type Testimonial = Database['public']['Tables']['testimonials']['Row'];
