// SUPABASE DISABLED — uncomment original code below to re-enable

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-8 text-center">
        <h1 className="text-2xl font-mono tracking-wider text-white mb-4">
          Admin Disabled
        </h1>
        <p className="text-white/50 text-sm font-mono">
          Supabase is currently disabled. Re-enable to access the admin
          dashboard.
        </p>
      </div>
    </div>
  );
}

/*
// --- ORIGINAL CODE ---
"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { checkAdminAndSendMagicLink } from "./actions";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);
  const searchParams = useSearchParams();
  const errorParam = searchParams.get("error");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    const result = await checkAdminAndSendMagicLink(
      email,
      `${window.location.origin}/auth/callback`
    );

    setLoading(false);

    if (result.error === "not_admin") {
      setMessage({ type: "error", text: "This email is not an admin" });
    } else if (result.error) {
      setMessage({ type: "error", text: result.error });
    } else {
      setMessage({
        type: "success",
        text: "Check your email for the magic link!",
      });
    }
  };

  return (
    <>
      {errorParam === "unauthorized" && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
          <p className="text-red-400/90 text-sm text-center font-mono">
            Your email is not authorized for admin access
          </p>
        </div>
      )}

      {errorParam === "auth_failed" && (
        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
          <p className="text-red-400/90 text-sm text-center font-mono">
            Authentication failed. Please try again.
          </p>
        </div>
      )}

      {message && (
        <div
          className={`mb-4 p-3 rounded-lg backdrop-blur-sm ${
            message.type === "success"
              ? "bg-green-500/10 border border-green-500/20"
              : "bg-red-500/10 border border-red-500/20"
          }`}
        >
          <p
            className={`text-sm text-center font-mono ${
              message.type === "success" ? "text-green-400/90" : "text-red-400/90"
            }`}
          >
            {message.text}
          </p>
        </div>
      )}

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-white/70 mb-1.5"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 font-mono text-sm transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm hover:border-white/40 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
        >
          <span className="text-white/60">&gt;</span>
          {loading ? "Sending..." : "Send Magic Link"}
        </button>
      </form>
    </>
  );
}

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-sm bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-mono tracking-wider text-white mb-2">Admin Login</h1>
          <p className="text-white/50 text-sm font-mono">
            Sign in to access the admin dashboard
          </p>
        </div>

        <Suspense fallback={<div className="text-white/40 text-center font-mono">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}
*/
