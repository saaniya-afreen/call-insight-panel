import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import type { CallLog } from '@/types/supabase';

interface UseCallLogsOptions {
  page: number;
  pageSize: number;
}

interface CallLogsResult {
  data: CallLog[];
  totalCount: number;
}

export const useCallLogs = ({ page, pageSize }: UseCallLogsOptions) => {
  return useQuery({
    queryKey: ['call-logs', page, pageSize],
    queryFn: async (): Promise<CallLogsResult> => {
      // Get total count
      const { count, error: countError } = await supabase
        .from('call_logs')
        .select('*', { count: 'exact', head: true });

      if (countError) throw countError;

      // Get paginated data
      const from = (page - 1) * pageSize;
      const to = from + pageSize - 1;

      const { data, error } = await supabase
        .from('call_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .range(from, to);

      if (error) throw error;

      return {
        data: data || [],
        totalCount: count || 0,
      };
    },
  });
};
