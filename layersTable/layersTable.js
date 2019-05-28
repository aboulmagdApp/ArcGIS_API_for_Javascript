let map;
let mapview;
let layer;
let Request;
let selectedService;
require([
    "esri/Map",
    "esri/views/MapView",
    "esri/views/SceneView",
    "esri/request",
    "esri/layers/MapImageLayer",
    "esri/widgets/Legend",
    "esri/widgets/Expand"
], function (
    Map,
    MapView,
    SceneView,
    esriRequest,
    MapLayer,
    Legend,
    Expand
) {
        Request = esriRequest;
        generateBasemaps();
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

        let url = "https://sampleserver6.arcgisonline.com/arcgis/rest/services?f=json";
        let options = { responseType: "json" };
        getCount(9);
        Request(url, options).then(populateMapService);

        //populate the dropdown of mapService
        function populateMapService(response) {
            let result = response.data;
            let lstservices = document.getElementById("lstservices");
            lstservices.addEventListener("change", onChageServeiceMap);

            for (let i = 0; i < result.services.length; i++) {
                let option = document.createElement("option");
                option.textContent = result.services[i].name;
                lstservices.appendChild(option);
            }
        }

        function onChageServeiceMap() {
            selectedService = lstservices.options[lstservices.selectedIndex].textContent;
            //add layer
            layer = new MapLayer({ url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/" + selectedService + "/MapServer" });
            map.removeAll();
            map.add(layer);
            //wait until the layer is loaded.
            layer.then(() => {
                let toc = document.getElementById("toc");
                toc.innerHTML = "";
                let layerlist = document.createElement('ul');
                toc.appendChild(layerlist);
                //populate layer in list
                populateLayerRecursive(layer, layerlist);
                mapview.goTo(layer.fullExtent)
            })
        }
    });
function getCount(layerid,el) {
    let queryurl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/" + selectedService + "/MapServer/" + layerid + "/query";
    let queryOptions = {
        responseType: "json",
        query:
        {
            f: "json",
            where: "1=1",
            returnCountOnly: true
        }
    }
    Request(queryurl, queryOptions).then(response => el.textContent = response.data.count,response => el.style.visibility ="hidden");
}
function populateLayer(thisLayer, layerlist) {
    for (let i = 0; i < thisLayer.sublayers.length; i++) {
        let sublayer = thisLayer.sublayers.items[i];
        let chk = document.createElement("input");
        chk.type = "checkbox";
        chk.value = sublayer.id;
        chk.checked = sublayer.visible;
        chk.addEventListener("click", function (e) {
            let clickedlayer = thisLayer.findSublayerById(parseInt(e.target.value));
            clickedlayer.visible = e.target.checked;
        })
        let lbl = document.createElement("label");
        lbl.textContent = sublayer.title;

        let layeritem = document.createElement("li");
        layeritem.appendChild(chk);
        layeritem.appendChild(lbl);
        layerlist.appendChild(layeritem);
    }
}
function populateLayerRecursive(thislayer, layerlist) {
    let chk = document.createElement("input");
    chk.type = "checkbox";
    chk.value = thislayer.id;
    chk.checked = thislayer.visible;

    chk.addEventListener("click", e => thislayer.visible = e.target.checked);

    let lbl = document.createElement("label");
    lbl.textContent = thislayer.title;

    let btn = document.createElement("button");
    btn.textContent = "count";
    getCount(thislayer.id,btn);
    //btn.addEventListener("click", e => getCount(thislayer.id,btn));

    let layeritem = document.createElement("li");
    layeritem.appendChild(chk);
    layeritem.appendChild(lbl);
    layeritem.appendChild(btn);

    layerlist.appendChild(layeritem);
    if (thislayer.sublayers != null && thislayer.sublayers.items.length > 0) {
        let newlist = document.createElement("ul");
        layerlist.appendChild(newlist);
        for (let i = 0; i < thislayer.sublayers.length; i++) {
            populateLayerRecursive(thislayer.sublayers.items[i], newlist);

        }
    }
}
//generate list of buttons for basemaps
function generateBasemaps() {
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
}