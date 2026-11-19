/**
 * Global Site & Event Configuration for SCETATHON
 * All values remain configurable and decoupled from presentation components.
 */

export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  edition: string;
  institution: {
    shortName: string;
    fullName: string;
    location: string;
    city: string;
    state: string;
    country: string;
  };
  navigation: NavItem[];
  socials: {
    platform: string;
    href: string;
    ariaLabel: string;
  }[];
  registration: {
    ctaText: string;
    href: string;
    isOpen: boolean;
    statusNotice: string;
  };
  eventDetailsNotice: string;
}

export const siteConfig: SiteConfig = {
  name: "SCETATHON",
  tagline: "24-Hour Inter-College Hackathon",
  edition: "Annual Edition",
  institution: {
    shortName: "SCET",
    fullName: "Sarvajanik College of Engineering & Technology",
    location: "Athwalines, Surat, Gujarat, India",
    city: "Surat",
    state: "Gujarat",
    country: "India",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Challenges", href: "/challenges" },
    { label: "Schedule", href: "/schedule" },
    { label: "Experience", href: "/experience" },
    { label: "About", href: "/about" },
  ],
  socials: [
    { platform: "GitHub", href: "https://github.com", ariaLabel: "Follow GitHub updates" },
    { platform: "LinkedIn", href: "https://linkedin.com", ariaLabel: "Connect on LinkedIn" },
    { platform: "Twitter / X", href: "https://x.com", ariaLabel: "Follow on X" },
    { platform: "Discord", href: "https://discord.com", ariaLabel: "Join our Community Discord" },
  ],
  registration: {
    ctaText: "Register Now",
    href: "/register",
    isOpen: true,
    statusNotice: "Registrations opening soon for verified collegiate teams.",
  },
  eventDetailsNotice:
    "Official schedule, challenge briefs, and partner announcements will be published upon technical committee ratification.",
};
