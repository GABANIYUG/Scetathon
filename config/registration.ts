/**
 * Registration Configuration for SCETATHON
 * Controls registration mode, team constraints, and form field definitions.
 * No actual submission endpoint is wired — Phase 5 will add backend integration.
 */

/** Controls the current state of the registration flow */
export type RegistrationMode = "preview" | "open" | "closed" | "coming_soon";

export interface TeamSizeConfig {
  min: number;
  max: number;
}

export interface RegistrationConfig {
  /** Current operational mode of the registration system */
  mode: RegistrationMode;

  /** Team size constraints */
  teamSize: TeamSizeConfig;

  /** Whether individual (solo) participants are allowed */
  allowSolo: boolean;

  /**
   * Placeholder API endpoint — null until Phase 5 backend integration.
   * Do NOT send data to this endpoint in the current phase.
   */
  apiEndpoint: null;

  /** Disclaimer shown throughout the registration flow */
  previewDisclaimer: string;

  /** Notice shown at top of registration page depending on mode */
  modeNotice: Record<RegistrationMode, string>;
}

export const registrationConfig: RegistrationConfig = {
  mode: "preview",

  teamSize: {
    min: 2,
    max: 4,
  },

  allowSolo: false,

  apiEndpoint: null,

  previewDisclaimer:
    "No personal data is stored or transmitted. This form is a preview of the registration experience only.",

  modeNotice: {
    preview:
      "PREVIEW MODE — Registration is not yet open. Explore the form experience; no data will be submitted.",
    open: "Registration is open. Complete the form to secure your team's spot at SCETATHON.",
    closed:
      "Registration is now closed. All allocated spots have been confirmed.",
    coming_soon:
      "Registration opens soon. Review the requirements so your team is ready.",
  },
};

