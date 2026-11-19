/**
 * Experience & Educational Journey Configuration for SCETATHON
 * Details the pedagogical and collaborative journey of student teams.
 */

export interface JourneyStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  tag: string;
  objective: string;
  deepDive: string;
  actionItems: string[];
  deliverableTarget: string;
}

export const journeyStages: JourneyStage[] = [
  {
    id: "discover",
    step: "01",
    title: "DISCOVER",
    subtitle: "Problem Analysis & Opportunity Framing",
    tag: "HOURS 00 – 02 // SCOPE",
    objective: "Understand user friction points, benchmark alternatives, and define clear boundaries.",
    deepDive:
      "The opening hours require discipline. Rather than rushing blindly into code, the best teams interrogate the problem statement, identify who suffers from the problem, audit existing solutions, and crystallize their core value proposition.",
    actionItems: [
      "Deconstruct problem briefs into core functional requirements",
      "Draft concise user problem statements and success metrics",
      "Interview domain mentors to challenge initial assumptions",
    ],
    deliverableTarget: "Scope Document & Functional Requirements Specification",
  },
  {
    id: "design",
    step: "02",
    title: "DESIGN",
    subtitle: "System Architecture & Experience Planning",
    tag: "HOURS 02 – 06 // BLUEPRINT",
    objective: "Map database relations, construct API contracts, and draft high-fidelity wireframes.",
    deepDive:
      "A 24-hour sprint demands seamless coordination. In this stage, designers sketch interactive user journeys while frontend and backend engineers agree on unambiguous API specifications, database schemas, and state management conventions.",
    actionItems: [
      "Produce component wireframes and user interaction flows",
      "Model relational/NoSQL schemas and entity relationships",
      "Agree on JSON contracts between frontend and backend engineers",
    ],
    deliverableTarget: "System Architecture Schematic & UI Wireframe Flow",
  },
  {
    id: "build",
    step: "03",
    title: "BUILD",
    subtitle: "Collaborative Implementation & Testing",
    tag: "HOURS 06 – 20 // ENGINEERING",
    objective: "Write clean modular code, integrate external services, and debug in real time.",
    deepDive:
      "The core 14-hour construction sprint. Teams operate as rapid development squads: frontend developers craft reactive interfaces, backend developers assemble endpoints and database logic, and hardware/AI specialists calibrate sensors or train models.",
    actionItems: [
      "Implement core user flows and API integration endpoints",
      "Conduct continuous integration testing and edge case debugging",
      "Conduct midway mentor dry-runs to validate technical direction",
    ],
    deliverableTarget: "Working Full-Stack Software or Tested Hardware Build",
  },
  {
    id: "present",
    step: "04",
    title: "PRESENT",
    subtitle: "Demonstration & Impact Assessment",
    tag: "HOURS 20 – 24 // PITCH",
    objective: "Demonstrate working software live and defend engineering decisions before the jury.",
    deepDive:
      "A great hackathon prototype must be communicated with clarity. In the final hours, teams freeze code, deploy to accessible demonstration environments, and craft an impactful presentation demonstrating real-world functionality.",
    actionItems: [
      "Freeze development repository and verify staging deployment",
      "Rehearse live 3-minute product walkthrough showing core user value",
      "Prepare to address jury questions regarding scalability and security",
    ],
    deliverableTarget: "Live Interactive Demo & Technical Architecture Presentation",
  },
];

export interface ExperienceHighlight {
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export const experienceHighlights: ExperienceHighlight[] = [
  {
    title: "Practical Problem Solving",
    description: "Move beyond textbook theory by tackling real-world domain challenges that demand pragmatic engineering compromises.",
    iconName: "Terminal",
    tag: "ENGINEERING RIGOR",
  },
  {
    title: "High-Intensity Team Synergy",
    description: "Experience the unique camaraderie of an uninterrupted 24-hour hackathon, sharing debugging breakthroughs with peers.",
    iconName: "Sparkles",
    tag: "COLLABORATION",
  },
  {
    title: "Rapid Prototyping Skills",
    description: "Learn how to scope, architect, build, and deploy an end-to-end working system under strict time constraints.",
    iconName: "Check",
    tag: "RAPID EXECUTION",
  },
  {
    title: "Direct Mentor Guidance",
    description: "Engage in technical and design reviews with experienced college faculty members and visiting industry mentors.",
    iconName: "ArrowRight",
    tag: "MENTORSHIP",
  },
  {
    title: "Technical Communication",
    description: "Refine your ability to articulate complex software architectures and product decisions clearly before an expert jury.",
    iconName: "ExternalLink",
    tag: "PRESENTATION",
  },
  {
    title: "Inter-College Developer Network",
    description: "Connect with like-minded student developers, designers, and innovators from collegiate engineering institutions across the region.",
    iconName: "GitHub",
    tag: "PEER LEARNING",
  },
];

