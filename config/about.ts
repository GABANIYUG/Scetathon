/**
 * About SCETATHON & Institutional Information Configuration
 * Contains verified institutional facts, mission/vision working statements,
 * and transparent committee placeholder structures.
 */

export interface CommitteeRole {
  title: string;
  department: string;
  responsibility: string;
  status: "APPOINTED" | "CONVENING" | "CALL_FOR_VOLUNTEERS";
  statusText: string;
}

export const aboutConfig = {
  hero: {
    eyebrow: "OUR IDENTITY & ROOTS",
    heading: "BUILT BY INNOVATION.\nDRIVEN BY POSSIBILITY.",
    description:
      "SCETATHON is the flagship 24-hour inter-college hackathon hosted at Sarvajanik College of Engineering & Technology (SCET) in Surat. We exist to provide student engineers with an authentic crucible for rapid collaborative problem solving.",
  },
  institution: {
    name: "Sarvajanik College of Engineering & Technology (SCET)",
    location: "Athwalines, Surat, Gujarat 395001, India",
    overview:
      "Established under the auspices of Sarvajanik Education Society (SES), SCET is one of the premier technical colleges in South Gujarat, known for fostering engineering innovation, rigorous technical curriculum, and active student-led developer communities.",
    verifiedFacts: [
      {
        label: "CAMPUS LOCATION",
        value: "Surat, Gujarat",
        detail: "Located in the vibrant educational hub of Athwalines",
      },
      {
        label: "GOVERNING BODY",
        value: "Sarvajanik University",
        detail: "Pioneering quality higher education across Gujarat",
      },
      {
        label: "EVENT FORMAT",
        value: "24-Hour Continuous",
        detail: "Non-stop collaborative collegiate hackathon",
      },
      {
        label: "COMMUNITY REACH",
        value: "Inter-College League",
        detail: "Open to recognized undergraduate & graduate engineering teams",
      },
    ],
  },
  mission: {
    label: "WORKING MISSION",
    heading: "Action-Oriented Engineering",
    statement:
      "To foster practical technological problem solving and multidisciplinary teamwork through an intensive, time-constrained hackathon environment where students transform theoretical computer science principles into demonstrable, working prototypes.",
  },
  vision: {
    label: "WORKING VISION",
    heading: "A Crucible for Builders",
    statement:
      "To establish SCET as a premier hub for collaborative collegiate engineering in Western India, creating a supportive ecosystem where aspiring developers, designers, and innovators boldly tackle regional and global technological challenges.",
  },
  committeeStructure: [
    {
      roleGroup: "Faculty Advisory & Coordination",
      description: "Senior faculty members from Computer Science, Information Technology, and allied engineering disciplines providing academic oversight, governance, and institutional coordination.",
      statusText: "Convened by Department Heads // Official Roster Under Publication",
    },
    {
      roleGroup: "Technical Committee & Jury Panel",
      description: "Technical reviewers responsible for challenge track design, feasibility criteria formulation, code audit standards, and final evaluation rubrics.",
      statusText: "Industry & Academic Evaluators Being Confirmed",
    },
    {
      roleGroup: "Student Organizing Core",
      description: "Dedicated student engineering leads managing developer relations, platform operations, track logistics, workstation infrastructure, and team onboarding.",
      statusText: "Student Steering Committee Active",
    },
    {
      roleGroup: "Campus Operations & Volunteer Squad",
      description: "Student volunteers overseeing uninterrupted 24-hour facility support, food and beverage logistics, network operations, and emergency desk assistance.",
      statusText: "Volunteer Enlistment Opening with Registration",
    },
  ],
  committeeNotice:
    "The full list of faculty coordinators, guest industry evaluators, and student leads will be published in the official event dossier prior to team check-in.",
};

