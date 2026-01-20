import { useState } from 'react';
import clsx from 'clsx';

interface AudienceData {
  ageRange: [number, number];
  gender: 'all' | 'male' | 'female';
  incomeLevel: string[];
  locations: string[];
}

interface StepAudienceTargetingProps {
  data: AudienceData;
  onChange: (data: Partial<AudienceData>) => void;
}

const ageRanges = [
  { label: '18-24', value: [18, 24] },
  { label: '25-34', value: [25, 34] },
  { label: '35-44', value: [35, 44] },
  { label: '45-54', value: [45, 54] },
  { label: '55+', value: [55, 100] },
];

const incomeLevels = [
  { value: 'low', label: 'Low Income', description: 'Under KES 50,000/month' },
  { value: 'medium', label: 'Middle Income', description: 'KES 50,000 - 200,000/month' },
  { value: 'high', label: 'High Income', description: 'Above KES 200,000/month' },
];

const counties = [
  'Nairobi', 'Mombasa', 'Kisumu', 'Nakuru', 'Eldoret',
  'Kiambu', 'Machakos', 'Kajiado', 'Nyeri', 'Meru',
  'Kakamega', 'Bungoma', 'Uasin Gishu', 'Trans Nzoia', 'Kilifi',
];

export function StepAudienceTargeting({ data, onChange }: StepAudienceTargetingProps) {
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<number[]>([0, 1]); // Default: 18-34

  const toggleIncomeLevel = (value: string) => {
    const current = data.incomeLevel || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onChange({ incomeLevel: updated });
  };

  const toggleLocation = (location: string) => {
    const current = data.locations || [];
    const updated = current.includes(location)
      ? current.filter((l) => l !== location)
      : [...current, location];
    onChange({ locations: updated });
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">Target Audience</h2>
        <p className="text-sm text-gray-500 mt-1">
          Define who you want to reach with this campaign. Our system will recommend sites
          with matching demographics.
        </p>
      </div>

      {/* Age Range */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Age Range</label>
        <div className="flex flex-wrap gap-3">
          {ageRanges.map((range, idx) => (
            <button
              key={range.label}
              type="button"
              onClick={() => {
                const updated = selectedAgeRanges.includes(idx)
                  ? selectedAgeRanges.filter((i) => i !== idx)
                  : [...selectedAgeRanges, idx];
                setSelectedAgeRanges(updated);
                // Calculate min/max from selected ranges
                if (updated.length > 0) {
                  const minAge = Math.min(...updated.map((i) => ageRanges[i].value[0]));
                  const maxAge = Math.max(...updated.map((i) => ageRanges[i].value[1]));
                  onChange({ ageRange: [minAge, maxAge] });
                }
              }}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all',
                selectedAgeRanges.includes(idx)
                  ? 'border-primary-800 bg-primary-50 text-primary-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 mt-2">
          Selected: {data.ageRange[0]} - {data.ageRange[1] === 100 ? '55+' : data.ageRange[1]} years
        </p>
      </div>

      {/* Gender */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Gender</label>
        <div className="flex gap-3">
          {[
            { value: 'all', label: 'All Genders' },
            { value: 'male', label: 'Primarily Male' },
            { value: 'female', label: 'Primarily Female' },
          ].map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange({ gender: option.value as 'all' | 'male' | 'female' })}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all',
                data.gender === option.value
                  ? 'border-primary-800 bg-primary-50 text-primary-800'
                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Income Level */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Income Level</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {incomeLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => toggleIncomeLevel(level.value)}
              className={clsx(
                'p-4 rounded-lg text-left border-2 transition-all',
                data.incomeLevel?.includes(level.value)
                  ? 'border-primary-800 bg-primary-50'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              )}
            >
              <p className={clsx(
                'font-medium',
                data.incomeLevel?.includes(level.value) ? 'text-primary-800' : 'text-gray-900'
              )}>
                {level.label}
              </p>
              <p className="text-sm text-gray-500 mt-1">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Locations */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Target Locations</label>
        <p className="text-sm text-gray-500 mb-3">
          Select counties to target, or use the map view for precise location targeting.
        </p>
        <div className="flex flex-wrap gap-2">
          {counties.map((county) => (
            <button
              key={county}
              type="button"
              onClick={() => toggleLocation(county)}
              className={clsx(
                'px-3 py-1.5 rounded-full text-sm font-medium border transition-all',
                data.locations?.includes(county)
                  ? 'border-primary-800 bg-primary-800 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              )}
            >
              {county}
            </button>
          ))}
        </div>
        {data.locations && data.locations.length > 0 && (
          <p className="text-sm text-primary-700 mt-3">
            {data.locations.length} location{data.locations.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    </div>
  );
}
