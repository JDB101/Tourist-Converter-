// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

// Replace these with your Supabase project URL and API key
const supabaseUrl = 'https://ktecazmbhpizfyfbndep.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt0ZWNhem1iaHBpemZ5ZmJuZGVwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMzI5MzY1NywiZXhwIjoyMDQ4ODY5NjU3fQ.bsswrVGhFU0JwjNeSu2TxMcUGCSdJfvm48cTMDzOAko';

export const supabase = createClient(supabaseUrl, supabaseKey);
