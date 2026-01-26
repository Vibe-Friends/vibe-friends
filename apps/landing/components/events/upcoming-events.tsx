"use client";

import { useState, useMemo, useEffect } from "react";
import { isEventActive, type Event } from "./events-data";
import { EventsMobileTrigger } from "./events-mobile-trigger";
import { EventsMobileSidebar } from "./events-mobile-sidebar";

interface UpcomingEventsProps {
  events: Event[];
  isVisible: boolean;
  externalOpen?: boolean;
  onExternalClose?: () => void;
}

export function UpcomingEvents({
  events,
  isVisible,
  externalOpen,
  onExternalClose,
}: UpcomingEventsProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Handle external open trigger
  useEffect(() => {
    if (externalOpen) {
      setIsSidebarOpen(true);
    }
  }, [externalOpen]);

  const handleClose = () => {
    setIsSidebarOpen(false);
    onExternalClose?.();
  };

  // Filter to only active events (upcoming or ongoing, not past)
  const activeEvents = useMemo(() => {
    return events.filter(isEventActive);
  }, [events]);

  // Don't render if no events
  if (activeEvents.length === 0) {
    return null;
  }

  return (
    <>
      <EventsMobileTrigger
        onClick={() => setIsSidebarOpen(true)}
        isVisible={isVisible}
        eventCount={activeEvents.length}
      />
      <EventsMobileSidebar
        events={activeEvents}
        isOpen={isSidebarOpen}
        onClose={handleClose}
      />
    </>
  );
}
