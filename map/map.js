let topomap;
let satmap;
let streetsmap;
let mapview;
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView"
], function (
    Map,
    MapView,
    SceneView
) {
        topomap = new Map({ basemap: "topo" });
        satmap = new Map({ basemap: "satellite" });
        streetsmap = new Map({ basemap: "streets" });
        let viewoptions = {
            container: "mapDiv",
            map: streetsmap,
            zoom: 11,
            center: [46.733201068855806, 24.714444348574713] //this center for Riyadh
        }
        // mapview = new MapView({
        //     container: "mapDiv",
        //     map: map1, zoom: 11,
        //     center: [46.733201068855806, 24.714444348574713] //this center for Riyadh
        // });
        sceneView = new SceneView(viewoptions);
        //using arrow function
        document.getElementById("topo").addEventListener("click",
            () => { sceneView.map = topomap });
        document.getElementById("satellite").addEventListener("click", function () {
            sceneView.map = satmap;
        });
        document.getElementById("streets").addEventListener("click", function () {
            sceneView.map = streetsmap;
        });
    });