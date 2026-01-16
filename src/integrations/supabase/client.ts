import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

const SUPABASE_URL = "https://trhbxyilvfqfzvmhxlih.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRyaGJ4eWlsdmZxZnp2bWh4bGloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg1NDAxODAsImV4cCI6MjA4NDExNjE4MH0.fp6z2TGGeta5b2vfZByAa-kKs7tuNfwDQLJmKUXcQys";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
