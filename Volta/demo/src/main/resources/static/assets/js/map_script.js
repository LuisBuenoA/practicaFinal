// Making a map and tile
const mymap = L.map("issMap").setView([0, 0], 1);

const attribution =
  '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

const weather_api_key = "eee50db85c0ba5c874076d3e70632afa";

// Making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: "../icons/international-space-station.png",
  iconSize: [50, 32],
  iconAnchor: [25, 16],
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const api_url = "https://api.wheretheiss.at/v1/satellites/25544";

const weather = {};

const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");

weather.temperature = {
  unit : "celsius"
}

let firstTime = true;

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  const { latitude, longitude } = data;

  marker.setLatLng([latitude, longitude]);
  if (firstTime) {
    mymap.setView([latitude, longitude], 2);
    firstTime = false;
  }
  //Fixes the number of decimal places
  document.getElementById("lat").textContent = latitude.toFixed(2);
  document.getElementById("lon").textContent = longitude.toFixed(2);
}

getISS();

