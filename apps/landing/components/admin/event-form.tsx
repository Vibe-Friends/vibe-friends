"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { ImageUpload } from "./image-upload";
import type { Event, EventInsert } from "@/lib/database.types";
import { Loader2 } from "lucide-react";

interface EventFormProps {
  event?: Event;
}

export function EventForm({ event }: EventFormProps) {
  const router = useRouter();
  const isEdit = !!event;

  const [formData, setFormData] = useState({
    title: event?.title ?? "",
    start_date: event?.start_date ?? "",
    end_date: event?.end_date ?? "",
    start_time: event?.start_time ?? "",
    end_time: event?.end_time ?? "",
    location: event?.location ?? "",
    url: event?.url ?? "",
    image_url: event?.image_url ?? null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();

    const payload: EventInsert = {
      title: formData.title,
      start_date: formData.start_date,
      end_date: formData.end_date || null,
      start_time: formData.start_time,
      end_time: formData.end_time || null,
      location: formData.location,
      url: formData.url,
      image_url: formData.image_url,
    };

    let result;
    if (isEdit) {
      result = await supabase
        .from("events")
        .update(payload)
        .eq("id", event.id);
    } else {
      result = await supabase.from("events").insert(payload);
    }

    setLoading(false);

    if (result.error) {
      setError(result.error.message);
      return;
    }

    router.push("/admin/events");
    router.refresh();
  };

  const inputClass =
    "w-full px-3 py-2 bg-black/40 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/40 font-mono text-sm transition-colors";

  const labelClass = "block text-sm font-medium text-white/70 mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-6">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
          <p className="text-red-400/90 text-sm font-mono">{error}</p>
        </div>
      )}

      <div>
        <label className={labelClass}>Title *</label>
        <input
          type="text"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Event title"
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Start Date *</label>
          <input
            type="date"
            required
            value={formData.start_date}
            onChange={(e) =>
              setFormData({ ...formData, start_date: e.target.value })
            }
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>End Date</label>
          <input
            type="date"
            value={formData.end_date}
            onChange={(e) =>
              setFormData({ ...formData, end_date: e.target.value })
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Start Time *</label>
          <input
            type="text"
            required
            value={formData.start_time}
            onChange={(e) =>
              setFormData({ ...formData, start_time: e.target.value })
            }
            placeholder="e.g., 10:00 AM PST"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>End Time</label>
          <input
            type="text"
            value={formData.end_time}
            onChange={(e) =>
              setFormData({ ...formData, end_time: e.target.value })
            }
            placeholder="e.g., 6:00 PM PST"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Location *</label>
        <input
          type="text"
          required
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
          placeholder="e.g., Virtual - Discord or San Francisco, CA"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>Event URL *</label>
        <input
          type="url"
          required
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://..."
          className={inputClass}
        />
      </div>

      <ImageUpload
        value={formData.image_url}
        onChange={(url) => setFormData({ ...formData, image_url: url })}
      />

      <div className="flex gap-3 pt-4">
        <button
          type="submit"
          disabled={loading}
          className="group flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white font-mono text-sm hover:border-white/40 hover:bg-white/15 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {loading && <Loader2 size={14} className="animate-spin" />}
          <span className="text-white/60">&gt;</span>
          {isEdit ? "Update Event" : "Create Event"}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 border border-white/10 rounded-lg text-white/60 font-mono text-sm hover:text-white/80 hover:border-white/20 transition-all"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
