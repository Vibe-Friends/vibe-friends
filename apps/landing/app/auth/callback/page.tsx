"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const supabase = createClient();

    // Handle the auth callback - Supabase client automatically
    // picks up tokens from URL hash for magic links
    supabase.auth.onAuthStateChange((event: string, session: any) => {
      if (event === "SIGNED_IN" && session) {
        router.push("/admin/events");
      } else if (event === "SIGNED_OUT" || !session) {
        // Give it a moment to process, then check
        setTimeout(async () => {
          const { data } = await supabase.auth.getSession();
          if (data.session) {
            router.push("/admin/events");
          } else {
            router.push("/admin/login?error=auth_failed");
          }
        }, 500);
      }
    });

    // Also check immediately in case session is already set
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        router.push("/admin/events");
      }
    };
    checkSession();
  }, [router]);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-white/50 font-mono text-sm">Authenticating...</div>
    </div>
  );
}
