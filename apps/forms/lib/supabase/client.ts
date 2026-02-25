// SUPABASE DISABLED — uncomment original code below to re-enable

let warned = false;
const warn = () => {
  if (!warned) {
    console.warn("[Supabase] Disabled - returning stub");
    warned = true;
  }
};

const noopChain = (): any => {
  const c: any = { data: null, error: null, count: null };
  [
    "select",
    "insert",
    "update",
    "delete",
    "eq",
    "neq",
    "in",
    "is",
    "single",
    "order",
    "limit",
    "range",
  ].forEach((m) => {
    c[m] = () => noopChain();
  });
  c.then = (r: any) => Promise.resolve({ data: null, error: null }).then(r);
  c.catch = (f: any) => Promise.resolve({ data: null, error: null }).catch(f);
  return c;
};

export function createClient() {
  warn();
  return {
    auth: {
      getUser: async () => ({ data: { user: null }, error: null }),
      signInWithOAuth: async () => ({ error: null }),
      signInWithOtp: async () => ({ error: null }),
      signOut: async () => ({ error: null }),
      exchangeCodeForSession: async () => ({ data: {}, error: null }),
      onAuthStateChange: () => ({
        data: { subscription: { unsubscribe: () => {} } },
      }),
    },
    from: () => noopChain(),
    storage: {
      from: () => ({
        upload: async () => ({ error: null }),
        getPublicUrl: () => ({ data: { publicUrl: "" } }),
      }),
    },
  } as any;
}

/*
// --- ORIGINAL CODE ---
import { createBrowserClient } from '@supabase/ssr'
import { Database } from '@/lib/database.types'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_FORMS_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_FORMS_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      'Missing Supabase environment variables. Please check your .env.local file.\n' +
      'Required: NEXT_PUBLIC_FORMS_SUPABASE_URL and NEXT_PUBLIC_FORMS_SUPABASE_ANON_KEY'
    )
  }

  return createBrowserClient<Database>(supabaseUrl, supabaseAnonKey)
}
*/
