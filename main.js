require([
    "esri/Map",
    "esri/views/MapView"
], function (
    Map,
    MapView
) {
        var map = new Map({
            basemap: "topo"
        });
        var view = new MapView({
            container: "viewDiv",
            map: map,

           ui:{
                components:["zoom","compass","attribution"]
           }
        });
    });