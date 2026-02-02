import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Input, Select, Badge } from '../../components/common';
import { SparkleIcon } from '../../components/icons/CustomIcons';
import { Calendar, TrendingUp, Users, Zap, PieChart } from 'lucide-react';
import { BarChart, Bar, PieChart as RePieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Premium site data from Xchange inventory
const premiumSites = [
  { name: 'WAIYAKI WAY NEAR OLD SAFARICOM OLD HQ OUTBOUND', impressions: 4100000, frequency: 6.5, monthlyRate: 650000, county: 'Nairobi' },
  { name: 'OUTERING RD @SHELL DONHOLM EXCHANGE', impressions: 2900000, frequency: 7.2, monthlyRate: 580000, county: 'Nairobi' },
  { name: 'ELDORET TOWN UGANDA RD @ZION MALL', impressions: 2400000, frequency: 7.8, monthlyRate: 420000, county: 'Eldoret' },
  { name: 'MUTHANGARI DRIVE NEAR NAIVAS BARAKA SHELL', impressions: 2100000, frequency: 6.3, monthlyRate: 550000, county: 'Nairobi' },
  { name: 'KISUMU TOWN NEAR KCB ROUNDABOUT', impressions: 2100000, frequency: 10.2, monthlyRate: 380000, county: 'Kisumu' },
  { name: 'LANGATA RD NEAR WATERFRONT MALL', impressions: 1500000, frequency: 5.5, monthlyRate: 480000, county: 'Nairobi' },
  { name: 'MACHAKOS TOWN ENTRY AT LEVEL 5 HOSPITAL', impressions: 1400000, frequency: 2.8, monthlyRate: 320000, county: 'Machakos' },
  { name: 'KAKAMEGA OPPOSITE KENOL', impressions: 1100000, frequency: 4.8, monthlyRate: 290000, county: 'Kakamega' },
  { name: 'THIKA SUPERHIGHWAY AT ALLSOPS', impressions: 950000, frequency: 2.6, monthlyRate: 450000, county: 'Nairobi' },
  { name: 'KIAMBU ROAD RUNDA ENTRANCE', impressions: 850000, frequency: 5.5, monthlyRate: 410000, county: 'Nairobi' },
  { name: 'THIKA OPP JAVA & KFC TO CBD', impressions: 720000, frequency: 4.2, monthlyRate: 380000, county: 'Thika' },
  { name: 'SARIT CENTRE', impressions: 230000, frequency: 4.1, monthlyRate: 520000, county: 'Nairobi' },
];

const counties = [
  { value: 'all', label: 'All Counties' },
  { value: 'Nairobi', label: 'Nairobi' },
  { value: 'Eldoret', label: 'Eldoret' },
  { value: 'Kisumu', label: 'Kisumu' },
  { value: 'Machakos', label: 'Machakos' },
  { value: 'Thika', label: 'Thika' },
  { value: 'Kakamega', label: 'Kakamega' },
];

const durations = [
  { value: '1', label: '1 Month' },
  { value: '3', label: '3 Months' },
  { value: '6', label: '6 Months' },
  { value: '12', label: '12 Months' },
];

// Demographics data from PCR
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
  { name: 'Food Lovers', value: 42, fill: '#3b82f6' },
  { name: 'Mid Income', value: 24, fill: '#2563eb' },
  { name: 'Entertainment Seekers', value: 21, fill: '#1d4ed8' },
  { name: 'Travelers', value: 19, fill: '#1e40af' },
  { name: 'Grocery Shoppers', value: 18, fill: '#1e3a8a' },
  { name: 'Others', value: 16, fill: '#64748b' },
];

interface QuoteResult {
  estimatedCost: number;
  monthlyRate: number;
  estimatedReach: number;
  totalImpressions: number;
  averageFrequency: number;
  availableSites: number;
  discount: number;
  sitesBreakdown: Array<{
    name: string;
    impressions: number;
    reach: number;
    frequency: number;
    cost: number;
  }>;
  demographics: {
    ageGroups: typeof ageGroupData;
    gender: typeof genderData;
    segments: typeof audienceSegments;
  };
}

export function QuickQuote() {
  const [county, setCounty] = useState('');
  const [duration, setDuration] = useState('');
  const [numberOfSites, setNumberOfSites] = useState('');
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateQuote = () => {
    if (!county || !duration || !numberOfSites) {
      return;
    }

    setIsCalculating(true);

    setTimeout(() => {
      const sites = parseInt(numberOfSites);
      const months = parseInt(duration);

      // Filter sites by county
      const filteredSites = county === 'all'
        ? premiumSites
        : premiumSites.filter(s => s.county === county);

      // Select top sites by impressions
      const selectedSites = filteredSites
        .sort((a, b) => b.impressions - a.impressions)
        .slice(0, sites);

      // Calculate totals
      const monthlyRate = selectedSites.reduce((sum, site) => sum + site.monthlyRate, 0);
      let totalCost = monthlyRate * months;

      // Volume & duration discounts
      let discount = 0;
      if (sites >= 5) discount = 0.1;
      if (sites >= 10) discount = 0.15;
      if (months >= 6) discount = Math.max(discount, 0.12);
      if (months >= 12) discount = Math.max(discount, 0.2);

      const discountAmount = totalCost * discount;
      totalCost -= discountAmount;

      // Calculate reach metrics
      const totalImpressions = selectedSites.reduce((sum, site) => sum + site.impressions, 0);
      const averageFrequency = selectedSites.reduce((sum, site) => sum + site.frequency, 0) / selectedSites.length;
      const estimatedReach = Math.round(totalImpressions / averageFrequency);

      // Sites breakdown
      const sitesBreakdown = selectedSites.map(site => ({
        name: site.name,
        impressions: site.impressions,
        reach: Math.round(site.impressions / site.frequency),
        frequency: site.frequency,
        cost: site.monthlyRate * months * (1 - discount),
      }));

      setQuoteResult({
        estimatedCost: totalCost,
        monthlyRate,
        estimatedReach,
        totalImpressions: totalImpressions * months,
        averageFrequency,
        availableSites: filteredSites.length,
        discount: discount * 100,
        sitesBreakdown,
        demographics: {
          ageGroups: ageGroupData,
          gender: genderData,
          segments: audienceSegments,
        },
      });

      setIsCalculating(false);
    }, 1500);
  };

  const canCalculate = county && duration && numberOfSites;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header
        title="Quick Quote"
        subtitle="Get instant pricing estimates for your LED digital campaign with detailed audience insights"
      />

      <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Hero Banner with Nairobi Image */}
        <div
          className="relative overflow-hidden rounded-3xl p-12 text-white shadow-2xl min-h-[280px]"
          style={{
            backgroundImage: `linear-gradient(135deg, rgba(37, 99, 235, 0.95), rgba(168, 85, 247, 0.9)), url('https://images.unsplash.com/photo-1611348524140-53c9a25263d6?q=80&w=2073')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
          <div className="absolute inset-0 opacity-25 mix-blend-soft-light" style={{ backgroundImage: 'url(/noisy-grad.png)', backgroundSize: 'cover' }}></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-xl rounded-full mb-6 border border-white/30">
              <SparkleIcon className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wide">POWERED BY GIGASTREAM</span>
            </div>

            <h1 className="text-5xl font-bold mb-4 leading-tight">
              Kenya's Most Advanced OOH<br />Campaign Planning Tool
            </h1>
            <p className="text-xl text-white/90 max-w-3xl leading-relaxed">
              Real-time pricing, verified audience data from 134+ premium LED digital inventories across Kenya.
              <span className="block mt-2 font-semibold">Get instant quotes with demographic breakdowns.</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote Calculator */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
                    <img src="/budget.svg" alt="" className="w-7 h-7 brightness-0 invert" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Campaign Calculator</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Configure your campaign parameters</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                      Target County
                    </label>
                    <Select
                      options={counties}
                      value={county}
                      onChange={(e) => setCounty(e.target.value)}
                      className="w-full"
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {county === 'Nairobi' ? '92 LED sites available' :
                       county && county !== 'all' ? `${premiumSites.filter(s => s.county === county).length} LED sites available` :
                       '134+ LED sites available across Kenya'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                      Campaign Duration
                    </label>
                    <Select
                      options={durations}
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full"
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {parseInt(duration) >= 6 && 'Long-term discount applies (12-20% off)'}
                      {parseInt(duration) < 6 && parseInt(duration) >= 3 && 'Medium-term rates'}
                      {parseInt(duration) < 3 && duration && 'Short-term premium rates'}
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 uppercase tracking-wide">
                      Number of Sites
                    </label>
                    <Input
                      type="number"
                      min="1"
                      max="50"
                      placeholder="e.g., 5"
                      value={numberOfSites}
                      onChange={(e) => setNumberOfSites(e.target.value)}
                      className="w-full"
                    />
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {parseInt(numberOfSites) >= 10 && 'Volume discount: 15% off'}
                      {parseInt(numberOfSites) >= 5 && parseInt(numberOfSites) < 10 && 'Volume discount: 10% off'}
                      {parseInt(numberOfSites) < 5 && numberOfSites && 'Select 5+ sites for volume discounts'}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
                    <Button
                      onClick={calculateQuote}
                      disabled={!canCalculate || isCalculating}
                      variant="primary"
                      size="lg"
                      className="w-full !bg-gradient-to-r !from-purple-600 !to-pink-600 hover:!from-purple-700 hover:!to-pink-700 font-semibold shadow-xl hover:shadow-2xl transition-all"
                    >
                      {isCalculating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Calculating Campaign Metrics...
                        </>
                      ) : (
                        <>
                          <img src="/budget.svg" alt="" className="w-5 h-5 mr-2 brightness-0 invert" />
                          Generate Instant Quote
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quote Result */}
            {quoteResult && (
              <div className="mt-8 space-y-6">
                {/* Main Cost Card */}
                <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl overflow-hidden">
                  <div className="relative bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-700 dark:via-pink-700 dark:to-orange-600 p-8 text-white">
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'url(/overlay-noise.avif)' }}></div>
                    <div className="absolute inset-0 opacity-15 mix-blend-soft-light" style={{ backgroundImage: 'url(/gradient-noise.png)', backgroundSize: 'cover' }}></div>
                    <div className="relative z-10 flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-bold">Campaign Quote Summary</h3>
                      {quoteResult.discount > 0 && (
                        <Badge className="bg-white/20 backdrop-blur-xl border-white/30 text-white font-bold px-4 py-2 text-base">
                          {quoteResult.discount}% Discount Applied
                        </Badge>
                      )}
                    </div>
                    <p className="relative z-10 text-white/90 text-lg">
                      {duration} month campaign across {numberOfSites} premium LED sites in {county === 'all' ? 'Kenya' : county}
                    </p>
                  </div>

                  <div className="p-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                      {/* Total Cost */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-slate-800 p-6 border border-purple-100 dark:border-purple-900/30 shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl shadow-inner">
                            <img src="/money-spend.svg" alt="" className="w-7 h-7" />
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Total Campaign Cost</p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                          KES {(quoteResult.estimatedCost / 1000000).toFixed(2)}M
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          KES {quoteResult.monthlyRate.toLocaleString()}/month
                        </p>
                      </div>

                      {/* Total Reach */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20 dark:to-slate-800 p-6 border border-blue-100 dark:border-blue-900/30 shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-3 bg-blue-100 dark:bg-blue-900/40 rounded-xl shadow-inner">
                            <img src="/network-reach.svg" alt="" className="w-7 h-7" />
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Estimated Reach</p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                          {(quoteResult.estimatedReach / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Unique viewers per month
                        </p>
                      </div>

                      {/* Total Impressions */}
                      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-slate-800 p-6 border border-green-100 dark:border-green-900/30 shadow-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl shadow-inner">
                            <Zap className="w-7 h-7 text-green-600 dark:text-green-400" />
                          </div>
                        </div>
                        <p className="text-sm font-bold text-gray-600 dark:text-gray-400 mb-2 uppercase tracking-wider">Total Impressions</p>
                        <p className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                          {(quoteResult.totalImpressions / 1000000).toFixed(1)}M
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Avg frequency: {quoteResult.averageFrequency.toFixed(1)}x
                        </p>
                      </div>
                    </div>

                    {/* Campaign Metrics */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900/50 dark:to-slate-800 rounded-2xl border border-gray-200 dark:border-slate-700 mb-8">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                          <img src="/billboard.svg" alt="" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Available Sites</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">{quoteResult.availableSites}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                          <Calendar className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Duration</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">{duration} Month{duration !== '1' ? 's' : ''}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">CPM</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            KES {((quoteResult.estimatedCost / quoteResult.totalImpressions) * 1000).toFixed(0)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/40 rounded-lg">
                          <img src="/dollar.svg" alt="" className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Cost/Reach</p>
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            KES {(quoteResult.estimatedCost / quoteResult.estimatedReach).toFixed(0)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Demographics Section */}
                    <div className="border-t border-gray-200 dark:border-slate-700 pt-8">
                      <h4 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-3">
                        <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        Audience Demographics & Insights
                      </h4>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Age Groups Chart */}
                        <Card className="bg-gradient-to-br from-blue-50/50 to-white dark:from-blue-950/10 dark:to-slate-800/50 p-6 border border-blue-100 dark:border-blue-900/30">
                          <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">Age Group Distribution</h5>
                          <ResponsiveContainer width="100%" height={220}>
                            <BarChart data={quoteResult.demographics.ageGroups}>
                              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" opacity={0.5} />
                              <XAxis dataKey="group" stroke="#9ca3af" style={{ fontSize: '11px', fontWeight: '600' }} />
                              <YAxis stroke="#9ca3af" style={{ fontSize: '11px', fontWeight: '600' }} tickFormatter={(value) => `${value}%`} />
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
                                {quoteResult.demographics.ageGroups.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </Card>

                        {/* Gender Split Chart */}
                        <Card className="bg-gradient-to-br from-pink-50/50 to-white dark:from-pink-950/10 dark:to-slate-800/50 p-6 border border-pink-100 dark:border-pink-900/30">
                          <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide">Gender Distribution</h5>
                          <ResponsiveContainer width="100%" height={220}>
                            <RePieChart>
                              <Pie
                                data={quoteResult.demographics.gender}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={90}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                {quoteResult.demographics.gender.map((entry, index) => (
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
                                formatter={(value) => <span style={{ fontSize: '13px', fontWeight: '600' }}>{value}</span>}
                              />
                            </RePieChart>
                          </ResponsiveContainer>
                        </Card>
                      </div>

                      {/* Audience Segments */}
                      <Card className="mt-6 bg-gradient-to-br from-purple-50/50 to-white dark:from-purple-950/10 dark:to-slate-800/50 p-6 border border-purple-100 dark:border-purple-900/30">
                        <h5 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4 uppercase tracking-wide flex items-center gap-2">
                          <PieChart className="w-4 h-4" />
                          Top Audience Segments
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {quoteResult.demographics.segments.map((segment, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 bg-white/50 dark:bg-slate-800/50 rounded-xl">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: segment.fill }}
                              ></div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white">{segment.name}</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">{segment.value}% reach</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </Card>
                    </div>

                    {/* CTA Section */}
                    <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="p-3 bg-blue-500 rounded-xl">
                          <SparkleIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-bold text-gray-900 dark:text-white mb-2">Ready to Launch Your Campaign?</h4>
                          <p className="text-sm text-gray-700 dark:text-gray-300">
                            This quote is based on verified audience data from Xchange analytics.
                            Create a full campaign to get detailed site recommendations, booking availability, and production support.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button
                          onClick={() => window.location.href = '/campaigns/new'}
                          variant="accent"
                          size="lg"
                          className="flex-1"
                        >
                          <img src="/billboard.svg" alt="" className="w-5 h-5 mr-2 brightness-0 invert" />
                          Create Full Campaign
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setQuoteResult(null)}
                          size="lg"
                          className="flex-1"
                        >
                          Calculate New Quote
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            {/* Key Benefits */}
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Why Gigastream?</h4>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-xl border border-blue-100 dark:border-blue-900/30">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">1</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">Verified Audience Data</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Real impressions, reach, and frequency from Xchange analytics platform</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-purple-50 dark:bg-purple-950/20 rounded-xl border border-purple-100 dark:border-purple-900/30">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">134+ Premium LED Sites</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">Nationwide coverage across Nairobi, Mombasa, Kisumu, Eldoret, and more</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-xl border border-green-100 dark:border-green-900/30">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white text-sm mb-1">We Handle Everything</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">From booking to production, installation, and post-campaign reporting</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Pricing Info */}
            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-900/50 shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img src="/budget.svg" alt="" className="w-5 h-5" />
                  <h4 className="font-bold text-purple-900 dark:text-purple-300">Volume Discounts</h4>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-purple-800 dark:text-purple-300">5-9 sites: <strong>10% discount</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-purple-800 dark:text-purple-300">10+ sites: <strong>15% discount</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-purple-800 dark:text-purple-300">6-11 months: <strong>12% discount</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-sm">
                    <div className="w-2 h-2 bg-purple-600 dark:bg-purple-400 rounded-full mt-1.5 flex-shrink-0"></div>
                    <span className="text-purple-800 dark:text-purple-300">12+ months: <strong>20% discount</strong></span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Average Rates */}
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-xl">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <img src="/dollar.svg" alt="" className="w-5 h-5" />
                  <h4 className="font-bold text-gray-900 dark:text-white">Market Rates (LED Digital)</h4>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Nairobi Premium</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">KES 550K-650K</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Nairobi Standard</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">KES 380K-480K</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400 font-medium">Regional Cities</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">KES 290K-420K</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-gradient-to-r from-green-600 to-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-gray-50 dark:bg-slate-900/50 rounded-xl">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    <strong>Note:</strong> Rates vary based on location visibility, traffic volume, and audience quality.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
