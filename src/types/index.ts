export interface User {
  id: string;
  email: string;
  name: string;
  role: 'agent' | 'media_owner' | 'admin';
  organization: string;
  avatar?: string;
}

export interface Site {
  id: string;
  name: string;
  type: 'billboard' | 'led' | 'transit' | 'street_furniture';
  location: {
    lat: number;
    lng: number;
    address: string;
    county: string;
    constituency: string;
  };
  dimensions: {
    width: number;
    height: number;
    unit: 'ft' | 'm';
  };
  illumination: 'lit' | 'unlit' | 'digital';
  facingDirection: string;
  photos: string[];
  pricing: {
    daily: number;
    weekly: number;
    monthly: number;
    currency: string;
  };
  availability: 'available' | 'booked' | 'maintenance';
  trafficData: {
    dailyImpressions: number;
    peakHours: string[];
  };
  demographics: Demographics;
  visibilityScore: number;
  mediaOwner: {
    id: string;
    name: string;
    email: string;
  };
}

export interface Demographics {
  ageGroups: {
    '18-24': number;
    '25-34': number;
    '35-44': number;
    '45-54': number;
    '55+': number;
  };
  gender: {
    male: number;
    female: number;
  };
  incomeLevel: 'low' | 'medium' | 'high' | 'mixed';
  footTraffic: number;
  vehicleTraffic: number;
}

export interface Campaign {
  id: string;
  name: string;
  clientName: string;
  status: 'draft' | 'pending' | 'active' | 'completed' | 'cancelled';
  startDate: string;
  endDate: string;
  budget: number;
  productCategory: string;
  targetAudience: TargetAudience;
  sites: CampaignSite[];
  totalReach: number;
  totalCost: number;
  createdAt: string;
  updatedAt: string;
}

export interface TargetAudience {
  ageRange: [number, number];
  gender: 'all' | 'male' | 'female';
  incomeLevel: ('low' | 'medium' | 'high')[];
  locations: string[];
}

export interface CampaignSite {
  siteId: string;
  site: Site;
  status: 'pending' | 'confirmed' | 'declined';
  cost: number;
  startDate: string;
  endDate: string;
}

export interface Booking {
  id: string;
  campaignId: string;
  siteId: string;
  agentId: string;
  mediaOwnerId: string;
  status: 'pending' | 'confirmed' | 'declined';
  startDate: string;
  endDate: string;
  totalCost: number;
  createdAt: string;
  confirmedAt?: string;
}

export interface DashboardStats {
  activeCampaigns: number;
  pendingConfirmations: number;
  totalReach: number;
  totalSpend: number;
  reachChange: number;
  spendChange: number;
}
