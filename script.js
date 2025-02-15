// Variables for Google Maps
let map;
let markers = [];
let userMarker;
let directionsService;
let directionsRenderer;

// Wineries data
const wineries = [
    {
      NAME: "Peller Estates Winery",
      LATITUDE: 43.23874063978602,
      LONGITUDE: -79.06687531461021,
      CATEGORY: "restaurant",
      ADDRESS: "290 John St E, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Wayne Gretzky Estates",
      LATITUDE: 43.211311864262456,
      LONGITUDE: -79.13492531645917,
      CATEGORY: "tours",
      ADDRESS: "1219 Niagara Stone Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Reif Estate Winery",
      LATITUDE: 43.21746587118719,
      LONGITUDE: -79.06103838762355,
      CATEGORY: "organic",
      ADDRESS: "15608 Niagara Pkwy, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Jackson-Triggs",
      LATITUDE: 43.24473932570742,
      LONGITUDE: -79.09154948646152,
      CATEGORY: "tours",
      ADDRESS: "2145 Niagara Stone Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Inniskillin Wines",
      LATITUDE: 43.21076314193828,
      LONGITUDE: -79.06394717412998,
      CATEGORY: "restaurant",
      ADDRESS: "1499 Line 3, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Stratus Vineyards",
      LATITUDE: 43.24120044958089, 
      LONGITUDE: -79.09684754898906,
      CATEGORY: "organic",
      ADDRESS: "2059 Niagara Stone Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Konzelmann Estate Winery",
      LATITUDE: 43.25031773286327, 
      LONGITUDE: -79.14138344529304,
      CATEGORY: "tours",
      ADDRESS: "1096 Lakeshore Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Trius Winery",
      LATITUDE: 43.21270591658051, 
      LONGITUDE: -79.13353908947155,
      CATEGORY: "restaurant",
      ADDRESS: "1249 Niagara Stone Rd, Niagara-on-the-Lake, ON"
    },
    {
      NAME: "Ravine Vineyard Estate Winery",
      LATITUDE: 43.16055824399249, 
      LONGITUDE: -79.10250429983053,
      CATEGORY: "organic",
      ADDRESS: "1366 York Rd, St. Davids, ON"
    },
    {
      NAME: "Two Sisters Vineyards",
      LATITUDE: 43.24061038498363,
      LONGITUDE: -79.06913204898905,
      CATEGORY: "restaurant",
      ADDRESS: "240 John St E, Niagara-on-the-Lake, ON"
    }
];

// Initialize the Google Map
function initMap() {
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  
  // Create a new Google Map centered on Niagara
  map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 43.2486, lng: -79.0814 },
      zoom: 13
  });

  directionsRenderer.setMap(map);

  // Add markers for predefined wineries
  wineries.forEach(addWineryMarker);
}

// Function to add a winery marker on the map
function addWineryMarker(winery) {
  const marker = new google.maps.Marker({
      position: { lat: winery.LATITUDE, lng: winery.LONGITUDE },
      map: map,
      title: winery.NAME
  });

    // Create an InfoWindow with winery details
    const infoWindow = new google.maps.InfoWindow({
      content: `<h3>${winery.NAME}</h3><p>${winery.ADDRESS}</p>
                <button onclick="getDirections('${winery.ADDRESS}')">Get Directions</button>`
  });

      // Show InfoWindow when marker is clicked
      marker.addListener("click", () => infoWindow.open(map, marker));

      // Store category for filtering
    marker.CATEGORY = winery.CATEGORY;
    markers.push(marker);
}

// Function to filter wineries by category
function filterWineries(category) {
  markers.forEach(marker => {
      if (category === "all" || marker.CATEGORY === category) {
          marker.setMap(map);
      } else {
          marker.setMap(null);
      }
  });
}

// Add event listeners to filter buttons
document.getElementById("all").addEventListener("click", () => filterWineries("all"));
document.getElementById("organic").addEventListener("click", () => filterWineries("organic"));
document.getElementById("tours").addEventListener("click", () => filterWineries("tours"));
document.getElementById("restaurant").addEventListener("click", () => filterWineries("restaurant"));

// Function to get user's location and display it on the map
document.getElementById("geolocate").addEventListener("click", () => {
  // Get user's current location using the Geolocation API
  navigator.geolocation.getCurrentPosition(position => {
      // Remove previous user marker if it exists
      if (userMarker) userMarker.setMap(null);

      // Create a new marker for user's location with a custom icon
      userMarker = new google.maps.Marker({
          position: { lat: position.coords.latitude, lng: position.coords.longitude },
          map: map,
          title: "Your Location",
          icon: "http://maps.google.com/mapfiles/kml/paddle/blu-circle.png"  // ✅ Custom icon for user location
      });

      // Center the map on user's location
      map.setCenter(userMarker.getPosition());

      // Update location text
      document.getElementById("whereami").innerHTML = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
  }, error => {
      // Handle errors in geolocation
      console.error("Geolocation error:", error);
      alert("Unable to retrieve your location.");
  });
});

// Function to add a new winery marker from user input
function addNewWinery() {
  const name = document.getElementById("newName").value;
  const address = document.getElementById("newAddress").value;
  const category = document.getElementById("newCategory").value;

  if (!name || !address) {
      alert("Please fill in all fields");
      return;
  }

  const geocoder = new google.maps.Geocoder();
  geocoder.geocode({ address: address }, function(results, status) {
      if (status === "OK") {
          addWineryMarker({ NAME: name, LATITUDE: results[0].geometry.location.lat(), LONGITUDE: results[0].geometry.location.lng(), CATEGORY: category, ADDRESS: address });
      } else {
          alert("Geocoding failed: " + status);
      }
  });
}

// Function to get directions from user's location to a selected winery
function getDirections(destination) {
  directionsService.route({
      origin: userMarker.position,
      destination,
      travelMode: google.maps.TravelMode.DRIVING
  }, (result, status) => {
      if (status === "OK") {
          directionsRenderer.setDirections(result);
      }
  });
}