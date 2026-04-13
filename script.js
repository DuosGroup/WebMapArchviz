const _center = { lat: -27.14727549642697, lng: -48.58708161563171 }; // Your center point

// -27.14727549642697, -48.58708161563171

const BOUNDS = {
	north: _center.lat + 0.010,
	south: _center.lat - 0.014,
	east: _center.lng + 0.015,
	west: _center.lng - 0.015,
};

function initMap() {
	// Update MAP_ID with custom map ID
	map = new google.maps.Map(document.getElementById('map'), {
		center: _center,
		restriction: {
			latLngBounds: BOUNDS,
			strictBounds: false,
		},
		zoom: 16,
		mapTypeId: "satellite",
		mapId: 'MAP_ID',
		mapTypeControl: false,
		fullscreenControl: false,
		streetViewControl: false,
		minZoom: 16, // Minimum zoom level
		maxZoom: 20, // Maximum zoom level
	});

	// -27.147997334974797, -48.5923410773642
	// -27.152905154756596, -48.57885333864494

	// Markers data: Name, Latitude, Longitude, Image URL, Scaled Size (width, height), ShowTag, PanoramaToShow
	const markers = [
		["Monaco", -27.147997334974797, -48.5923410773642, 'MonacoGeo.png', 100, 160, 'M_Monaco', 'MonacoEsquinaDir'],
		["Catalunya", -27.152905154756596, -48.57885333864494, 'CatalunyaGeo.png', 100, 160, 'M_Cata', 'CatalunyaMeio']
	];

	// Loop over markers array to create markers on the map
	for (let i = 0; i < markers.length; i++) {
		const currMarker = markers[i];

		const marker = new google.maps.Marker({
			position: { lat: currMarker[1], lng: currMarker[2] },
			map,
			title: currMarker[0],
			icon: {
				url: currMarker[3],
				scaledSize: new google.maps.Size(currMarker[4], currMarker[5]),
			},
			animation: google.maps.Animation.DROP,
		});

		const infowindow = new google.maps.InfoWindow({
			content: currMarker[0],
		});

		// Add click event listener for the marker
		marker.addListener('click', () => {
			// Open info window
			// infowindow.open(map, marker);

			// Define buttons that will be shown and hidden
			const MapContainer = "MapHolder";


			let showTag = ""; // Initialize showTag as empty
			let panorama = ""; // Initialize panorama to show
			let hashValue = `hide-components-tags=${MapContainer}`; // Default hash value for hiding

			// Check if showTag exists and update hashValue
			if (currMarker[7] !== undefined && currMarker[7] !== null && currMarker[7] !== "") {
				showTag = currMarker[6]; // Get the show tag
				panorama = currMarker[7];

				// Update the hash
				hashValue = `hide-components-tags=${MapContainer}&show-components-tags=${showTag}&media-name=${panorama}`;
			}

			// Construct the new hash
			window.location.hash = hashValue;

			// Send the hash to the parent to modify its header
			window.parent.postMessage({ action: 'update-header', hash: hashValue }, '*');

		});
	}
}
