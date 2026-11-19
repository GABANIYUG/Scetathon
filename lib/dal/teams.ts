import "server-only";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Team, TeamMember } from "@/lib/types/database";

export interface UserTeamData {
  team: Team;
  members: TeamMember[];
}

/**
 * Fetches the team led by or associated with the specified user.
 */
export async function getUserTeam(userId: string): Promise<UserTeamData | null> {
  if (!isSupabaseConfigured() || !userId) return null;

  try {
    const supabase = await createClient();

    // Find team where user is leader
    const { data: team, error: teamErr } = await supabase
      .from("teams")
      .select("*")
      .eq("leader_id", userId)
      .maybeSingle();

    if (teamErr || !team) return null;

    // Fetch associated team members
    const { data: members, error: memErr } = await supabase
      .from("team_members")
      .select("*")
      .eq("team_id", team.id)
      .order("is_leader", { ascending: false });

    if (memErr) return { team: team as Team, members: [] };

    return {
      team: team as Team,
      members: (members || []) as TeamMember[],
    };
  } catch {
    return null;
  }
}

/**
 * Fetches all teams for the organizer dashboard (restricted by RLS).
 */
export async function getAdminTeams(): Promise<Team[]> {
  if (!isSupabaseConfigured()) return [];

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("teams")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data) return [];
    return data as Team[];
  } catch {
    return [];
  }
}

