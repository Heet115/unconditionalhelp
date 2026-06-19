export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          category: string
          content: string
          cover_image: string
          cover_image_alt: string | null
          created_at: string
          created_by: string | null
          description: string
          gallery_image_alts: Json
          gallery_images: string[]
          id: string
          is_published: boolean
          published_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          title: string
          updated_at: string
          updated_by: string | null
          youtube_video_id: string | null
        }
        Insert: {
          category: string
          content: string
          cover_image?: string
          cover_image_alt?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          gallery_image_alts?: Json
          gallery_images?: string[]
          id?: string
          is_published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          title: string
          updated_at?: string
          updated_by?: string | null
          youtube_video_id?: string | null
        }
        Update: {
          category?: string
          content?: string
          cover_image?: string
          cover_image_alt?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          gallery_image_alts?: Json
          gallery_images?: string[]
          id?: string
          is_published?: boolean
          published_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
          youtube_video_id?: string | null
        }
        Relationships: []
      }
      admin_audit_logs: {
        Row: {
          action: string
          admin_user_id: string | null
          created_at: string
          entity_id: string | null
          entity_table: string
          id: string
          metadata: Json
        }
        Insert: {
          action: string
          admin_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_table: string
          id?: string
          metadata?: Json
        }
        Update: {
          action?: string
          admin_user_id?: string | null
          created_at?: string
          entity_id?: string | null
          entity_table?: string
          id?: string
          metadata?: Json
        }
        Relationships: []
      }
      admin_profiles: {
        Row: {
          created_at: string
          email: string
          is_active: boolean
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          is_active?: boolean
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          handled_at: string | null
          handled_by: string | null
          id: string
          internal_notes: string | null
          is_read: boolean
          message: string
          name: string
          phone: string | null
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          internal_notes?: string | null
          is_read?: boolean
          message: string
          name: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          internal_notes?: string | null
          is_read?: boolean
          message?: string
          name?: string
          phone?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          category: string
          created_at: string
          created_by: string | null
          currency: string
          donation_date: string
          donor_email: string | null
          donor_name: string | null
          donor_phone: string | null
          id: string
          method: string
          notes: string | null
          receipt_status: string
          transaction_ref: string | null
          updated_at: string
          updated_by: string | null
          verification_status: string
        }
        Insert: {
          amount: number
          category?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          donation_date?: string
          donor_email?: string | null
          donor_name?: string | null
          donor_phone?: string | null
          id?: string
          method?: string
          notes?: string | null
          receipt_status?: string
          transaction_ref?: string | null
          updated_at?: string
          updated_by?: string | null
          verification_status?: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          created_by?: string | null
          currency?: string
          donation_date?: string
          donor_email?: string | null
          donor_name?: string | null
          donor_phone?: string | null
          id?: string
          method?: string
          notes?: string | null
          receipt_status?: string
          transaction_ref?: string | null
          updated_at?: string
          updated_by?: string | null
          verification_status?: string
        }
        Relationships: []
      }
      events: {
        Row: {
          cover_image: string
          cover_image_alt: string | null
          created_at: string
          created_by: string | null
          date: string
          description: string
          id: string
          is_published: boolean
          location: string
          published_at: string | null
          registration_url: string | null
          slug: string
          time: string
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          cover_image?: string
          cover_image_alt?: string | null
          created_at?: string
          created_by?: string | null
          date: string
          description: string
          id?: string
          is_published?: boolean
          location: string
          published_at?: string | null
          registration_url?: string | null
          slug: string
          time: string
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          cover_image?: string
          cover_image_alt?: string | null
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string
          id?: string
          is_published?: boolean
          location?: string
          published_at?: string | null
          registration_url?: string | null
          slug?: string
          time?: string
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      gallery_items: {
        Row: {
          accent: string
          border: string
          category: string
          created_at: string
          created_by: string | null
          date: string
          description: string
          gradient: string
          icon: string
          id: string
          image_alt: string | null
          image_url: string | null
          is_published: boolean
          location: string
          sort_order: number
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          accent?: string
          border?: string
          category: string
          created_at?: string
          created_by?: string | null
          date: string
          description: string
          gradient?: string
          icon?: string
          id?: string
          image_alt?: string | null
          image_url?: string | null
          is_published?: boolean
          location: string
          sort_order?: number
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          accent?: string
          border?: string
          category?: string
          created_at?: string
          created_by?: string | null
          date?: string
          description?: string
          gradient?: string
          icon?: string
          id?: string
          image_alt?: string | null
          image_url?: string | null
          is_published?: boolean
          location?: string
          sort_order?: number
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      impact_stats: {
        Row: {
          active_volunteers: number
          animals_served: number
          families_supported: number
          id: string
          meals_served: number
          students_supported: number
          trees_planted: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          active_volunteers?: number
          animals_served?: number
          families_supported?: number
          id?: string
          meals_served?: number
          students_supported?: number
          trees_planted?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          active_volunteers?: number
          animals_served?: number
          families_supported?: number
          id?: string
          meals_served?: number
          students_supported?: number
          trees_planted?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      media_assets: {
        Row: {
          alt_text: string | null
          bucket_id: string
          caption: string | null
          created_at: string
          created_by: string | null
          file_name: string | null
          folder: string | null
          id: string
          mime_type: string | null
          path: string
          public_url: string
          size_bytes: number | null
          updated_at: string
          updated_by: string | null
          uploaded_by: string | null
        }
        Insert: {
          alt_text?: string | null
          bucket_id?: string
          caption?: string | null
          created_at?: string
          created_by?: string | null
          file_name?: string | null
          folder?: string | null
          id?: string
          mime_type?: string | null
          path: string
          public_url: string
          size_bytes?: number | null
          updated_at?: string
          updated_by?: string | null
          uploaded_by?: string | null
        }
        Update: {
          alt_text?: string | null
          bucket_id?: string
          caption?: string | null
          created_at?: string
          created_by?: string | null
          file_name?: string | null
          folder?: string | null
          id?: string
          mime_type?: string | null
          path?: string
          public_url?: string
          size_bytes?: number | null
          updated_at?: string
          updated_by?: string | null
          uploaded_by?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string
          created_by: string | null
          description: string | null
          external_url: string | null
          file_url: string | null
          id: string
          is_published: boolean
          published_at: string | null
          report_type: string
          report_year: number | null
          title: string
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          external_url?: string | null
          file_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          report_type?: string
          report_year?: number | null
          title: string
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          created_at?: string
          created_by?: string | null
          description?: string | null
          external_url?: string | null
          file_url?: string | null
          id?: string
          is_published?: boolean
          published_at?: string | null
          report_type?: string
          report_year?: number | null
          title?: string
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          bank_details: Json
          description: string | null
          donation_qr_url: string | null
          email: string | null
          facebook_url: string | null
          founded_on: string | null
          founder: string | null
          id: string
          instagram_url: string | null
          location: string | null
          og_image_url: string | null
          phone: string | null
          short_name: string | null
          tagline: string | null
          trust_name: string
          twitter_url: string | null
          updated_at: string
          updated_by: string | null
          upi_id: string | null
          whatsapp: string | null
          youtube_url: string | null
        }
        Insert: {
          bank_details?: Json
          description?: string | null
          donation_qr_url?: string | null
          email?: string | null
          facebook_url?: string | null
          founded_on?: string | null
          founder?: string | null
          id?: string
          instagram_url?: string | null
          location?: string | null
          og_image_url?: string | null
          phone?: string | null
          short_name?: string | null
          tagline?: string | null
          trust_name: string
          twitter_url?: string | null
          updated_at?: string
          updated_by?: string | null
          upi_id?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Update: {
          bank_details?: Json
          description?: string | null
          donation_qr_url?: string | null
          email?: string | null
          facebook_url?: string | null
          founded_on?: string | null
          founder?: string | null
          id?: string
          instagram_url?: string | null
          location?: string | null
          og_image_url?: string | null
          phone?: string | null
          short_name?: string | null
          tagline?: string | null
          trust_name?: string
          twitter_url?: string | null
          updated_at?: string
          updated_by?: string | null
          upi_id?: string | null
          whatsapp?: string | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      volunteer_applications: {
        Row: {
          created_at: string
          email: string
          focus_area: string
          handled_at: string | null
          handled_by: string | null
          id: string
          internal_notes: string | null
          is_read: boolean
          message: string | null
          name: string
          phone: string
          status: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          focus_area: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          internal_notes?: string | null
          is_read?: boolean
          message?: string | null
          name: string
          phone: string
          status?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          focus_area?: string
          handled_at?: string | null
          handled_by?: string | null
          id?: string
          internal_notes?: string | null
          is_read?: boolean
          message?: string | null
          name?: string
          phone?: string
          status?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
