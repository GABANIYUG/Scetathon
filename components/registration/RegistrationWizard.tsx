"use client";

import React, { useState } from "react";
import { GlassPanel } from "@/components/ui/GlassPanel";
import { Button } from "@/components/ui/Button";
import { RegistrationProgress } from "./RegistrationProgress";
import { TeamDetailsForm } from "./TeamDetailsForm";
import { TeamMembersForm } from "./TeamMembersForm";
import { RegistrationReview } from "./RegistrationReview";
import { RegistrationStatus } from "./RegistrationStatus";
import { TeamComposition } from "./TeamComposition";
import {
  RegistrationStep,
  RegistrationFormData,
  ValidationError,
  INITIAL_FORM_DATA,
  validateTeamDetails,
  validateTeamMembers,
  validateReview,
} from "@/lib/registration-validation";
import { registrationConfig } from "@/config/registration";

export const RegistrationWizard: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<RegistrationStep>(1);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const { teamSize, previewDisclaimer, modeNotice, mode } = registrationConfig;

  // Step 1 update handler
  const handleTeamDetailsChange = (details: RegistrationFormData["teamDetails"]) => {
    setFormData((prev) => ({ ...prev, teamDetails: details }));
    // Clear field errors as user types
    if (errors.length > 0) {
      setErrors((prev) => prev.filter((e) => !Object.keys(details).includes(e.field)));
    }
  };

  // Step 2 update handler
  const handleMembersChange = (members: RegistrationFormData["members"]) => {
    setFormData((prev) => ({ ...prev, members }));
    if (errors.length > 0) {
      setErrors((prev) => prev.filter((e) => !e.field.startsWith("member")));
    }
  };

  // Step 3 consent handler
  const handleConsentChange = (consentGiven: boolean) => {
    setFormData((prev) => ({ ...prev, consentGiven }));
    if (errors.some((e) => e.field === "consent")) {
      setErrors((prev) => prev.filter((e) => e.field !== "consent"));
    }
  };

  // Forward Navigation
  const handleNext = () => {
    if (currentStep === 1) {
      const result = validateTeamDetails(formData.teamDetails);
      if (!result.isValid) {
        setErrors(result.errors);
        return;
      }
      setErrors([]);
      setCompletedSteps((prev) => new Set(prev).add(1));
      setCurrentStep(2);
      window.scrollTo({ top: 200, behavior: "smooth" });
    } else if (currentStep === 2) {
      const result = validateTeamMembers(
        formData.members,
        formData.teamDetails,
        teamSize.min,
        teamSize.max
      );
      if (!result.isValid) {
        setErrors(result.errors);
        return;
      }
      setErrors([]);
      setCompletedSteps((prev) => new Set(prev).add(2));
      setCurrentStep(3);
      window.scrollTo({ top: 200, behavior: "smooth" });
    } else if (currentStep === 3) {
      const result = validateReview(formData.consentGiven);
      if (!result.isValid) {
        setErrors(result.errors);
        return;
      }
      setErrors([]);
      setCompletedSteps((prev) => new Set(prev).add(3));
      setCurrentStep(4);
      window.scrollTo({ top: 200, behavior: "smooth" });
    }
  };

  // Backward Navigation
  const handleBack = () => {
    setErrors([]);
    if (currentStep === 2) setCurrentStep(1);
    if (currentStep === 3) setCurrentStep(2);
    if (currentStep === 4) setCurrentStep(3);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  // Direct jump from Review to edit specific step
  const handleEditStep = (step: 1 | 2) => {
    setErrors([]);
    setCurrentStep(step);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  // Reset entire form
  const handleReset = () => {
    setFormData(INITIAL_FORM_DATA);
    setErrors([]);
    setCompletedSteps(new Set());
    setCurrentStep(1);
    window.scrollTo({ top: 200, behavior: "smooth" });
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar Component */}
      <GlassPanel variant="subtle" padding="sm" className="max-w-3xl mx-auto">
        <RegistrationProgress
          currentStep={currentStep}
          completedSteps={completedSteps}
        />
      </GlassPanel>

      {/* Main Form + Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Active Step Panel */}
        <div className="lg:col-span-8">
          <GlassPanel variant="elevated" padding="lg" edgeHighlight glow="lime">
            {currentStep === 1 && (
              <TeamDetailsForm
                data={formData.teamDetails}
                errors={errors}
                onChange={handleTeamDetailsChange}
              />
            )}

            {currentStep === 2 && (
              <TeamMembersForm
                members={formData.members}
                teamDetails={formData.teamDetails}
                errors={errors}
                minSize={teamSize.min}
                maxSize={teamSize.max}
                onChange={handleMembersChange}
              />
            )}

            {currentStep === 3 && (
              <RegistrationReview
                data={formData}
                previewDisclaimer={previewDisclaimer}
                errors={errors}
                onEditStep={handleEditStep}
                onConsentChange={handleConsentChange}
              />
            )}

            {currentStep === 4 && (
              <RegistrationStatus
                data={formData}
                modeNotice={modeNotice[mode]}
                onReset={handleReset}
                onBackToReview={() => setCurrentStep(3)}
              />
            )}

            {/* Stepper Navigation Buttons (Steps 1 to 3) */}
            {currentStep < 4 && (
              <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/[0.08]">
                {currentStep > 1 ? (
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={handleBack}
                    leftIcon={
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    }
                  >
                    Back
                  </Button>
                ) : (
                  <div />
                )}

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleNext}
                  rightIcon={
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="m9 18 6-6-6-6" />
                    </svg>
                  }
                >
                  {currentStep === 1 && "Continue to Members"}
                  {currentStep === 2 && "Continue to Review"}
                  {currentStep === 3 && "Preview Submission"}
                </Button>
              </div>
            )}
          </GlassPanel>
        </div>

        {/* Live Team Composition Summary Sidebar */}
        <div className="lg:col-span-4 sticky top-28">
          <TeamComposition
            formData={formData}
            currentStep={currentStep}
            minSize={teamSize.min}
            maxSize={teamSize.max}
          />
        </div>
      </div>
    </div>
  );
};

