import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://jjyjmoygxdiqialjuqnc.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqeWptb3lneGRpcWlhbGp1cW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MjkwMDksImV4cCI6MjA4OTQwNTAwOX0.sWXJFNiZtotC2CC2O8FuQmhQY8VEMbJJaqhU1uY1v6I";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
