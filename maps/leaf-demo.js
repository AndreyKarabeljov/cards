// See post: http://asmaloney.com/2015/06/code/clustering-markers-on-leaflet-maps

screenWidth = $(window).width();
zoom = screenWidth > 700 ? 8 : 6
var map = L.map("map", {
  center: [42.7339, 25.4858],
  minZoom: 2,
  zoom: zoom,
});

L.tileLayer("http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a>",
  subdomains: ["a", "b", "c"]
}).addTo(map);

var myURL = jQuery("script[src$='leaf-demo.js']").attr("src").replace("leaf-demo.js", "");

var myIcon = L.icon({
  iconUrl: myURL + "images/pin24.png",
  iconRetinaUrl: myURL + "images/pin48.png",
  iconSize: [29, 24],
  iconAnchor: [9, 21],
  popupAnchor: [0, -14]
});

var markerClusters = L.markerClusterGroup({
  //maxClusterRadius: 40,
  maxClusterRadius: function(zoom) { 
    return 0
   },
   spiderfyOnMaxZoom: false,
   zoomToBoundsOnClick: false,
});

for (var i = 0; i < markers.length; ++i) {
  for (var j = 0; j < markers[i].count; ++j) {
    var m = L.marker([markers[i].lat, markers[i].lng], { icon: myIcon });
    m.displayName = markers[i].name
    markerClusters.addLayer(m);
  }
}

map.addLayer(markerClusters);

markerClusters.on("clustermouseover", function(c) {
  displayName = c.layer.getAllChildMarkers()[0].displayName;
  var popup = L.popup({closeButton:false, className: "cityPopup"})
      .setLatLng(c.layer.getLatLng())
      .setContent(displayName)
      .openOn(map);
  }).on("clustermouseout",function(c){
       map.closePopup();
  }).on("clusterclick",function(c){
       map.closePopup();
  }); 

