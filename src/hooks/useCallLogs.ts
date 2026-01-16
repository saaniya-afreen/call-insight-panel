import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CallLog, CallTranscription, ExtractedInfo } from '@/types/supabase';

export const useCallLogs = () => {
  return useQuery({
    queryKey: ['call-logs'],
    queryFn: async (): Promise<CallLog[]> => {
      const { data, error } = await supabase
        .from('call_logs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data || [];
    },
  });
};

export const useCallTranscription = (callId: string | null) => {
  return useQuery({
    queryKey: ['call-transcription', callId],
    queryFn: async (): Promise<CallTranscription | null> => {
      if (!callId) return null;
      
      const { data, error } = await supabase
        .from('call_transcriptions')
        .select('*')
        .eq('call_id', callId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!callId,
  });
};

export const useExtractedInfo = (callId: string | null) => {
  return useQuery({
    queryKey: ['extracted-info', callId],
    queryFn: async (): Promise<ExtractedInfo | null> => {
      if (!callId) return null;
      
      const { data, error } = await supabase
        .from('extracted_info')
        .select('*')
        .eq('call_id', callId)
        .maybeSingle();

      if (error) throw error;
      return data;
    },
    enabled: !!callId,
  });
};
