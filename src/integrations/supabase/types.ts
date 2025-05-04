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
      addresses: {
        Row: {
          citizen_id: string
          city: string
          country: string
          created_at: string
          id: string
          is_primary: boolean
          state: string
          street: string
          updated_at: string
          valid_from: string
          valid_to: string | null
          zip_code: string
        }
        Insert: {
          citizen_id: string
          city: string
          country?: string
          created_at?: string
          id?: string
          is_primary?: boolean
          state: string
          street: string
          updated_at?: string
          valid_from?: string
          valid_to?: string | null
          zip_code: string
        }
        Update: {
          citizen_id?: string
          city?: string
          country?: string
          created_at?: string
          id?: string
          is_primary?: boolean
          state?: string
          street?: string
          updated_at?: string
          valid_from?: string
          valid_to?: string | null
          zip_code?: string
        }
        Relationships: [
          {
            foreignKeyName: "addresses_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizen_records"
            referencedColumns: ["id"]
          },
        ]
      }
      arrests: {
        Row: {
          access_level: number
          agency: string
          arresting_officer: string
          charges: Json
          created_at: string
          criminal_record_id: string
          date: string
          id: string
          location: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          access_level?: number
          agency: string
          arresting_officer: string
          charges?: Json
          created_at?: string
          criminal_record_id: string
          date: string
          id?: string
          location: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          access_level?: number
          agency?: string
          arresting_officer?: string
          charges?: Json
          created_at?: string
          criminal_record_id?: string
          date?: string
          id?: string
          location?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "arrests_criminal_record_id_fkey"
            columns: ["criminal_record_id"]
            isOneToOne: false
            referencedRelation: "criminal_records"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          access_level: number
          action: string
          details: Json
          id: string
          ip_address: string
          target_id: string
          target_type: string
          timestamp: string
          user_id: string
        }
        Insert: {
          access_level?: number
          action: string
          details?: Json
          id?: string
          ip_address: string
          target_id: string
          target_type: string
          timestamp?: string
          user_id: string
        }
        Update: {
          access_level?: number
          action?: string
          details?: Json
          id?: string
          ip_address?: string
          target_id?: string
          target_type?: string
          timestamp?: string
          user_id?: string
        }
        Relationships: []
      }
      cadet_classes: {
        Row: {
          cadet_id: string
          class_id: string
        }
        Insert: {
          cadet_id: string
          class_id: string
        }
        Update: {
          cadet_id?: string
          class_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cadet_classes_cadet_id_fkey"
            columns: ["cadet_id"]
            isOneToOne: false
            referencedRelation: "cadets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cadet_classes_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
        ]
      }
      cadet_module_validations: {
        Row: {
          cadet_id: string
          id: string
          module_id: string
          validated: boolean
        }
        Insert: {
          cadet_id: string
          id?: string
          module_id: string
          validated?: boolean
        }
        Update: {
          cadet_id?: string
          id?: string
          module_id?: string
          validated?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "cadet_module_validations_cadet_id_fkey"
            columns: ["cadet_id"]
            isOneToOne: false
            referencedRelation: "cadets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cadet_module_validations_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      cadet_sub_module_scores: {
        Row: {
          cadet_id: string
          id: string
          notes: string | null
          score: number
          sub_module_id: string
        }
        Insert: {
          cadet_id: string
          id?: string
          notes?: string | null
          score?: number
          sub_module_id: string
        }
        Update: {
          cadet_id?: string
          id?: string
          notes?: string | null
          score?: number
          sub_module_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cadet_sub_module_scores_cadet_id_fkey"
            columns: ["cadet_id"]
            isOneToOne: false
            referencedRelation: "cadets"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "cadet_sub_module_scores_sub_module_id_fkey"
            columns: ["sub_module_id"]
            isOneToOne: false
            referencedRelation: "sub_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      cadets: {
        Row: {
          certified: boolean
          created_at: string
          enrollment_date: string
          id: string
          name: string
          server_id: string
        }
        Insert: {
          certified?: boolean
          created_at?: string
          enrollment_date: string
          id?: string
          name: string
          server_id: string
        }
        Update: {
          certified?: boolean
          created_at?: string
          enrollment_date?: string
          id?: string
          name?: string
          server_id?: string
        }
        Relationships: []
      }
      citizen_records: {
        Row: {
          access_level: number
          aliases: Json | null
          created_at: string
          created_by: string
          date_of_birth: string
          full_name: string
          id: string
          photo: string | null
          updated_at: string
          updated_by: string
        }
        Insert: {
          access_level?: number
          aliases?: Json | null
          created_at?: string
          created_by: string
          date_of_birth: string
          full_name: string
          id?: string
          photo?: string | null
          updated_at?: string
          updated_by: string
        }
        Update: {
          access_level?: number
          aliases?: Json | null
          created_at?: string
          created_by?: string
          date_of_birth?: string
          full_name?: string
          id?: string
          photo?: string | null
          updated_at?: string
          updated_by?: string
        }
        Relationships: []
      }
      civilian_reports: {
        Row: {
          access_level: number
          civilian_id: string | null
          content: string
          created_at: string
          generated_by: string
          id: string
          report_type: string
        }
        Insert: {
          access_level?: number
          civilian_id?: string | null
          content: string
          created_at?: string
          generated_by: string
          id?: string
          report_type: string
        }
        Update: {
          access_level?: number
          civilian_id?: string | null
          content?: string
          created_at?: string
          generated_by?: string
          id?: string
          report_type?: string
        }
        Relationships: []
      }
      class_module_settings: {
        Row: {
          class_id: string
          is_visible: boolean
          module_id: string
        }
        Insert: {
          class_id: string
          is_visible?: boolean
          module_id: string
        }
        Update: {
          class_id?: string
          is_visible?: boolean
          module_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "class_module_settings_class_id_fkey"
            columns: ["class_id"]
            isOneToOne: false
            referencedRelation: "classes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "class_module_settings_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      classes: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      convictions: {
        Row: {
          access_level: number
          case_number: string
          charge: string
          court: string
          created_at: string
          criminal_record_id: string
          date: string
          id: string
          sentence: string
          updated_at: string
        }
        Insert: {
          access_level?: number
          case_number: string
          charge: string
          court: string
          created_at?: string
          criminal_record_id: string
          date: string
          id?: string
          sentence: string
          updated_at?: string
        }
        Update: {
          access_level?: number
          case_number?: string
          charge?: string
          court?: string
          created_at?: string
          criminal_record_id?: string
          date?: string
          id?: string
          sentence?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "convictions_criminal_record_id_fkey"
            columns: ["criminal_record_id"]
            isOneToOne: false
            referencedRelation: "criminal_records"
            referencedColumns: ["id"]
          },
        ]
      }
      criminal_records: {
        Row: {
          citizen_id: string
          created_at: string
          id: string
          updated_at: string
        }
        Insert: {
          citizen_id: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Update: {
          citizen_id?: string
          created_at?: string
          id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "criminal_records_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizen_records"
            referencedColumns: ["id"]
          },
        ]
      }
      employment: {
        Row: {
          address_id: string | null
          citizen_id: string
          created_at: string
          employer: string
          end_date: string | null
          id: string
          position: string
          start_date: string
          updated_at: string
        }
        Insert: {
          address_id?: string | null
          citizen_id: string
          created_at?: string
          employer: string
          end_date?: string | null
          id?: string
          position: string
          start_date: string
          updated_at?: string
        }
        Update: {
          address_id?: string | null
          citizen_id?: string
          created_at?: string
          employer?: string
          end_date?: string | null
          id?: string
          position?: string
          start_date?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "employment_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employment_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizen_records"
            referencedColumns: ["id"]
          },
        ]
      }
      evidence: {
        Row: {
          access_level: number
          description: string
          file_url: string
          filename: string
          id: string
          type: string
          uploaded_at: string
          uploaded_by: string
          warrant_id: string
        }
        Insert: {
          access_level?: number
          description: string
          file_url: string
          filename: string
          id?: string
          type: string
          uploaded_at?: string
          uploaded_by: string
          warrant_id: string
        }
        Update: {
          access_level?: number
          description?: string
          file_url?: string
          filename?: string
          id?: string
          type?: string
          uploaded_at?: string
          uploaded_by?: string
          warrant_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "evidence_warrant_id_fkey"
            columns: ["warrant_id"]
            isOneToOne: false
            referencedRelation: "warrants"
            referencedColumns: ["id"]
          },
        ]
      }
      flags: {
        Row: {
          access_level: number
          citizen_id: string
          created_at: string
          created_by: string
          description: string
          expires_at: string | null
          id: string
          type: string
        }
        Insert: {
          access_level?: number
          citizen_id: string
          created_at?: string
          created_by: string
          description: string
          expires_at?: string | null
          id?: string
          type: string
        }
        Update: {
          access_level?: number
          citizen_id?: string
          created_at?: string
          created_by?: string
          description?: string
          expires_at?: string | null
          id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "flags_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizen_records"
            referencedColumns: ["id"]
          },
        ]
      }
      logs: {
        Row: {
          auteur: string
          details: Json
          id: string
          role: string
          timestamp: string
          type: string
        }
        Insert: {
          auteur: string
          details?: Json
          id?: string
          role: string
          timestamp?: string
          type: string
        }
        Update: {
          auteur?: string
          details?: Json
          id?: string
          role?: string
          timestamp?: string
          type?: string
        }
        Relationships: []
      }
      modules: {
        Row: {
          description: string | null
          id: string
          max_points: number
          name: string
        }
        Insert: {
          description?: string | null
          id: string
          max_points: number
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          max_points?: number
          name?: string
        }
        Relationships: []
      }
      report_templates: {
        Row: {
          access_level: number
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          template: string
          updated_at: string
        }
        Insert: {
          access_level?: number
          created_at?: string
          created_by: string
          description?: string | null
          id?: string
          name: string
          template: string
          updated_at?: string
        }
        Update: {
          access_level?: number
          created_at?: string
          created_by?: string
          description?: string | null
          id?: string
          name?: string
          template?: string
          updated_at?: string
        }
        Relationships: []
      }
      sub_modules: {
        Row: {
          description: string | null
          id: string
          max_points: number
          module_id: string
          name: string
        }
        Insert: {
          description?: string | null
          id: string
          max_points: number
          module_id: string
          name: string
        }
        Update: {
          description?: string | null
          id?: string
          max_points?: number
          module_id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "sub_modules_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "modules"
            referencedColumns: ["id"]
          },
        ]
      }
      system_users: {
        Row: {
          access_level: number
          badge_number: string | null
          created_at: string
          department: string
          email: string
          full_name: string
          id: string
          is_active: boolean
          last_login: string | null
          password: string
          username: string
        }
        Insert: {
          access_level: number
          badge_number?: string | null
          created_at?: string
          department: string
          email: string
          full_name: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password: string
          username: string
        }
        Update: {
          access_level?: number
          badge_number?: string | null
          created_at?: string
          department?: string
          email?: string
          full_name?: string
          id?: string
          is_active?: boolean
          last_login?: string | null
          password?: string
          username?: string
        }
        Relationships: []
      }
      user_login_logs: {
        Row: {
          email: string
          id: string
          ip_address: string | null
          login_time: string | null
          role: string
          user_agent: string | null
          user_id: string
        }
        Insert: {
          email: string
          id?: string
          ip_address?: string | null
          login_time?: string | null
          role: string
          user_agent?: string | null
          user_id: string
        }
        Update: {
          email?: string
          id?: string
          ip_address?: string | null
          login_time?: string | null
          role?: string
          user_agent?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          date_creation: string
          email: string
          id: string
          mot_de_passe: string
          nom: string
          prenom: string
          role: string
        }
        Insert: {
          date_creation?: string
          email: string
          id?: string
          mot_de_passe: string
          nom: string
          prenom: string
          role: string
        }
        Update: {
          date_creation?: string
          email?: string
          id?: string
          mot_de_passe?: string
          nom?: string
          prenom?: string
          role?: string
        }
        Relationships: []
      }
      warrants: {
        Row: {
          access_level: number
          approved_by: string | null
          citizen_id: string
          created_at: string
          expiration_date: string | null
          id: string
          issue_date: string | null
          justification: string
          requested_by: string
          reviewed_by: string | null
          status: string
          type: string
          updated_at: string
        }
        Insert: {
          access_level?: number
          approved_by?: string | null
          citizen_id: string
          created_at?: string
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          justification: string
          requested_by: string
          reviewed_by?: string | null
          status: string
          type: string
          updated_at?: string
        }
        Update: {
          access_level?: number
          approved_by?: string | null
          citizen_id?: string
          created_at?: string
          expiration_date?: string | null
          id?: string
          issue_date?: string | null
          justification?: string
          requested_by?: string
          reviewed_by?: string | null
          status?: string
          type?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "warrants_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizen_records"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_log: {
        Args: { log_type: string; log_details?: Json }
        Returns: string
      }
      get_report_templates_by_access_level: {
        Args: { required_level: number }
        Returns: {
          access_level: number
          created_at: string
          created_by: string
          description: string | null
          id: string
          name: string
          template: string
          updated_at: string
        }[]
      }
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
