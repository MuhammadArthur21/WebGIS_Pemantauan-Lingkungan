
// Initialize the map
const map = L.map('map').setView([-6.2, 106.8], 5);

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
}).addTo(map);

// Add GeoJSON data for Air Quality
fetch('data/geojson/air_quality_stations.geojson')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data, {
            pointToLayer: (feature, latlng) => {
                return L.marker(latlng, {
                    icon: L.icon({
                        iconUrl: 'assets/images/air_quality_icon.png',
                        iconSize: [32, 32]
                    })
                });
            },
            onEachFeature: (feature, layer) => {
                layer.bindPopup(`<b>Station:</b> ${feature.properties.station_name}<br><b>AQI:</b> ${feature.properties.aqi}<br><b>Status:</b> ${feature.properties.status}`);
            }
        }).addTo(map);
    });
