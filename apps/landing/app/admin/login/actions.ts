"use server";

import { createClient } from "@/lib/supabase/server";

export async function checkAdminAndSendMagicLink(email: string, redirectTo: string) {
  const supabase = await createClient();

  // Check if email is in admin allowlist
  const { data: admin } = await supabase
    .from("admin_allowlist")
    .select("email")
    .eq("email", email.toLowerCase())
    .single();

  if (!admin) {
    return { error: "not_admin" };
  }

  // Send magic link
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return { success: true };
}
