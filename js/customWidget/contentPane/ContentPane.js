define(["dojo/_base/declare", "dijit/layout/ContentPane", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin"],
    function (declare, ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin) {
        return declare([ContentPane, _TemplatedMixin, _WidgetsInTemplateMixin],
            {
                templateString: '<div class="${baseClass}">111111111111</div>',
                title: "查询结果",
                id: "queryResuit",
                closable: true,
                postCreate: function () {
                    var contentPane2 = new ContentPane({title: "11111"});
                    contentPane2.addChild(this);
                    this.parentNode.addChild(contentPane2);
                    this.parentNode.selectChild(contentPane2, false);
                }
            });
    });