/**
 * Living Lens - Mock Data Layer
 * Keeps all functions async so a real backend API can replace them seamlessly.
 */

// Registered Zoos
export const ZOOS = [
  { id: 'ZOO-LON-01', name: 'Metropolitan City Zoological Gardens' },
  { id: 'ZOO-SGP-02', name: 'Central Wildlife Conservation Park' },
  { id: 'ZOO-SDG-03', name: 'Highland Biosphere & Safari Sanctuary' },
  { id: 'ZOO-BER-04', name: 'Riverside Zoological Park' }
];

// Initial Observations (Page 4 from design PDF)
const INITIAL_OBSERVATIONS = [
  {
    id: 'obs-001',
    animal: 'Crocodile',
    observedBehaviour: 'Repeated agitations',
    abnormalityPercentage: 70,
    intensity: '10 - Very high',
    durationMinutes: 30,
    hazardProbability: 84.12,
    createdAt: '2026-10-02T10:15:00Z'
  },
  {
    id: 'obs-002',
    animal: 'Crocodile',
    observedBehaviour: 'Repeated agitations',
    abnormalityPercentage: 70,
    intensity: '10 - Very high',
    durationMinutes: 30,
    hazardProbability: 84.12,
    createdAt: '2026-10-02T09:45:00Z'
  },
  {
    id: 'obs-003',
    animal: 'Crocodile',
    observedBehaviour: 'Repeated agitations',
    abnormalityPercentage: 70,
    intensity: '10 - Very high',
    durationMinutes: 30,
    hazardProbability: 84.12,
    createdAt: '2026-10-02T09:00:00Z'
  },
  {
    id: 'obs-004',
    animal: 'Crocodile',
    observedBehaviour: 'Repeated agitations',
    abnormalityPercentage: 70,
    intensity: '10 - Very high',
    durationMinutes: 30,
    hazardProbability: 84.12,
    createdAt: '2026-10-02T08:30:00Z'
  },
  {
    id: 'obs-005',
    animal: 'Crocodile',
    observedBehaviour: 'Repeated agitations',
    abnormalityPercentage: 70,
    intensity: '10 - Very high',
    durationMinutes: 30,
    hazardProbability: 84.12,
    createdAt: '2026-10-02T07:50:00Z'
  },
  {
    id: 'obs-006',
    animal: 'Crocodile',
    observedBehaviour: 'Repeated agitations',
    abnormalityPercentage: 70,
    intensity: '10 - Very high',
    durationMinutes: 30,
    hazardProbability: 84.12,
    createdAt: '2026-10-02T07:15:00Z'
  },
  {
    id: 'obs-007',
    animal: 'Crocodile',
    observedBehaviour: 'Repeated agitations',
    abnormalityPercentage: 70,
    intensity: '10 - Very high',
    durationMinutes: 30,
    hazardProbability: 84.12,
    createdAt: '2026-10-02T06:40:00Z'
  },
  {
    id: 'obs-008',
    animal: 'Crocodile',
    observedBehaviour: 'Repeated agitations',
    abnormalityPercentage: 70,
    intensity: '10 - Very high',
    durationMinutes: 30,
    hazardProbability: 84.12,
    createdAt: '2026-10-02T06:00:00Z'
  }
];

// Citizen Alerts (Page 11 from design PDF)
const CITIZEN_ALERTS = [
  {
    id: 'alt-001',
    animal: 'Elephant',
    observedBehaviour: 'Sudden freezing',
    distanceKm: 2.4,
    advisory: 'Stay indoors',
    hazardProbability: 84.12,
    zone: 'North Enclosure',
    updatedAgo: '2 min ago',
    riskLevel: 'high'
  },
  {
    id: 'alt-002',
    animal: 'Crocodile',
    observedBehaviour: 'Thrashing in water',
    distanceKm: 3.1,
    advisory: 'Stay indoors',
    hazardProbability: 78.40,
    zone: 'Reptile House',
    updatedAgo: '9 min ago',
    riskLevel: 'high'
  },
  {
    id: 'alt-003',
    animal: 'Giraffe',
    observedBehaviour: 'Rushing into a group',
    distanceKm: 1.8,
    advisory: 'Stay indoors',
    hazardProbability: 61.25,
    zone: 'Giraffe Paddock',
    updatedAgo: '12 min ago',
    riskLevel: 'medium'
  },
  {
    id: 'alt-004',
    animal: 'Birds',
    observedBehaviour: 'Total silence',
    distanceKm: 4.0,
    advisory: 'Stay indoors',
    hazardProbability: 55.90,
    zone: 'Aviary',
    updatedAgo: '15 min ago',
    riskLevel: 'medium'
  },
  {
    id: 'alt-005',
    animal: 'Tiger',
    observedBehaviour: 'Fence pacing',
    distanceKm: 2.9,
    advisory: 'Stay indoors',
    hazardProbability: 72.33,
    zone: 'Big Cats',
    updatedAgo: '22 min ago',
    riskLevel: 'high'
  },
  {
    id: 'alt-006',
    animal: 'Snake',
    observedBehaviour: 'Crawling out in daylight',
    distanceKm: 5.2,
    advisory: 'Stay indoors',
    hazardProbability: 48.10,
    zone: 'Reptile House',
    updatedAgo: '28 min ago',
    riskLevel: 'medium'
  },
  {
    id: 'alt-007',
    animal: 'Monkey',
    observedBehaviour: 'Screeching, huddling',
    distanceKm: 3.6,
    advisory: 'Stay indoors',
    hazardProbability: 44.60,
    zone: 'Primate Valley',
    updatedAgo: '35 min ago',
    riskLevel: 'medium'
  },
  {
    id: 'alt-008',
    animal: 'Deer',
    observedBehaviour: 'Repeated agitations',
    distanceKm: 2.2,
    advisory: 'Stay indoors',
    hazardProbability: 40.75,
    zone: 'Wetland & Meadow',
    updatedAgo: '42 min ago',
    riskLevel: 'normal'
  }
];

// Map Zones (Page 6 from design PDF)
export const MAP_ZONES = [
  {
    id: 'zone-1',
    name: 'Elephant Enclosure',
    hazardProbability: 84.12,
    riskLevel: 'high',
    lat: 51.5365,
    lng: -0.1558
  },
  {
    id: 'zone-2',
    name: 'Big Cats',
    hazardProbability: 55.90,
    riskLevel: 'medium',
    lat: 51.5348,
    lng: -0.1522
  },
  {
    id: 'zone-3',
    name: 'Reptile House',
    hazardProbability: 78.40,
    riskLevel: 'high',
    lat: 51.5338,
    lng: -0.1545
  },
  {
    id: 'zone-4',
    name: 'Aviary',
    hazardProbability: 12.30,
    riskLevel: 'normal',
    lat: 51.5352,
    lng: -0.1592
  },
  {
    id: 'zone-5',
    name: 'Giraffe Paddock',
    hazardProbability: 48.10,
    riskLevel: 'medium',
    lat: 51.5372,
    lng: -0.1510
  },
  {
    id: 'zone-6',
    name: 'Wetland',
    hazardProbability: 8.75,
    riskLevel: 'normal',
    lat: 51.5328,
    lng: -0.1578
  }
];

// Storage Helper
function getStored(key, defaultVal) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : defaultVal;
  } catch {
    return defaultVal;
  }
}

function setStored(key, val) {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

export async function getZoos() {
  return [...ZOOS];
}

export async function getObservations() {
  const custom = getStored('livinglens_observations', INITIAL_OBSERVATIONS);
  return custom;
}

export async function submitObservation(data) {
  const current = await getObservations();
  const newObs = {
    id: 'obs-' + Date.now(),
    animal: data.animal,
    observedBehaviour: data.observedBehaviour,
    abnormalityPercentage: Number(data.abnormalityPercentage) || 0,
    intensity: data.intensity || '5 - Moderate',
    durationMinutes: Number(data.durationMinutes) || 10,
    hazardProbability: Number(data.hazardProbability) || 84.12,
    createdAt: new Date().toISOString()
  };
  const updated = [newObs, ...current];
  setStored('livinglens_observations', updated);
  return newObs;
}

export async function getAlerts() {
  return [...CITIZEN_ALERTS];
}

export async function getMapZones() {
  return [...MAP_ZONES];
}
