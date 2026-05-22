import OverviewWidget from './components/widgets/OverviewWidget';
import UpdatesWidget from './components/widgets/UpdatesWidget';
import AssetHealthWidget from './components/widgets/AssetHealthWidget';
import MapWidget from './components/widgets/MapWidget';
import AnalyticsWidget from './components/widgets/AnalyticsWidget';
import { Building2, LayoutDashboard, Bell, Settings, ChevronRight } from 'lucide-react';

function App() {
  const now = new Date().toLocaleString('en-IN', {
    weekday: 'short', day: 'numeric', month: 'short',
    year: 'numeric', hour: '2-digit', minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-gray-100">

      {/* ── Header ── */}
      <header className="sticky top-0 z-40 bg-[#0d1117]/90 backdrop-blur-md border-b border-gray-800/70">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-4">

          {/* Brand */}
          <div className="flex items-center gap-2.5 shrink-0">
            <div className="bg-blue-600 p-1.5 rounded-lg">
              <Building2 className="w-4 h-4 text-white" aria-hidden="true" />
            </div>
            <div>
              <h1 className="text-sm font-bold leading-none text-white">IQNext</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-widest font-medium mt-0.5">Smart Building Admin</p>
            </div>
          </div>

          {/* Nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            <a
              href="#"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-blue-400 bg-blue-900/30 border border-blue-700/40"
              aria-current="page"
            >
              <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
              Dashboard
            </a>
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-2">
            <span className="hidden lg:block text-xs text-gray-600">{now}</span>
            <button
              className="relative p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-red-500" aria-hidden="true" />
            </button>
            <button
              className="p-2 text-gray-500 hover:text-gray-300 hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center text-xs font-bold text-white shrink-0" aria-label="User avatar">
              AD
            </div>
          </div>
        </div>
      </header>

      {/* ── Breadcrumb ── */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-1.5 text-xs text-gray-600">
        <span>Home</span>
        <ChevronRight className="w-3 h-3" aria-hidden="true" />
        <span className="text-gray-400 font-medium">Dashboard</span>
      </div>

      {/* ── Main content ── */}
      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pb-12 space-y-5">

        {/* Row 1: Overview full-width */}
        <OverviewWidget />

        {/* Row 2: Updates (right) + Asset Health (right) stacked, Map (left) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Left col */}
          <div className="lg:col-span-7 space-y-5">
            <AssetHealthWidget />
            <MapWidget />
            <AnalyticsWidget />
          </div>

          {/* Right col */}
          <div className="lg:col-span-5">
            <UpdatesWidget />
          </div>
        </div>

      </main>

    </div>
  );
}

export default App;
