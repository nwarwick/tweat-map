var zoomLevel = 2;

mapboxgl.accessToken = 'pk.eyJ1IjoibndhcndpY2siLCJhIjoiY2owYWR6NnZoMDA3NTMzb2F3aGQ2YXpvZyJ9.vQzH-hYOzRMurslNpAfiSg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', //stylesheet location
    center: [0, 0], // starting position
    zoom: zoomLevel // starting zoom
});

map.on('load', function() {
    map.addSource('tweets', {
        type: 'geojson',
        data: '../data/geoData.json'
    });
    map.addLayer({
        'id': 'tweets',
        'type': 'circle',
        'source': 'tweets',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 5,
            'circle-color': 'rgb(0, 249, 124)'
        },
    });
});

// When a click event occurs near a place, open a popup at the location of
// the feature, with description HTML from its properties.
map.on('click', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['tweets'] });

    if (!features.length) {
        return;
    }

    var feature = features[0];

    // Populate the popup and set its coordinates
    // based on the feature found.
    var popup = new mapboxgl.Popup()
        .setLngLat(feature.geometry.coordinates)
        .setHTML(feature.properties.text)
        .addTo(map);
});


// Use the same approach as above to indicate that the symbols are clickable
// by changing the cursor style to 'pointer'.
map.on('mousemove', function(e) {
    var features = map.queryRenderedFeatures(e.point, { layers: ['tweets'] });
    map.getCanvas().style.cursor = (features.length) ? 'pointer' : '';
});