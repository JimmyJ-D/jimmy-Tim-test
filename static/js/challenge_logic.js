// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

// We create the second tile layer that will be the background of our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 18,
  accessToken: API_KEY
});

//DARKVIEW INSERT HERE
// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
  attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
  maxZoom: 12,
  accessToken: API_KEY
});

// Create the map object with center, zoom level and default layer. CHANGE TO NASHVILLE

let map = L.map('mapid', {
  center: [36.1627, -86.7816],
  zoom: 12,
  layers: [streets]
});



// Create a base layer that holds all three maps.
let baseMaps = {
  "Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark
};
// var marker = L.marker([36.055, -86.678], {
//   city: "Antioch",
//   state: "TN",
//   street: "Shihmen",
//   price : 295000 
// }).addTo(map);



//Load reformated_house_value, then call json function with comments
fetch("./static/js/reformatted_house_value.json")
.then(res => res.json())
.then(jsonLoaded);

// creating a new function json loaded. 
function jsonLoaded(houses){
console.log (houses);




// Loop through the cities array and create one marker for each city.
houses.forEach(function(house) {
  house.formattedValue = Math.round(house.predicted_price).toLocaleString('en-US');
  console.log(house);
  L.marker(house.location)
  
  .bindPopup(`
    <h2 class="${house.house_value}">$${house.formattedValue}</h2>
    <hr>
    <h3>${house.city}, ${house.state}</h3>
    <h3>BB: ${house.beds}, ${house.baths}</h3>

  `)
  //.bindPopup("<h4>" + city.price.toLocaleString() + "</h4>")
  .addTo(map);
});
}
