import React, { useEffect } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchAnalytics } from '../../redux/thunks/analyticsThunk';
import { selectAnalyticsData, selectAnalyticsStatus, selectAnalyticsError, selectAnalyticsAverages } from '../../redux/selectors/analyticsSelectors';
import { ChartSkeleton } from '../common/Skeleton';
import ErrorState from '../common/ErrorState';
import SectionHeader from '../common/SectionHeader';
import { RefreshCw, AlertTriangle, BarChart3 } from 'lucide-react';

const COLORS = { healthy: '#16a34a', warning: '#d97706', critical: '#dc2626' };

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[#1a1f2e] border border-gray-700/60 rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-gray-200 mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <span className="flex items-center gap-1.5 text-gray-400 capitalize">
            <span className="w-2 h-2 rounded-sm" style={{ background: p.color }} />
            {p.name}
          </span>
          <span className="font-semibold text-gray-200">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

const AnalyticsWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAnalyticsData);
  const status = useAppSelector(selectAnalyticsStatus);
  const error = useAppSelector(selectAnalyticsError);
  const averages = useAppSelector(selectAnalyticsAverages);

  useEffect(() => { if (status === 'idle') dispatch(fetchAnalytics(false)); }, [dispatch, status]);
  const loading = status === 'loading' || status === 'idle';

  const handleFetch = (simulateError: boolean) => dispatch(fetchAnalytics(simulateError));

  return (
    <section
      aria-labelledby="analytics-title"
      className="relative min-w-0 bg-[#131720] border border-gray-700/60 rounded-2xl p-5"
    >
      <div className="flex items-center justify-between mb-1">
        <SectionHeader id="analytics-title" icon={<BarChart3 className="w-5 h-5 text-violet-400" />} title="Device Health Trends" />
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleFetch(true)}
            title="Simulate error state"
            className="p-1.5 text-gray-500 hover:text-amber-400 transition-colors rounded-lg hover:bg-amber-900/20 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Simulate error state"
          >
            <AlertTriangle className="w-4 h-4" />
          </button>
          <button
            onClick={() => handleFetch(false)}
            disabled={loading}
            title="Refresh data"
            className="p-1.5 text-gray-500 hover:text-blue-400 transition-colors disabled:opacity-40 rounded-lg hover:bg-blue-900/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Refresh analytics data"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500 mb-4 -mt-2">Q1–Q2 Operational Performance</p>

      {/* Legend */}
      {!loading && !error && (
        <div className="flex items-center gap-5 mb-3">
          {Object.entries(COLORS).map(([k, color]) => (
            <span key={k} className="flex items-center gap-1.5 text-xs text-gray-400 capitalize">
              <span className="w-2.5 h-2.5 rounded-sm" style={{ background: color }} aria-hidden="true" />
              {k}
            </span>
          ))}
          <span className="ml-auto text-xs text-gray-500">Test Limit State</span>
        </div>
      )}

      {error ? (
        <ErrorState message={error} onRetry={() => handleFetch(false)} />
      ) : (
        <div className="h-64 w-full min-w-0" aria-label="Stacked bar chart showing device health trends Jan to Apr">
          {loading ? <ChartSkeleton /> : (
            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
              <BarChart data={data ?? []} margin={{ top: 5, right: 5, bottom: 5, left: -20 }} barCategoryGap="30%">
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.4} />
                <XAxis
                  dataKey="month"
                  axisLine={false} tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }} dy={8}
                />
                <YAxis
                  axisLine={false} tickLine={false}
                  tick={{ fontSize: 12, fill: '#6b7280' }}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(255,255,255,0.04)' }} />
                <Bar dataKey="healthy" name="Healthy" stackId="a" fill={COLORS.healthy} radius={[0, 0, 0, 0]} />
                <Bar dataKey="warning" name="Warning" stackId="a" fill={COLORS.warning} radius={[0, 0, 0, 0]} />
                <Bar dataKey="critical" name="Critical" stackId="a" fill={COLORS.critical} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      )}

      {/* Averages summary */}
      {!loading && !error && averages && (
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-gray-700/50">
          {([['healthy', 'Avg Healthy', 'text-green-400'], ['warning', 'Avg Warning', 'text-amber-400'], ['critical', 'Avg Critical', 'text-red-400']] as const).map(([k, label, cls]) => (
            <div key={k} className="text-center">
              <p className={`text-xl font-bold ${cls}`}>{averages[k]}</p>
              <p className="text-xs text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default AnalyticsWidget;