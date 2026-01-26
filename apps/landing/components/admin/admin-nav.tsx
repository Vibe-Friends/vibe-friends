"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { CalendarDays, LogOut } from "lucide-react";

const navItems = [
  { href: "/admin/events", label: "Events", icon: CalendarDays },
];

export function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  };

  return (
    <nav className="w-64 bg-black/40 backdrop-blur-sm border-r border-white/10 min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <Link href="/" className="text-xl font-mono tracking-wider text-white hover:text-white/80 transition-colors">
          Vibe Friends
        </Link>
        <p className="text-xs text-white/40 mt-1 font-mono">Admin Dashboard</p>
      </div>

      <div className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg font-mono text-sm transition-all ${
                isActive
                  ? "bg-white/10 text-white border border-white/20"
                  : "text-white/50 hover:text-white hover:bg-white/5 border border-transparent"
              }`}
            >
              <Icon size={16} />
              {item.label}
            </Link>
          );
        })}
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-3 py-2 text-white/40 hover:text-white/70 hover:bg-white/5 rounded-lg transition-all font-mono text-sm border border-transparent"
      >
        <LogOut size={16} />
        Logout
      </button>
    </nav>
  );
}
