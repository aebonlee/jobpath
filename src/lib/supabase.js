import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: true,
    autoRefreshToken: true,
    persistSession: true,
  },
});

const PREFIX = 'forjob_';

export const TABLES = {
  PROFILES: `${PREFIX}profiles`,
  SUBJECTS: `${PREFIX}subjects`,
  QUESTIONS: `${PREFIX}questions`,
  SILGI_QUESTIONS: `${PREFIX}silgi_questions`,
  EXAM_SESSIONS: `${PREFIX}exam_sessions`,
  EXAM_ANSWERS: `${PREFIX}exam_answers`,
  BOOKMARKS: `${PREFIX}bookmarks`,
  WRONG_ANSWERS: `${PREFIX}wrong_answers`,
  ORDERS: `${PREFIX}orders`,
};
