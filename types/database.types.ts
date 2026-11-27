export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.17"
  }
  public: {
    Tables: {
      cleaning_methods: {
        Row: {
          archived_at: string | null
          chemical_usage: number | null
          chemical_usage_old: number | null
          company_id: string
          created_at: string
          description: string | null
          electricity: number | null
          electricity_old: number | null
          id: string
          module: Database["public"]["Enums"]["module_key"]
          name: string
          packaging: number | null
          packaging_old: number | null
          updated_at: string
          waste_water: number | null
          waste_water_old: number | null
          water_usage: number | null
          water_usage_old: number | null
        }
        Insert: {
          archived_at?: string | null
          chemical_usage?: number | null
          chemical_usage_old?: number | null
          company_id: string
          created_at?: string
          description?: string | null
          electricity?: number | null
          electricity_old?: number | null
          id?: string
          module: Database["public"]["Enums"]["module_key"]
          name: string
          packaging?: number | null
          packaging_old?: number | null
          updated_at?: string
          waste_water?: number | null
          waste_water_old?: number | null
          water_usage?: number | null
          water_usage_old?: number | null
        }
        Update: {
          archived_at?: string | null
          chemical_usage?: number | null
          chemical_usage_old?: number | null
          company_id?: string
          created_at?: string
          description?: string | null
          electricity?: number | null
          electricity_old?: number | null
          id?: string
          module?: Database["public"]["Enums"]["module_key"]
          name?: string
          packaging?: number | null
          packaging_old?: number | null
          updated_at?: string
          waste_water?: number | null
          waste_water_old?: number | null
          water_usage?: number | null
          water_usage_old?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "cleaning_methods_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      clients: {
        Row: {
          accent_color: string | null
          btw_num: string | null
          city: string
          created_at: string | null
          deleted_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          kvk: string | null
          logo_url: string | null
          name: string
          number: string
          owner_company_id: string | null
          postal_code: string
          primary_color: string | null
          secondary_color: string | null
          street: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          accent_color?: string | null
          btw_num?: string | null
          city: string
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          kvk?: string | null
          logo_url?: string | null
          name: string
          number: string
          owner_company_id?: string | null
          postal_code: string
          primary_color?: string | null
          secondary_color?: string | null
          street: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          accent_color?: string | null
          btw_num?: string | null
          city?: string
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          kvk?: string | null
          logo_url?: string | null
          name?: string
          number?: string
          owner_company_id?: string | null
          postal_code?: string
          primary_color?: string | null
          secondary_color?: string | null
          street?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "clients_owner_company_id_fkey"
            columns: ["owner_company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      companies: {
        Row: {
          accent_color: string | null
          btw_num: string | null
          city: string
          created_at: string | null
          deleted_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          kvk: string | null
          logo_url: string | null
          name: string
          number: string
          postal_code: string
          primary_color: string | null
          secondary_color: string | null
          street: string
          updated_at: string | null
          website: string | null
        }
        Insert: {
          accent_color?: string | null
          btw_num?: string | null
          city: string
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          kvk?: string | null
          logo_url?: string | null
          name: string
          number: string
          postal_code: string
          primary_color?: string | null
          secondary_color?: string | null
          street: string
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          accent_color?: string | null
          btw_num?: string | null
          city?: string
          created_at?: string | null
          deleted_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          kvk?: string | null
          logo_url?: string | null
          name?: string
          number?: string
          postal_code?: string
          primary_color?: string | null
          secondary_color?: string | null
          street?: string
          updated_at?: string | null
          website?: string | null
        }
        Relationships: []
      }
      company_clients: {
        Row: {
          client_id: string
          company_id: string
          created_at: string | null
          module: Database["public"]["Enums"]["module_key"]
        }
        Insert: {
          client_id: string
          company_id: string
          created_at?: string | null
          module: Database["public"]["Enums"]["module_key"]
        }
        Update: {
          client_id?: string
          company_id?: string
          created_at?: string | null
          module?: Database["public"]["Enums"]["module_key"]
        }
        Relationships: [
          {
            foreignKeyName: "company_clients_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_clients_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_locations: {
        Row: {
          company_id: string
          created_at: string
          location_id: string
          module: Database["public"]["Enums"]["module_key"]
        }
        Insert: {
          company_id: string
          created_at?: string
          location_id: string
          module: Database["public"]["Enums"]["module_key"]
        }
        Update: {
          company_id?: string
          created_at?: string
          location_id?: string
          module?: Database["public"]["Enums"]["module_key"]
        }
        Relationships: [
          {
            foreignKeyName: "company_locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "company_locations_company_module_fkey"
            columns: ["company_id", "module"]
            isOneToOne: false
            referencedRelation: "company_modules"
            referencedColumns: ["company_id", "module"]
          },
          {
            foreignKeyName: "company_locations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      company_modules: {
        Row: {
          company_id: string
          created_at: string
          module: Database["public"]["Enums"]["module_key"]
        }
        Insert: {
          company_id: string
          created_at?: string
          module: Database["public"]["Enums"]["module_key"]
        }
        Update: {
          company_id?: string
          created_at?: string
          module?: Database["public"]["Enums"]["module_key"]
        }
        Relationships: [
          {
            foreignKeyName: "company_modules_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      curtain_department_settings: {
        Row: {
          created_at: string
          department_id: string
          location_id: string
          maintenance_frequency: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string
          department_id: string
          location_id: string
          maintenance_frequency: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string
          department_id?: string
          location_id?: string
          maintenance_frequency?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "curtain_department_settings_department_fkey"
            columns: ["department_id", "location_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id", "location_id"]
          },
        ]
      }
      curtain_details: {
        Row: {
          category: Database["public"]["Enums"]["item_category"]
          color: string | null
          created_at: string | null
          curtain_type_id: string
          height: number
          item_id: string
          location_id: string
          lower_width: number
          material_id: string | null
          purchase_date: string | null
          updated_at: string | null
          upper_width: number | null
        }
        Insert: {
          category?: Database["public"]["Enums"]["item_category"]
          color?: string | null
          created_at?: string | null
          curtain_type_id: string
          height: number
          item_id: string
          location_id: string
          lower_width: number
          material_id?: string | null
          purchase_date?: string | null
          updated_at?: string | null
          upper_width?: number | null
        }
        Update: {
          category?: Database["public"]["Enums"]["item_category"]
          color?: string | null
          created_at?: string | null
          curtain_type_id?: string
          height?: number
          item_id?: string
          location_id?: string
          lower_width?: number
          material_id?: string | null
          purchase_date?: string | null
          updated_at?: string | null
          upper_width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "curtain_details_curtain_type_id_fkey"
            columns: ["curtain_type_id"]
            isOneToOne: false
            referencedRelation: "curtain_types"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curtain_details_item_fk"
            columns: ["item_id", "location_id", "category"]
            isOneToOne: true
            referencedRelation: "items"
            referencedColumns: ["id", "location_id", "category"]
          },
          {
            foreignKeyName: "curtain_details_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curtain_details_material_id_fkey"
            columns: ["material_id"]
            isOneToOne: false
            referencedRelation: "curtain_materials"
            referencedColumns: ["id"]
          },
        ]
      }
      curtain_materials: {
        Row: {
          archived_at: string | null
          company_id: string
          composition: string | null
          created_at: string
          fire_class: string | null
          id: string
          manufacturer_id: string | null
          max_wash_temp_c: number | null
          name: string
          notes: string | null
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          company_id: string
          composition?: string | null
          created_at?: string
          fire_class?: string | null
          id?: string
          manufacturer_id?: string | null
          max_wash_temp_c?: number | null
          name: string
          notes?: string | null
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          company_id?: string
          composition?: string | null
          created_at?: string
          fire_class?: string | null
          id?: string
          manufacturer_id?: string | null
          max_wash_temp_c?: number | null
          name?: string
          notes?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "curtain_materials_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "curtain_materials_manufacturer_id_fkey"
            columns: ["manufacturer_id"]
            isOneToOne: false
            referencedRelation: "manufacturers"
            referencedColumns: ["id"]
          },
        ]
      }
      curtain_types: {
        Row: {
          archived_at: string | null
          company_id: string
          created_at: string
          description: string | null
          id: string
          name: string
          updated_at: string
        }
        Insert: {
          archived_at?: string | null
          company_id: string
          created_at?: string
          description?: string | null
          id?: string
          name: string
          updated_at?: string
        }
        Update: {
          archived_at?: string | null
          company_id?: string
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "curtain_types_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      departments: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          location_id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          location_id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          location_id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "departments_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      employees: {
        Row: {
          archived_at: string | null
          company_id: string
          created_at: string | null
          id: string
          is_active: boolean
          name: string
          profile_id: string | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          company_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          name: string
          profile_id?: string | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          company_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          name?: string
          profile_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "employees_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          category: Database["public"]["Enums"]["item_category"]
          created_at: string | null
          deleted_at: string | null
          id: string
          last_maintained_by: string | null
          last_maintenance: string | null
          location_id: string
          manufacturer_id: string | null
          name: string
          qr_code_id: string | null
          quantity: number
          rfid_code: string | null
          room_id: string | null
          state: Database["public"]["Enums"]["item_state"]
          status: Database["public"]["Enums"]["item_status"]
          updated_at: string | null
        }
        Insert: {
          category: Database["public"]["Enums"]["item_category"]
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          last_maintained_by?: string | null
          last_maintenance?: string | null
          location_id: string
          manufacturer_id?: string | null
          name: string
          qr_code_id?: string | null
          quantity?: number
          rfid_code?: string | null
          room_id?: string | null
          state?: Database["public"]["Enums"]["item_state"]
          status?: Database["public"]["Enums"]["item_status"]
          updated_at?: string | null
        }
        Update: {
          category?: Database["public"]["Enums"]["item_category"]
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          last_maintained_by?: string | null
          last_maintenance?: string | null
          location_id?: string
          manufacturer_id?: string | null
          name?: string
          qr_code_id?: string | null
          quantity?: number
          rfid_code?: string | null
          room_id?: string | null
          state?: Database["public"]["Enums"]["item_state"]
          status?: Database["public"]["Enums"]["item_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_last_maintained_by_fkey"
            columns: ["last_maintained_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_manufacturer_id_fkey"
            columns: ["manufacturer_id"]
            isOneToOne: false
            referencedRelation: "manufacturers"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "items_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      locations: {
        Row: {
          checkin_procedure: boolean | null
          city: string
          client_id: string
          created_at: string | null
          deleted_at: string | null
          external_id: string | null
          id: string
          internal_id: string | null
          is_active: boolean | null
          name: string
          number: string
          postal_code: string
          street: string
          updated_at: string | null
        }
        Insert: {
          checkin_procedure?: boolean | null
          city: string
          client_id: string
          created_at?: string | null
          deleted_at?: string | null
          external_id?: string | null
          id?: string
          internal_id?: string | null
          is_active?: boolean | null
          name: string
          number: string
          postal_code: string
          street: string
          updated_at?: string | null
        }
        Update: {
          checkin_procedure?: boolean | null
          city?: string
          client_id?: string
          created_at?: string | null
          deleted_at?: string | null
          external_id?: string | null
          id?: string
          internal_id?: string | null
          is_active?: boolean | null
          name?: string
          number?: string
          postal_code?: string
          street?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "locations_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
        ]
      }
      manufacturers: {
        Row: {
          address: string | null
          archived_at: string | null
          category: Database["public"]["Enums"]["item_category"]
          company_id: string
          created_at: string
          id: string
          kvk: string | null
          name: string
          updated_at: string
        }
        Insert: {
          address?: string | null
          archived_at?: string | null
          category: Database["public"]["Enums"]["item_category"]
          company_id: string
          created_at?: string
          id?: string
          kvk?: string | null
          name: string
          updated_at?: string
        }
        Update: {
          address?: string | null
          archived_at?: string | null
          category?: Database["public"]["Enums"]["item_category"]
          company_id?: string
          created_at?: string
          id?: string
          kvk?: string | null
          name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "manufacturers_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      profile_locations: {
        Row: {
          created_at: string | null
          location_id: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          location_id: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          location_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "profile_locations_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profile_locations_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          auth_id: string
          client_id: string | null
          company_id: string | null
          created_at: string | null
          deleted_at: string | null
          email: string
          id: string
          is_active: boolean | null
          name: string
          role: Database["public"]["Enums"]["role_type"]
          updated_at: string | null
        }
        Insert: {
          auth_id: string
          client_id?: string | null
          company_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          name: string
          role: Database["public"]["Enums"]["role_type"]
          updated_at?: string | null
        }
        Update: {
          auth_id?: string
          client_id?: string | null
          company_id?: string | null
          created_at?: string | null
          deleted_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          name?: string
          role?: Database["public"]["Enums"]["role_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_client_id_fkey"
            columns: ["client_id"]
            isOneToOne: false
            referencedRelation: "clients"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      project_item_curtain_details: {
        Row: {
          created_at: string
          height: number | null
          location_id: string
          lower_width: number | null
          project_item_id: string
          updated_at: string | null
          upper_width: number | null
        }
        Insert: {
          created_at?: string
          height?: number | null
          location_id: string
          lower_width?: number | null
          project_item_id: string
          updated_at?: string | null
          upper_width?: number | null
        }
        Update: {
          created_at?: string
          height?: number | null
          location_id?: string
          lower_width?: number | null
          project_item_id?: string
          updated_at?: string | null
          upper_width?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "project_item_curtain_details_project_item_fkey"
            columns: ["project_item_id", "location_id"]
            isOneToOne: false
            referencedRelation: "project_items"
            referencedColumns: ["id", "location_id"]
          },
        ]
      }
      project_items: {
        Row: {
          area_m2: number | null
          building_name: string | null
          cleaning_method_id: string
          company_id: string
          created_at: string
          id: string
          item_category: Database["public"]["Enums"]["item_category"]
          item_id: string
          item_name: string
          location_id: string
          note: string | null
          performed_at: string | null
          performed_by: string | null
          planned_quantity: number
          project_id: string
          quantity: number | null
          room_id: string
          room_name: string | null
          skip_reason: string | null
          status: Database["public"]["Enums"]["project_item_status"]
          status_after: Database["public"]["Enums"]["item_status"] | null
          story_name: string | null
        }
        Insert: {
          area_m2?: number | null
          building_name?: string | null
          cleaning_method_id: string
          company_id: string
          created_at?: string
          id?: string
          item_category: Database["public"]["Enums"]["item_category"]
          item_id: string
          item_name: string
          location_id: string
          note?: string | null
          performed_at?: string | null
          performed_by?: string | null
          planned_quantity: number
          project_id: string
          quantity?: number | null
          room_id: string
          room_name?: string | null
          skip_reason?: string | null
          status?: Database["public"]["Enums"]["project_item_status"]
          status_after?: Database["public"]["Enums"]["item_status"] | null
          story_name?: string | null
        }
        Update: {
          area_m2?: number | null
          building_name?: string | null
          cleaning_method_id?: string
          company_id?: string
          created_at?: string
          id?: string
          item_category?: Database["public"]["Enums"]["item_category"]
          item_id?: string
          item_name?: string
          location_id?: string
          note?: string | null
          performed_at?: string | null
          performed_by?: string | null
          planned_quantity?: number
          project_id?: string
          quantity?: number | null
          room_id?: string
          room_name?: string | null
          skip_reason?: string | null
          status?: Database["public"]["Enums"]["project_item_status"]
          status_after?: Database["public"]["Enums"]["item_status"] | null
          story_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "project_items_cleaning_method_id_fkey"
            columns: ["cleaning_method_id"]
            isOneToOne: false
            referencedRelation: "cleaning_methods"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_items_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_items_performed_by_fkey"
            columns: ["performed_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_items_project_fk"
            columns: ["project_id", "location_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "location_id"]
          },
          {
            foreignKeyName: "project_items_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      project_signatures: {
        Row: {
          company_id: string
          created_at: string | null
          location_id: string
          project_id: string
          signature_storage_path: string
          type: Database["public"]["Enums"]["signature_type"]
        }
        Insert: {
          company_id: string
          created_at?: string | null
          location_id: string
          project_id: string
          signature_storage_path: string
          type: Database["public"]["Enums"]["signature_type"]
        }
        Update: {
          company_id?: string
          created_at?: string | null
          location_id?: string
          project_id?: string
          signature_storage_path?: string
          type?: Database["public"]["Enums"]["signature_type"]
        }
        Relationships: [
          {
            foreignKeyName: "project_signatures_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_signatures_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_signatures_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_vehicle_employees: {
        Row: {
          company_id: string
          created_at: string | null
          employee_id: string
          employee_name: string
          location_id: string
          project_id: string
          project_vehicle_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          employee_id: string
          employee_name: string
          location_id: string
          project_id: string
          project_vehicle_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          employee_id?: string
          employee_name?: string
          location_id?: string
          project_id?: string
          project_vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_vehicle_employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_vehicle_employees_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_vehicle_employees_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_vehicle_employees_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_vehicle_employees_project_vehicle_id_fkey"
            columns: ["project_vehicle_id"]
            isOneToOne: false
            referencedRelation: "project_vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_vehicles: {
        Row: {
          company_id: string
          created_at: string | null
          distance: number | null
          id: string
          license_plate: string | null
          location_id: string
          project_id: string
          vehicle_id: string | null
          vehicle_name: string
          work_date: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          distance?: number | null
          id?: string
          license_plate?: string | null
          location_id: string
          project_id: string
          vehicle_id?: string | null
          vehicle_name: string
          work_date: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          distance?: number | null
          id?: string
          license_plate?: string | null
          location_id?: string
          project_id?: string
          vehicle_id?: string | null
          vehicle_name?: string
          work_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_vehicles_project_id_company_id_location_id_fkey"
            columns: ["project_id", "company_id", "location_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id", "company_id", "location_id"]
          },
          {
            foreignKeyName: "project_vehicles_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          client_name: string | null
          company_id: string
          created_at: string | null
          deleted_at: string | null
          description: string | null
          end_date: string
          external_id: string | null
          finished_by: string | null
          id: string
          internal_id: string | null
          location_address: string | null
          location_id: string
          location_name: string | null
          name: string
          planned_by: string
          project_code: string | null
          project_module: Database["public"]["Enums"]["module_key"]
          signed_at: string | null
          start_date: string
          status: Database["public"]["Enums"]["project_status"]
          type: Database["public"]["Enums"]["project_type"] | null
          updated_at: string | null
        }
        Insert: {
          client_name?: string | null
          company_id: string
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date: string
          external_id?: string | null
          finished_by?: string | null
          id?: string
          internal_id?: string | null
          location_address?: string | null
          location_id: string
          location_name?: string | null
          name: string
          planned_by: string
          project_code?: string | null
          project_module: Database["public"]["Enums"]["module_key"]
          signed_at?: string | null
          start_date: string
          status?: Database["public"]["Enums"]["project_status"]
          type?: Database["public"]["Enums"]["project_type"] | null
          updated_at?: string | null
        }
        Update: {
          client_name?: string | null
          company_id?: string
          created_at?: string | null
          deleted_at?: string | null
          description?: string | null
          end_date?: string
          external_id?: string | null
          finished_by?: string | null
          id?: string
          internal_id?: string | null
          location_address?: string | null
          location_id?: string
          location_name?: string | null
          name?: string
          planned_by?: string
          project_code?: string | null
          project_module?: Database["public"]["Enums"]["module_key"]
          signed_at?: string | null
          start_date?: string
          status?: Database["public"]["Enums"]["project_status"]
          type?: Database["public"]["Enums"]["project_type"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_finished_by_fkey"
            columns: ["finished_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "projects_planned_by_fkey"
            columns: ["planned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      rooms: {
        Row: {
          category: string | null
          created_at: string
          deleted_at: string | null
          department_id: string | null
          function: string | null
          id: string
          is_active: boolean
          location_id: string
          name: string
          section: string | null
          story_id: string
          updated_at: string
        }
        Insert: {
          category?: string | null
          created_at?: string
          deleted_at?: string | null
          department_id?: string | null
          function?: string | null
          id?: string
          is_active?: boolean
          location_id: string
          name: string
          section?: string | null
          story_id: string
          updated_at?: string
        }
        Update: {
          category?: string | null
          created_at?: string
          deleted_at?: string | null
          department_id?: string | null
          function?: string | null
          id?: string
          is_active?: boolean
          location_id?: string
          name?: string
          section?: string | null
          story_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "rooms_department_id_fkey"
            columns: ["department_id"]
            isOneToOne: false
            referencedRelation: "departments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "rooms_story_location_fk"
            columns: ["story_id", "location_id"]
            isOneToOne: false
            referencedRelation: "stories"
            referencedColumns: ["id", "location_id"]
          },
        ]
      }
      stories: {
        Row: {
          created_at: string | null
          deleted_at: string | null
          id: string
          location_id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          location_id: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          deleted_at?: string | null
          id?: string
          location_id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stories_location_id_fkey"
            columns: ["location_id"]
            isOneToOne: false
            referencedRelation: "locations"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicle_default_employees: {
        Row: {
          company_id: string
          created_at: string
          employee_id: string
          vehicle_id: string
        }
        Insert: {
          company_id: string
          created_at?: string
          employee_id: string
          vehicle_id: string
        }
        Update: {
          company_id?: string
          created_at?: string
          employee_id?: string
          vehicle_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "vehicle_default_employees_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_default_employees_employee_id_fkey"
            columns: ["employee_id"]
            isOneToOne: false
            referencedRelation: "employees"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "vehicle_default_employees_vehicle_id_fkey"
            columns: ["vehicle_id"]
            isOneToOne: false
            referencedRelation: "vehicles"
            referencedColumns: ["id"]
          },
        ]
      }
      vehicles: {
        Row: {
          archived_at: string | null
          city: string | null
          co2: number | null
          co2_old: number | null
          company_id: string
          created_at: string | null
          id: string
          is_active: boolean
          license_plate: string | null
          name: string
          number: string | null
          postal_code: string | null
          street: string | null
          updated_at: string | null
        }
        Insert: {
          archived_at?: string | null
          city?: string | null
          co2?: number | null
          co2_old?: number | null
          company_id: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          license_plate?: string | null
          name: string
          number?: string | null
          postal_code?: string | null
          street?: string | null
          updated_at?: string | null
        }
        Update: {
          archived_at?: string | null
          city?: string | null
          co2?: number | null
          co2_old?: number | null
          company_id?: string
          created_at?: string | null
          id?: string
          is_active?: boolean
          license_plate?: string | null
          name?: string
          number?: string | null
          postal_code?: string | null
          street?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "vehicles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      client_can_read_cleaning_method: {
        Args: { p_method_id: string }
        Returns: boolean
      }
      create_cleaning_method: {
        Args: {
          p_chemical_usage?: number
          p_chemical_usage_old?: number
          p_description?: string
          p_electricity?: number
          p_electricity_old?: number
          p_module: Database["public"]["Enums"]["module_key"]
          p_name: string
          p_packaging?: number
          p_packaging_old?: number
          p_waste_water?: number
          p_waste_water_old?: number
          p_water_usage?: number
          p_water_usage_old?: number
        }
        Returns: string
      }
      create_client: {
        Args: {
          p_accent_color?: string
          p_btw_num?: string
          p_city: string
          p_email?: string
          p_kvk?: string
          p_logo_url?: string
          p_module_key: Database["public"]["Enums"]["module_key"]
          p_name: string
          p_number: string
          p_postal_code: string
          p_primary_color?: string
          p_secondary_color?: string
          p_street: string
          p_website?: string
        }
        Returns: {
          accent_color: string | null
          btw_num: string | null
          city: string
          created_at: string | null
          deleted_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          kvk: string | null
          logo_url: string | null
          name: string
          number: string
          owner_company_id: string | null
          postal_code: string
          primary_color: string | null
          secondary_color: string | null
          street: string
          updated_at: string | null
          website: string | null
        }
        SetofOptions: {
          from: "*"
          to: "clients"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_curtain_item: {
        Args: {
          p_color?: string
          p_curtain_type_id?: string
          p_height: number
          p_lower_width: number
          p_manufacturer_id?: string
          p_material_id?: string
          p_name: string
          p_purchase_date?: string
          p_qr_code_id?: string
          p_quantity?: number
          p_rfid_code?: string
          p_room_id: string
          p_upper_width?: number
        }
        Returns: string
      }
      create_curtain_project: {
        Args: {
          p_description?: string
          p_end_date: string
          p_items: Json
          p_location_id: string
          p_name: string
          p_project_code?: string
          p_start_date: string
          p_vehicles?: Json
        }
        Returns: string
      }
      create_employee: {
        Args: {
          p_name: string
          p_profile_id?: string
          p_vehicle_ids?: string[]
        }
        Returns: string
      }
      create_location: {
        Args: {
          p_checkin_procedure: boolean
          p_city: string
          p_client_id: string
          p_external_id?: string
          p_internal_id?: string
          p_module_key: Database["public"]["Enums"]["module_key"]
          p_name: string
          p_number: string
          p_postal_code: string
          p_street: string
        }
        Returns: {
          checkin_procedure: boolean | null
          city: string
          client_id: string
          created_at: string | null
          deleted_at: string | null
          external_id: string | null
          id: string
          internal_id: string | null
          is_active: boolean | null
          name: string
          number: string
          postal_code: string
          street: string
          updated_at: string | null
        }
        SetofOptions: {
          from: "*"
          to: "locations"
          isOneToOne: true
          isSetofReturn: false
        }
      }
      create_vehicle: {
        Args: {
          p_city?: string
          p_co2?: number
          p_co2_old?: number
          p_license_plate?: string
          p_name: string
          p_number?: string
          p_postal_code?: string
          p_street?: string
        }
        Returns: string
      }
      custom_access_token_hook: { Args: { event: Json }; Returns: Json }
      delete_cleaning_method: {
        Args: { p_cleaning_method_id: string }
        Returns: string
      }
      get_accessible_location_ids: { Args: never; Returns: string[] }
      get_client_curtain_material_ids: { Args: never; Returns: string[] }
      get_client_curtain_type_ids: { Args: never; Returns: string[] }
      get_client_id: { Args: never; Returns: string }
      get_client_manufacturer_ids: { Args: never; Returns: string[] }
      get_company_id: { Args: never; Returns: string }
      get_company_location_ids: { Args: never; Returns: string[] }
      get_company_location_profile_ids: { Args: never; Returns: string[] }
      get_curtain_count_by_story: {
        Args: { p_story_id: string }
        Returns: number
      }
      get_location_curtain_m2: {
        Args: { p_location_id: string }
        Returns: number
      }
      get_location_item_counts: {
        Args: { p_location_id: string }
        Returns: {
          category: Database["public"]["Enums"]["item_category"]
          item_count: number
          total_quantity: number
        }[]
      }
      get_location_last_completed_project: {
        Args: { p_location_id: string }
        Returns: string
      }
      get_profile_id: { Args: never; Returns: string }
      get_profile_location_ids: { Args: never; Returns: string[] }
      get_project_co2: {
        Args: { p_project_id: string }
        Returns: {
          co2: number
          co2_old: number
          co2_saved: number
          total_distance: number
        }[]
      }
      has_role: {
        Args: { check_role: Database["public"]["Enums"]["role_type"] }
        Returns: boolean
      }
      is_client_user: { Args: never; Returns: boolean }
      is_company_admin: { Args: never; Returns: boolean }
      is_company_user: { Args: never; Returns: boolean }
      module_categories: {
        Args: { p_module: Database["public"]["Enums"]["module_key"] }
        Returns: Database["public"]["Enums"]["item_category"][]
      }
      remove_employee: { Args: { p_employee_id: string }; Returns: string }
      remove_vehicle: { Args: { p_vehicle_id: string }; Returns: string }
      soft_delete_item: { Args: { p_item_id: string }; Returns: undefined }
      soft_delete_room_with_items: {
        Args: { p_room_id: string }
        Returns: undefined
      }
      update_cleaning_method: {
        Args: {
          p_chemical_usage?: number
          p_chemical_usage_old?: number
          p_cleaning_method_id: string
          p_description?: string
          p_electricity?: number
          p_electricity_old?: number
          p_module: Database["public"]["Enums"]["module_key"]
          p_name: string
          p_packaging?: number
          p_packaging_old?: number
          p_waste_water?: number
          p_waste_water_old?: number
          p_water_usage?: number
          p_water_usage_old?: number
        }
        Returns: string
      }
      update_employee: {
        Args: {
          p_employee_id: string
          p_name: string
          p_profile_id?: string
          p_vehicle_ids?: string[]
        }
        Returns: string
      }
      update_vehicle: {
        Args: {
          p_city?: string
          p_co2?: number
          p_co2_old?: number
          p_license_plate?: string
          p_name: string
          p_number?: string
          p_postal_code?: string
          p_street?: string
          p_vehicle_id: string
        }
        Returns: string
      }
    }
    Enums: {
      item_category:
        | "curtain"
        | "floor"
        | "chair"
        | "bed"
        | "lighting"
        | "sheets"
        | "closet"
      item_state:
        | "in_room"
        | "in_laundry"
        | "in_storage"
        | "in_repair"
        | "retired"
      item_status: "good" | "moderate" | "poor"
      module_key: "curtains" | "floors" | "chairs"
      project_item_status: "planned" | "done" | "skipped"
      project_status:
        | "planned"
        | "active"
        | "pending_approval"
        | "approved"
        | "cancelled"
      project_type: "standard" | "requested" | "other"
      role_type:
        | "super_admin"
        | "client_admin"
        | "company_admin"
        | "client_viewer"
        | "company_employee"
        | "company_planner"
        | "client_sub_admin"
      signature_type: "company" | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      item_category: [
        "curtain",
        "floor",
        "chair",
        "bed",
        "lighting",
        "sheets",
        "closet",
      ],
      item_state: [
        "in_room",
        "in_laundry",
        "in_storage",
        "in_repair",
        "retired",
      ],
      item_status: ["good", "moderate", "poor"],
      module_key: ["curtains", "floors", "chairs"],
      project_item_status: ["planned", "done", "skipped"],
      project_status: [
        "planned",
        "active",
        "pending_approval",
        "approved",
        "cancelled",
      ],
      project_type: ["standard", "requested", "other"],
      role_type: [
        "super_admin",
        "client_admin",
        "company_admin",
        "client_viewer",
        "company_employee",
        "company_planner",
        "client_sub_admin",
      ],
      signature_type: ["company", "client"],
    },
  },
} as const
