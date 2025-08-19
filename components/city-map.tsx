'use client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { Icon } from 'leaflet';
import { useEffect } from 'react';

// Фиксим пути к иконкам маркеров в Next.js
const markerIcon = new Icon({
  iconUrl: typeof window !== 'undefined'
    ? require('leaflet/dist/images/marker-icon.png')
    : '',
  iconRetinaUrl: typeof window !== 'undefined'
    ? require('leaflet/dist/images/marker-icon-2x.png')
    : '',
  shadowUrl: typeof window !== 'undefined'
    ? require('leaflet/dist/images/marker-shadow.png')
    : '',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function CityMap() {
  // Координаты Грозного
  const center: [number, number] = [43.3178, 45.6981];

  // Убираем тач-скролл конфликты внутри модалок (необязательно)
  useEffect(() => {
    (L as any).Marker.prototype.options.icon = markerIcon;
  }, []);

  return (
    <MapContainer
      center={center}
      zoom={13}
      className="leaflet-map rounded-xl"
      scrollWheelZoom={true}
    >
      <TileLayer
        // Можно поставить другой провайдер тайлов при необходимости и соблюдении условий использования
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={center} icon={markerIcon}>
        <Popup>
          Грозный<br />Чеченская Республика
        </Popup>
      </Marker>
    </MapContainer>
  );
}