import clsx from 'clsx';
import { Check } from 'lucide-react';

interface Step {
  id: number;
  name: string;
  description: string;
}

interface WizardStepsProps {
  steps: Step[];
  currentStep: number;
}

export function WizardSteps({ steps, currentStep }: WizardStepsProps) {
  return (
    <nav aria-label="Progress">
      <ol className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step.name} className={clsx('relative', stepIdx !== steps.length - 1 && 'pr-8 sm:pr-20 flex-1')}>
            {step.id < currentStep ? (
              // Completed step
              <div className="group flex items-center">
                <span className="flex items-center">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-800">
                    <Check className="h-5 w-5 text-white" />
                  </span>
                </span>
                <span className="ml-4 hidden sm:block">
                  <span className="text-sm font-medium text-primary-800">{step.name}</span>
                  <span className="text-sm text-gray-500 block">{step.description}</span>
                </span>
              </div>
            ) : step.id === currentStep ? (
              // Current step
              <div className="flex items-center" aria-current="step">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary-800 bg-white">
                  <span className="text-sm font-semibold text-primary-800">{step.id}</span>
                </span>
                <span className="ml-4 hidden sm:block">
                  <span className="text-sm font-semibold text-primary-800">{step.name}</span>
                  <span className="text-sm text-gray-500 block">{step.description}</span>
                </span>
              </div>
            ) : (
              // Upcoming step
              <div className="group flex items-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300 bg-white">
                  <span className="text-sm font-medium text-gray-500">{step.id}</span>
                </span>
                <span className="ml-4 hidden sm:block">
                  <span className="text-sm font-medium text-gray-500">{step.name}</span>
                  <span className="text-sm text-gray-400 block">{step.description}</span>
                </span>
              </div>
            )}

            {stepIdx !== steps.length - 1 && (
              <div className="absolute right-0 top-5 hidden w-5 sm:block md:w-16" aria-hidden="true">
                <div className={clsx(
                  'h-0.5 w-full',
                  step.id < currentStep ? 'bg-primary-800' : 'bg-gray-300'
                )} />
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
