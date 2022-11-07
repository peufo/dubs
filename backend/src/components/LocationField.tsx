import React, { useRef, useEffect } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import iconUrl from 'leaflet/dist/images/marker-icon.png'
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

console.log({ iconUrl })

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
      const latlng = { lat: value[1] || 0, lng: value[0] || 0 }
      map = L.map(mapRef.current).setView(latlng, 15)
      const tile = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
      const attribution =
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      L.tileLayer(tile, { maxZoom: 19, attribution }).addTo(map)
      const icon = new L.Icon({
        iconUrl,
        shadowUrl,
        iconRetinaUrl,
        iconAnchor: [12.5, 41],
      })

      marker = L.marker(latlng, { icon }).addTo(map)
      map.on('dblclick', (event) => {
        event.originalEvent.preventDefault()
        const { latlng } = event
        setValue([latlng.lng, latlng.lat])
        marker.setLatLng(latlng)
      })
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
