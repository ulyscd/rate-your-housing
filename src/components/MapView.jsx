import React from 'react'
import { MapContainer, TileLayer, CircleMarker, Tooltip, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function MapView({ items = [], selectedId = null, onHover = () => {}, onClick = () => {} }) {
  // Center around Eugene, OR by default
  const center = [44.0521, -123.0868]

  return (
    <MapContainer center={center} zoom={13} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {items.map(item => {
        const position = [item.lat, item.lng]
        const isSelected = String(item.id) === String(selectedId)
        return (
          <CircleMarker
            key={item.id}
            center={position}
            radius={isSelected ? 10 : 8}
            pathOptions={{ color: isSelected ? '#ff5722' : '#1976d2', fillColor: isSelected ? '#ffccbc' : '#bbdefb', fillOpacity: 0.8 }}
            eventHandlers={{
              mouseover: () => onHover(item.id),
              mouseout: () => onHover(null),
              click: () => onClick(item.id)
            }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1} permanent={false}>{item.name}</Tooltip>
            <Popup>
              <div>
                <strong>{item.name}</strong>
                <div>{item.address}</div>
                <div>Rating: {item.rating}</div>
                <div style={{ marginTop: 6 }}>
                  <button onClick={() => onClick(item.id)} style={{ padding: '6px 10px' }}>Open info</button>
                </div>
              </div>
            </Popup>
          </CircleMarker>
        )
      })}
    </MapContainer>
  )
}
