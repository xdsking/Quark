define(["dojo/_base/declare","dojo/dom-construct","dijit/_WidgetBase",
    "dojo/_base/lang","dojox/grid/LazyTreeGrid","dojo/data/ItemFileWriteStore","dijit/tree/ForestStoreModel"
],function(declare,domConstruct,_WidgetBase,lang,LazyTreeGrid,ItemFileWriteStore,ForestStoreModel){
    return declare([_WidgetBase],{
        postCreate:function(){
            this._initLazyTreeGrid();
        },
        _initLazyTreeGrid:function(){
            var data ={
                identifier:"label",
                label:"",
                items:[
                    {label:"(项目)名称1",children:[
                        {label:"(地块)名称1",children:[{label:"(字段)名称1"},{label:"(字段)名称2"}]},
                        {label:"(地块)名称2",children:[{label:"(字段)名称3"},{label:"(字段)名称4"}]}
                    ]},
                    {label:"名称2",children:[]}

                ]
            };
            var layout = [{name: " ", field: "label", width: '100%'}];
            var store = new ItemFileWriteStore({data: data});
            var model = new ForestStoreModel({store: store, childrenAttrs: ['children']});
            var grid = new LazyTreeGrid({
                "style":'width: 200px;height: 200px;',
                id: 'grid',
                treeModel: model,
                structure: layout,
                rowSelector: '20px'
            },domConstruct.create("div",{},document.body));
            grid.startup();
        }

    });

});
