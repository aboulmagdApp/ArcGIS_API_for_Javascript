require([
    "esri/WebScene",
    "esri/views/SceneView",
    //widgets
    "esri/widgets/Expand",
    "esri/widgets/BasemapGallery",
    "esri/widgets/BasemapToggle",
    "esri/widgets/Home",
    "esri/widgets/Legend",
    "esri/widgets/LayerList",
    "esri/widgets/Print",
    "esri/widgets/ScaleBar",
    "esri/widgets/Search"
], function (
    WebScene,
    SceneView,
    Expand,BasemapGallery,BasemapToggle,Home,
    Legend,LayerList,Print,ScaleBar,Search
) {
        var map = new WebScene({
            portalItem: {
                id: "e18d908bacd440f6ab15b75e85f637b4"
              }
        });
        var view = new SceneView({
            container: "viewDiv",
            map: map,
           ui:{
                components:["zoom","compass","attribution"]
           }
        });

        view.then(function(){
            //widgets
            var basemapGallery = new BasemapGallery({
                view: view,
                container:document.createElement("div")
            });
            var basemapToggle = new BasemapToggle({
                view: view,
                nextBasemap:"hybrid"
            });
            
            var home = new Home({
                view: view
                //container:document.createElement("div")
            });
            var search = new Search({
                view: view,
                container:document.createElement("div")
            });
            var scalebar = new ScaleBar({
                view: view,
                container:document.createElement("div")
            });
            var legend = new Legend({
                view: view,
                container:document.createElement("div")
            });
            var layerlist = new LayerList({
                view: view,
                container:document.createElement("div")
            });
            var print = new Print({
                view: view,
                printServiceUrl:"https://utility.arcgisonline.com/arcgis/rest/services/Utilities/PrintingTools/GPServer/Export%20Web%20Map%20Task",
                container:document.createElement("div")
            });
            //expands
            var bgExpand = new Expand({
                view: view,
                content: basemapGallery.domNode,
                expandIconClass:"esri-icon-basemap"
              });
              var searchExpand = new Expand({
                view: view,
                content: search.domNode,
                expandIconClass:"esri-icon-search"
              });
              var legendExpand = new Expand({
                view: view,
                content: legend.domNode,
                expandIconClass:"esri-icon-layers"
              });
              var listExpand = new Expand({
                view: view,
                content: layerlist.domNode,
                expandIconClass:"esri-icon-layer-list"
              });
              var printExpand = new Expand({
                view: view,
                content: print.domNode,
                expandIconClass:"esri-icon-printer"
              });


              view.ui.add(home,{
                  position:"top-left",
                  index:1
              });
              view.ui.add(searchExpand,"top-right");
              view.ui.add(printExpand,"top-right");
              view.ui.add(legendExpand,"top-right");
              view.ui.add(listExpand,"top-right");
              view.ui.add(scalebar,"bottom-left");
              view.ui.add(basemapToggle,"bottom-right");
              view.ui.add(bgExpand,"bottom-right");
        })
    });