/**
 * Schedule & Chronological Flow Configuration for SCETATHON
 * All timeline information is provisional and illustrative. Exact calendar dates
 * and milestone timings will be confirmed upon technical committee ratification.
 */

export interface SchedulePhase {
  phase: string;
  hourRange: string;
  relativeTime: string;
  title: string;
  shortSummary: string;
  detailedAgenda: string[];
  operationalFocus: string;
  statusTag: string;
  participantInstructions: string;
}

export const schedulePhases: SchedulePhase[] = [
  {
    phase: "PHASE 01",
    hourRange: "HOUR 00 – 02",
    relativeTime: "00:00 – 02:00",
    title: "Check-in, Keynote & Problem Statement Reveal",
    shortSummary: "Teams arrive on campus, verify collegiate credentials, settle into assigned workstations, and receive the official challenge briefs.",
    detailedAgenda: [
      "Participant workstation allocation and local network provisioning",
      "Opening address by SCET faculty coordinators and organizing committee",
      "Official challenge statement release and track guidelines briefing",
      "Team station workspace inspection and mentor introductions",
    ],
    operationalFocus: "Orientation, Technical Setup & Challenge Scoping",
    statusTag: "OPENING // HOUR 00-02",
    participantInstructions: "Ensure all team members have valid college IDs, approved development laptops, and pre-installed toolchains.",
  },
  {
    phase: "PHASE 02",
    hourRange: "HOUR 02 – 06",
    relativeTime: "02:00 – 06:00",
    title: "Architecture, Data Modeling & First Code Sprint",
    shortSummary: "Initial development sprint: team members formalize database schemas, wireframe user flows, configure repositories, and establish foundational pipelines.",
    detailedAgenda: [
      "Repository initialization and version control conventions agreement",
      "System architecture mapping: Frontend, Backend API, Database, and external integrations",
      "Drafting core wireframes and establishing API contract specifications",
      "First review check-in with assigned academic and industry mentors",
    ],
    operationalFocus: "Scaffolding, Schema Validation & Core Pipelines",
    statusTag: "SPRINT 1 // HOUR 02-06",
    participantInstructions: "Focus on establishing a minimal working end-to-end skeleton before building peripheral secondary features.",
  },
  {
    phase: "PHASE 03",
    hourRange: "HOUR 06 – 12",
    relativeTime: "06:00 – 12:00",
    title: "Core Feature Integration & Mentor Review Round 1",
    shortSummary: "Intensive coding block focusing on business logic, hardware interfacing, or model training. Teams demonstrate early prototypes to mentors.",
    detailedAgenda: [
      "Connecting core logic with database persistence and third-party APIs",
      "Hardware-software communication tests or machine learning inference benchmark runs",
      "Progress review: Mentors assess feasibility, technical rigor, and initial direction",
      "Midway meal break and hydration check-in",
    ],
    operationalFocus: "Feature Engineering & Mid-Sprint Mentor Feedback",
    statusTag: "REVIEW 1 // HOUR 06-12",
    participantInstructions: "Demonstrate a working data flow to your mentor. Take concrete notes on technical feedback.",
  },
  {
    phase: "PHASE 04",
    hourRange: "HOUR 12 – 18",
    relativeTime: "12:00 – 18:00",
    title: "Overnight Intensive Sprint & Stress Testing",
    shortSummary: "The overnight development window. Teams resolve complex debugging hurdles, optimize latency, enhance UI polish, and harden prototypes.",
    detailedAgenda: [
      "Uninterrupted development sprint through the night with campus power redundancy",
      "Debugging race conditions, error boundaries, and edge case handling",
      "UI refinement: Accessible color contrast, responsive layouts, and loading states",
      "Midnight coffee, technical trivia breaks, and energy replenishment",
    ],
    operationalFocus: "Deep Development, Debugging & Performance Tuning",
    statusTag: "OVERNIGHT // HOUR 12-18",
    participantInstructions: "Maintain regular Git commits. Ensure at least one team member monitors overall system stability.",
  },
  {
    phase: "PHASE 05",
    hourRange: "HOUR 18 – 22",
    relativeTime: "18:00 – 22:00",
    title: "Feature Freeze, Deployments & Evaluation Dry Run",
    shortSummary: "Code freeze at the 22-hour mark. Teams generate public deployment artifacts, record backup walkthroughs, and rehearse their live demonstrations.",
    detailedAgenda: [
      "Strict code freeze at the 22-hour milestone; repository commits locked",
      "Deploying prototypes to staging/cloud platforms or local demonstration rigs",
      "Preparing slide decks highlighting: Problem, Architecture, Impact, and Live Demo",
      "Dry run rehearsal of the live interactive walkthrough",
    ],
    operationalFocus: "Deployment, Demo Freezing & Pitch Preparation",
    statusTag: "CODE FREEZE // HOUR 18-22",
    participantInstructions: "Ensure your live demonstration works reliably without relying on unstable external internet connections.",
  },
  {
    phase: "PHASE 06",
    hourRange: "HOUR 22 – 24",
    relativeTime: "22:00 – 24:00",
    title: "Live Jury Pitches, Evaluation & Awards Ceremony",
    shortSummary: "Final presentation before the evaluation panel. Teams demo their working software or hardware, answer technical jury inquiries, and celebrate outcomes.",
    detailedAgenda: [
      "Live interactive demonstration before domain evaluation jury panels",
      "Technical Q&A: Jury scrutinizes architecture depth, originality, and scalability",
      "Jury deliberation across standard evaluation rubric dimensions",
      "Closing ceremony, participant recognition, and valedictory address",
    ],
    operationalFocus: "Product Showcases, Jury Scoring & Valediction",
    statusTag: "FINALE // HOUR 22-24",
    participantInstructions: "Keep pitch focused on working product outcomes. Let your demonstrable code speak for itself.",
  },
];

export const scheduleVenueInfo = {
  venue: "Main Computer Center & Engineering Labs",
  campus: "Sarvajanik College of Engineering & Technology (SCET)",
  location: "Athwalines, Surat, Gujarat 395001",
  facilities: [
    "Dedicated high-speed campus LAN and redundant Wi-Fi access",
    "Continuous power backup with industrial UPS and DG generator redundancy",
    "Well-ventilated computing laboratories with ergonomic workstations",
    "On-campus faculty guidance and round-the-clock emergency assistance",
  ],
  datesNotice: "Exact calendar dates for the upcoming annual edition will be officially ratified and announced by the college committee.",
};

