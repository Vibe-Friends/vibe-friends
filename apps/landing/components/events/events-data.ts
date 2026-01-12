export interface Event {
  id: string;
  title: string;
  startDate: string; // ISO format: "2025-02-15"
  endDate?: string; // Optional - for multi-day events, defaults to startDate
  startTime: string; // e.g., "10:00 AM PST"
  endTime?: string; // Optional - e.g., "6:00 PM PST"
  location: string; // e.g., "Virtual - Discord" or "San Francisco, CA"
  url: string; // Event link
  imageUrl?: string; // Optional - uses mesh gradient if missing
}

export type EventStatus = "upcoming" | "ongoing";

// Calculate event status based on current date
// Note: Appending T00:00:00 ensures dates are parsed in local timezone, not UTC
export function getEventStatus(event: Event): EventStatus {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startDate = new Date(event.startDate + "T00:00:00");
  const endDate = event.endDate
    ? new Date(event.endDate + "T00:00:00")
    : startDate;

  if (today < startDate) {
    return "upcoming";
  }
  // If we're between start and end date (inclusive), it's ongoing
  if (today >= startDate && today <= endDate) {
    return "ongoing";
  }
  // Past events shouldn't reach here due to filtering, but default to upcoming
  return "upcoming";
}

// Check if event is still relevant (not ended)
export function isEventActive(event: Event): boolean {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const endDate = event.endDate
    ? new Date(event.endDate + "T00:00:00")
    : new Date(event.startDate + "T00:00:00");
  return today <= endDate;
}

// Add/remove events here - only active events will be displayed
export const upcomingEvents: Event[] = [
  {
    id: "event-001",
    title: "Vibe Friends Logo Contest",
    startDate: "2026-01-09",
    endDate: "2026-01-14", // Multi-day event
    startTime: "12:00 AM PST",
    endTime: "11:59 PM PST",
    location: "Virtual",
    url: "https://www.notion.so/Vibe-Friends-Logo-Contest-2e1acb2ab58280ff86d3d6ca9f7b30da",
  },
  {
    id: "event-002",
    title: "Vibe Friends Town Hall",
    startDate: "2026-01-16",
    startTime: "11:00 AM PST",
    endTime: "11:45 AM PST",
    location: "Virtual - Telegram",
    url: "https://luma.com/1p8tuzri",
    imageUrl:
      "https://images.lumacdn.com/cdn-cgi/image/format=auto,fit=cover,dpr=2,background=white,quality=75,width=400,height=400/event-covers/7s/2586e808-d24c-45c5-9623-499d857a29aa.png",
  },
];
