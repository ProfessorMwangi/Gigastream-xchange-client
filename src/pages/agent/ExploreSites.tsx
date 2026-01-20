import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, useMap, FeatureGroup } from 'react-leaflet';
import { EditControl } from 'react-leaflet-draw';
import L from 'leaflet';
import 'leaflet-draw/dist/leaflet.draw.css';
import { Header } from '../../components/layout';
import { Button, Select, Badge } from '../../components/common';
import { SearchIcon, FilterIcon } from '../../components/icons/CustomIcons';
import { Info, Star, TrendingUp, Users, Eye, X, ChevronLeft, ChevronRight, BarChart2, ArrowUpDown, Zap, Clock, CheckCircle2 } from 'lucide-react';
import clsx from 'clsx';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import toast, { Toaster } from 'react-hot-toast';

// Custom billboard icon for map markers
const billboardIcon = new L.Icon({
  iconUrl: '/billboard.webp',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'billboard-marker',
});

// Custom component to handle map zoom and center changes
function MapController({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);

  return null;
}

// Mock sites data - LED digital inventories only
const mockSites = [
	{
		id: "1",
		name: "Junction Mall LED",
		type: "led" as const,
		location: {
			lat: -1.3044,
			lng: 36.8456,
			address: "Mombasa Road, Gateway Mall",
			county: "Nairobi",
			constituency: "Embakasi South",
		},
		dimensions: { width: 20, height: 10, unit: "ft" as const },
		illumination: "digital" as const,
		facingDirection: "East",
		photos: [
			"https://cdn.movingwalls.com/digital_billboard_1759908105073_Junction_Screen_1.jpg",
		],
		pricing: {
			daily: 20000,
			weekly: 120000,
			monthly: 450000,
			currency: "KES",
		},
		availability: "available" as const,
		trafficData: {
			dailyImpressions: 180000,
			peakHours: ["6-9 AM", "4-8 PM"],
		},
		demographics: {
			ageGroups: {
				"18-24": 20,
				"25-34": 40,
				"35-44": 22,
				"45-54": 12,
				"55+": 6,
			},
			gender: { male: 55, female: 45 },
			incomeLevel: "high" as const,
			footTraffic: 30000,
			vehicleTraffic: 150000,
		},
		visibilityScore: 96,
		mediaOwner: {
			id: "1",
			name: "Gigastream Media",
			email: "info@gigastreammedia.com",
		},
	},
	{
		id: "2",
		name: "Westlands Junction LED",
		type: "led" as const,
		location: {
			lat: -1.2673,
			lng: 36.8031,
			address: "Westlands Road, Near Sarit Centre",
			county: "Nairobi",
			constituency: "Westlands",
		},
		dimensions: { width: 40, height: 12, unit: "ft" as const },
		illumination: "digital" as const,
		facingDirection: "South",
		photos: [
			"https://www.digitalmara.co.ke/assets/images/blog_article-meta.jpeg",
		],
		pricing: {
			daily: 12000,
			weekly: 75000,
			monthly: 280000,
			currency: "KES",
		},
		availability: "available" as const,
		trafficData: {
			dailyImpressions: 95000,
			peakHours: ["8-10 AM", "5-7 PM"],
		},
		demographics: {
			ageGroups: {
				"18-24": 25,
				"25-34": 38,
				"35-44": 20,
				"45-54": 12,
				"55+": 5,
			},
			gender: { male: 48, female: 52 },
			incomeLevel: "high" as const,
			footTraffic: 55000,
			vehicleTraffic: 40000,
		},
		visibilityScore: 88,
		mediaOwner: {
			id: "2",
			name: "Digital Mara",
			email: "sales@digitalmara.co.ke",
		},
	},
	{
		id: "3",
		name:"Sarit Digital Screen",
		type: "led" as const,
		location: {
			lat: -1.2866,
			lng: 36.823,
			address: "City Centre, KICC",
			county: "Nairobi",
			constituency: "Starehe",
		},
		dimensions: { width: 15, height: 10, unit: "ft" as const },
		illumination: "digital" as const,
		facingDirection: "West",
		photos: [
			"https://cdn.movingwalls.com/digital_billboard_1759908020792_Sarit_Screen_-_HollyWood.jpg_thumnail.jpg",
		],
		pricing: {
			daily: 25000,
			weekly: 140000,
			monthly: 520000,
			currency: "KES",
		},
		availability: "available" as const,
		trafficData: { dailyImpressions: 220000, peakHours: ["7 AM - 8 PM"] },
		demographics: {
			ageGroups: {
				"18-24": 30,
				"25-34": 35,
				"35-44": 20,
				"45-54": 10,
				"55+": 5,
			},
			gender: { male: 50, female: 50 },
			incomeLevel: "mixed" as const,
			footTraffic: 120000,
			vehicleTraffic: 100000,
		},
		visibilityScore: 98,
		mediaOwner: {
			id: "1",
			name: "Gigastream Media",
			email: "info@gigastreammedia.com",
		},
	},
	{
		id: "4",
		name: "Mombasa CBD LED",
		type: "led" as const,
		location: {
			lat: -4.0435,
			lng: 39.6682,
			address: "Moi Avenue, Mombasa CBD",
			county: "Mombasa",
			constituency: "Mvita",
		},
		dimensions: { width: 36, height: 12, unit: "ft" as const },
		illumination: "digital" as const,
		facingDirection: "East",
		photos: [
			"https://magnate-ventures.com/images/outdoor/products/digital.jpg",
		],
		pricing: {
			daily: 10000,
			weekly: 60000,
			monthly: 220000,
			currency: "KES",
		},
		availability: "available" as const,
		trafficData: { dailyImpressions: 85000, peakHours: ["8 AM - 6 PM"] },
		demographics: {
			ageGroups: {
				"18-24": 32,
				"25-34": 30,
				"35-44": 20,
				"45-54": 12,
				"55+": 6,
			},
			gender: { male: 50, female: 50 },
			incomeLevel: "medium" as const,
			footTraffic: 60000,
			vehicleTraffic: 25000,
		},
		visibilityScore: 85,
		mediaOwner: {
			id: "3",
			name: "Coastal Media",
			email: "info@coastalmedia.co.ke",
		},
	},
];

const mediaTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'led', label: 'LED Digital' },
];

const counties = [
  { value: 'all', label: 'All Counties' },
  { value: 'Nairobi', label: 'Nairobi' },
  { value: 'Mombasa', label: 'Mombasa' },
];

// Tooltip component for metric explanations
function InfoTooltip({ text }: { text: string }) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="ml-1 text-gray-400 hover:text-gray-600 transition-colors"
      >
        <Info className="w-3.5 h-3.5" />
      </button>
      {show && (
        <div className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-gray-900 text-white text-xs rounded-lg shadow-xl">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"></div>
        </div>
      )}
    </div>
  );
}

export function ExploreSites() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSite, setSelectedSite] = useState<string | null>(null);
  const [showSidePanel, setShowSidePanel] = useState(false);
  const [cart, setCart] = useState<string[]>([]);
  const [mapZoom, setMapZoom] = useState(10);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-1.2921, 36.8219]); // Nairobi center
  const [filters, setFilters] = useState({
    type: 'all',
    county: 'all',
    availability: 'all',
  });
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 600000]);
  const [sortBy, setSortBy] = useState<'price' | 'traffic' | 'visibility'>('visibility');
  const [hoveredSite, setHoveredSite] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [compareMode, setCompareMode] = useState(false);
  const [compareList, setCompareList] = useState<string[]>([]);

  const filteredSites = mockSites
    .filter((site) => {
      if (searchQuery && !site.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      if (filters.type !== 'all' && site.type !== filters.type) {
        return false;
      }
      if (filters.county !== 'all' && site.location.county !== filters.county) {
        return false;
      }
      if (filters.availability !== 'all' && site.availability !== filters.availability) {
        return false;
      }
      // Price range filter
      if (site.pricing.monthly < priceRange[0] || site.pricing.monthly > priceRange[1]) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      // Sort logic
      switch (sortBy) {
        case 'price':
          return a.pricing.monthly - b.pricing.monthly;
        case 'traffic':
          return b.trafficData.dailyImpressions - a.trafficData.dailyImpressions;
        case 'visibility':
          return b.visibilityScore - a.visibilityScore;
        default:
          return 0;
      }
    });

  const selectedSiteData = selectedSite ? mockSites.find(s => s.id === selectedSite) : null;

  const toggleCart = (siteId: string) => {
    setCart(prev => {
      const isAdding = !prev.includes(siteId);
      const newCart = prev.includes(siteId)
        ? prev.filter(id => id !== siteId)
        : [...prev, siteId];

      // Show toast notification
      if (isAdding) {
        toast.success('Added to campaign', {
          icon: '✓',
          style: {
            borderRadius: '12px',
            background: '#10b981',
            color: '#fff',
          },
        });
      } else {
        toast('Removed from campaign', {
          icon: '−',
          style: {
            borderRadius: '12px',
            background: '#6b7280',
            color: '#fff',
          },
        });
      }

      return newCart;
    });
  };

  const toggleCompare = (siteId: string) => {
    setCompareList(prev => {
      if (prev.includes(siteId)) {
        return prev.filter(id => id !== siteId);
      }
      if (prev.length >= 3) {
        toast.error('Maximum 3 inventories for comparison');
        return prev;
      }
      return [...prev, siteId];
    });
  };

  const addAllToCart = () => {
    const availableSites = filteredSites.filter(s => s.availability === 'available').map(s => s.id);
    setCart(prev => {
      const newItems = availableSites.filter(id => !prev.includes(id));
      if (newItems.length > 0) {
        toast.success(`Added ${newItems.length} inventories to campaign`);
      }
      return [...new Set([...prev, ...availableSites])];
    });
  };

  const handleRecenter = () => {
    setMapCenter([-1.2921, 36.8219]);
    setMapZoom(10);
  };

  const handleZoomIn = () => {
    setMapZoom(prev => Math.min(prev + 1, 18));
  };

  const handleZoomOut = () => {
    setMapZoom(prev => Math.max(prev - 1, 5));
  };

  const handleMarkerClick = (siteId: string) => {
    setSelectedSite(siteId);
    setShowSidePanel(true);
  };

  const handleCreateCampaign = () => {
    // TODO: Pass selected sites to campaign builder
    navigate('/agent/campaigns/new', { state: { selectedSites: cart } });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Handle drawing shapes on map
  const handleShapeCreated = (e: L.DrawEvents.Created) => {
    const layer = e.layer;
    const sitesWithinShape: string[] = [];

    // Check each site if it's within the drawn shape
    mockSites.forEach((site) => {
      const point = L.latLng(site.location.lat, site.location.lng);

      if (layer instanceof L.Circle) {
        // Circle selection
        const distance = layer.getLatLng().distanceTo(point);
        if (distance <= layer.getRadius()) {
          sitesWithinShape.push(site.id);
        }
      } else if (layer instanceof L.Polyline && !(layer instanceof L.Polygon)) {
        // Line-based selection (buffer zone around line)
        const polylinePoints = layer.getLatLngs() as L.LatLng[];
        const bufferDistance = 1000; // 1km buffer on each side

        // Simple distance check to each point on the line
        for (let i = 0; i < polylinePoints.length; i++) {
          const distance = polylinePoints[i].distanceTo(point);
          if (distance <= bufferDistance) {
            sitesWithinShape.push(site.id);
            break;
          }
        }
      } else if (layer instanceof L.Polygon) {
        // Polygon selection - simple point-in-polygon check
        const pointInPolygon = (point: L.LatLng, vs: L.LatLng[]) => {
          const x = point.lat, y = point.lng;
          let inside = false;
          for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
            const xi = vs[i].lat, yi = vs[i].lng;
            const xj = vs[j].lat, yj = vs[j].lng;
            const intersect = ((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
            if (intersect) inside = !inside;
          }
          return inside;
        };

        const polygonPoints = layer.getLatLngs()[0] as L.LatLng[];
        if (pointInPolygon(point, polygonPoints)) {
          sitesWithinShape.push(site.id);
        }
      }
    });

    // Add all sites within shape to cart
    setCart(prev => {
      const newCart = [...prev];
      sitesWithinShape.forEach(id => {
        if (!newCart.includes(id)) {
          newCart.push(id);
        }
      });
      return newCart;
    });
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + K: Focus search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus();
      }
      // Ctrl/Cmd + A: Add all visible
      if ((e.ctrlKey || e.metaKey) && e.key === 'a' && e.shiftKey) {
        e.preventDefault();
        addAllToCart();
      }
      // Escape: Close side panel
      if (e.key === 'Escape') {
        setShowSidePanel(false);
        setCompareMode(false);
      }
      // C: Toggle compare mode
      if (e.key === 'c' && !e.ctrlKey && !e.metaKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT') {
          setCompareMode(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Calculate total monthly cost for selected sites
  const cartSites = mockSites.filter(site => cart.includes(site.id));
  const totalMonthly = cartSites.reduce((sum, site) => sum + site.pricing.monthly, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title="Explore Digital Inventories"
        subtitle={`${mockSites.length} premium digital inventories across Kenya • Book now, we handle everything`}
      />

      {/* Main Container */}
      <div className={clsx(
        "flex h-[calc(100vh-80px)]",
        cart.length > 0 && "pb-24"
      )}>
        {/* Left Panel: Inventory List */}
        <div className="w-125 bg-white border-r border-gray-200 flex flex-col">
          {/* Search and Filters */}
          <div className="p-5 border-b border-gray-200 space-y-3">
            <div className="relative">
              <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search digital inventories by location, size..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3 text-sm font-medium border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 tracking-wide"
              />
            </div>

            <div className="flex gap-2">
              <Select
                options={mediaTypes}
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="flex-1 text-sm"
              />
              <Select
                options={counties}
                value={filters.county}
                onChange={(e) => setFilters({ ...filters, county: e.target.value })}
                className="flex-1 text-sm"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="px-3"
              >
                <FilterIcon className="w-4 h-4" />
              </Button>
            </div>

            {/* Cart Counter */}
            {cart.length > 0 && (
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                <span className="text-sm font-semibold text-blue-900 tracking-wide">
                  {cart.length} {cart.length === 1 ? 'site' : 'sites'} selected
                </span>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white font-medium">
                  Add to Campaign
                </Button>
              </div>
            )}
          </div>

          {/* Scrollable Inventory List */}
          <div className="flex-1 overflow-y-auto">
            {filteredSites.map((site) => (
              <div
                key={site.id}
                className={clsx(
                  'p-5 border-b border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors',
                  selectedSite === site.id && 'bg-blue-50 hover:bg-blue-50'
                )}
                onClick={() => {
                  setSelectedSite(site.id);
                  setShowSidePanel(true);
                }}
              >
                <div className="flex gap-4">
                  {/* Checkbox */}
                  <div className="pt-1">
                    <input
                      type="checkbox"
                      checked={cart.includes(site.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleCart(site.id);
                      }}
                      className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                  </div>

                  {/* Thumbnail */}
                  <div className="w-24 h-18 shrink-0 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={site.photos[0]}
                      alt={site.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm text-gray-900 truncate tracking-wide">{site.name}</h3>
                      <Badge
                        variant={site.availability === 'available' ? 'success' : 'warning'}
                        size="sm"
                        className="shrink-0"
                      >
                        {site.availability === 'available' ? 'Available' : 'Dayparted'}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-600 mb-2.5 leading-relaxed">{site.location.address}</p>

                    <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        <span className="tracking-wide">{(site.trafficData.dailyImpressions / 1000).toFixed(0)}K</span>
                        <InfoTooltip text="Daily Impressions: The estimated number of people who will see your advertisement at this location every day, based on foot and vehicle traffic patterns." />
                      </span>
                      <span>•</span>
                      <span className="capitalize tracking-wide">{site.type}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1 tracking-wide">
                        Score: {site.visibilityScore}
                        <InfoTooltip text="Visibility Score: A rating from 0-100 that measures how easily your ad can be seen. Factors include viewing angle, distance from road, lighting, and surrounding obstructions." />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel: Map */}
        <div className="flex-1 relative bg-gray-200">
          {/* OpenStreetMap with Leaflet */}
          <MapContainer
            center={mapCenter}
            zoom={mapZoom}
            style={{ height: '100%', width: '100%' }}
            zoomControl={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapController center={mapCenter} zoom={mapZoom} />

            {/* Drawing Controls */}
            <FeatureGroup>
              <EditControl
                position="topleft"
                onCreated={handleShapeCreated}
                draw={{
                  rectangle: false,
                  circlemarker: false,
                  marker: false,
                  polygon: true,
                  polyline: {
                    shapeOptions: {
                      color: '#3b82f6',
                      weight: 4,
                    },
                  },
                  circle: {
                    shapeOptions: {
                      color: '#3b82f6',
                      fillColor: '#3b82f6',
                      fillOpacity: 0.2,
                    },
                  },
                }}
                edit={{
                  edit: false,
                  remove: true,
                }}
              />
            </FeatureGroup>

            {/* Markers for each site */}
            {filteredSites.map((site) => (
              <Marker
                key={site.id}
                position={[site.location.lat, site.location.lng]}
                icon={billboardIcon}
                eventHandlers={{
                  click: () => handleMarkerClick(site.id),
                }}
              >
                <Popup>
                  <div className="p-2">
                    <h3 className="font-bold text-sm mb-1">{site.name}</h3>
                    <p className="text-xs text-gray-600 mb-2">{site.location.address}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={site.availability === 'available' ? 'success' : 'warning'} size="sm">
                        {site.availability === 'available' ? 'Available' : 'Booked'}
                      </Badge>
                      <span className="text-xs text-gray-500 capitalize">{site.type}</span>
                    </div>
                    <p className="text-xs font-semibold text-gray-900">
                      KES {site.pricing.monthly.toLocaleString()}/month
                    </p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button
              size="sm"
              className="bg-white text-gray-700 shadow-lg hover:bg-gray-50 w-10 h-10 p-0"
              onClick={handleRecenter}
              title="Recenter map"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </Button>
            <Button
              size="sm"
              className="bg-white text-gray-700 shadow-lg hover:bg-gray-50 w-10 h-10 p-0"
              onClick={handleZoomIn}
              title="Zoom in"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </Button>
            <Button
              size="sm"
              className="bg-white text-gray-700 shadow-lg hover:bg-gray-50 w-10 h-10 p-0"
              onClick={handleZoomOut}
              title="Zoom out"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
              </svg>
            </Button>
            {/* Zoom level indicator */}
            <div className="bg-white text-gray-900 shadow-lg rounded-lg px-3 py-2 text-xs font-semibold">
              Zoom: {mapZoom}
            </div>
          </div>
        </div>

        {/* Side Panel: Site Details */}
        {showSidePanel && selectedSiteData && (
          <div className="w-105 bg-white border-l border-gray-200 flex flex-col shadow-xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex items-start justify-between">
              <div className="flex gap-4 flex-1">
                <img
                  src={selectedSiteData.photos[0]}
                  alt={selectedSiteData.name}
                  className="w-20 h-20 rounded-xl object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h2 className="font-bold text-base text-gray-900 mb-2 tracking-wide leading-relaxed">{selectedSiteData.name}</h2>
                  <p className="text-xs text-gray-600 leading-relaxed">{selectedSiteData.location.address}</p>
                </div>
              </div>
              <button
                onClick={() => setShowSidePanel(false)}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Action Buttons */}
            <div className="p-5 border-b border-gray-200 flex gap-3">
              <Button
                size="sm"
                variant="primary"
                className="flex-1 bg-blue-600 hover:bg-blue-700 font-medium tracking-wide"
                onClick={() => toggleCart(selectedSiteData.id)}
              >
                {cart.includes(selectedSiteData.id) ? (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </Button>
              <Button size="sm" variant="outline" className="px-4">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
              </Button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex px-2">
                <button className="px-5 py-3.5 text-sm font-semibold text-blue-600 border-b-2 border-blue-600 tracking-wide">
                  Location
                </button>
                <button className="px-5 py-3.5 text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide">
                  Specifications
                </button>
                <button className="px-5 py-3.5 text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide">
                  Audience
                </button>
                <button className="px-5 py-3.5 text-sm font-medium text-gray-600 hover:text-gray-900 tracking-wide">
                  Rates
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6 space-y-5">
              {/* Status */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</label>
                <Badge variant={selectedSiteData.availability === 'available' ? 'success' : 'warning'} className="mt-1">
                  {selectedSiteData.availability === 'available' ? 'Active' : 'Dayparted'}
                </Badge>
              </div>

              {/* Owner */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Inventory Owner</label>
                <p className="text-sm text-gray-900 mt-2 font-medium tracking-wide">{selectedSiteData.mediaOwner.name}</p>
              </div>

              {/* Location Details */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location Details</label>
                <div className="mt-3 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium tracking-wide">Latitude</span>
                    <span className="text-gray-900 font-semibold tracking-wide">{selectedSiteData.location.lat}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium tracking-wide">Longitude</span>
                    <span className="text-gray-900 font-semibold tracking-wide">{selectedSiteData.location.lng}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium tracking-wide">County</span>
                    <span className="text-gray-900 font-semibold tracking-wide">{selectedSiteData.location.county}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium tracking-wide">Constituency</span>
                    <span className="text-gray-900 font-semibold tracking-wide">{selectedSiteData.location.constituency}</span>
                  </div>
                </div>
              </div>

              {/* Type */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</label>
                <p className="text-sm text-gray-900 mt-2 font-medium capitalize tracking-wide">{selectedSiteData.type} Inventory</p>
              </div>

              {/* Dimensions */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Dimensions</label>
                <p className="text-sm text-gray-900 mt-2 font-medium tracking-wide">
                  {selectedSiteData.dimensions.width} x {selectedSiteData.dimensions.height} {selectedSiteData.dimensions.unit}
                </p>
              </div>

              {/* Facing Direction */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Facing Direction</label>
                <p className="text-sm text-gray-900 mt-2 font-medium tracking-wide">{selectedSiteData.facingDirection}</p>
              </div>

              {/* Pricing */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Pricing</label>
                <div className="mt-3 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium tracking-wide">Daily</span>
                    <span className="text-gray-900 font-semibold tracking-wide">KES {selectedSiteData.pricing.daily.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium tracking-wide">Weekly</span>
                    <span className="text-gray-900 font-semibold tracking-wide">KES {selectedSiteData.pricing.weekly.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 font-medium tracking-wide">Monthly</span>
                    <span className="text-gray-900 font-semibold tracking-wide">KES {selectedSiteData.pricing.monthly.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Visibility Score */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center gap-1">
                  Visibility Score
                  <InfoTooltip text="Visibility Score: A rating from 0-100 that measures how easily your ad can be seen. Factors include viewing angle, distance from road, lighting, and surrounding obstructions." />
                </label>
                <div className="flex items-center gap-3 mt-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: `${selectedSiteData.visibilityScore}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-bold text-gray-900">{selectedSiteData.visibilityScore}/100</span>
                </div>
              </div>

              {/* Traffic Data */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Traffic Data</label>
                <div className="mt-3 space-y-2.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1 font-medium tracking-wide">
                      Daily Impressions
                      <InfoTooltip text="Daily Impressions: The estimated number of people who will see your advertisement at this location every day, based on foot and vehicle traffic patterns." />
                    </span>
                    <span className="text-gray-900 font-semibold tracking-wide">{selectedSiteData.trafficData.dailyImpressions.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 flex items-center gap-1 font-medium tracking-wide">
                      Peak Hours
                      <InfoTooltip text="Peak Hours: The times of day when traffic is highest at this location, giving your ad maximum exposure to potential customers." />
                    </span>
                    <span className="text-gray-900 font-medium tracking-wide">{selectedSiteData.trafficData.peakHours.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Cart Footer - Sticky Bottom */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-2xl z-50">
          <div className="max-w-[1600px] mx-auto px-8 py-5">
            <div className="flex items-center justify-between">
              {/* Left: Cart Summary */}
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-600 font-medium tracking-wide">Selected Inventories</p>
                  <p className="text-2xl font-bold text-gray-900 tracking-wide">{cart.length} {cart.length === 1 ? 'site' : 'sites'}</p>
                </div>

                <div className="h-12 w-px bg-gray-300"></div>

                <div>
                  <p className="text-sm text-gray-600 font-medium tracking-wide">Estimated Monthly Cost</p>
                  <p className="text-2xl font-bold text-blue-600 tracking-wide">KES {totalMonthly.toLocaleString()}</p>
                </div>

                <div className="h-12 w-px bg-gray-300"></div>

                {/* Mini site cards */}
                <div className="flex items-center gap-2 max-w-md overflow-x-auto">
                  {cartSites.slice(0, 3).map((site) => (
                    <div key={site.id} className="flex items-center gap-2.5 px-4 py-2.5 bg-blue-50 rounded-xl border border-blue-200 shrink-0">
                      <img src={site.photos[0]} alt={site.name} className="w-8 h-8 rounded-lg object-cover" />
                      <span className="text-xs font-medium text-gray-900 truncate max-w-[100px] tracking-wide">{site.name}</span>
                      <button
                        onClick={() => toggleCart(site.id)}
                        className="ml-1 p-1 hover:bg-blue-200 rounded-lg transition-colors"
                      >
                        <svg className="w-3.5 h-3.5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                  {cart.length > 3 && (
                    <div className="px-4 py-2.5 bg-gray-100 rounded-xl text-xs font-semibold text-gray-700 tracking-wide">
                      +{cart.length - 3} more
                    </div>
                  )}
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="lg"
                  onClick={handleClearCart}
                  className="text-gray-600 hover:text-gray-900 font-medium tracking-wide"
                >
                  Clear All
                </Button>

                <Button
                  variant="primary"
                  size="lg"
                  onClick={handleCreateCampaign}
                  className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-600/20 px-8 font-medium tracking-wide"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Create Campaign
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
