"use client";

import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { TypewriterLine } from "./terminal-text";
import Link from "next/link";
import { UpcomingEvents } from "./events/upcoming-events";
import { SocialLinks } from "./social-links";

export function Hero() {
  const [phase, setPhase] = useState<
    "black" | "border" | "image" | "text" | "button" | "events"
  >("black");
  const [imageLoaded, setImageLoaded] = useState(false);
  const [titleComplete, setTitleComplete] = useState(false);
  const [taglineComplete, setTaglineComplete] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);

  // Parallax state - image follows cursor
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 80, mass: 0.8 };
  const moveX = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-50, 50]),
    springConfig
  );
  const moveY = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [-35, 35]),
    springConfig
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Animation timeline
  useEffect(() => {
    const borderTimeout = setTimeout(() => setPhase("border"), 100);
    return () => clearTimeout(borderTimeout);
  }, []);

  useEffect(() => {
    if (phase === "border" && imageLoaded) {
      const timeout = setTimeout(() => setPhase("image"), 400);
      return () => clearTimeout(timeout);
    }
  }, [phase, imageLoaded]);

  useEffect(() => {
    if (phase === "image") {
      const timeout = setTimeout(() => setPhase("text"), 600);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  useEffect(() => {
    if (taglineComplete) {
      const timeout = setTimeout(() => setPhase("button"), 400);
      return () => clearTimeout(timeout);
    }
  }, [taglineComplete]);

  // Transition to events phase after button
  useEffect(() => {
    if (phase === "button") {
      const timeout = setTimeout(() => setPhase("events"), 800);
      return () => clearTimeout(timeout);
    }
  }, [phase]);

  // Handle Enter key press to navigate
  useEffect(() => {
    if (phase !== "button" && phase !== "events") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        window.open("https://t.me/+HzW6cuF0gfg0NjY0", "_blank");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [phase]);

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen overflow-hidden bg-black"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background Image with Parallax - follows cursor */}
      <motion.div
        className="absolute -inset-8"
        style={{
          x: moveX,
          y: moveY,
        }}
      >
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{
            opacity: phase !== "black" && phase !== "border" ? 1 : 0,
          }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <Image
            src="/background.png"
            alt="Renaissance coding scene"
            fill
            className="object-cover"
            priority
            onLoad={() => setImageLoaded(true)}
          />
          {/* Dark overlay for text legibility */}
          <div className="absolute inset-0 bg-black/30" />
        </motion.div>
      </motion.div>

      {/* Center Content Box - not affected by tilt */}
      <div className="absolute inset-0 flex items-center justify-center p-4 z-10">
        <motion.div
          className="relative w-full max-w-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: phase !== "black" ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Animated Border SVG */}
          <svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.rect
              x="0.5"
              y="0.5"
              width="99"
              height="99"
              rx="1"
              ry="1"
              fill="none"
              stroke="rgba(255, 255, 255, 0.7)"
              strokeWidth="0.5"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: phase !== "black" ? 1 : 0 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
            />
          </svg>

          {/* Content Container */}
          <motion.div
            className="relative p-8 md:p-12"
            initial={{ backgroundColor: "rgba(0, 0, 0, 0)" }}
            animate={{
              backgroundColor:
                phase === "image" ||
                phase === "text" ||
                phase === "button" ||
                phase === "events"
                  ? "rgba(0, 0, 0, 0.7)"
                  : "rgba(0, 0, 0, 0)",
            }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{ backdropFilter: "blur(8px)" }}
          >
            {/* Terminal Output */}
            <div className="text-white space-y-4">
              {/* Title - terminal output */}
              <div className="text-2xl md:text-3xl font-light tracking-wide">
                {(phase === "text" ||
                  phase === "button" ||
                  phase === "events") && (
                  <TypewriterLine
                    text="Welcome to Vibe Friends"
                    typingSpeed={40}
                    delay={0}
                    onComplete={() => setTitleComplete(true)}
                  />
                )}
              </div>

              {/* Description - terminal output continues */}
              <div className="text-base md:text-lg text-white/80 font-light leading-relaxed min-h-[4rem]">
                {titleComplete && (
                  <TypewriterLine
                    text="We are a community of AI and vibe coding enthusiasts. Share your builds, learnings, participate in events and have fun."
                    typingSpeed={18}
                    delay={300}
                    onComplete={() => setTaglineComplete(true)}
                  />
                )}
              </div>

              {/* Command prompt - input area */}
              <AnimatePresence>
                {(phase === "button" || phase === "events") && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: {
                          staggerChildren: 0.35,
                        },
                      },
                    }}
                    className="pt-2 space-y-2"
                  >
                    {/* Join Community Button */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.5, ease: "easeOut" },
                        },
                      }}
                    >
                      <Link
                        href="https://t.me/+Fks4J_xdOtxmZTU0"
                        target="_blank"
                        className="group flex items-center gap-3 text-white font-mono text-lg md:text-xl tracking-wider hover:text-white/80 transition-colors duration-200"
                      >
                        <span className="text-white/60">&gt;</span>
                        <span className="border-b border-white/40 group-hover:border-white/70 transition-colors">
                          Join Our Community
                        </span>
                      </Link>
                    </motion.div>

                    {/* View Events Button */}
                    <motion.div
                      variants={{
                        hidden: { opacity: 0, y: 8 },
                        visible: {
                          opacity: 1,
                          y: 0,
                          transition: { duration: 0.5, ease: "easeOut" },
                        },
                      }}
                    >
                      <button
                        onClick={() => setEventsOpen(true)}
                        className="group flex items-center gap-3 text-white font-mono text-lg md:text-xl tracking-wider hover:text-white/80 transition-colors duration-200"
                      >
                        <span className="text-white/60">&gt;</span>
                        <span className="border-b border-white/40 group-hover:border-white/70 transition-colors">
                          View Community Events
                        </span>
                        <span className="w-2.5 h-5 bg-white/80 animate-pulse" />
                      </button>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Upcoming Events */}
      <UpcomingEvents
        isVisible={phase === "events"}
        externalOpen={eventsOpen}
        onExternalClose={() => setEventsOpen(false)}
      />

      {/* Social Links */}
      <SocialLinks isVisible={phase === "events"} />
    </div>
  );
}
