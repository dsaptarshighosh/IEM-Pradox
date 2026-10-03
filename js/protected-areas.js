// Names and representative points cross-checked against linked Wikidata records;
// Tiger Reserve designations were checked against NTCA. Points are not boundaries.
export const protectedAreas = [
  { id: 'sundarbans-national-park', name: 'Sundarbans National Park', type: 'national_park', district: 'South 24 Parganas', latitude: 21.75, longitude: 88.75 },
  { id: 'gorumara-national-park', name: 'Gorumara National Park', type: 'national_park', district: 'Jalpaiguri', latitude: 26.7, longitude: 88.8 },
  { id: 'jaldapara-national-park', name: 'Jaldapara National Park', type: 'national_park', district: 'Alipurduar', latitude: 26.629, longitude: 89.378 },
  { id: 'buxa-national-park', name: 'Buxa National Park', type: 'national_park', district: 'Alipurduar', latitude: 26.65, longitude: 89.58 },
  { id: 'singalila-national-park', name: 'Singalila National Park', type: 'national_park', district: 'Darjeeling', latitude: 27.117, longitude: 88.067 },
  { id: 'neora-valley-national-park', name: 'Neora Valley National Park', type: 'national_park', district: 'Kalimpong', latitude: 27.06, longitude: 88.7 },
  { id: 'chapramari-wildlife-sanctuary', name: 'Chapramari Wildlife Sanctuary', type: 'wildlife_sanctuary', district: 'Jalpaiguri', latitude: 26.875, longitude: 88.855 },
  { id: 'mahananda-wildlife-sanctuary', name: 'Mahananda Wildlife Sanctuary', type: 'wildlife_sanctuary', district: 'Darjeeling', latitude: 26.874, longitude: 88.439 },
  { id: 'senchal-wildlife-sanctuary', name: 'Senchal Wildlife Sanctuary', type: 'wildlife_sanctuary', district: 'Darjeeling', latitude: 26.994, longitude: 88.265 },
  // TODO: Confirm the representative point against an official protected-area boundary source.
  { id: 'ballavpur-wildlife-sanctuary', name: 'Ballavpur Wildlife Sanctuary', type: 'wildlife_sanctuary', district: 'Birbhum', latitude: 23.683, longitude: 87.667 },
  { id: 'bethuadahari-wildlife-sanctuary', name: 'Bethuadahari Wildlife Sanctuary', type: 'wildlife_sanctuary', district: 'Nadia', latitude: 23.598, longitude: 88.392 },
  { id: 'raiganj-wildlife-sanctuary', name: 'Raiganj Wildlife Sanctuary (Kulik Bird Sanctuary)', type: 'wildlife_sanctuary', district: 'Uttar Dinajpur', latitude: 25.637, longitude: 88.121 },
  { id: 'lothian-island-wildlife-sanctuary', name: 'Lothian Island Wildlife Sanctuary', type: 'wildlife_sanctuary', district: 'South 24 Parganas', latitude: 21.658, longitude: 88.326 },
  { id: 'sajnekhali-wildlife-sanctuary', name: 'Sajnekhali Wildlife Sanctuary', type: 'wildlife_sanctuary', district: 'South 24 Parganas', latitude: 21.721, longitude: 88.9 },
  { id: 'haliday-island-wildlife-sanctuary', name: 'Haliday Island Wildlife Sanctuary', type: 'wildlife_sanctuary', district: 'South 24 Parganas', latitude: 21.664, longitude: 88.631 }
];

export function getProtectedAreaById(id) {
  return protectedAreas.find((area) => area.id === id);
}

export function getProtectedAreaName(id) {
  return getProtectedAreaById(id)?.name;
}
