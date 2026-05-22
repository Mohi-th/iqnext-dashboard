import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchOverview } from '../../redux/thunks/overviewThunk';
import { selectOverviewData, selectOverviewStatus, selectOverviewError } from '../../redux/selectors/overviewSelectors';
import { StatCardSkeleton } from '../common/Skeleton';
import ErrorState from '../common/ErrorState';
import { STAT_DEFINITIONS } from '../../constants/ui';
import { formatNumber, formatPercent, formatSqFt } from '../../utils/formatters';
import type { OverviewData } from '../../types';
import { TrendingUp } from 'lucide-react';

function formatValue(key: string, value: number): string {
  if (key === 'healthScore') return formatPercent(value);
  if (key === 'areaSqFt') return formatSqFt(value);
  if (key === 'assets' || key === 'workOrders') return formatNumber(value);
  return String(value);
}

const OverviewWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectOverviewData);
  const status = useAppSelector(selectOverviewStatus);
  const error = useAppSelector(selectOverviewError);

  useEffect(() => { if (status === 'idle') dispatch(fetchOverview()); }, [dispatch, status]);
  const loading = status === 'loading' || status === 'idle';

  return (
    <section aria-labelledby="overview-title" className="bg-[#131720] border border-gray-700/60 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 id="overview-title" className="text-base font-semibold text-gray-100">Organization Snapshot</h2>
          <p className="text-xs text-gray-500 mt-0.5">Real-time facility metrics</p>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-emerald-400 bg-emerald-900/30 border border-emerald-700/40 px-2.5 py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
          Live
        </span>
      </div>

      {error && <ErrorState message={error} onRetry={() => dispatch(fetchOverview())} />}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <StatCardSkeleton key={i} />)
          : data && STAT_DEFINITIONS.map(({ key, label, icon: Icon, ...rest }) => {
            const rawValue = data[key as keyof OverviewData] as number;
            const highlight = 'highlight' in rest ? rest.highlight && rawValue > 0 : false;
            const isHealth = key === 'healthScore';

            return (
              <div
                key={key}
                className={`rounded-xl p-4 flex flex-col gap-1.5 border transition-all duration-200 hover:border-gray-600 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/30 ${highlight
                    ? 'bg-amber-900/20 border-amber-700/40'
                    : isHealth
                      ? 'bg-blue-900/20 border-blue-700/40'
                      : 'bg-[#1a1f2e] border-gray-700/50'
                  }`}
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-5 h-5 ${highlight ? 'text-amber-400' : isHealth ? 'text-blue-400' : 'text-gray-400'}`} aria-hidden="true" />
                  <TrendingUp className="w-3 h-3 text-emerald-500 opacity-60" aria-hidden="true" />
                </div>
                <p
                  className={`text-2xl font-bold leading-tight ${highlight ? 'text-amber-400' : isHealth ? 'text-blue-400' : 'text-gray-100'
                    }`}
                  aria-label={`${label}: ${formatValue(key, rawValue)}`}
                >
                  {formatValue(key, rawValue)}
                </p>
                <p className="text-xs text-gray-500 truncate">{label}</p>
              </div>
            );
          })}
      </div>

      {/* Health score highlight bar */}
      {!loading && data && (
        <div className="mt-5 pt-4 border-t border-gray-700/50 flex items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs text-gray-400">Facility Health Score</span>
              <span className="text-xs font-semibold text-blue-400">{data.healthScore.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000"
                style={{ width: `${data.healthScore}%` }}
                role="progressbar"
                aria-valuenow={data.healthScore}
                aria-valuemin={0}
                aria-valuemax={100}
              />
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Assets</p>
            <p className="text-sm font-semibold text-gray-200">{formatNumber(data.assets)}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Work Orders</p>
            <p className="text-sm font-semibold text-gray-200">{formatNumber(data.workOrders)}</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default OverviewWidget;
