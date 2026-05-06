'use client';

import * as React from 'react';
import { MapContainer, TileLayer, GeoJSON, useMapEvents } from 'react-leaflet';
import type { LatLngExpression } from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface GeohashPickerMapProps {
  center: LatLngExpression;
  zoom: number;
  onMapClick: (lat: number, lng: number) => void;
  cellGeoJSON: GeoJSON.Feature<GeoJSON.Polygon> | null;
}

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }): null {
  useMapEvents({
    click: (e) => {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function GeohashPickerMap({
  center,
  zoom,
  onMapClick,
  cellGeoJSON,
}: GeohashPickerMapProps): React.ReactElement {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapClickHandler onMapClick={onMapClick} />
      {cellGeoJSON && (
        <GeoJSON
          key={JSON.stringify(cellGeoJSON)}
          data={cellGeoJSON}
          style={{
            color: '#22c55e',
            weight: 2,
            fillOpacity: 0.2,
          }}
        />
      )}
    </MapContainer>
  );
}
