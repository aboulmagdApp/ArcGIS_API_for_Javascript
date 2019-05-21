require([
    "esri/WebMap",
    "esri/views/MapView",
    "esri/layers/FeatureLayer",
], function (
    WebMap,
    MapView,
    FeatureLayer
) {
        layer = new FeatureLayer({
            url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/AGP/Hurricanes/MapServer/1"
        });
        map = new WebMap({
            basemap: "topo",
            layers: [layer]
        });
        view = new MapView({
            container: "viewDiv",
            center:[-118.244,34.052],
            zoom:12,
            map: map,
        })
    });