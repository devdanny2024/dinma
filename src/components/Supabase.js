import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btxevpafjemxndeddpeh.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0eGV2cGFmamVteG5kZWRkcGVoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjkwMjA2MTEsImV4cCI6MjA0NDU5NjYxMX0.ky665HE9rFquDofLDNWi4TGxfjn0pW8tBhVhyuLLBT8';
export const supabase = createClient(supabaseUrl, supabaseKey);
