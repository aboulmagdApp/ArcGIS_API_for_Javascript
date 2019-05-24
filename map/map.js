let map;
let mapview;
let layer;
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
        let legend = new Legend({view:mapview,container:document.createElement("div")});
        var legendExpand = new Expand({
            view: mapview,
            content: legend.domNode,
            expandIconClass:"esri-icon-layers"
          });
        mapview.ui.add(legendExpand,"bottom-left");
        //sceneView = new SceneView(viewoptions);
        //using arrow function
        // document.getElementById("topo").addEventListener("click",
        //     () => { mapview.map = topomap });
        // document.getElementById("satellite").addEventListener("click", function () {
        //     mapview.map = satmap;
        // });
        // document.getElementById("streets").addEventListener("click", function () {
        //     mapview.map = streetsmap;
        // });
              
        let url = "http://server.arcgisonline.com/arcgis/rest/services/Polar?f=json";
        let options = { responseType: "json" };
        Request(url, options).then(function (response) {
            let result = response.data;
            let lstservices = document.getElementById("lstservices");
            lstservices.addEventListener("change",function(){
                let selectedService = lstservices.options[lstservices.selectedIndex].textContent;
                 //add layer
                 layer = new MapLayer({ url: "http://server.arcgisonline.com/arcgis/rest/services/"+ selectedService +"/MapServer" });
                 map.removeAll();
                 map.add(layer);
                 layer.then(function () {
                     mapview.goTo(layer.fullExtent);
                 })
            })
    
            for (let i = 0; i < result.services.length; i++) {
                let option = document.createElement("option");
                option.textContent = result.services[i].name;
                lstservices.appendChild(option);            }
        });
    });