import React, { useEffect } from 'react';
import { MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAppDispatch, useAppSelector } from '../../redux/hooks/hooks';
import { fetchBuildings } from '../../redux/thunks/buildingsThunk';
import { selectBuildingsData, selectBuildingsStatus, selectBuildingsError } from '../../redux/selectors/buildingsSelectors';
import { MapSkeleton } from '../common/Skeleton';
import ErrorState from '../common/ErrorState';
import SectionHeader from '../common/SectionHeader';
import { getHealthColor } from '../../utils/healthUtils';

// Fix default Leaflet icons
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow,
  iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41],
});

function createHealthIcon(score: number) {
  const color = getHealthColor(score);
  return L.divIcon({
    html: `<div style="width:38px;height:38px;border-radius:50%;background:${color};border:3px solid rgba(255,255,255,0.9);box-shadow:0 4px 12px rgba(0,0,0,0.4);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:white;">${Math.round(score)}</div>`,
    iconSize: [38, 38], iconAnchor: [19, 19], className: '',
  });
}

const MapWidget: React.FC = () => {
  const dispatch = useAppDispatch();
  const data = useAppSelector(selectBuildingsData);
  const status = useAppSelector(selectBuildingsStatus);
  const error = useAppSelector(selectBuildingsError);

  useEffect(() => { if (status === 'idle') dispatch(fetchBuildings()); }, [dispatch, status]);
  const loading = status === 'loading' || status === 'idle';

  return (
    <section
      aria-labelledby="map-title"
      className="bg-[#131720] border border-gray-700/60 rounded-2xl p-5 isolate"
    >
      <SectionHeader
        id="map-title"
        icon={<MapPin className="w-5 h-5 text-blue-400" />}
        title="Global Facility Map"
        badge="Real-time status by location"
      />
      {error && <ErrorState message={error} onRetry={() => dispatch(fetchBuildings())} />}

      <div className="rounded-xl overflow-hidden h-80 border border-gray-700/50 relative z-0">
        {loading ? (
          <MapSkeleton />
        ) : data && (
          <MapContainer
            center={[15.967, 75.228]}
            zoom={5}
            style={{ height: '100%', width: '100%' }}
            scrollWheelZoom={false}
            aria-label="Map showing building locations across India"
          >
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {data.map((building) => (
              <Marker
                key={building.id}
                position={building.geoLocation}
                icon={createHealthIcon(building.healthScore)}
              >
                <Popup>
                  <div style={{ fontFamily: 'system-ui,sans-serif', minWidth: '160px', padding: '4px' }}>
                    <p style={{ fontWeight: 700, fontSize: '14px', margin: '0 0 2px' }}>{building.name}</p>
                    <p style={{ fontSize: '12px', color: '#6b7280', margin: '0 0 8px' }}>📍 {building.city}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #e5e7eb', paddingTop: '8px' }}>
                      <div>
                        <p style={{ fontSize: '10px', color: '#9ca3af', margin: '0', textTransform: 'uppercase', fontWeight: 600 }}>Health</p>
                        <p style={{ fontSize: '14px', fontWeight: 700, margin: '2px 0 0', color: getHealthColor(building.healthScore) }}>{building.healthScore.toFixed(1)}%</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p style={{ fontSize: '10px', color: '#9ca3af', margin: '0', textTransform: 'uppercase', fontWeight: 600 }}>Area</p>
                        <p style={{ fontSize: '13px', fontWeight: 600, margin: '2px 0 0' }}>{building.area.toLocaleString()} sqft</p>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {!loading && !error && (
        <div className="flex flex-wrap gap-4 mt-3">
          {[{ color: 'bg-green-500', label: 'Healthy (≥70%)' }, { color: 'bg-amber-500', label: 'Moderate (50–69%)' }, { color: 'bg-red-500', label: 'Critical (<50%)' }].map(({ color, label }) => (
            <span key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${color}`} aria-hidden="true" />{label}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};

export default MapWidget;