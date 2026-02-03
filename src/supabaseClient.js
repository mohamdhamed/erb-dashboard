import { createClient } from '@supabase/supabase-js';

// These should ideally be in a .env file, but for now we'll put them here for easier setup.
// I will update the KEY once you provide it.
const supabaseUrl = 'https://jgdgwrahcekcejbnjvoj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpnZGd3cmFoY2VrY2VqYm5qdm9qIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzAxMTQ1MTksImV4cCI6MjA4NTY5MDUxOX0.qOnG5Ri_P-rXl-Wtvaf3QtwT8QD7JYcxZlB1r6-K6_I';

export const supabase = createClient(supabaseUrl, supabaseKey);
