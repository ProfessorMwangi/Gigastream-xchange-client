import { useNavigate } from 'react-router-dom';
import { Header } from '../../components/layout';
import { Card, CardHeader, CardTitle, Button, Badge } from '../../components/common';
import {
  BillboardIcon,
  DocumentIcon,
  MoneyIcon,
  AnalyticsIcon,
  ClockIcon,
  CheckCircleIcon,
} from '../../components/icons/CustomIcons';

// Mock data
const mockStats = {
  totalSites: 12,
  pendingBookings: 5,
  monthlyRevenue: 2850000,
  occupancyRate: 78,
};

const mockBookings = [
  {
    id: '1',
    siteName: 'Uhuru Highway Billboard',
    agentName: 'Ogilvy Kenya',
    clientName: 'Safaricom PLC',
    startDate: '2026-01-15',
    endDate: '2026-02-14',
    amount: 350000,
    status: 'pending',
  },
  {
    id: '2',
    siteName: 'Mombasa Road LED',
    agentName: 'Scanad Kenya',
    clientName: 'EABL',
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    amount: 450000,
    status: 'pending',
  },
  {
    id: '3',
    siteName: 'Westlands Junction',
    agentName: 'WPP Mediacom',
    clientName: 'KCB Bank',
    startDate: '2026-01-20',
    endDate: '2026-03-20',
    amount: 560000,
    status: 'confirmed',
  },
];

const mockSites = [
  { id: '1', name: 'Uhuru Highway Billboard', status: 'booked', occupancy: 95 },
  { id: '2', name: 'Mombasa Road LED', status: 'available', occupancy: 60 },
  { id: '3', name: 'Westlands Junction', status: 'booked', occupancy: 100 },
  { id: '4', name: 'KICC Digital Screen', status: 'available', occupancy: 45 },
];

const statusConfig = {
  pending: { label: 'Pending Review', variant: 'warning' as const, icon: ClockIcon },
  confirmed: { label: 'Confirmed', variant: 'success' as const, icon: CheckCircleIcon },
  declined: { label: 'Declined', variant: 'error' as const, icon: CheckCircleIcon },
};

export function MediaOwnerDashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header
        title="Dashboard"
        subtitle="Manage your outdoor media inventory"
        action={{
          label: 'Add New Site',
          onClick: () => navigate('/media-owner/sites/new'),
        }}
      />

      <div className="p-8 max-w-[1600px] mx-auto space-y-8">
        {/* Stats Grid with Premium Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Sites */}
          <Card className="shadow-premium border-l-4 border-l-blue-500 hover:shadow-premium-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Sites</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.totalSites}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <BillboardIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          {/* Pending Bookings */}
          <Card className="shadow-premium border-l-4 border-l-warning-500 hover:shadow-premium-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Pending Bookings</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.pendingBookings}</p>
              </div>
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-warning-500 to-warning-600 flex items-center justify-center">
                <DocumentIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          {/* Monthly Revenue */}
          <Card className="shadow-premium border-l-4 border-l-success-500 hover:shadow-premium-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Monthly Revenue</p>
                <p className="text-3xl font-bold text-gray-900">KES {(mockStats.monthlyRevenue / 1000000).toFixed(1)}M</p>
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-sm font-medium text-success-600">+8%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-success-500 to-success-600 flex items-center justify-center">
                <MoneyIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          {/* Occupancy Rate */}
          <Card className="shadow-premium border-l-4 border-l-accent-500 hover:shadow-premium-lg transition-shadow">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Occupancy Rate</p>
                <p className="text-3xl font-bold text-gray-900">{mockStats.occupancyRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <svg className="w-4 h-4 text-success-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                  </svg>
                  <span className="text-sm font-medium text-success-600">+5%</span>
                </div>
              </div>
              <div className="w-12 h-12 rounded-xl bg-linear-to-br from-accent-500 to-accent-600 flex items-center justify-center">
                <AnalyticsIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pending Bookings */}
          <Card className="lg:col-span-2 shadow-premium border border-gray-100">
            <CardHeader className="flex items-center justify-between border-b border-gray-100 pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">Booking Requests</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/media-owner/bookings')} className="text-blue-600 hover:text-blue-700">
                View All
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </CardHeader>

            <div className="space-y-3 mt-4">
              {mockBookings.map((booking) => {
                const status = statusConfig[booking.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;

                return (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-5 bg-gradient-to-br from-white to-gray-50/50 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-xl ${
                        booking.status === 'pending' ? 'bg-warning-100' :
                        booking.status === 'confirmed' ? 'bg-success-100' : 'bg-error-100'
                      }`}>
                        <StatusIcon className={`w-5 h-5 ${
                          booking.status === 'pending' ? 'text-warning-600' :
                          booking.status === 'confirmed' ? 'text-success-600' : 'text-error-600'
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-base">{booking.siteName}</p>
                        <p className="text-sm text-gray-600 mt-0.5">
                          {booking.agentName} • {booking.clientName}
                        </p>
                        <p className="text-xs text-gray-500 mt-1.5">
                          {new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        KES {booking.amount.toLocaleString()}
                      </p>
                      <Badge variant={status.variant} className="mt-2">
                        {status.label}
                      </Badge>
                      {booking.status === 'pending' && (
                        <div className="flex gap-2 mt-3">
                          <Button variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-700">Approve</Button>
                          <Button variant="outline" size="sm" className="border-gray-300">Decline</Button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Site Overview */}
          <Card className="shadow-premium border border-gray-100">
            <CardHeader className="flex items-center justify-between border-b border-gray-100 pb-4">
              <CardTitle className="text-xl font-bold text-gray-900">My Sites</CardTitle>
              <Button variant="ghost" size="sm" onClick={() => navigate('/media-owner/sites')} className="text-blue-600 hover:text-blue-700">
                Manage
                <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </CardHeader>

            <div className="space-y-3 mt-4">
              {mockSites.map((site) => (
                <div key={site.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all">
                  <div>
                    <p className="font-semibold text-gray-900">{site.name}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <Badge variant={site.status === 'booked' ? 'success' : 'default'} size="sm">
                        {site.status === 'booked' ? 'Booked' : 'Available'}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">{site.occupancy}%</p>
                    <p className="text-xs text-gray-500 mt-0.5">occupancy</p>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full mt-5 border-gray-300 hover:bg-gray-50" onClick={() => navigate('/media-owner/sites/new')}>
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add New Site
            </Button>
          </Card>
        </div>

        {/* Revenue Chart Placeholder */}
        <Card className="shadow-premium border border-gray-100">
          <CardHeader className="border-b border-gray-100 pb-4">
            <CardTitle className="text-xl font-bold text-gray-900">Revenue Overview</CardTitle>
          </CardHeader>
          <div className="h-72 bg-gradient-to-br from-slate-50 to-blue-50/30 rounded-2xl flex items-center justify-center mt-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <AnalyticsIcon className="w-8 h-8 text-blue-600" />
              </div>
              <p className="text-lg font-semibold text-gray-900">Revenue Analytics Chart</p>
              <p className="text-sm text-gray-600 mt-1">Visualization with Recharts integration</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
