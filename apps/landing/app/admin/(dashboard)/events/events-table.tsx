"use client";

import { useState } from "react";
import Link from "next/link";
import type { Event } from "@/lib/database.types";
import { deleteEvent, restoreEvent, hardDeleteEvent } from "./actions";
import { Pencil, Trash2, RotateCcw, Loader2 } from "lucide-react";

interface EventsTableProps {
  events: Event[];
}

export function EventsTable({ events }: EventsTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this event? It can be restored within 7 days.")) return;
    setLoadingId(id);
    setError(null);
    const result = await deleteEvent(id);
    if (result.error) setError(result.error);
    setLoadingId(null);
  };

  const handleRestore = async (id: string) => {
    setLoadingId(id);
    setError(null);
    const result = await restoreEvent(id);
    if (result.error) setError(result.error);
    setLoadingId(null);
  };

  const handleHardDelete = async (id: string) => {
    if (!confirm("Permanently delete this event? This cannot be undone."))
      return;
    setLoadingId(id);
    setError(null);
    const result = await hardDeleteEvent(id);
    if (result.error) setError(result.error);
    setLoadingId(null);
  };

  if (events.length === 0) {
    return (
      <div className="text-white/40 text-center py-12 font-mono">
        No events yet.{" "}
        <Link href="/admin/events/new" className="text-white/60 hover:text-white border-b border-white/40 hover:border-white/70 transition-colors">
          Create one
        </Link>
      </div>
    );
  }

  const activeEvents = events.filter((e) => !e.deleted_at);
  const deletedEvents = events.filter((e) => e.deleted_at);

  return (
    <div className="space-y-8">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg backdrop-blur-sm">
          <p className="text-red-400/90 text-sm font-mono">{error}</p>
        </div>
      )}

      {activeEvents.length > 0 && (
        <div>
          <h2 className="text-base font-mono text-white/70 mb-4">
            Active Events
          </h2>
          <div className="bg-black/40 backdrop-blur-sm border border-white/10 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left px-4 py-3 text-sm font-mono font-normal text-white/50">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-mono font-normal text-white/50">
                    Date
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-mono font-normal text-white/50">
                    Location
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-mono font-normal text-white/50">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {activeEvents.map((event) => (
                  <tr key={event.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3">
                      <a
                        href={event.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-white/70 font-mono text-sm transition-colors"
                      >
                        {event.title}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-white/50 text-sm font-mono">
                      {event.start_date}
                      {event.end_date && ` - ${event.end_date}`}
                    </td>
                    <td className="px-4 py-3 text-white/50 text-sm font-mono">
                      {event.location}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <Link
                          href={`/admin/events/${event.id}/edit`}
                          className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                        >
                          <Pencil size={14} />
                        </Link>
                        <button
                          onClick={() => handleDelete(event.id)}
                          disabled={loadingId === event.id}
                          className="p-2 text-white/40 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all disabled:opacity-50"
                        >
                          {loadingId === event.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <Trash2 size={14} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deletedEvents.length > 0 && (
        <div>
          <h2 className="text-base font-mono text-white/40 mb-4">
            Deleted Events
          </h2>
          <div className="bg-black/20 backdrop-blur-sm border border-white/5 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left px-4 py-3 text-sm font-mono font-normal text-white/30">
                    Title
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-mono font-normal text-white/30">
                    Deleted
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-mono font-normal text-white/30">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {deletedEvents.map((event) => (
                  <tr key={event.id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                    <td className="px-4 py-3 text-white/30 font-mono text-sm">{event.title}</td>
                    <td className="px-4 py-3 text-white/30 text-sm font-mono">
                      {event.deleted_at
                        ? new Date(event.deleted_at).toLocaleDateString()
                        : "-"}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleRestore(event.id)}
                          disabled={loadingId === event.id}
                          className="p-2 text-white/30 hover:text-green-400 hover:bg-white/10 rounded-lg transition-all disabled:opacity-50"
                          title="Restore"
                        >
                          {loadingId === event.id ? (
                            <Loader2 size={14} className="animate-spin" />
                          ) : (
                            <RotateCcw size={14} />
                          )}
                        </button>
                        <button
                          onClick={() => handleHardDelete(event.id)}
                          disabled={loadingId === event.id}
                          className="p-2 text-white/30 hover:text-red-400 hover:bg-white/10 rounded-lg transition-all disabled:opacity-50"
                          title="Permanently delete"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
