import { useState } from 'react';
import { Header } from '../../components/layout';
import { Card, Button, Badge } from '../../components/common';
import { ReachIcon, MoneyIcon, BillboardIcon } from '../../components/icons/CustomIcons';
import { Calendar, Search, Filter, Download, CheckCircle, Clock, XCircle, FileText } from 'lucide-react';
import clsx from 'clsx';

interface Booking {
  id: string;
  campaignName: string;
  clientName: string;
  siteName: string;
  location: string;
  startDate: string;
  endDate: string;
  status: 'completed' | 'active' | 'upcoming' | 'cancelled';
  cost: number;
  reach: number;
  bookedDate: string;
  inventoryType: 'LED Digital' | 'Premium LED';
}

const mockBookings: Booking[] = [
  {
    id: 'B001',
    campaignName: 'Safaricom Year End Promo',
    clientName: 'Safaricom PLC',
    siteName: 'Uhuru Highway LED',
    location: 'Nairobi CBD',
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    status: 'active',
    cost: 450000,
    reach: 5400000,
    bookedDate: '2025-12-15',
    inventoryType: 'LED Digital',
  },
  {
    id: 'B002',
    campaignName: 'Safaricom Year End Promo',
    clientName: 'Safaricom PLC',
    siteName: 'Westlands Junction LED',
    location: 'Westlands',
    startDate: '2026-01-01',
    endDate: '2026-01-31',
    status: 'active',
    cost: 420000,
    reach: 4800000,
    bookedDate: '2025-12-15',
    inventoryType: 'LED Digital',
  },
  {
    id: 'B003',
    campaignName: 'EABL Tusker Launch',
    clientName: 'East African Breweries',
    siteName: 'Mombasa Road Premium',
    location: 'Nairobi',
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    status: 'upcoming',
    cost: 650000,
    reach: 7200000,
    bookedDate: '2026-01-02',
    inventoryType: 'Premium LED',
  },
  {
    id: 'B004',
    campaignName: 'Equity Digital Banking',
    clientName: 'Equity Bank',
    siteName: 'KICC Digital Screen',
    location: 'Nairobi CBD',
    startDate: '2025-12-15',
    endDate: '2026-01-15',
    status: 'active',
    cost: 520000,
    reach: 6600000,
    bookedDate: '2025-12-01',
    inventoryType: 'Premium LED',
  },
  {
    id: 'B005',
    campaignName: 'Naivas Grand Opening',
    clientName: 'Naivas Supermarkets',
    siteName: 'Nakuru Highway LED',
    location: 'Nakuru',
    startDate: '2025-11-01',
    endDate: '2025-11-30',
    status: 'completed',
    cost: 380000,
    reach: 4200000,
    bookedDate: '2025-10-15',
    inventoryType: 'LED Digital',
  },
  {
    id: 'B006',
    campaignName: 'KCB Foundation CSR',
    clientName: 'KCB Bank',
    siteName: 'Kisumu Town Centre',
    location: 'Kisumu',
    startDate: '2025-10-15',
    endDate: '2025-11-15',
    status: 'cancelled',
    cost: 350000,
    reach: 0,
    bookedDate: '2025-10-01',
    inventoryType: 'LED Digital',
  },
  {
    id: 'B007',
    campaignName: 'Equity Digital Banking',
    clientName: 'Equity Bank',
    siteName: 'Thika Road Superhighway',
    location: 'Nairobi',
    startDate: '2025-12-15',
    endDate: '2026-01-15',
    status: 'active',
    cost: 480000,
    reach: 5800000,
    bookedDate: '2025-12-01',
    inventoryType: 'LED Digital',
  },
  {
    id: 'B008',
    campaignName: 'EABL Tusker Launch',
    clientName: 'East African Breweries',
    siteName: 'Mombasa Likoni Ferry',
    location: 'Mombasa',
    startDate: '2026-02-01',
    endDate: '2026-02-28',
    status: 'upcoming',
    cost: 550000,
    reach: 6200000,
    bookedDate: '2026-01-02',
    inventoryType: 'Premium LED',
  },
];

type FilterStatus = 'all' | 'completed' | 'active' | 'upcoming' | 'cancelled';

export function BookingHistory() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  const filteredBookings = mockBookings.filter((booking) => {
    const matchesSearch = booking.campaignName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.siteName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         booking.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockBookings.length,
    active: mockBookings.filter(b => b.status === 'active').length,
    upcoming: mockBookings.filter(b => b.status === 'upcoming').length,
    completed: mockBookings.filter(b => b.status === 'completed').length,
    cancelled: mockBookings.filter(b => b.status === 'cancelled').length,
    totalSpent: mockBookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.cost, 0),
    totalReach: mockBookings.filter(b => b.status !== 'cancelled').reduce((sum, b) => sum + b.reach, 0),
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'active':
        return <Clock className="w-4 h-4" />;
      case 'upcoming':
        return <Calendar className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-indigo-50/30 to-gray-50">
      <Header
        title="Booking History"
        subtitle="Complete record of all site bookings and reservations"
      />

      <div className="p-8 max-w-[1800px] mx-auto space-y-8">
        {/* Hero Banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-blue-600 to-cyan-500 p-8 text-white shadow-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="p-2 bg-white/20 backdrop-blur-sm rounded-lg">
                  <FileText className="w-5 h-5" />
                </div>
                <span className="text-sm font-semibold tracking-wide">BOOKING RECORDS</span>
              </div>
              <h2 className="text-3xl font-bold mb-2">Your Booking History</h2>
              <p className="text-indigo-100 text-lg">
                {stats.total} total bookings • {stats.active} active • KES {(stats.totalSpent / 1000000).toFixed(1)}M spent
              </p>
            </div>
            <Button className="bg-white text-indigo-600 hover:bg-indigo-50 font-semibold">
              <Download className="w-4 h-4 mr-2" />
              Export History
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl">
                    <BillboardIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <Badge variant="info" className="bg-blue-100 text-blue-700 border-0 font-semibold">
                    All
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Total Bookings</p>
                <p className="text-4xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-green-100 to-green-50 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <Badge variant="success" className="bg-green-100 text-green-700 border-0 font-semibold">
                    Done
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Completed</p>
                <p className="text-4xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-50 rounded-xl">
                    <MoneyIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <Badge variant="default" className="bg-purple-100 text-purple-700 border-0 font-semibold">
                    Total
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Total Spend</p>
                <p className="text-4xl font-bold text-gray-900">{(stats.totalSpent / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </Card>

          <Card className="bg-white border-0 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300 overflow-hidden group">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-full blur-2xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl">
                    <ReachIcon className="w-6 h-6 text-orange-600" />
                  </div>
                  <Badge variant="warning" className="bg-orange-100 text-orange-700 border-0 font-semibold">
                    Impact
                  </Badge>
                </div>
                <p className="text-sm font-semibold text-gray-600 mb-2">Total Reach</p>
                <p className="text-4xl font-bold text-gray-900">{(stats.totalReach / 1000000).toFixed(1)}M</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="bg-white border-0 shadow-lg">
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by campaign, client, or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-400" />
                <div className="flex gap-2">
                  {(['all', 'active', 'upcoming', 'completed', 'cancelled'] as FilterStatus[]).map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={clsx(
                        'px-4 py-2 rounded-lg text-sm font-medium transition-all',
                        filterStatus === status
                          ? 'bg-indigo-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      )}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Bookings List */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-gray-900">
            {filteredBookings.length} Booking{filteredBookings.length !== 1 ? 's' : ''}
          </h3>

          {filteredBookings.length === 0 ? (
            <Card className="bg-white border-0 shadow-lg">
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No bookings found</h3>
                <p className="text-gray-500">
                  {searchQuery ? 'Try adjusting your search criteria' : 'No booking history available'}
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map((booking) => (
                <Card
                  key={booking.id}
                  className="bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                >
                  <div className="p-6 relative">
                    <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-indigo-50 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold text-gray-900">{booking.siteName}</h4>
                            <Badge
                              variant={
                                booking.status === 'active' ? 'success' :
                                booking.status === 'upcoming' ? 'info' :
                                booking.status === 'completed' ? 'default' : 'error'
                              }
                              className="capitalize font-semibold flex items-center gap-1"
                            >
                              {getStatusIcon(booking.status)}
                              {booking.status}
                            </Badge>
                            <Badge variant="default" className="bg-purple-100 text-purple-700 border-0">
                              {booking.inventoryType}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-1">
                            <span className="font-medium">{booking.campaignName}</span> • {booking.clientName}
                          </p>
                          <p className="text-sm text-gray-500 mb-4">{booking.location}</p>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Booking ID</p>
                              <p className="text-sm font-semibold text-gray-900">{booking.id}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Campaign Period</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {new Date(booking.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {new Date(booking.endDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Cost</p>
                              <p className="text-sm font-semibold text-gray-900">KES {booking.cost.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Estimated Reach</p>
                              <p className="text-sm font-semibold text-gray-900">
                                {booking.reach > 0 ? `${(booking.reach / 1000000).toFixed(1)}M` : 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-300"
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-400 pt-4 border-t border-gray-100">
                        <span className="font-medium">Booked on {new Date(booking.bookedDate).toLocaleDateString()}</span>
                        <span>ID: {booking.id}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
