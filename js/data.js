import {
  getObservations as fetchObservations,
  getForestOfficers as fetchForestOfficers,
  addObservation as createObservation,
  predictHazard as fetchPrediction,
  sendEmergencyEmail as triggerEmergencyEmail,
  checkBackendHealth,
  addForestOfficer as addOfficerToBackend,
  forestOfficerLogin,
  citizenLogin,
  citizenRegister,
  adminLogin
} from './api.js';
import { getProtectedAreaById, getProtectedAreaName, protectedAreas } from './protected-areas.js';

const fallbackAreaIds = [
  'sundarbans-national-park',
  'gorumara-national-park',
  'jaldapara-national-park',
  'buxa-national-park',
  'singalila-national-park',
  'neora-valley-national-park'
];

const FALLBACK_ALERTS = [
  {
    id: 'alt-001',
    animal: 'Royal Bengal Tiger',
    observedBehaviour: 'Sudden freezing and unusual movement',
    hazardLikelihood: '84.12%',
    dateTime: '02 Oct 2026, 09:10 PM',
    distanceKm: 2.4,
    advisory: 'Stay alert and follow local forest guidance',
    hazardProbability: 84.12,
    protected_area_id: 'sundarbans-national-park',
    updatedAgo: '2 min ago',
    riskLevel: 'high'
  },
  {
    id: 'alt-002',
    animal: 'Saltwater Crocodile',
    observedBehaviour: 'Repeated thrashing in a tidal channel',
    hazardLikelihood: '78.40%',
    dateTime: '02 Oct 2026, 08:42 PM',
    distanceKm: 3.1,
    advisory: 'Maintain a safe distance from the waterway',
    hazardProbability: 78.4,
    protected_area_id: 'sajnekhali-wildlife-sanctuary',
    updatedAgo: '9 min ago',
    riskLevel: 'high'
  },
  {
    id: 'alt-003',
    animal: 'Indian One-horned Rhinoceros',
    observedBehaviour: 'Repeated directional movement',
    hazardLikelihood: '61.25%',
    dateTime: '02 Oct 2026, 07:55 PM',
    distanceKm: 1.8,
    advisory: 'Continue monitoring and follow forest guidance',
    hazardProbability: 61.25,
    protected_area_id: 'jaldapara-national-park',
    updatedAgo: '12 min ago',
    riskLevel: 'medium'
  }
];

export const MAP_ZONES = fallbackAreaIds.map((areaId, index) => {
  const area = getProtectedAreaById(areaId);
  const probabilities = [84.12, 55.9, 78.4, 12.3, 48.1, 8.75];
  const hazardProbability = probabilities[index];
  return {
    id: `sample-${areaId}`,
    name: ['Royal Bengal Tiger', 'Asian Elephant', 'Indian Gaur', 'Clouded Leopard', 'Red Panda', 'Hornbills'][index],
    protectedAreaId: area.id,
    protectedAreaName: area.name,
    hazardProbability,
    riskLevel: hazardProbability > 70 ? 'high' : hazardProbability > 45 ? 'medium' : 'normal',
    lat: area.latitude,
    lng: area.longitude
  };
});

function asNumber(value, fallback = 0) {
  const result = Number(value);
  return Number.isFinite(result) ? result : fallback;
}

function readHazardProbability(item) {
  const value = item.hazardProbability ?? item.hazard_probability ?? item.hazardProb ?? item.hazard_prob ?? item.risk_score;
  return value == null ? null : asNumber(value, null);
}

function riskLevelFor(probability) {
  if (probability == null) return 'unknown';
  return probability > 70 ? 'high' : probability > 45 ? 'medium' : 'normal';
}

function normalizeObservationForAlert(item, index = 0) {
  const hazardProbability = readHazardProbability(item);
  const protectedAreaId = item.protected_area_id;
  const createdAt = item.createdAt || item.created_at;

  return {
    id: item.id || `alert-${index + 1}`,
    animal: item.animal || item.animal_name || 'Wildlife observation',
    observedBehaviour: item.observedBehaviour || item.behaviour || 'Behaviour recorded',
    distanceKm: 1.2 + (index % 4) * 0.9,
    advisory: hazardProbability == null
      ? 'Risk probability is not available'
      : hazardProbability > 70 ? 'Stay alert and follow local forest guidance' : hazardProbability > 45 ? 'Monitor the area' : 'Continue routine observation',
    hazardProbability,
    protectedAreaId,
    zone: getProtectedAreaName(protectedAreaId) || item.zone || item.location || 'Protected area not provided',
    updatedAgo: createdAt
      ? new Date(createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' })
      : `${(index + 1) * 4} min ago`,
    riskLevel: riskLevelFor(hazardProbability)
  };
}

function normalizeObservationForZone(item, index = 0) {
  const hazardProbability = readHazardProbability(item);
  const protectedAreaId = item.protected_area_id;
  const protectedArea = getProtectedAreaById(protectedAreaId);

  return {
    id: item.id || `observation-${index + 1}`,
    name: item.animal || item.animal_name || 'Wildlife observation',
    protectedAreaId,
    protectedAreaName: protectedArea?.name || 'Protected area not provided',
    hazardProbability,
    riskLevel: riskLevelFor(hazardProbability),
    lat: item.latitude ?? protectedArea?.latitude,
    lng: item.longitude ?? protectedArea?.longitude
  };
}

export async function getProtectedAreas() {
  return [...protectedAreas];
}

export async function getObservations() {
  return fetchObservations();
}

export async function submitObservation(payload) {
  try {
    return await createObservation(payload);
  } catch (error) {
    console.error('Observation submission failed:', error);
    throw error;
  }
}

export async function getAlerts() {
  try {
    const observations = await getObservations();
    if (!observations.length) return [...FALLBACK_ALERTS].map(normalizeObservationForAlert);
    return observations.slice(0, 6).map((item, index) => normalizeObservationForAlert(item, index));
  } catch (error) {
    console.error('Failed to load alerts:', error);
    return [...FALLBACK_ALERTS].map(normalizeObservationForAlert);
  }
}

export async function getMapZones() {
  try {
    const observations = await getObservations();
    if (!observations.length) return [...MAP_ZONES];
    return observations.slice(0, 20).map((item, index) => normalizeObservationForZone(item, index));
  } catch (error) {
    console.error('Failed to load map zones:', error);
    return [...MAP_ZONES];
  }
}

export async function getForestOfficers(protectedAreaId) {
  try {
    return await fetchForestOfficers(protectedAreaId);
  } catch (error) {
    console.error('Failed to fetch forest officers:', error);
    return [];
  }
}

export async function addForestOfficer(payload) {
  try {
    return await addOfficerToBackend(payload);
  } catch (error) {
    console.error('Add forest officer failed:', error);
    throw error;
  }
}

export async function predictHazard(payload) {
  try {
    return await fetchPrediction(payload);
  } catch (error) {
    console.error('Hazard prediction failed:', error);
    throw error;
  }
}

export async function sendEmergencyEmail() {
  try {
    return await triggerEmergencyEmail();
  } catch (error) {
    console.error('Emergency email request failed:', error);
    throw error;
  }
}

export async function backendIsReachable() {
  return checkBackendHealth().then(() => true).catch(() => false);
}

export async function loginForestOfficer(payload) {
  return forestOfficerLogin(payload);
}

export async function loginCitizen(payload) {
  return citizenLogin(payload);
}

export async function registerCitizen(payload) {
  return citizenRegister(payload);
}

export async function loginAdmin(payload) {
  return adminLogin(payload);
}

export function getWildlifeAlerts() {
  return [...FALLBACK_ALERTS];
}
