import { Hero } from "@/components/hero";

// SUPABASE DISABLED — uncomment to re-enable events fetch
// import { createClient } from "@/lib/supabase/server";
// import type { Event as DbEvent } from "@/lib/database.types";
// export const dynamic = "force-dynamic";

import type { Event } from "@/components/events/events-data";

export default async function Home() {
  // SUPABASE DISABLED — uncomment to re-enable events fetch
  /*
  const supabase = await createClient();

  const { data: dbEvents } = await supabase
    .from("events")
    .select("*")
    .is("deleted_at", null)
    .order("start_date", { ascending: true });

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
  */

  const events: Event[] = [];

  return <Hero events={events} />;
}
