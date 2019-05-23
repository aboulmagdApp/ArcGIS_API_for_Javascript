let map1;
let mapview;
require([
    "esri/Map",
    "esri/views/MapView"
], function (
    Map,
    MapView
) {
      map1 = new Map({ basemap:"topo"});
      mapview = new MapView({ 
          container: "mapDiv", 
          map: map1 ,zoom:11,
          center:[46.733201068855806,24.714444348574713] //this center for Riyadh
        });
    });