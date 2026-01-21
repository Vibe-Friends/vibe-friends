"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function deleteEvent(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("events")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/events");
  revalidatePath("/");
  return { success: true };
}

export async function restoreEvent(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("events")
    .update({ deleted_at: null })
    .eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/events");
  revalidatePath("/");
  return { success: true };
}

export async function hardDeleteEvent(id: string) {
  const supabase = await createClient();

  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/admin/events");
  return { success: true };
}
