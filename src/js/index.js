var Twitter = require(['twitter']);

var client = new Twitter({
    consumer_key: '7IFFoi0i2Flc7pA6cf7PdXdAM',
    consumer_secret: 'P1jMNCZqQuTecNBZnkjCqXCNerZFDs2FFDVCrXYDepDmwxDEKD',
    access_token_key: '842449503093321728-DyyM9VflvFgM3Fj1DNDeKe4nxdG4nOY',
    access_token_secret: 'Y7OyVLHrYhaiOZxvFSUfoZWXPlr10u3QCe1qflaekVxW7'
});


var zoomLevel = 2;

mapboxgl.accessToken = 'pk.eyJ1IjoibndhcndpY2siLCJhIjoiY2owYWR6NnZoMDA3NTMzb2F3aGQ2YXpvZyJ9.vQzH-hYOzRMurslNpAfiSg';
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/mapbox/dark-v9', //stylesheet location
    center: [0, 0], // starting position
    zoom: zoomLevel // starting zoom
});

/*map.on('load', function() {
    map.addSource('quakes', {
        type: 'geojson',
        data: '../data/query.json'
    });
    map.addLayer({
        'id': 'quakes',
        'type': 'circle',
        'source': 'quakes',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': {
                property: 'mag',
                stops: [
                    [1, 0.5],
                    [2, 1],
                    [3, 2],
                    [4, 4],
                    [5, 8],
                    [6, 16],
                    [7, 32],
                ]
            },
            'circle-color': 'rgb(0, 249, 124)'
        },
    });
});*/

map.on('load', function() {
    map.addSource('tweets', {
        type: 'geojson',
        data: '../data/output.json'
    });
    map.addLayer({
        'id': 'tweets',
        'type': 'circle',
        'source': 'tweets',
        'layout': {
            'visibility': 'visible'
        },
        'paint': {
            'circle-radius': 10,
            'circle-color': 'rgb(0, 249, 124)'
        },
    });
});