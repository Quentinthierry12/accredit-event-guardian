// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://aiekyroleckuehfktccb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpZWt5cm9sZWNrdWVoZmt0Y2NiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU2MDE4MjMsImV4cCI6MjA2MTE3NzgyM30.tqopI0oU5Pu30iIFIOadW3a-2bQcVB8DaKcS2a8-nlU";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);