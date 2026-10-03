import { getMapZones, getAlerts } from './data.js';
import { protectedAreas } from './protected-areas.js';

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[character]);
}

export async function initLiveMap() {
  const mapElement = document.getElementById('leaflet-map');
  if (!mapElement) return;

  const zones = await getMapZones();
  const alerts = await getAlerts();
  const areaFilter = document.getElementById('map-protected-area-filter');
  const cardsContainer = document.getElementById('map-observation-cards');

  if (areaFilter) {
    protectedAreas.forEach((area) => {
      areaFilter.add(new Option(`${area.name} — ${area.district}`, area.id));
    });
  }

  // TODO: Confirm the existing Leaflet CDN and tile-provider setup in deployed environments.
  if (typeof window.L === 'undefined') {
    mapElement.innerHTML = `
      <div style="padding:40px; text-align:center; color:#E2FF7C;">
        <h3>Loading Map Services...</h3>
      </div>
    `;
    return;
  }

  const westBengalBounds = window.L.latLngBounds([21.2, 85.7], [27.5, 90.0]);
  // TODO: Confirm these viewing bounds against the official West Bengal boundary GIS data.
  const map = window.L.map('leaflet-map', {
    center: [23.0, 87.9],
    zoom: 6,
    minZoom: 6,
    maxBounds: westBengalBounds,
    maxBoundsViscosity: 0.8,
    zoomControl: true
  });

  window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors',
    maxZoom: 19
  }).addTo(map);

  const markerLayer = window.L.layerGroup().addTo(map);
  const circleLayer = window.L.layerGroup().addTo(map);

  function createPinIcon(riskLevel) {
    const color =
      riskLevel === 'high' ? '#FF0000' :
      riskLevel === 'medium' ? '#F5A623' :
      riskLevel === 'unknown' ? '#808080' : '#0ED984';
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

  function renderFilteredLocations() {
    const selectedAreaId = areaFilter?.value || '';
    const filteredZones = zones.filter((zone) => !selectedAreaId || zone.protectedAreaId === selectedAreaId);
    markerLayer.clearLayers();
    circleLayer.clearLayers();

    filteredZones.forEach((zone) => {
      if (!Number.isFinite(Number(zone.lat)) || !Number.isFinite(Number(zone.lng))) return;
      const coordinates = [Number(zone.lat), Number(zone.lng)];
      const marker = window.L.marker(coordinates, { icon: createPinIcon(zone.riskLevel) }).addTo(markerLayer);
      const color = zone.riskLevel === 'high' ? '#FF0000' : zone.riskLevel === 'medium' ? '#F5A623' : zone.riskLevel === 'unknown' ? '#808080' : '#0ED984';
      const areaName = escapeHtml(zone.protectedAreaName);

      marker.bindPopup(`
        <div style="font-family:Inter,sans-serif; padding:4px 6px;">
          <h4 style="margin:0 0 6px 0; color:#024123; font-size:15px;">${escapeHtml(zone.name)}</h4>
          <p style="margin:0; font-size:13px; color:#333;">Protected area: <strong>${areaName}</strong></p>
          <p style="margin:4px 0 0 0; font-size:13px; color:#333;">Risk level: <strong style="color:${color}; text-transform:capitalize;">${escapeHtml(zone.riskLevel)}</strong></p>
          <p style="margin:4px 0 0 0; font-size:14px; font-weight:700; color:#FF0000;">Hazard: ${zone.hazardProbability == null ? 'Not available' : `${Number(zone.hazardProbability).toFixed(2)}%`}</p>
        </div>
      `);
      window.L.circle(coordinates, {
        color,
        fillColor: color,
        fillOpacity: 0.18,
        radius: 95
      }).addTo(circleLayer);
    });

    if (cardsContainer) {
      cardsContainer.innerHTML = filteredZones.length
        ? filteredZones.map((zone) => `
          <div class="card" style="padding: 16px; min-height: 100px; justify-content: space-between;">
            <span style="font-weight: 600; font-size: 14px;">${escapeHtml(zone.name)}</span>
            <span style="font-size: 13px;">${escapeHtml(zone.protectedAreaName)}</span>
            <div style="display: flex; align-items: center; justify-content: flex-end; gap: 8px;">
              <span class="legend-dot ${escapeHtml(zone.riskLevel)}" style="width: 14px; height: 14px;"></span>
              <span style="font-weight: 700; font-size: 15px;">${zone.hazardProbability == null ? 'Not available' : `${Number(zone.hazardProbability).toFixed(2)}%`}</span>
            </div>
          </div>
        `).join('')
        : '<p>No observations with protected-area coordinates are available.</p>';
    }

    const sidebarContainer = document.getElementById('active-alerts-list');
    if (sidebarContainer) {
      const filteredAlerts = alerts.filter((alert) => !selectedAreaId || alert.protectedAreaId === selectedAreaId);
      sidebarContainer.innerHTML = filteredAlerts.length
        ? filteredAlerts.slice(0, 3).map((alert) => `
          <div class="active-alert-item">
            <p><strong>Wildlife species:</strong> ${escapeHtml(alert.animal)}</p>
            <p><strong>Protected area:</strong> ${escapeHtml(alert.zone)}</p>
            <p><strong>Updated:</strong> ${escapeHtml(alert.updatedAgo)}</p>
            <p class="card-hazard" style="margin-top:6px;">Hazard probability: ${alert.hazardProbability == null ? 'Not available' : `${Number(alert.hazardProbability).toFixed(2)}%`}</p>
          </div>
        `).join('')
        : '<p>No active alerts for this protected area.</p>';
    }
  }

  areaFilter?.addEventListener('change', renderFilteredLocations);
  renderFilteredLocations();
}
