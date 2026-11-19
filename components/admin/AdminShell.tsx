"use client";

import React from "react";
import { Container } from "@/components/ui/Container";
import { AdminStatusBanner } from "./AdminStatusBanner";
import { AdminSidebar } from "./AdminSidebar";

export interface AdminShellProps {
  children: React.ReactNode;
}

export const AdminShell: React.FC<AdminShellProps> = ({ children }) => {
  return (
    <div className="flex-1 flex flex-col w-full pb-16">
      {/* Top Admin Mode Warning Banner */}
      <AdminStatusBanner />

      {/* Main Admin Workspace Container */}
      <div className="pt-6 sm:pt-8 flex-1">
        <Container size="xl">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Admin Internal Sidebar Navigation */}
            <AdminSidebar />

            {/* Dynamic Admin Subpage View */}
            <main className="flex-1 w-full min-w-0 space-y-8">
              {children}
            </main>
          </div>
        </Container>
      </div>
    </div>
  );
};

