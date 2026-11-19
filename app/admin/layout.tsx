import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { getCurrentUser, isFacultyAdmin, isStudentLead } from "@/lib/auth/permissions";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Admin Control Center",
  description:
    "Organizing committee operations and event management platform for SCETATHON.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isConfigured = isSupabaseConfigured();

  // If Supabase is configured, enforce server-side RBAC
  if (isConfigured) {
    const user = await getCurrentUser();
    if (!user) {
      redirect("/login?returnUrl=/admin");
    }

    const isAdmin = await isFacultyAdmin();
    const isLead = await isStudentLead();

    if (!isAdmin && !isLead) {
      return (
        <div className="py-20 flex items-center justify-center">
          <Container size="sm">
            <GlassPanel variant="elevated" padding="lg" edgeHighlight className="text-center space-y-4">
              <div className="mx-auto w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center font-bold text-xl">
                ✕
              </div>
              <h1 className="text-h3 font-bold text-white">Access Denied</h1>
              <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                Your authenticated account (<strong>{user.email}</strong>) does not possess faculty_admin or student_lead privileges. Please contact the SCETATHON Technical Committee to provision permissions.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <Button href="/dashboard" variant="primary" size="sm">
                  Return to Dashboard
                </Button>
              </div>
            </GlassPanel>
          </Container>
        </div>
      );
    }
  }

  return <AdminShell>{children}</AdminShell>;
}
