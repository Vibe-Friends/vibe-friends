// Supabase Edge Function: cleanup-events
// Runs daily via pg_cron to:
// 1. Soft delete expired events (end_date < today)
// 2. Hard delete events soft-deleted more than 7 days ago

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const today = new Date().toISOString().split("T")[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // 1. Soft delete expired events (where end_date or start_date < today and not already deleted)
    const { data: softDeleted, error: softDeleteError } = await supabase
      .from("events")
      .update({ deleted_at: new Date().toISOString() })
      .is("deleted_at", null)
      .or(`end_date.lt.${today},and(end_date.is.null,start_date.lt.${today})`)
      .select("id");

    if (softDeleteError) {
      throw softDeleteError;
    }

    // 2. Hard delete events that were soft-deleted more than 7 days ago
    const { data: hardDeleted, error: hardDeleteError } = await supabase
      .from("events")
      .delete()
      .lt("deleted_at", sevenDaysAgo)
      .select("id");

    if (hardDeleteError) {
      throw hardDeleteError;
    }

    const result = {
      success: true,
      softDeleted: softDeleted?.length ?? 0,
      hardDeleted: hardDeleted?.length ?? 0,
      timestamp: new Date().toISOString(),
    };

    console.log("Cleanup completed:", result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Cleanup error:", error);

    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
