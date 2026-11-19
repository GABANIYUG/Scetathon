import React from "react";
import { redirect } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Icons } from "@/components/ui/icons";
import { getCurrentUser, isFacultyAdmin, isStudentLead } from "@/lib/auth/permissions";
import { getProfile } from "@/lib/dal/profiles";
import { getUserTeam } from "@/lib/dal/teams";
import { getUserRegistration } from "@/lib/dal/registrations";
import { getParticipantAnnouncements } from "@/lib/dal/announcements";
import { getEventSettings } from "@/lib/dal/settings";
import { EventLiveBanner } from "@/components/operations/EventLiveBanner";
import { NotificationCenter } from "@/components/notifications/NotificationCenter";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export const metadata = {
  title: "Participant Dashboard",
  description: "Manage your SCETATHON squad roster, track application status, and view event credentials.",
};

export default async function DashboardPage() {
  const isConfigured = isSupabaseConfigured();
  const user = await getCurrentUser();

  // If Supabase is configured and user is not authenticated, redirect to login
  if (isConfigured && !user) {
    redirect("/login?returnUrl=/dashboard");
  }

  // Fetch real user data
  const profile = user ? await getProfile(user.id) : null;
  const userTeamData = user ? await getUserTeam(user.id) : null;
  const registration = user ? await getUserRegistration(user.id) : null;
  const [settings, participantAnnouncements] = await Promise.all([
    getEventSettings(),
    getParticipantAnnouncements(user?.id || ""),
  ]);
  const isAdmin = await isFacultyAdmin();
  const isLead = await isStudentLead();

  const statusBadge = (status?: string) => {
    switch (status) {
      case "approved":
        return <Badge variant="success" size="md" dot>Approved</Badge>;
      case "under_review":
        return <Badge variant="warning" size="md" dot>Under Review</Badge>;
      case "submitted":
        return <Badge variant="accent" size="md" dot>Submitted</Badge>;
      case "waitlisted":
        return <Badge variant="default" size="md" dot>Waitlisted</Badge>;
      case "rejected":
        return <Badge variant="default" size="md">Rejected</Badge>;
      default:
        return <Badge variant="default" size="md">Draft / Not Submitted</Badge>;
    }
  };

  return (
    <>
      {/* Live Event Operations Banner */}
      <EventLiveBanner
        initialStatus={settings.event_status}
        initialMessage={settings.public_status_message}
      />

      <div className="py-8 sm:py-12 space-y-10">
      <PageHero
        badge="BUILDER PORTAL"
        eyebrow="PARTICIPANT DASHBOARD"
        title="WELCOME TO YOUR"
        highlightedTitle="COMMAND DECK."
        description="Monitor your team roster, track review milestones, and prepare your workstation setup for the 24-hour hackathon."
        metaNotice={isConfigured ? "Authenticated Session Active" : "Demonstration Environment // Database Inactive"}
      />

      <Container size="lg">
        <div className="space-y-8">
          {/* Admin shortcut badge if user is organizer */}
          {(isAdmin || isLead) && (
            <div className="p-4 rounded-xl border border-[var(--color-accent-lime-border)] bg-[rgba(183,255,90,0.06)] flex items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <Icons.Shield size={16} className="text-[var(--color-accent-lime)]" />
                <span className="font-semibold text-white">
                  Administrator Privileges Detected:
                </span>
                <span className="text-[var(--color-text-secondary)]">
                  {isAdmin ? "Faculty Admin" : "Student Lead"} account.
                </span>
              </div>
              <Button href="/admin" variant="primary" size="sm">
                Open Admin Center
              </Button>
            </div>
          )}

          {/* User Profile Bar */}
          <GlassPanel variant="subtle" padding="md" className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)] font-bold text-base flex items-center justify-center shrink-0">
                {profile?.full_name ? profile.full_name[0].toUpperCase() : "P"}
              </div>
              <div>
                <h2 className="text-sm font-bold text-[var(--color-text-primary)]">
                  {profile?.full_name || user?.email || "Participant Account"}
                </h2>
                <p className="text-xs text-[var(--color-text-muted)] font-mono">
                  {user?.email || "Local Demo User"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <form action="/auth/logout" method="POST">
                <Button type="submit" variant="ghost" size="sm" leftIcon={<Icons.Close size={13} />}>
                  Sign Out
                </Button>
              </form>
            </div>
          </GlassPanel>

          {/* Team & Application Status Section */}
          {userTeamData ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left Column: Team Details & Members */}
              <div className="lg:col-span-8 space-y-6">
                <GlassPanel variant="elevated" padding="lg" edgeHighlight glow="lime" className="space-y-6">
                  <div className="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest text-[var(--color-accent-lime)] uppercase block">
                        Registered Squad
                      </span>
                      <h2 className="text-xl font-bold text-white mt-0.5">
                        {userTeamData.team.team_name}
                      </h2>
                      <p className="text-xs text-[var(--color-text-muted)] mt-1">
                        {userTeamData.team.institution_name} • {userTeamData.team.institution_city}
                      </p>
                    </div>

                    {statusBadge(userTeamData.team.registration_status)}
                  </div>

                  {/* Members Roster */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--color-text-muted)] block">
                      Confirmed Roster ({userTeamData.members.length} members)
                    </span>

                    <div className="space-y-2">
                      {userTeamData.members.map((member) => (
                        <div
                          key={member.id}
                          className="p-3.5 rounded-xl bg-white/[0.025] border border-white/5 flex items-center justify-between gap-3 text-xs"
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                                member.is_leader
                                  ? "bg-[var(--color-accent-lime)] text-[var(--color-bg-primary)]"
                                  : "bg-white/10 text-white"
                              }`}
                            >
                              {member.full_name[0]?.toUpperCase() || "M"}
                            </span>
                            <div>
                              <p className="font-semibold text-white">
                                {member.full_name}
                                {member.is_leader && (
                                  <span className="ml-2 text-[10px] font-mono text-[var(--color-accent-lime)] uppercase bg-[var(--color-accent-lime-subtle)] px-1.5 py-0.2 rounded border border-[var(--color-accent-lime-border)]">
                                    Leader
                                  </span>
                                )}
                              </p>
                              <p className="text-[11px] text-[var(--color-text-muted)] font-mono">
                                {member.email}
                              </p>
                            </div>
                          </div>

                          <span className="text-[11px] text-[var(--color-text-secondary)] font-medium">
                            {member.technical_role}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassPanel>
              </div>

              {/* Right Column: Next Steps & Timeline Status */}
              <div className="lg:col-span-4 space-y-6">
                <GlassPanel variant="subtle" padding="md" className="space-y-4">
                  <h3 className="text-xs font-mono uppercase tracking-wider text-[var(--color-accent-lime)] font-semibold">
                    Application Milestone
                  </h3>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase block">
                      Submission Timestamp
                    </span>
                    <p className="font-mono text-white">
                      {registration?.submitted_at
                        ? new Date(registration.submitted_at).toLocaleString()
                        : "Submission pending"}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 space-y-2 text-xs">
                    <span className="text-[10px] font-mono text-[var(--color-text-muted)] uppercase block">
                      Next Operational Step
                    </span>
                    <p className="text-[var(--color-text-secondary)] leading-relaxed">
                      {userTeamData.team.registration_status === "approved"
                        ? "Your squad has been officially accepted. Check-in workstation instructions will be sent prior to event kickoff."
                        : userTeamData.team.registration_status === "under_review"
                        ? "Faculty advisory committee is currently auditing collegiate eligibility credentials."
                        : "Application submitted. Technical jury is reviewing problem track preferences."}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Button href="/challenges" variant="outline" size="sm" fullWidth>
                      Browse Challenge Tracks
                    </Button>
                  </div>
                </GlassPanel>
              </div>
            </div>
          ) : (
            /* Empty State: No team registered */
            <GlassPanel variant="elevated" padding="xl" edgeHighlight className="text-center py-12 space-y-5 max-w-xl mx-auto">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-[var(--color-accent-lime-subtle)] border border-[var(--color-accent-lime-border)] flex items-center justify-center text-[var(--color-accent-lime)] shadow-[0_0_24px_-4px_rgba(183,255,90,0.3)]">
                <Icons.Users size={32} />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl font-bold text-white">
                  No Team Registered Yet
                </h2>
                <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed max-w-md mx-auto">
                  You are signed in as a team leader. Create and submit your collegiate squad application to secure a workstation at SCETATHON.
                </p>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <Button href="/register" variant="primary" size="md" rightIcon={<Icons.ArrowRight size={14} />}>
                  Register Your Team Now
                </Button>
              </div>
            </GlassPanel>
          )}

          {/* Participant Notifications & Real-Time Announcements Feed */}
          <div className="pt-6">
            <NotificationCenter initialFeed={participantAnnouncements} />
          </div>
        </div>
      </Container>
    </div>
    </>
  );
}

