// src/components/MapView.jsx
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import { useEffect, useState } from 'react'
import io from 'socket.io-client'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix default marker icon path issues when using leaflet + Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png'
})

export default function MapView({ center = { lat: 12.9716, lng: 77.5946 }, bins = [] }){
  const [liveBins, setLiveBins] = useState(bins)

  // update local state when prop changes (initial load)
  useEffect(()=> setLiveBins(bins || []), [bins])

  useEffect(()=>{
    // connect to Socket.IO server (backend should be running at VITE_API_URL)
    const socketUrl = import.meta.env.VITE_API_URL || window.location.origin
    const socket = io(socketUrl, { transports: ['websocket', 'polling'] })

    socket.on('connect', () => {
      // optional: console.log('socket connected', socket.id)
    })

    socket.on('bins:update', (data) => {
      // backend emits array of bins with { id, name, location, fillLevel }
      if (Array.isArray(data)) setLiveBins(data)
    })

    socket.on('disconnect', () => {
      // optional: console.log('socket disconnected')
    })

    return () => socket.close()
  }, [])

  return (
    <div className="map-wrapper">
      <MapContainer center={[center.lat, center.lng]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        {/* user center */}
        <Marker position={[center.lat, center.lng]}>
          <Popup>Your registered location</Popup>
        </Marker>

        <Circle center={[center.lat, center.lng]} radius={800} />

        {/* live bins */}
        {liveBins.map(b => {
          const lat = b.location?.lat ?? 0
          const lng = b.location?.lng ?? 0
          return (
            <Marker key={b.id} position={[lat, lng]}>
              <Popup>
                <div style={{ minWidth: 160 }}>
                  <strong>{b.name}</strong>
                  <div>Fill: {b.fillLevel ?? 'N/A'}%</div>
                  <div className="muted">Distance: {b.distanceM ?? '—'} m</div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}
