import React, { useRef, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { useField } from 'payload/components/forms'

type Props = { path: string }

export const LocationField: React.FC<Props> = ({ path }) => {
  const { value, setValue } = useField<[number, number]>({ path })
  const mapRef = useRef<HTMLDivElement>()

  let map: L.Map | undefined
  let marker: L.Marker | undefined

  useEffect(() => {
    if (!window) return
    initMap()

    async function initMap() {
      const L = (await import('leaflet')).default
      map = L.map(mapRef.current).setView([51, 0], 13)
      const tile = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      const attribution =
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      L.tileLayer(tile, { maxZoom: 19, attribution }).addTo(map)
      marker = L.marker(value || [0, 0]).addTo(map)
    }

    return () => {
      map?.remove()
    }
  })

  return (
    <div>
      <div
        ref={mapRef}
        style={{ height: '280px', marginBottom: '2em', borderRadius: '6px' }}
      ></div>

      <div style={{ display: 'flex', gap: '1em', marginBottom: '2em' }}>
        <label>
          {path} - Longitude <br />
          <input
            type='number'
            value={value ? value[0] : 0}
            onChange={(event) => {
              setValue([event.target.value, value ? value[1] : 0])
            }}
          />
        </label>
        <label>
          {path} - Lattiude <br />
          <input
            type='number'
            value={value ? value[1] : 0}
            onChange={(event) => {
              setValue([value ? value[0] : 0, event.target.value])
            }}
          />
        </label>
      </div>
    </div>
  )
}
