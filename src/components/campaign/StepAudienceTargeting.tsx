import { useState } from 'react';
import clsx from 'clsx';
import { Card } from '../common';
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Users, TrendingUp, Target } from 'lucide-react';

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

// Demographics data from Xchange audience analytics
const ageGroupData = [
  { group: '18-24', percentage: 19, fill: '#3b82f6' },
  { group: '25-34', percentage: 27, fill: '#2563eb' },
  { group: '35-44', percentage: 22, fill: '#1d4ed8' },
  { group: '45-54', percentage: 22, fill: '#1e40af' },
  { group: '55-64', percentage: 8, fill: '#1e3a8a' },
  { group: '65+', percentage: 2, fill: '#172554' },
];

const genderData = [
  { name: 'Male', value: 57, fill: '#2563eb' },
  { name: 'Female', value: 43, fill: '#ec4899' },
];

const audienceSegments = [
  { name: 'Food Lovers', value: 42, fill: '#3b82f6', icon: '🍽️' },
  { name: 'Mid Income', value: 24, fill: '#2563eb', icon: '💰' },
  { name: 'Entertainment Seekers', value: 21, fill: '#1d4ed8', icon: '🎭' },
  { name: 'Travelers', value: 19, fill: '#1e40af', icon: '✈️' },
  { name: 'Grocery Shoppers', value: 18, fill: '#1e3a8a', icon: '🛒' },
];

export function StepAudienceTargeting({ data, onChange }: StepAudienceTargetingProps) {
  const [selectedAgeRanges, setSelectedAgeRanges] = useState<number[]>([0, 1]);

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
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Target Audience</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Define who you want to reach with this campaign. Our system will recommend sites
          with matching demographics.
        </p>
      </div>

      {/* Demographics Insights - New Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution Chart */}
        <Card className="bg-linear-to-br from-blue-50/50 to-white dark:from-blue-950/10 dark:to-slate-800/50 p-6 border border-blue-100 dark:border-blue-900/30">
          <div className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Age Distribution</h5>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={ageGroupData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
              <XAxis dataKey="group" stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <YAxis tickFormatter={(value) => `${value}%`} stroke="#9ca3af" style={{ fontSize: '12px' }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
                formatter={(value: number | undefined) => [`${value ?? 0}%`, 'Percentage']}
              />
              <Bar dataKey="percentage" radius={[8, 8, 0, 0]}>
                {ageGroupData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Based on billboard audience data across Kenya</p>
        </Card>

        {/* Gender Split Chart */}
        <Card className="bg-linear-to-br from-pink-50/50 to-white dark:from-pink-950/10 dark:to-slate-800/50 p-6 border border-pink-100 dark:border-pink-900/30">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-pink-600 dark:text-pink-400" />
            <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Gender Distribution</h5>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <RePieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.98)',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  padding: '12px',
                  fontSize: '13px',
                  fontWeight: '600',
                }}
                formatter={(value: number | undefined) => [`${value ?? 0}%`, 'Percentage']}
              />
              <Legend
                verticalAlign="bottom"
                height={36}
                iconType="circle"
                formatter={(value) => <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{value}</span>}
              />
            </RePieChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">Average audience gender split</p>
        </Card>
      </div>

      {/* Audience Segments */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Top Audience Segments</h5>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {audienceSegments.map((segment) => (
            <Card key={segment.name} className="p-4 text-center border-2 hover:border-blue-300 dark:hover:border-blue-700 transition-all">
              <div className="text-3xl mb-2">{segment.icon}</div>
              <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">{segment.name}</p>
              <div className="flex items-center justify-center gap-1">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: segment.fill }}></div>
                <span className="text-lg font-bold" style={{ color: segment.fill }}>{segment.value}%</span>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Age Range Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Target Age Range</label>
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
                if (updated.length > 0) {
                  const minAge = Math.min(...updated.map((i) => ageRanges[i].value[0]));
                  const maxAge = Math.max(...updated.map((i) => ageRanges[i].value[1]));
                  onChange({ ageRange: [minAge, maxAge] });
                }
              }}
              className={clsx(
                'px-4 py-2 rounded-lg text-sm font-medium border-2 transition-all',
                selectedAgeRanges.includes(idx)
                  ? 'border-blue-600 dark:border-cyan-600 bg-blue-50 dark:bg-cyan-950/30 text-blue-800 dark:text-cyan-400'
                  : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-slate-500'
              )}
            >
              {range.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
          Selected: {data.ageRange[0]} - {data.ageRange[1] === 100 ? '55+' : data.ageRange[1]} years
        </p>
      </div>

      {/* Gender Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Target Gender</label>
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
                  ? 'border-blue-600 dark:border-cyan-600 bg-blue-50 dark:bg-cyan-950/30 text-blue-800 dark:text-cyan-400'
                  : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-300 dark:hover:border-slate-500'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {/* Income Level Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Target Income Level</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {incomeLevels.map((level) => (
            <button
              key={level.value}
              type="button"
              onClick={() => toggleIncomeLevel(level.value)}
              className={clsx(
                'p-4 rounded-lg text-left border-2 transition-all',
                data.incomeLevel?.includes(level.value)
                  ? 'border-blue-600 dark:border-cyan-600 bg-blue-50 dark:bg-cyan-950/30'
                  : 'border-gray-200 dark:border-slate-600 bg-white dark:bg-slate-800 hover:border-gray-300 dark:hover:border-slate-500'
              )}
            >
              <p className={clsx(
                'font-medium',
                data.incomeLevel?.includes(level.value)
                  ? 'text-blue-800 dark:text-cyan-400'
                  : 'text-gray-900 dark:text-white'
              )}>
                {level.label}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{level.description}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Location Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Target Locations</label>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
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
                  ? 'border-blue-600 dark:border-cyan-600 bg-blue-600 dark:bg-cyan-600 text-white'
                  : 'border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-slate-500'
              )}
            >
              {county}
            </button>
          ))}
        </div>
        {data.locations && data.locations.length > 0 && (
          <p className="text-sm text-blue-700 dark:text-cyan-400 mt-3 font-medium">
            {data.locations.length} location{data.locations.length > 1 ? 's' : ''} selected
          </p>
        )}
      </div>
    </div>
  );
}
