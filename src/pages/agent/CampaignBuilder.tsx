import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout';
import { Card, Button } from '../../components/common';
import {
  WizardSteps,
  StepCampaignDetails,
  StepAudienceTargeting,
  StepSiteSelection,
  StepReview,
} from '../../components/campaign';
import { SparkleIcon, DocumentIcon } from '../../components/icons/CustomIcons';

const steps = [
  { id: 1, name: 'Details', description: 'Campaign info' },
  { id: 2, name: 'Audience', description: 'Target demographics' },
  { id: 3, name: 'Sites', description: 'Select locations' },
  { id: 4, name: 'Review', description: 'Confirm & submit' },
];

interface CampaignData {
  // Step 1: Details
  name: string;
  clientName: string;
  startDate: string;
  endDate: string;
  budget: string;
  productCategory: string;
  // Step 2: Audience
  ageRange: [number, number];
  gender: 'all' | 'male' | 'female';
  incomeLevel: string[];
  locations: string[];
  // Step 3: Sites
  selectedSites: string[];
}

const initialData: CampaignData = {
  name: '',
  clientName: '',
  startDate: '',
  endDate: '',
  budget: '',
  productCategory: '',
  ageRange: [18, 34],
  gender: 'all',
  incomeLevel: [],
  locations: [],
  selectedSites: [],
};

export function CampaignBuilder() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<CampaignData>(initialData);

  const updateData = (updates: Partial<CampaignData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return data.name && data.clientName && data.startDate && data.endDate;
      case 2:
        return data.locations.length > 0;
      case 3:
        return data.selectedSites.length > 0;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <StepCampaignDetails
            data={{
              name: data.name,
              clientName: data.clientName,
              startDate: data.startDate,
              endDate: data.endDate,
              budget: data.budget,
              productCategory: data.productCategory,
            }}
            onChange={updateData}
          />
        );
      case 2:
        return (
          <StepAudienceTargeting
            data={{
              ageRange: data.ageRange,
              gender: data.gender,
              incomeLevel: data.incomeLevel,
              locations: data.locations,
            }}
            onChange={updateData}
          />
        );
      case 3:
        return (
          <StepSiteSelection
            selectedSites={data.selectedSites}
            onChange={(siteIds) => updateData({ selectedSites: siteIds })}
          />
        );
      case 4:
        return <StepReview data={data} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header
        title="Create Campaign"
        subtitle="Build and launch your outdoor advertising campaign"
      />

      <div className="p-8 max-w-[1400px] mx-auto">
        {/* Hero Section with Premium Design */}
        <div className="mb-10 relative overflow-hidden rounded-3xl bg-linear-to-br from-blue-600 via-blue-500 to-accent-500 p-10 text-white shadow-premium-lg">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-20 w-72 h-72 bg-accent-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 max-w-3xl">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <SparkleIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-sm text-white/90 font-semibold tracking-wide uppercase">AI-Powered Planning</span>
            </div>
            <h2 className="text-3xl font-bold leading-tight mb-3">
              Tell us about your campaign goals
            </h2>
            <p className="text-lg text-white/80 leading-relaxed">
              We'll analyze your requirements and recommend the most effective billboard and LED screen locations based on demographics, traffic patterns, and audience behavior.
            </p>
          </div>
        </div>

        {/* Wizard Steps */}
        <Card className="mb-8 shadow-premium border border-gray-100">
          <WizardSteps steps={steps} currentStep={currentStep} />
        </Card>

        {/* Step Content */}
        <Card className="mb-8 shadow-premium border border-gray-100 bg-white">
          {renderStep()}
        </Card>

        {/* Navigation Footer */}
        <div className="flex items-center justify-between bg-white rounded-2xl p-6 shadow-premium border border-gray-100">
          <div>
            {currentStep > 1 && (
              <Button
                variant="outline"
                onClick={handleBack}
                size="lg"
                className="border-gray-300"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigate('/agent/campaigns')}
              className="text-gray-600 hover:text-gray-900"
            >
              <DocumentIcon className="w-5 h-5 mr-2" />
              Save Draft
            </Button>

            {currentStep < steps.length ? (
              <Button
                variant="primary"
                size="lg"
                onClick={handleNext}
                disabled={!canProceed()}
                className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
              >
                Continue
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            ) : (
              <Button
                variant="primary"
                size="lg"
                onClick={() => alert('Campaign submitted!')}
                className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20"
              >
                Submit Campaign
                <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
