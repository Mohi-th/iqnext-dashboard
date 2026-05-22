import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchUpdates } from '../../redux/thunks/updatesThunk';
import { selectUpdatesData, selectUpdatesStatus, selectUpdatesError } from '../../redux/selectors/updatesSelectors';
import { ListRowSkeleton } from '../common/Skeleton';
import ErrorState from '../common/ErrorState';
import SectionHeader from '../common/SectionHeader';
import { formatDate } from '../../utils/formatters';
import { ExternalLink, Bell } from 'lucide-react';

const UpdatesWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectUpdatesData);
  const status = useAppSelector(selectUpdatesStatus);
  const error = useAppSelector(selectUpdatesError);

  useEffect(() => { if (status === 'idle') dispatch(fetchUpdates()); }, [dispatch, status]);
  const loading = status === 'loading' || status === 'idle';

  return (
    <section
      aria-labelledby="updates-title"
      className="bg-[#131720] border border-gray-700/60 rounded-2xl p-5 h-full flex flex-col"
    >
      <SectionHeader
        id="updates-title"
        icon={<Bell className="w-5 h-5 text-amber-400" />}
        title="Product Updates"
        action={
          <button className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors">
            View All <ExternalLink className="w-3 h-3" />
          </button>
        }
      />

      {error && <ErrorState message={error} onRetry={() => dispatch(fetchUpdates())} />}

      <ol className="flex-1 divide-y divide-gray-700/50" aria-label="Product update timeline">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => <ListRowSkeleton key={i} />)
          : data?.map((item) => (
            <li key={item.id} className="flex items-start gap-3 py-3.5 group">
              <div className="mt-1.5 w-2 h-2 rounded-full bg-blue-500 shrink-0 ring-4 ring-blue-500/20" aria-hidden="true" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-200 leading-snug group-hover:text-blue-400 transition-colors duration-150 font-medium">
                  {item.title}
                </p>
                <div className="flex items-center gap-2 mt-1.5">
                  <span className="text-xs bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded font-mono border border-blue-700/40">
                    v{item.version}
                  </span>
                  <time
                    dateTime={new Date(item.releaseDate).toISOString()}
                    className="text-xs text-gray-500"
                  >
                    {formatDate(item.releaseDate)}
                  </time>
                </div>
              </div>
            </li>
          ))}
      </ol>
    </section>
  );
};

export default UpdatesWidget;
