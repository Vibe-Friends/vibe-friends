"use client";

import { motion } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";

interface SocialLinksProps {
  isVisible: boolean;
}

const socials = [
  {
    name: "GitHub",
    url: "https://github.com/Vibe-Friends",
    icon: Github,
  },
];

export function SocialLinks({ isVisible }: SocialLinksProps) {
  return (
    <motion.div
      className="fixed bottom-6 right-6 z-20"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
    >
      <div className="flex items-center gap-4">
        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-2 rounded-lg bg-black/40 backdrop-blur-sm border border-white/20 hover:border-white/40 hover:bg-black/60 transition-all duration-200"
            aria-label={social.name}
          >
            <social.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
