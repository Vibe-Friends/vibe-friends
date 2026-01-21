export interface Database {
  public: {
    Tables: {
      events: {
        Row: {
          id: string;
          title: string;
          start_date: string;
          end_date: string | null;
          start_time: string;
          end_time: string | null;
          location: string;
          url: string;
          image_url: string | null;
          deleted_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          start_date: string;
          end_date?: string | null;
          start_time: string;
          end_time?: string | null;
          location: string;
          url: string;
          image_url?: string | null;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          start_date?: string;
          end_date?: string | null;
          start_time?: string;
          end_time?: string | null;
          location?: string;
          url?: string;
          image_url?: string | null;
          deleted_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      admin_allowlist: {
        Row: {
          email: string;
          created_at: string;
        };
        Insert: {
          email: string;
          created_at?: string;
        };
        Update: {
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type Event = Database["public"]["Tables"]["events"]["Row"];
export type EventInsert = Database["public"]["Tables"]["events"]["Insert"];
export type EventUpdate = Database["public"]["Tables"]["events"]["Update"];
