import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://fwahsmrzppfkeptjzemg.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ3YWhzbXJ6cHBma2VwdGp6ZW1nIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ0NDMzNzQsImV4cCI6MjA3MDAxOTM3NH0.Ql5eki2rZUPaf_w5PzC6ITjVTAVgKgm0vn01Ot8DDc8'

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 