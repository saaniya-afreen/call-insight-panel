import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CallLog } from '@/types/supabase';

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
