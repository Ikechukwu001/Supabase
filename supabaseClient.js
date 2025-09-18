import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wognttofnliwzkrnoosk.supabase.co"  // replace with your API URL
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndvZ250dG9mbmxpd3prcm5vb3NrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTc2NTUwODUsImV4cCI6MjA3MzIzMTA4NX0.lPC0IbVO-NiDI3CJcmhhsKlGS5_lHZHGPnJjMVwViVg"  // replace with your anon key
export const supabase = createClient(supabaseUrl, supabaseKey)