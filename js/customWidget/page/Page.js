/**
 * Created by Administrator on 2015/9/28.
 */
define(["dojo/_base/declare", "dijit/_WidgetBase",
        "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "dojo/dom-construct", "dojo/dom"],
    function (declare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, domConstruct, dom) {
        return declare([_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], {
            templateString: "<div data-role='page'><div data-dojo-attach-point='eeee' data-role='header'><h1>2222</h1><a data-iconpos='notext' href='#fff' data-icon='star'></a></div></div>",
            baseClass: "page",
            id: "ddd",
            postCreate: function () {
                var dom1 = domConstruct.toDom("<a data-icon='star' class='ui-btn-right' data-iconpos='notext'></a>");
                dom.byId("mainHeader").appendChild(dom1);
            }
        });

    });