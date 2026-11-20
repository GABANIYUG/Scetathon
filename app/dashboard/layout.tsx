import React from "react";

/**
 * Opt the /dashboard segment out of static-shell prerendering validation.
 * The dashboard is an authenticated, session-dependent participant command center.
 */
export const instant = false;

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

