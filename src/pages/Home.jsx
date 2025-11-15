import React, { useMemo, useState } from 'react'
import MapView from '../components/MapView'
import HousingList from '../components/HousingList'
import '../styles/home.css'

// Small demo dataset for Eugene (lat/lng approximate). Replace with real data/API.
const SAMPLE_HOUSING = [
  { id: '1', name: 'On-Campus Dorm A', address: '101 Campus Way', lat: 44.0455, lng: -123.0685, rating: 4.1 },
  { id: '2', name: 'Downtown Apartments', address: '200 Olive St', lat: 44.0521, lng: -123.0868, rating: 3.8 },
  { id: '3', name: 'Riverfront Lofts', address: '300 Island Ave', lat: 44.0590, lng: -123.0930, rating: 4.4 },
  { id: '4', name: 'West Campus Housing', address: '400 Campus Rd', lat: 44.0412, lng: -123.0952, rating: 3.9 }
]

export default function Home() {
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  // Filter housing by name or address
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return SAMPLE_HOUSING
    return SAMPLE_HOUSING.filter(h => (h.name + ' ' + h.address).toLowerCase().includes(q))
  }, [query])

  function handleSelect(id) {
    setSelectedId(id)
    // Navigate to a housing info page (stub). Replace with your router navigation if using react-router.
    window.location.href = `/housing/${id}`
  }

  return (
    <div className="home-root">
      <header className="site-header">
        <h1 className="site-title">RateMyHousing</h1>
        <p className="site-sub">Search reviews, ratings and information for Eugene housing</p>
      </header>

      <div className="search-row">
        <input
          aria-label="Search housing"
          className="search-input"
          placeholder="Search dorms or apartments (e.g. Riverfront Lofts)"
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter' && filtered.length === 1) handleSelect(filtered[0].id)
          }}
        />
      </div>

      <div className="main-pane">
        <div className="map-pane">
          <MapView
            items={filtered}
            selectedId={selectedId}
            onHover={id => setSelectedId(id)}
            onClick={handleSelect}
          />
        </div>

        <aside className="list-pane">
          <HousingList items={filtered} onSelect={handleSelect} selectedId={selectedId} />
        </aside>
      </div>
    </div>
  )
}
