import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/layout';
import { SidebarProvider } from './contexts/SidebarContext';

// Auth Pages
import { Login } from './pages/auth/Login';

// Pages
import { AgentDashboard } from './pages/agent/Dashboard';
import { CampaignBuilder } from './pages/agent/CampaignBuilder';
import { Campaigns } from './pages/agent/Campaigns';
import { QuickQuote } from './pages/agent/QuickQuote';
import { Analytics } from './pages/agent/Analytics';
import { BookingHistory } from './pages/agent/BookingHistory';
import { ExploreSites } from './pages/agent/ExploreSites';

function App() {
  return (
    <BrowserRouter>
      <SidebarProvider>
        <Routes>
          {/* Auth Routes - No AppShell */}
          <Route path="/login" element={<Login />} />

          {/* Protected Routes with AppShell */}
          <Route
            path="/*"
            element={
              <AppShell>
                <Routes>
                  {/* Main Platform Routes */}
                  <Route path="/dashboard" element={<AgentDashboard />} />

                  {/* Campaign Planning */}
                  <Route path="/explore" element={<ExploreSites />} />
                  <Route path="/campaigns" element={<Campaigns />} />
                  <Route path="/campaigns/new" element={<CampaignBuilder />} />
                  <Route path="/quote" element={<QuickQuote />} />

                  {/* Reports */}
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/history" element={<BookingHistory />} />

                  {/* Default redirect */}
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </AppShell>
            }
          />
        </Routes>
      </SidebarProvider>
    </BrowserRouter>
  );
}

export default App;
