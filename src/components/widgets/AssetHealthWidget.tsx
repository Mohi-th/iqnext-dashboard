import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchAssetHealth } from '../../redux/thunks/assetHealthThunk';
import { selectAssetHealthData, selectAssetHealthStatus, selectAssetHealthError } from '../../redux/selectors/assetHealthSelectors';
import { AccordionRowSkeleton } from '../common/Skeleton';
import ErrorState from '../common/ErrorState';
import SectionHeader from '../common/SectionHeader';
import Modal from '../common/Modal';
import { useModal } from '../../hooks/useModel';
import { calcAssetTotals } from '../../utils/healthUtils';
import type { BuildingHealth, Floor } from '../../types';
import { ChevronDown, Building2, Lightbulb } from 'lucide-react';

const HealthBar: React.FC<{ healthy: number; warning: number; critical: number }> = ({ healthy, warning, critical }) => {
  const total = healthy + warning + critical || 1;
  const hp = (healthy / total) * 100;
  const wp = (warning / total) * 100;
  const cp = 100 - hp - wp;
  return (
    <div
      className="flex h-1.5 rounded-full overflow-hidden w-20 bg-gray-700"
      role="img"
      aria-label={`${Math.round(hp)}% healthy, ${Math.round(wp)}% warning, ${Math.round(cp)}% critical`}
    >
      <div className="bg-green-500 transition-all duration-700" style={{ width: `${hp}%` }} />
      <div className="bg-amber-500 transition-all duration-700" style={{ width: `${wp}%` }} />
      <div className="bg-red-500 transition-all duration-700" style={{ width: `${cp}%` }} />
    </div>
  );
};

const AssetBadge: React.FC<{ count: number; type: 'healthy' | 'warning' | 'critical' }> = ({ count, type }) => {
  const styles = {
    healthy: 'bg-green-900/50 text-green-300 border-green-700/40',
    warning: 'bg-amber-900/50 text-amber-300 border-amber-700/40',
    critical: 'bg-red-900/50 text-red-300 border-red-700/40',
  };
  return (
    <span className={`text-xs px-1.5 py-0.5 rounded border font-semibold tabular-nums ${styles[type]}`}>
      {count}
    </span>
  );
};

const FloorRow: React.FC<{ floor: Floor }> = ({ floor }) => (
  <div className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-700/30 rounded-lg transition-colors">
    <span className="text-xs text-gray-400 font-medium w-24 shrink-0">{floor.name}</span>
    <div className="flex items-center gap-1.5 flex-1">
      <AssetBadge count={floor.assets.healthy} type="healthy" />
      <AssetBadge count={floor.assets.warning} type="warning" />
      <AssetBadge count={floor.assets.critical} type="critical" />
    </div>
    <HealthBar {...floor.assets} />
    <span className="text-xs text-gray-500 tabular-nums shrink-0">{floor.energy.consumption} {floor.energy.unit}</span>
  </div>
);

const BuildingAccordion: React.FC<{ building: BuildingHealth; onViewDetails: (b: BuildingHealth) => void }> = ({ building, onViewDetails }) => {
  const [open, setOpen] = useState(false);
  const totals = calcAssetTotals(building.floors);

  return (
    <div className="border border-gray-700/50 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`floors-${building.building.replace(/\s+/g, '-')}`}
        className="w-full flex items-center gap-3 px-4 py-3 bg-[#1a1f2e] hover:bg-gray-700/40 transition-colors text-left focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
      >
        <Building2 className="w-4 h-4 text-blue-400 shrink-0" aria-hidden="true" />
        <span className="flex-1 font-medium text-sm text-gray-200">{building.building}</span>
        <HealthBar {...totals} />
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <div
        id={`floors-${building.building.replace(/\s+/g, '-')}`}
        hidden={!open}
        className="bg-[#131720]"
      >
        <div className="px-2 pt-2 pb-1">
          <div className="flex items-center gap-3 px-3 py-1 text-[10px] text-gray-500 uppercase tracking-wider">
            <span className="w-24 shrink-0">Floor</span>
            <span className="flex-1">H / W / C</span>
            <span>Status</span>
            <span className="shrink-0">Energy</span>
          </div>
          {building.floors.map((f) => <FloorRow key={f.name} floor={f} />)}
        </div>
        <div className="px-5 pb-3">
          <button
            onClick={() => onViewDetails(building)}
            className="text-xs text-blue-400 hover:text-blue-300 transition-colors hover:underline focus:outline-none"
            aria-label={`View full details for ${building.building}`}
          >
            View full details →
          </button>
        </div>
      </div>
    </div>
  );
};

const BuildingDetail: React.FC<{ building: BuildingHealth }> = ({ building }) => {
  const totals = calcAssetTotals(building.floors);
  const totalAssets = totals.healthy + totals.warning + totals.critical;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-3 gap-3">
        {([['healthy', 'green', totals.healthy], ['warning', 'amber', totals.warning], ['critical', 'red', totals.critical]] as const).map(([k, color, val]) => (
          <div key={k} className={`bg-${color}-900/20 border border-${color}-700/40 rounded-xl p-4 text-center`}>
            <p className={`text-2xl font-bold text-${color}-400`}>{val}</p>
            <p className="text-xs text-gray-400 mt-0.5 capitalize">{k}</p>
          </div>
        ))}
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-700/60">
            {['Floor', 'Healthy', 'Warning', 'Critical', 'Energy'].map((h) => (
              <th key={h} className="text-left pb-2 text-xs text-gray-500 font-medium first:text-left [&:not(:first-child)]:text-right">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700/40">
          {building.floors.map((f) => (
            <tr key={f.name}>
              <td className="py-2 text-gray-300">{f.name}</td>
              <td className="py-2 text-right text-green-400">{f.assets.healthy}</td>
              <td className="py-2 text-right text-amber-400">{f.assets.warning}</td>
              <td className="py-2 text-right text-red-400">{f.assets.critical}</td>
              <td className="py-2 text-right text-gray-500">{f.energy.consumption} {f.energy.unit}</td>
            </tr>
          ))}
          <tr className="border-t border-gray-600/60 font-semibold">
            <td className="pt-2 text-gray-200">Total</td>
            <td className="pt-2 text-right text-green-400">{totals.healthy}</td>
            <td className="pt-2 text-right text-amber-400">{totals.warning}</td>
            <td className="pt-2 text-right text-red-400">{totals.critical}</td>
            <td className="pt-2 text-right text-gray-400">{building.floors.reduce((s, f) => s + f.energy.consumption, 0)} kWh</td>
          </tr>
        </tbody>
      </table>
      <p className="text-xs text-gray-500">Total assets tracked: <strong className="text-gray-300">{totalAssets}</strong></p>
    </div>
  );
};

const AssetHealthWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectAssetHealthData);
  const status = useAppSelector(selectAssetHealthStatus);
  const error = useAppSelector(selectAssetHealthError);
  const { isOpen, open, close } = useModal();
  const [selectedBuilding, setSelectedBuilding] = useState<BuildingHealth | null>(null);

  useEffect(() => { if (status === 'idle') dispatch(fetchAssetHealth()); }, [dispatch, status]);
  const loading = status === 'loading' || status === 'idle';

  const handleViewDetails = (b: BuildingHealth) => { setSelectedBuilding(b); open(); };

  return (
    <section
      aria-labelledby="asset-health-title"
      className="bg-[#131720] border border-gray-700/60 rounded-2xl p-5 flex flex-col"
    >
      <SectionHeader id="asset-health-title" icon={<Lightbulb className="w-5 h-5 text-emerald-400" />} title="Asset Health Summary" />
      {error && <ErrorState message={error} onRetry={() => dispatch(fetchAssetHealth())} />}
      <div className="flex flex-col gap-2 flex-1">
        {loading
          ? Array.from({ length: 2 }).map((_, i) => <AccordionRowSkeleton key={i} />)
          : data?.map((b) => <BuildingAccordion key={b.building} building={b} onViewDetails={handleViewDetails} />)}
      </div>
      {!loading && !error && (
        <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-700/50">
          {[{ color: 'bg-green-500', label: 'Healthy' }, { color: 'bg-amber-500', label: 'Warning' }, { color: 'bg-red-500', label: 'Critical' }].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className={`inline-block w-2 h-2 rounded-sm ${color}`} aria-hidden="true" />{label}
            </span>
          ))}
        </div>
      )}
      <Modal isOpen={isOpen} onClose={close} title={selectedBuilding ? `${selectedBuilding.building} — Details` : ''} size="md">
        {selectedBuilding && <BuildingDetail building={selectedBuilding} />}
      </Modal>
    </section>
  );
};

export default AssetHealthWidget;