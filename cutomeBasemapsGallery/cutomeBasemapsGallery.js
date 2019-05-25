let map;
let mapview;
let layer;
let basemaps = [];
// "streets", "satellite", "hybrid", "terrain", "topo", "gray", "dark-gray", "oceans", 
// "national-geographic", "osm", "dark-gray-vector", "gray-vector", "streets-vector", 
// "topo-vector", "streets-night-vector", "streets-relief-vector", "streets-navigation-vector"
basemaps.push("satellite");
basemaps.push("topo");
basemaps.push("osm");
basemaps.push("hybrid");
basemaps.push("terrain");
basemaps.push("dark-gray");
let setBasemap = e => map.basemap = e.target.id;
for (let i = 0; i < basemaps.length; i++) {
    let buttons = document.getElementById("buttons");
    let button = document.createElement("button");
    button.id = basemaps[i];
    button.textContent = basemaps[i];
    button.addEventListener("click", setBasemap);
    buttons.appendChild(button);
}
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/request",
    "esri/layers/MapImageLayer",
    "esri/widgets/Legend",
    "esri/widgets/Expand",
], function (
    Map,
    MapView,
    SceneView,
    Request,
    MapLayer,
    Legend,
    Expand
) {
        map = new Map({ basemap: "streets" });
        let viewoptions = {
            container: "mapDiv",
            map: map,
            zoom: 11,
            center: [46.733201068855806, 24.714444348574713], //this center for Riyadh
            scale: 50000
        }
        mapview = new MapView(viewoptions);
        let legend = new Legend({ view: mapview, container: document.createElement("div") });
        var legendExpand = new Expand({
            view: mapview,
            content: legend.domNode,
            expandIconClass: "esri-icon-layers"
        });
        mapview.ui.add(legendExpand, "bottom-left");

        let url = "http://server.arcgisonline.com/arcgis/rest/services/Polar?f=json";
        let options = { responseType: "json" };
        Request(url, options).then(function (response) {
            let result = response.data;
            let lstservices = document.getElementById("lstservices");
            lstservices.addEventListener("change", function () {
                let selectedService = lstservices.options[lstservices.selectedIndex].textContent;
                //add layer
                layer = new MapLayer({ url: "http://server.arcgisonline.com/arcgis/rest/services/" + selectedService + "/MapServer" });
                map.removeAll();
                map.add(layer);
                layer.then(function () {
                    mapview.goTo(layer.fullExtent);
                })
            })

            for (let i = 0; i < result.services.length; i++) {
                let option = document.createElement("option");
                option.textContent = result.services[i].name;
                lstservices.appendChild(option);
            }
        });
    });