"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Calendar } from "lucide-react";

interface EventsMobileTriggerProps {
  onClick: () => void;
  isVisible: boolean;
  eventCount: number;
}

export function EventsMobileTrigger({
  onClick,
  isVisible,
  eventCount,
}: EventsMobileTriggerProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={onClick}
          className="
            fixed top-4 right-4 z-50
            flex items-center gap-2 px-3 py-2 md:px-5 md:py-3
            bg-black/50 backdrop-blur-sm border border-white/20 rounded-full
            font-mono text-sm md:text-base lg:text-lg tracking-wider text-white
            hover:text-white/80 hover:border-white/40 hover:bg-black/60
            transition-colors duration-200
          "
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          aria-label={`View ${eventCount} upcoming events`}
        >
          <Calendar className="w-4 h-4 md:w-5 md:h-5" />
          <span>Events</span>
          {eventCount > 0 && (
            <span className="text-white/50">({eventCount})</span>
          )}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
