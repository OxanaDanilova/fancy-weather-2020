/* eslint-disable no-undef */

const showMap = (lng, lat, lang) => {
  let mapLang;
  if (lang === 'en') { mapLang = 'name_en'; }
  if (lang === 'ru') { mapLang = 'name_ru'; }
  if (lang === 'be') { mapLang = 'name_be'; }
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFwa2V0IiwiYSI6ImNrNDMwN21peTAybXMzbG94MzJjcXZsMG4ifQ.9ulaNqWSY1k7LxuYdYLteA';
  const map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [lng, lat],
    zoom: 7,
  });
  map.on('load', () => {
    map.setLayoutProperty('country-label', 'text-field', [
      'format',
      ['get', mapLang],
      { 'font-scale': 1.2 },
      '\n',
      {},
      ['get', 'name'],
      {
        'font-scale': 0.8,
        'text-font': [
          'literal',
          ['DIN Offc Pro Italic', 'Arial Unicode MS Regular'],
        ],
      },
    ]);
  });
};
export default showMap;
