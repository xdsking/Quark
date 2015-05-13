define(["dojo/_base/declare","dijit/_WidgetBase",
        "dijit/_TemplatedMixin","dijit/_WidgetsInTemplateMixin","dojo/text!./SharePDF.html"
        ],
		function(declare,_WidgetBase,_TemplatedMixin,_WidgetsInTemplateMixin,template){
	return declare([_WidgetBase, _TemplatedMixin,_WidgetsInTemplateMixin],{
		templateString : template
	});
});