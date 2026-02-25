// SUPABASE DISABLED — uncomment original code below to re-enable

import { redirect } from "next/navigation";

export default function EditEventPage() {
  redirect("/admin/events");
}

/*
// --- ORIGINAL CODE ---
import { createClient } from "@/lib/supabase/server";
import { EventForm } from "@/components/admin/event-form";
import { notFound } from "next/navigation";
import type { Event } from "@/lib/database.types";

export const dynamic = "force-dynamic";

interface EditEventPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditEventPage({ params }: EditEventPageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !event) {
    notFound();
  }

  return (
    <div>
      <h1 className="text-2xl font-mono tracking-wider text-white mb-8">Edit Event</h1>
      <EventForm event={event as Event} />
    </div>
  );
}
*/
