import React, { useState, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useLoaderData } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom marker icon
const markerIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Normalization function: lowercase + remove spaces
const normalize = (text) => {
  if (!text) return '';
  return text.toString().toLowerCase().replace(/\s+/g, '');
};

const Coverage = () => {
  const serviceCenters = useLoaderData();
  const [searchText, setSearchText] = useState('');
  const mapRef = useRef();
  const markerRefs = useRef([]);

const performSearch = () => {
  const query = normalize(searchText.trim());

  const foundIndex = serviceCenters.findIndex((item) =>
    normalize(item.district).includes(query) ||
    normalize(item.district_bn).includes(query)
  );

  if (foundIndex !== -1) {
    const found = serviceCenters[foundIndex];

    if (mapRef.current) {
      // একদম exact location এ smooth zoom (level 14 বা 15)
      mapRef.current.setView([found.latitude, found.longitude], 15, {
        animate: true,
        duration: 2,
      });
    }

    if (markerRefs.current[foundIndex]) {
      markerRefs.current[foundIndex].openPopup();
    }

    toast.success(`✔ ${found.district} / ${found.district_bn} পাওয়া গেছে!`);
  } else {
    toast.error('❌ জেলা পাওয়া যায়নি');
  }
};


  const handleSearchKey = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  return (
    <div className="py-10 px-4 md:px-8 lg:px-16">
      <h2 className="text-3xl font-bold text-center mb-4 text-black">We are available in 64 districts</h2>

      <div className="flex justify-center mb-6 gap-2">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={handleSearchKey}
          placeholder="Search district..."
          className="input input-bordered w-full max-w-md"
        />
        <button onClick={performSearch} className="btn btn-primary text-black">GO</button>
      </div>

      <div className="w-full h-[500px] rounded-lg overflow-hidden shadow-lg">
        <MapContainer
          center={[23.6850, 90.3563]}
          zoom={8}
          scrollWheelZoom
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
                if (el) markerRefs.current[index] = el;
              }}
            >
              <Popup>
                <strong>{item.city} ({item.district})</strong><br />
                Region: {item.region}<br />
                Areas: {item.covered_area.join(', ')}<br />
                <a
                  href={item.flowchart}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  View flowchart
                </a>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Coverage;
