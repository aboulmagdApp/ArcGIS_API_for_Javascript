let map1;
let map2;
let mapview;

let lastlon;
let lastlat;
let lastzoom=0;
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
], function (
    Map,
    MapView,
    Legend,
    Expand
) {
        map1 = new Map({ basemap: "streets" });
        map2 = new Map({ basemap: "satellite" });
        let viewoptions = {
            container: "mapDiv",
            map: map1,
            center: [46.733201068855806, 24.714444348574713], //this center for Riyadh
            scale: 10000
        }
        mapview = new MapView(viewoptions);
        let sat = document.getElementById("sat");
        let topo = document.getElementById("topo");
        let legend = new Legend({ view: mapview, container: document.createElement("div") });
        var legendExpand = new Expand({
            view: mapview,
            content: legend.domNode,
            expandIconClass: "esri-icon-layers"
        });
        mapview.ui.add(legendExpand, "bottom-left");
        sat.addEventListener("click", function () {
            lastlat = mapview.center.latitude;
            lastlon = mapview.center.longitude;
            lastzoom = mapview.zoom;
            let p = new Promise(function (resolve, reject) {
                mapview.map = map2;
                resolve();
            })
            p.then(function () {
                mapview.center = [lastlon, lastlat];
                mapview.zoom = lastzoom;
            })
        });
        topo.addEventListener("click", function () {
            lastlat = mapview.center.latitude;
            lastlon = mapview.center.longitude;
            lastzoom = mapview.zoom;
            let p = new Promise(function (resolve, reject) {
                mapview.map = map1;
                resolve();
            })
            p.then(function () {
                mapview.center = [lastlon, lastlat];
                mapview.zoom = lastzoom;
            })
        });
    });