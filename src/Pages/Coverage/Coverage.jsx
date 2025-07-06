import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';

// Marker icon fix
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41]
});

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const [searchText, setSearchText] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const mapRef = useRef();
  const markerRefs = useRef({});

  // Pan & open popup when selectedDistrict changes
  useEffect(() => {
    if (selectedDistrict && mapRef.current) {
      const { latitude, longitude } = selectedDistrict;
      mapRef.current.flyTo([latitude, longitude], 10, { duration: 2 });
      // Open popup
      const marker = markerRefs.current[selectedDistrict.district.toLowerCase()];
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedDistrict]);

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      const text = searchText.trim().toLowerCase();
      const found = serviceCenters.find((item) => 
        item.district.toLowerCase().includes(text)
      );
      if (found) {
        setSelectedDistrict(found);
      } else {
        alert('District not found!');
      }
    }
  };

  return (
    <div className="py-10 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-4">We are available in 64 districts</h2>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search district..."
          className="input input-bordered w-full max-w-md"
        />
      </div>

      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[23.6850, 90.3563]}
          zoom={7}
          scrollWheelZoom={true}
          style={{ height: '100%', width: '100%' }}
          whenCreated={(mapInstance) => (mapRef.current = mapInstance)}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {serviceCenters.map((item, index) => (
            <Marker
              key={index}
              position={[item.latitude, item.longitude]}
              icon={markerIcon}
              ref={(el) => {
                if (el) {
                  markerRefs.current[item.district.toLowerCase()] = el;
                }
              }}
            >
              <Popup>
                <strong>{item.city} ({item.district})</strong><br />
                Region: {item.region}<br />
                Areas: {item.covered_area.join(", ")}<br />
                <a href={item.flowchart} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">View flowchart</a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Coverage;
