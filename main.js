require([
    "esri/WebMap",
    "esri/views/MapView"
], function (
    WebMap,
    MapView
) {
        var map = new WebMap({
            portalItem: {
                id: "e691172598f04ea8881cd2a4adaa45ba"
              }
        });
        var view = new MapView({
            container: "viewDiv",
            map: map,

           ui:{
                components:["zoom","compass","attribution"]
           }
        });
    });