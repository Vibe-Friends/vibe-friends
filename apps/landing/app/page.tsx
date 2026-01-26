import { Hero } from "@/components/hero";
import { createClient } from "@/lib/supabase/server";
import type { Event } from "@/components/events/events-data";
import type { Event as DbEvent } from "@/lib/database.types";

// Prevent static generation - page needs Supabase at runtime
export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();

  const { data: dbEvents } = await supabase
    .from("events")
    .select("*")
    .is("deleted_at", null)
    .order("start_date", { ascending: true });

  // Map database events to Event interface
  const events: Event[] = ((dbEvents ?? []) as DbEvent[]).map((e) => ({
    id: e.id,
    title: e.title,
    startDate: e.start_date,
    endDate: e.end_date ?? undefined,
    startTime: e.start_time,
    endTime: e.end_time ?? undefined,
    location: e.location,
    url: e.url,
    imageUrl: e.image_url ?? undefined,
  }));

  return <Hero events={events} />;
}
