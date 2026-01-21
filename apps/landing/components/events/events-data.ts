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

