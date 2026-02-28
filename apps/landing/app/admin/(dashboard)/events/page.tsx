// SUPABASE DISABLED — uncomment original code below to re-enable

export default function EventsPage() {
  return (
    <div className="text-white/40 text-center py-12 font-mono">
      Admin dashboard disabled — Supabase is offline.
    </div>
  );
}

/*
// --- ORIGINAL CODE ---
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Plus } from "lucide-react";
import { EventsTable } from "./events-table";
import type { Event } from "@/lib/database.types";

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const supabase = await createClient();

  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("start_date", { ascending: false });

  if (error) {
    return (
      <div className="text-red-400">Failed to load events: {error.message}</div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-mono tracking-wider text-white">Events</h1>
        <Link
          href="/admin/events/new"
          className="group flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm hover:border-white/40 hover:bg-white/15 transition-all"
        >
          <Plus size={16} />
          New Event
        </Link>
      </div>

      <EventsTable events={(events ?? []) as Event[]} />
    </div>
  );
}
*/
