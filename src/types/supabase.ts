export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      call_logs: {
        Row: {
          id: string
          caller: string
          recipient: string
          date: string
          time: string
          duration: string
          type: 'incoming' | 'outgoing'
          status: 'completed' | 'missed' | 'voicemail'
          created_at: string
        }
        Insert: {
          id?: string
          caller: string
          recipient: string
          date: string
          time: string
          duration: string
          type: 'incoming' | 'outgoing'
          status: 'completed' | 'missed' | 'voicemail'
          created_at?: string
        }
        Update: {
          id?: string
          caller?: string
          recipient?: string
          date?: string
          time?: string
          duration?: string
          type?: 'incoming' | 'outgoing'
          status?: 'completed' | 'missed' | 'voicemail'
          created_at?: string
        }
      }
      call_transcriptions: {
        Row: {
          id: string
          call_id: string
          full_text: string
          segments: Json
          created_at: string
        }
        Insert: {
          id?: string
          call_id: string
          full_text: string
          segments: Json
          created_at?: string
        }
        Update: {
          id?: string
          call_id?: string
          full_text?: string
          segments?: Json
          created_at?: string
        }
      }
      extracted_info: {
        Row: {
          id: string
          call_id: string
          topics: string[]
          sentiment_score: number
          action_items: string[]
          key_entities: Json
          created_at: string
        }
        Insert: {
          id?: string
          call_id: string
          topics: string[]
          sentiment_score: number
          action_items: string[]
          key_entities: Json
          created_at?: string
        }
        Update: {
          id?: string
          call_id?: string
          topics?: string[]
          sentiment_score?: number
          action_items?: string[]
          key_entities?: Json
          created_at?: string
        }
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
  }
}

export type CallLog = Database['public']['Tables']['call_logs']['Row'];
export type CallTranscription = Database['public']['Tables']['call_transcriptions']['Row'];
export type ExtractedInfo = Database['public']['Tables']['extracted_info']['Row'];
