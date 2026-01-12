"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar } from "lucide-react";
import { EventCard } from "./event-card";
import type { Event } from "./events-data";

interface EventsMobileSidebarProps {
  events: Event[];
  isOpen: boolean;
  onClose: () => void;
}

export function EventsMobileSidebar({
  events,
  isOpen,
  onClose,
}: EventsMobileSidebarProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus management
  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Sidebar Panel */}
          <motion.div
            className="
              fixed top-0 right-0 bottom-0 w-full max-w-sm lg:max-w-md
              bg-black/90 backdrop-blur-md border-l border-white/10
              z-50 flex flex-col
            "
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="sidebar-title"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
              <div
                id="sidebar-title"
                className="flex items-center gap-2 text-white/90 font-mono text-lg tracking-wider"
              >
                <Calendar className="w-5 h-5" />
                <span>Events</span>
              </div>
              <button
                ref={closeButtonRef}
                onClick={onClose}
                className="
                  p-2 rounded-lg text-white/60 hover:text-white
                  hover:bg-white/10 transition-colors
                "
                aria-label="Close sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Events List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {events.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <EventCard event={event} />
                </motion.div>
              ))}

              {events.length === 0 && (
                <div className="text-center text-white/50 py-8">
                  <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No upcoming events</p>
                </div>
              )}

              {/* Footer message */}
              <p className="text-center text-white/40 text-lg italic">
                We're cooking up more events soon.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
