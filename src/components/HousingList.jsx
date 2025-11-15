import React from 'react'

export default function HousingList({ items = [], onSelect = () => {}, selectedId = null }) {
  if (!items || items.length === 0) {
    return <div className="list-empty">No housing found.</div>
  }

  return (
    <div className="housing-list">
      {items.map(item => {
        const isSelected = String(item.id) === String(selectedId)
        return (
          <div
            key={item.id}
            className={`housing-item ${isSelected ? 'selected' : ''}`}
            onClick={() => onSelect(item.id)}
            onMouseEnter={() => { /* optional: hover behavior forwarded by MapView via parent */ }}
          >
            <div className="housing-title">{item.name}</div>
            <div className="housing-addr">{item.address}</div>
            <div className="housing-meta">Rating: {item.rating}</div>
          </div>
        )
      })}
    </div>
  )
}
