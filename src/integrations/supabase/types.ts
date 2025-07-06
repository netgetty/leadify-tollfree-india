export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      admin_users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          password_hash: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          password_hash: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          password_hash?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      leads: {
        Row: {
          created_at: string | null
          email: string | null
          id: string
          name: string
          phone: string
          service: string
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          id?: string
          name: string
          phone: string
          service: string
        }
        Update: {
          created_at?: string | null
          email?: string | null
          id?: string
          name?: string
          phone?: string
          service?: string
        }
        Relationships: []
      }
      packages: {
        Row: {
          created_at: string | null
          features: string[]
          id: string
          name: string
          price: string
          sort_order: number | null
          tab_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          features?: string[]
          id?: string
          name: string
          price: string
          sort_order?: number | null
          tab_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          features?: string[]
          id?: string
          name?: string
          price?: string
          sort_order?: number | null
          tab_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "packages_tab_id_fkey"
            columns: ["tab_id"]
            isOneToOne: false
            referencedRelation: "pricing_tabs"
            referencedColumns: ["tab_id"]
          },
        ]
      }
      pricing_tabs: {
        Row: {
          active: boolean
          created_at: string | null
          id: string
          name: string
          sort_order: number | null
          tab_id: string
          updated_at: string | null
        }
        Insert: {
          active?: boolean
          created_at?: string | null
          id?: string
          name: string
          sort_order?: number | null
          tab_id: string
          updated_at?: string | null
        }
        Update: {
          active?: boolean
          created_at?: string | null
          id?: string
          name?: string
          sort_order?: number | null
          tab_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      testimonials: {
        Row: {
          company: string
          created_at: string | null
          id: string
          name: string
          rating: number
          text: string
          updated_at: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          id?: string
          name: string
          rating: number
          text: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          id?: string
          name?: string
          rating?: number
          text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      website_config: {
        Row: {
          company_name: string
          created_at: string | null
          email: string
          hero_headline: string
          hero_subheadline: string
          id: string
          lead_email: string
          lead_webhook_url: string | null
          logo_url: string | null
          phone: string
          seo_description: string
          seo_keywords: string
          seo_title: string
          updated_at: string | null
          whatsapp: string
        }
        Insert: {
          company_name?: string
          created_at?: string | null
          email?: string
          hero_headline?: string
          hero_subheadline?: string
          id?: string
          lead_email?: string
          lead_webhook_url?: string | null
          logo_url?: string | null
          phone?: string
          seo_description?: string
          seo_keywords?: string
          seo_title?: string
          updated_at?: string | null
          whatsapp?: string
        }
        Update: {
          company_name?: string
          created_at?: string | null
          email?: string
          hero_headline?: string
          hero_subheadline?: string
          id?: string
          lead_email?: string
          lead_webhook_url?: string | null
          logo_url?: string | null
          phone?: string
          seo_description?: string
          seo_keywords?: string
          seo_title?: string
          updated_at?: string | null
          whatsapp?: string
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
