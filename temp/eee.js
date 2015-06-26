define(["dojo/_base/declare","dijit/_WidgetBase","dijit/form/Select"],function(declare,_WidgetBase,Select){
    return declare([_WidgetBase],{
        constructor:function() {

        },
        postCreate:function(){
            this.createTopicLayerSelect();
        },
        createTopicLayerSelect:function(){
            new Select({
                options: [
                    { label: "TN", value: "Tennessee" },
                    { label: "VA", value: "Virginia", selected: true },
                    { label: "WA", value: "Washington" },
                    { label: "FL", value: "Florida" },
                    { label: "CA", value: "California" }
                ]
            }).placeAt(this).startup();
        }
    });
});