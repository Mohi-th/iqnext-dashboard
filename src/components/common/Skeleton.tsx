import React from 'react';
const base = 'animate-pulse bg-gray-700/60 rounded';

export const SkeletonBlock: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`${base} ${className}`} aria-hidden="true" />
);
export const StatCardSkeleton: React.FC = () => (
  <div className="bg-[#1a1f2e] rounded-xl p-4 flex flex-col gap-3 border border-gray-700/50">
    <SkeletonBlock className="h-3 w-1/2" />
    <SkeletonBlock className="h-8 w-2/5" />
    <SkeletonBlock className="h-2.5 w-3/5" />
  </div>
);
export const ListRowSkeleton: React.FC = () => (
  <div className="flex items-start gap-3 py-3 border-b border-gray-700/50 last:border-0">
    <SkeletonBlock className="h-2 w-2 rounded-full mt-1.5 shrink-0" />
    <div className="flex-1 flex flex-col gap-1.5">
      <SkeletonBlock className="h-3 w-4/5" />
      <SkeletonBlock className="h-2.5 w-2/5" />
    </div>
  </div>
);
export const AccordionRowSkeleton: React.FC = () => (
  <div className="flex items-center justify-between bg-[#1a1f2e] rounded-lg px-4 py-3 border border-gray-700/50">
    <SkeletonBlock className="h-3.5 w-2/5" />
    <SkeletonBlock className="h-1.5 w-20 rounded-full" />
  </div>
);
export const ChartSkeleton: React.FC = () => (
  <div className="flex items-end gap-4 h-64 px-2" aria-hidden="true">
    {[65, 80, 55, 90].map((h, i) => (
      <div key={i} className={`${base} flex-1 rounded-t`} style={{ height: `${h}%` }} />
    ))}
  </div>
);
export const MapSkeleton: React.FC = () => (
  <SkeletonBlock className="w-full h-full rounded-xl" />
);
