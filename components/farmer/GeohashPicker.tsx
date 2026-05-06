'use client';

import * as React from 'react';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui/skeleton';
import { encodeGeohash, getGeohashBounds, boundsToGeoJSON } from '@/lib/geohash';
import { DEFAULT_MAP_CENTER } from '@/lib/constants';
import type { LatLngExpression } from 'leaflet';

const MapComponent = dynamic(() => import('./GeohashPickerMap'), {
  ssr: false,
  loading: () => <Skeleton className="w-full h-96" />,
});

interface GeohashPickerProps {
  value: string;
  onChange: (geohash: string) => void;
}

export function GeohashPicker({ value, onChange }: GeohashPickerProps): React.ReactElement {
  const handleMapClick = (lat: number, lng: number): void => {
    const geohash = encodeGeohash(lat, lng);
    onChange(geohash);
  };

  const cellBounds = value ? getGeohashBounds(value) : null;
  const cellGeoJSON = cellBounds ? boundsToGeoJSON(cellBounds) : null;

  return (
    <div className="space-y-4">
      <div className="w-full h-96 rounded-lg overflow-hidden border">
        <MapComponent
          center={[DEFAULT_MAP_CENTER.lat, DEFAULT_MAP_CENTER.lng] as LatLngExpression}
          zoom={DEFAULT_MAP_CENTER.zoom}
          onMapClick={handleMapClick}
          cellGeoJSON={cellGeoJSON}
        />
      </div>

      {value && (
        <div className="p-4 bg-muted rounded-lg">
          <div className="text-sm text-muted-foreground mb-1">Selected Geohash</div>
          <div className="font-mono text-lg">{value}</div>
          <div className="text-xs text-muted-foreground mt-2">
            This represents a ~5 km × 5 km cell covering your farm plot
          </div>
        </div>
      )}
    </div>
  );
}
