// src/pages/NearestBins.jsx
import { useEffect, useState } from 'react'
import { api } from '../api'           // axios instance (baseURL: VITE_API_URL + '/api')
import Navbar from '../components/Navbar'
import MapView from '../components/MapView'

export default function NearestBins(){
  const [bins, setBins] = useState([])
  const [center, setCenter] = useState({ lat: 12.9716, lng: 77.5946 })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    // Ensure token header (if you use auth localStorage token)
    const token = localStorage.getItem('token')
    if (token) api.defaults.headers.common['Authorization'] = `Bearer ${token}`

    async function load() {
      setLoading(true)
      setError('')
      try {
        const { data } = await api.get('/bins/nearest')
        setBins(data || [])

        if (data && data.length) {
          // compute an approximate center (mean of first 3 points)
          const n = Math.min(3, data.length)
          const lat = data.slice(0, n).reduce((s, b) => s + (b.location?.lat || 0), 0) / n
          const lng = data.slice(0, n).reduce((s, b) => s + (b.location?.lng || 0), 0) / n
          setCenter({ lat: lat || center.lat, lng: lng || center.lng })
        }
      } catch (err) {
        console.error('Failed to fetch nearest bins', err)
        setError(err?.response?.data?.error || 'Unable to load bins. Check backend /api/bins/nearest and CORS.')
      } finally {
        setLoading(false)
      }
    }

    load()

    // optional: poll every 30s to refresh (you get live updates via socket in MapView anyway)
    const t = setInterval(load, 30000)
    return () => clearInterval(t)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>Nearest Bins</h2>
        <p className="muted">Live updates every 10s — distances relative to your registered address.</p>

        <div className="map-card">
          <MapView center={center} bins={bins} />
        </div>

        <div style={{ marginTop: 16 }} className="card list">
          <h3>Bins list</h3>

          {loading && <div className="muted">Loading bins...</div>}
          {error && <div className="error">{error}</div>}

          {!loading && bins.length === 0 && (
            <div className="muted">No bins found. Ask admin to seed bins at <code>/api/bins/seed</code>.</div>
          )}

          {bins.map(b => (
            <div key={b.id} className="row" style={{ alignItems: 'center' }}>
              <div>
                <strong>{b.name || 'Unnamed Bin'}</strong>
                <div className="muted">Fill: {b.fillLevel ?? 'N/A'}%</div>
                <div className="muted">Lat: {b.location?.lat?.toFixed?.(5)}, Lng: {b.location?.lng?.toFixed?.(5)}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="badge">{b.distanceM ? `${b.distanceM} m` : '—'}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
