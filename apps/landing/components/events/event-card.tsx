"use client";

import { useState } from "react";
import Image from "next/image";
import { MeshGradient } from "./mesh-gradient";
import { getEventStatus } from "./events-data";
import type { Event, EventStatus } from "./events-data";

interface EventCardProps {
  event: Event;
}

function formatDate(startDate: string, endDate?: string): string {
  const start = new Date(startDate);
  const startFormatted = start.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  if (!endDate || endDate === startDate) {
    return startFormatted;
  }

  const end = new Date(endDate);
  const endFormatted = end.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return `${startFormatted} - ${endFormatted}`;
}

function formatTime(startTime: string, endTime?: string): string {
  if (!endTime) {
    return startTime;
  }
  return `${startTime} - ${endTime}`;
}

function StatusTag({ status }: { status: EventStatus }) {
  const isOngoing = status === "ongoing";

  return (
    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide bg-white/70 text-gray-800 backdrop-blur-sm">
      {isOngoing ? "Ongoing" : "Upcoming"}
    </span>
  );
}

export function EventCard({ event }: EventCardProps) {
  const status = getEventStatus(event);
  const [imageError, setImageError] = useState(false);

  const showImage = event.imageUrl && !imageError;

  return (
    <a
      href={event.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block group"
    >
      <div className="flex items-center gap-4 bg-black/40 backdrop-blur-sm border border-white/20 rounded-lg overflow-hidden transition-all duration-200 hover:border-white/40 hover:bg-black/50 hover:scale-[1.01] p-3">
        {/* Square Image Section */}
        <div className="relative shrink-0 w-28 h-28 rounded-lg overflow-hidden">
          {/* Always show gradient as placeholder/fallback */}
          <div className="absolute inset-0">
            <MeshGradient seed={event.id} className="w-full h-full" />
          </div>

          {/* Image layers on top once loaded */}
          {showImage && (
            <Image
              src={event.imageUrl!}
              alt={event.title}
              fill
              className="object-cover z-10"
              onError={() => setImageError(true)}
            />
          )}

          {/* Status Tag on image */}
          <div className="absolute top-1.5 right-1.5 z-20">
            <StatusTag status={status} />
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <h3 className="font-medium text-white truncate group-hover:text-white/90 transition-colors text-lg">
            {event.title}
          </h3>

          <div className="mt-1.5 space-y-0.5 text-base">
            <p className="text-white/70 truncate">
              {formatDate(event.startDate, event.endDate)}
            </p>
            <p className="text-white/60 truncate">
              {formatTime(event.startTime, event.endTime)}
            </p>
            <p className="text-white/50 truncate">{event.location}</p>
          </div>
        </div>
      </div>
    </a>
  );
}
