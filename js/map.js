/**
 * Living Lens - Interactive Leaflet Map & Zone Visualizer
 */
import { getMapZones, getAlerts } from './data.js';

export async function initLiveMap() {
  const mapElement = document.getElementById('leaflet-map');
  if (!mapElement) return;

  const zones = await getMapZones();
  const alerts = await getAlerts();

  // Check if Leaflet L is available
  if (typeof window.L === 'undefined') {
    mapElement.innerHTML = `
      <div style="padding:40px; text-align:center; color:#E2FF7C;">
        <h3>Loading Map Services...</h3>
      </div>
    `;
    return;
  }

  // Center on zoo coordinates
  const map = window.L.map('leaflet-map', {
    center: [51.5355, -0.1550],
    zoom: 16,
    zoomControl: true
  });

  // OpenStreetMap Tile Layer
  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  // Custom Pin Marker Creator
  function createPinIcon(riskLevel) {
    const color = 
      riskLevel === 'high' ? '#FF0000' :
      riskLevel === 'medium' ? '#F5A623' : '#0ED984';

    const svgIcon = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 42" width="32" height="42">
        <path d="M16 0 C7.16 0 0 7.16 0 16 C0 28 16 42 16 42 C16 42 32 28 32 16 C32 7.16 24.84 0 16 0 Z" fill="${color}" stroke="#024123" stroke-width="2"/>
        <circle cx="16" cy="16" r="6" fill="#FFFFFF"/>
      </svg>
    `;

    return window.L.divIcon({
      className: 'custom-map-pin',
      html: svgIcon,
      iconSize: [32, 42],
      iconAnchor: [16, 42],
      popupAnchor: [0, -38]
    });
  }

  // Plot zones & markers
  zones.forEach(zone => {
    const pin = window.L.marker([zone.lat, zone.lng], {
      icon: createPinIcon(zone.riskLevel)
    }).addTo(map);

    const color = zone.riskLevel === 'high' ? '#FF0000' : zone.riskLevel === 'medium' ? '#F5A623' : '#0ED984';

    pin.bindPopup(`
      <div style="font-family:Inter,sans-serif; padding:4px 6px;">
        <h4 style="margin:0 0 6px 0; color:#024123; font-size:15px;">${zone.name}</h4>
        <p style="margin:0; font-size:13px; color:#333;">Risk Level: <strong style="color:${color}; text-transform:capitalize;">${zone.riskLevel}</strong></p>
        <p style="margin:4px 0 0 0; font-size:14px; font-weight:700; color:#FF0000;">Hazard: ${zone.hazardProbability.toFixed(2)}%</p>
      </div>
    `);

    // Circular radar boundary around zone
    window.L.circle([zone.lat, zone.lng], {
      color: color,
      fillColor: color,
      fillOpacity: 0.18,
      radius: 95
    }).addTo(map);
  });

  // Render Active Alerts in sidebar
  const sidebarContainer = document.getElementById('active-alerts-list');
  if (sidebarContainer) {
    sidebarContainer.innerHTML = alerts.slice(0, 3).map(alert => `
      <div class="active-alert-item">
        <p><strong>Animal:</strong> ${alert.animal}</p>
        <p><strong>Zone:</strong> ${alert.zone}</p>
        <p><strong>Updated:</strong> ${alert.updatedAgo}</p>
        <p class="card-hazard" style="margin-top:6px;">Hazard probability: ${alert.hazardProbability.toFixed(2)}%</p>
      </div>
    `).join('');
  }
}
