// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gvbnutdzjsodhmxfnsjx.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd2Ym51dGR6anNvZGhteGZuc2p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyNjIwMDcsImV4cCI6MjA2NDgzODAwN30.o9HWVGKfOVGZ_v7A6P7JQGtvs7SiBgZOZ6qaa8TELWs";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);