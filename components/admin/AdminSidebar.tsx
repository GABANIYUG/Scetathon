"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";

export interface AdminNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  tag?: string;
  exact?: boolean;
}

export const ADMIN_NAV_ITEMS: AdminNavItem[] = [
  { label: "Overview", href: "/admin", icon: Icons.Dashboard, exact: true },
  { label: "Operations", href: "/admin/operations", icon: Icons.Radio, tag: "Live" },
  { label: "Registrations", href: "/admin/registrations", icon: Icons.Briefcase, tag: "Empty" },
  { label: "Teams", href: "/admin/teams", icon: Icons.Users, tag: "Empty" },
  { label: "Challenges & Tracks", href: "/admin/challenges", icon: Icons.Layers, tag: "6 Tracks" },
  { label: "Schedule", href: "/admin/schedule", icon: Icons.Calendar, tag: "6 Phases" },
  { label: "Announcements", href: "/admin/announcements", icon: Icons.Megaphone, tag: "Drafts" },
  { label: "People & Committee", href: "/admin/people", icon: Icons.Shield, tag: "4 Groups" },
  { label: "Event Settings", href: "/admin/settings", icon: Icons.Settings },
];

export const AdminSidebar: React.FC = () => {
  const pathname = usePathname();

  const isItemActive = (item: AdminNavItem) => {
    if (item.exact) {
      return pathname === item.href;
    }
    return pathname === item.href || pathname.startsWith(`${item.href}/`);
  };

  return (
    <>
      {/* Desktop & Tablet Sidebar */}
      <aside
        className="w-64 shrink-0 hidden lg:block sticky top-24 self-start space-y-6"
        aria-label="Admin Control Center Navigation"
      >
        <div className="p-4 rounded-2xl border border-white/10 bg-[var(--color-bg-elevated)]/60 backdrop-blur-xl shadow-xl space-y-4">
          <div className="px-2 pt-1 pb-2 border-b border-white/[0.08] flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-lime)] uppercase block">
                Workspace
              </span>
              <span className="text-sm font-bold text-[var(--color-text-primary)]">
                Control Center
              </span>
            </div>
            <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[var(--color-text-muted)]">
              PREVIEW
            </span>
          </div>

          <nav className="space-y-1" aria-label="Admin Modules">
            {ADMIN_NAV_ITEMS.map((item) => {
              const active = isItemActive(item);
              const Icon = item.icon;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all duration-200 select-none group",
                    active
                      ? "bg-[var(--color-accent-lime-subtle)] text-[var(--color-accent-lime)] font-semibold border border-[var(--color-accent-lime-border)] shadow-[0_0_14px_-3px_rgba(183,255,90,0.2)]"
                      : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-white/5 border border-transparent"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      size={16}
                      className={cn(
                        "shrink-0 transition-colors",
                        active
                          ? "text-[var(--color-accent-lime)]"
                          : "text-[var(--color-text-muted)] group-hover:text-[var(--color-text-secondary)]"
                      )}
                    />
                    <span className="truncate">{item.label}</span>
                  </div>

                  {item.tag && (
                    <span
                      className={cn(
                        "text-[9px] font-mono font-bold px-1.5 py-0.5 rounded shrink-0",
                        active
                          ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)]"
                          : "bg-white/5 text-[var(--color-text-muted)] group-hover:bg-white/10"
                      )}
                    >
                      {item.tag}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="pt-3 border-t border-white/[0.08] px-2 text-[11px] text-[var(--color-text-muted)] space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span>Phase 5 UI Preview</span>
            </div>
            <p className="text-[10px] text-[var(--color-text-muted)] leading-tight">
              Changes held locally in client memory.
            </p>
          </div>
        </div>
      </aside>

      {/* Mobile & Small Screen Horizontal Scrollable Tabs */}
      <nav
        className="lg:hidden w-full overflow-x-auto pb-2 -mt-2 mb-6 scrollbar-none flex items-center gap-2"
        aria-label="Mobile Admin Navigation"
      >
        {ADMIN_NAV_ITEMS.map((item) => {
          const active = isItemActive(item);
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap shrink-0 transition-all duration-200 select-none",
                active
                  ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] font-semibold shadow-[0_0_12px_-2px_rgba(183,255,90,0.3)]"
                  : "bg-[var(--color-bg-elevated)] text-[var(--color-text-secondary)] hover:text-white border border-white/10"
              )}
              aria-current={active ? "page" : undefined}
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
};

