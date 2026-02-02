import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Input, Select, Badge } from '../../components/common';
import { SparkleIcon, ReachIcon, MoneyIcon, BillboardIcon, ClockIcon } from '../../components/icons/CustomIcons';
import { Calculator, MapPin, Calendar, TrendingUp } from 'lucide-react';

const locations = [
  { value: 'nairobi-cbd', label: 'Nairobi CBD' },
  { value: 'westlands', label: 'Westlands' },
  { value: 'mombasa', label: 'Mombasa' },
  { value: 'kisumu', label: 'Kisumu' },
  { value: 'nakuru', label: 'Nakuru' },
  { value: 'eldoret', label: 'Eldoret' },
];

const inventoryTypes = [
  { value: 'led-digital', label: 'LED Digital Screen' },
  { value: 'led-premium', label: 'Premium LED Digital' },
];

const durations = [
  { value: '1', label: '1 Month' },
  { value: '3', label: '3 Months' },
  { value: '6', label: '6 Months' },
  { value: '12', label: '12 Months' },
];

interface QuoteResult {
  estimatedCost: number;
  monthlyRate: number;
  estimatedReach: number;
  availableSites: number;
  discount: number;
}

export function QuickQuote() {
  const [location, setLocation] = useState('');
  const [inventoryType, setInventoryType] = useState('');
  const [duration, setDuration] = useState('');
  const [numberOfSites, setNumberOfSites] = useState('');
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  const calculateQuote = () => {
    if (!location || !inventoryType || !duration || !numberOfSites) {
      return;
    }

    setIsCalculating(true);

    // Simulate calculation delay
    setTimeout(() => {
      const sites = parseInt(numberOfSites);
      const months = parseInt(duration);

      // Base rates (KES per month per site)
      const baseRates: { [key: string]: number } = {
        'led-digital': 450000,
        'led-premium': 650000,
      };

      // Location multipliers
      const locationMultipliers: { [key: string]: number } = {
        'nairobi-cbd': 1.3,
        'westlands': 1.2,
        'mombasa': 1.1,
        'kisumu': 1.0,
        'nakuru': 0.95,
        'eldoret': 0.9,
      };

      const monthlyRate = baseRates[inventoryType] * locationMultipliers[location];
      let totalCost = monthlyRate * sites * months;

      // Volume discount
      let discount = 0;
      if (sites >= 5) discount = 0.1;
      if (sites >= 10) discount = 0.15;
      if (months >= 6) discount = Math.max(discount, 0.12);
      if (months >= 12) discount = Math.max(discount, 0.2);

      const discountAmount = totalCost * discount;
      totalCost -= discountAmount;

      // Estimated reach (impressions per month per site)
      const reachPerSite = inventoryType === 'led-premium' ? 6000000 : 4500000;
      const estimatedReach = reachPerSite * sites;

      setQuoteResult({
        estimatedCost: totalCost,
        monthlyRate,
        estimatedReach,
        availableSites: 134,
        discount: discount * 100,
      });

      setIsCalculating(false);
    }, 1000);
  };

  const canCalculate = location && inventoryType && duration && numberOfSites;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50/30 to-gray-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <Header
        title="Quick Quote"
        subtitle="Get instant pricing estimates for your campaign"
      />

      <div className="p-8 max-w-[1400px] mx-auto space-y-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 dark:from-purple-700 dark:via-pink-700 dark:to-orange-600 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-orange-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                <Calculator className="w-5 h-5" />
              </div>
              <span className="text-sm font-semibold tracking-wide">INSTANT PRICING</span>
            </div>
            <h2 className="text-3xl font-bold mb-2">Calculate Your Campaign Budget</h2>
            <p className="text-purple-100 text-lg max-w-3xl">
              Get real-time pricing estimates for LED digital advertising across Kenya. Our AI-powered calculator
              considers location, duration, and volume for accurate quotes.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quote Calculator */}
          <div className="lg:col-span-2">
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                    <SparkleIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">Campaign Details</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fill in your requirements below</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Select
                      label="Target Location"
                      options={locations}
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="Select location"
                    />

                    <Select
                      label="Inventory Type"
                      options={inventoryTypes}
                      value={inventoryType}
                      onChange={(e) => setInventoryType(e.target.value)}
                      placeholder="Select inventory type"
                    />

                    <Select
                      label="Campaign Duration"
                      options={durations}
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      placeholder="Select duration"
                    />

                    <Input
                      label="Number of Sites"
                      type="number"
                      min="1"
                      max="50"
                      placeholder="e.g., 5"
                      value={numberOfSites}
                      onChange={(e) => setNumberOfSites(e.target.value)}
                      hint="More sites = volume discount"
                    />
                  </div>

                  <div className="pt-6 border-t border-gray-200 dark:border-slate-700">
                    <Button
                      onClick={calculateQuote}
                      disabled={!canCalculate || isCalculating}
                      variant="primary"
                      size="lg"
                      className="w-full !bg-gradient-to-r !from-purple-600 !to-pink-600 hover:!from-purple-700 hover:!to-pink-700 font-semibold"
                    >
                      {isCalculating ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                          Calculating...
                        </>
                      ) : (
                        <>
                          <Calculator className="w-5 h-5 mr-2" />
                          Calculate Quote
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quote Result */}
            {quoteResult && (
              <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg mt-6 overflow-hidden">
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-700 dark:to-pink-700 p-6 text-white">
                  <div className="flex items-center gap-3 mb-2">
                    <SparkleIcon className="w-6 h-6" />
                    <h3 className="text-2xl font-bold">Your Estimated Quote</h3>
                  </div>
                  <p className="text-purple-100">Based on your campaign requirements</p>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-gradient-to-br from-purple-50 to-white dark:from-purple-950/20 dark:to-slate-800 p-6 rounded-xl border border-purple-100 dark:border-purple-900/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-3 bg-purple-100 dark:bg-purple-900/40 rounded-xl">
                          <MoneyIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                        </div>
                        {quoteResult.discount > 0 && (
                          <Badge variant="success" className="bg-green-100 text-green-700 border-0 font-semibold">
                            {quoteResult.discount}% OFF
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Total Campaign Cost</p>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        KES {(quoteResult.estimatedCost / 1000000).toFixed(2)}M
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                        KES {quoteResult.monthlyRate.toLocaleString()}/month per site
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-green-50 to-white dark:from-green-950/20 dark:to-slate-800 p-6 rounded-xl border border-green-100 dark:border-green-900/30">
                      <div className="flex items-center justify-between mb-3">
                        <div className="p-3 bg-green-100 dark:bg-green-900/40 rounded-xl">
                          <ReachIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
                        </div>
                        <Badge variant="success" className="bg-green-100 text-green-700 border-0 font-semibold">
                          Monthly
                        </Badge>
                      </div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Estimated Reach</p>
                      <p className="text-4xl font-bold text-gray-900 dark:text-white">
                        {(quoteResult.estimatedReach / 1000000).toFixed(1)}M
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">Impressions per month</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-gray-50 dark:bg-slate-900/50 rounded-xl">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                        <BillboardIcon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Available Sites</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{quoteResult.availableSites}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 dark:bg-orange-900/40 rounded-lg">
                        <Calendar className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Duration</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">{duration} Month{duration !== '1' ? 's' : ''}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-purple-100 dark:bg-purple-900/40 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">CPM (Cost per 1K)</p>
                        <p className="text-lg font-bold text-gray-900 dark:text-white">
                          KES {((quoteResult.estimatedCost / quoteResult.estimatedReach) * 1000).toFixed(0)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-lg">
                    <p className="text-sm text-blue-800 dark:text-blue-200">
                      <strong>Next Steps:</strong> This is an estimated quote. For a detailed proposal with specific site
                      recommendations and availability, create a full campaign plan.
                    </p>
                  </div>

                  <div className="flex gap-3 mt-6">
                    <Button
                      onClick={() => window.location.href = '/campaigns/new'}
                      variant="accent"
                      size="lg"
                      className="flex-1"
                    >
                      Create Full Campaign
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setQuoteResult(null)}
                      size="lg"
                      className="flex-1"
                    >
                      Calculate Another Quote
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="space-y-6">
            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/40 rounded-lg">
                    <MapPin className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">Coverage Areas</h4>
                </div>
                <div className="space-y-3">
                  {locations.map((loc) => (
                    <div key={loc.value} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-slate-700 last:border-0">
                      <span className="text-sm text-gray-700 dark:text-gray-300">{loc.label}</span>
                      <Badge variant="default" className="text-xs">Available</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 border-purple-200 dark:border-purple-900/50 shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <SparkleIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <h4 className="font-bold text-purple-900 dark:text-purple-300">Pricing Benefits</h4>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2 text-sm text-purple-800 dark:text-purple-300">
                    <div className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-1.5"></div>
                    <span>Volume discounts for 5+ sites</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-purple-800 dark:text-purple-300">
                    <div className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-1.5"></div>
                    <span>Long-term discounts (6+ months)</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-purple-800 dark:text-purple-300">
                    <div className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-1.5"></div>
                    <span>Premium locations at competitive rates</span>
                  </li>
                  <li className="flex items-start gap-2 text-sm text-purple-800 dark:text-purple-300">
                    <div className="w-1.5 h-1.5 bg-purple-600 dark:bg-purple-400 rounded-full mt-1.5"></div>
                    <span>LED digital inventory only</span>
                  </li>
                </ul>
              </div>
            </Card>

            <Card className="bg-white dark:bg-slate-800 border-0 shadow-lg">
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <ClockIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                  <h4 className="font-bold text-gray-900 dark:text-white">Average Rates</h4>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">LED Digital</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">KES 450K/month</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600 dark:text-gray-400">Premium LED</span>
                      <span className="text-sm font-bold text-gray-900 dark:text-white">KES 650K/month</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                      <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
