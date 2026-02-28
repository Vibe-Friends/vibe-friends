// SUPABASE DISABLED — uncomment original code below to re-enable

import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  return NextResponse.next({ request });
}

/*
// --- ORIGINAL CODE ---
import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.next({ request });
  }

  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow login page
    if (request.nextUrl.pathname === "/admin/login") {
      // If already logged in, redirect to admin
      if (user) {
        return NextResponse.redirect(new URL("/admin/events", request.url));
      }
      return supabaseResponse;
    }

    // Not logged in - redirect to login
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    // Check if user is in admin allowlist
    const { data: adminEntry } = await supabase
      .from("admin_allowlist")
      .select("email")
      .eq("email", user.email)
      .single();

    if (!adminEntry) {
      // Not an admin - redirect to login with error
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("error", "unauthorized");
      return NextResponse.redirect(loginUrl);
    }
  }

  return supabaseResponse;
}
*/
