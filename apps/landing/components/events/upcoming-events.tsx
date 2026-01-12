"use client";

import { useState, useMemo, useEffect } from "react";
import { upcomingEvents, isEventActive } from "./events-data";
import { EventsMobileTrigger } from "./events-mobile-trigger";
import { EventsMobileSidebar } from "./events-mobile-sidebar";

interface UpcomingEventsProps {
  isVisible: boolean;
  externalOpen?: boolean;
  onExternalClose?: () => void;
}

export function UpcomingEvents({
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
  // Empty deps is intentional: upcomingEvents is a module-level constant
  const activeEvents = useMemo(() => {
    return upcomingEvents.filter(isEventActive);
  }, []);

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
