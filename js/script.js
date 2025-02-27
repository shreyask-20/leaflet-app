document.addEventListener("DOMContentLoaded", function () {
  // Initialize map
  var map = L.map('map').setView([20.5937, 78.9629], 5); // Default location: India

  // Add tile layer (Google Maps-like theme)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // Search functionality
  document.getElementById("search-btn").addEventListener("click", function () {
      let location = document.getElementById("search-box").value;
      if (location.trim() !== "") {
          fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${location}`)
              .then(response => response.json())
              .then(data => {
                  if (data.length > 0) {
                      let lat = data[0].lat;
                      let lon = data[0].lon;
                      map.setView([lat, lon], 13);
                      L.marker([lat, lon]).addTo(map)
                          .bindPopup(`<b>${location}</b>`).openPopup();
                  } else {
                      alert("Location not found!");
                  }
              })
              .catch(error => console.error("Error fetching location:", error));
      }
  });

  // Refresh button to reset the map
  document.getElementById("refresh-btn").addEventListener("click", function () {
      map.setView([20.5937, 78.9629], 5); // Reset to default location
  });
});
